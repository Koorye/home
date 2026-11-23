<template>
  <section id="publications" class="section">
    <h2>{{ t('publications.title') }}</h2>
    <div class="publication-list">
      <div 
        v-for="(pub, index) in publications" 
        :key="index" 
        class="publication-item"
        @click="togglePublication(index)"
      >
        <!-- 预览区域 -->
        <div class="pub-header">
          <div class="pub-title">
            <span
              class="pub-type"
              :class="'pub-type--' + pub.category"
              role="img"
              :aria-label="pubTypeLabel(pub)"
              :title="pubTypeLabel(pub)"
            >
              <i class="fas" :class="pub.category === 'vlm' ? 'fa-eye' : 'fa-robot'" aria-hidden="true"></i>
            </span>
            <h3 v-html="pub.title" :class="'pub-cat-' + pub.category"></h3>
          </div>
          <span class="pub-date">{{ pub.date }}</span>
        </div>

        <div class="pub-body">
          <div class="publication-image">
            <img :src="pub.image" :alt="stripHtml(pub.title)" loading="lazy" decoding="async" />
          </div>
          <div class="publication-content">
            <p v-html="pub.description"></p>
            <div class="pub-tags">
              <span v-for="tag in pub.tags" :key="tag" class="keyword-tag">{{ tag }}</span>
            </div>
            
            <div v-if="pub.links" class="pub-links" @click.stop>
              <a 
                v-for="(link, key) in pub.links" 
                :key="key" 
                :href="link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="pub-link-btn"
                :class="'link-' + key"
              >
                <span class="link-icon" v-html="getIcon(key)"></span> 
                {{ formatLinkText(key) }}
                <span v-if="key === 'code'" class="star-count">
                  <span v-if="starCounts[getRepoKey(link)] === 'loading'">
                    <i class="fas fa-spinner fa-spin"></i>
                  </span>
                  <span v-else-if="starCounts[getRepoKey(link)] === 'error'">
                    <i class="fas fa-exclamation-circle"></i>
                  </span>
                  <span v-else-if="starCounts[getRepoKey(link)] !== undefined">
                    <i class="fas fa-star"></i> {{ starCounts[getRepoKey(link)] }}
                  </span>
                </span>
              </a>
              <button
                v-if="getBibtex(pub)"
                type="button"
                class="pub-link-btn cite-link"
                @click.stop="openCite(pub)"
              >
                <span class="link-icon"><i class="fas fa-quote-right"></i></span>
                {{ t('publications.buttons.cite') }}
              </button>
            </div>
          </div>
        </div>

        <!-- 详情区域 -->
        <div 
          class="pub-details" 
          :id="'pub-details-' + index"
          :class="{ 'show-details': expandedIndex === index }"
          :inert="expandedIndex !== index"
          @click.stop
        >
          
          <!-- 视频 -->
          <div v-if="pub.video" class="detail-media-section">
            <div class="detail-section">
              <h4>{{ t('publications.videoTitle') }}</h4>
            </div>
            <div class="video-wrapper">
              <video 
                :ref="el => videoRefs[index] = el"
                class="detail-video"
                controls
                muted
                loop
                playsinline
                preload="metadata"
              >
                <source :src="pub.video" type="video/mp4" />
                您的浏览器不支持视频播放
              </video>
            </div>
          </div>

          <!-- 轮播图 -->
          <div v-if="pub.detailImages && pub.detailImages.length" class="detail-media-section">
            <div class="detail-section">
              <h4>{{ t('publications.swiperTitle') }}</h4>
            </div>
            <div class="swiper-wrapper">
              <swiper
                :modules="[Autoplay, Pagination, Navigation]" 
                :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: false }"
                :navigation="true" 
                class="mySwiper"
                @swiper="(swiper) => onSwiperInit(index, swiper)"
              >
                <swiper-slide v-for="(img, idx) in pub.detailImages" :key="idx">
                  <div class="swiper-img-container">
                    <img :src="img.url" :alt="img.title || '详情图'" loading="lazy" decoding="async" />
                    <div class="swiper-caption" v-if="img.title">
                      <h4 class="caption-title">{{ img.title }}</h4>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>

          <!-- 摘要与贡献 -->
          <div class="detail-section">
            <h4>{{ t('publications.buttons.abstract') }}</h4>
            <p v-html="pub.abstract"></p>
          </div>
          <div class="detail-section">
            <h4>{{ t('publications.buttons.contributions') }}</h4>
            <ul>
              <li v-for="(contrib, i) in pub.contributions" :key="i">
                <p v-html="contrib"></p>
              </li>
            </ul>
          </div>
        </div>

        <div class="click-tip">{{ t('publications.buttons.click') }}</div>
      </div>
    </div>

    <div v-if="citePub" class="cite-backdrop" @click="closeCite">
      <div
        class="cite-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="t('publications.buttons.cite')"
        @click.stop
      >
        <div class="cite-dialog-head">
          <span class="cite-label">{{ t('publications.buttons.cite') }}</span>
          <button
            type="button"
            class="cite-close"
            @click="closeCite"
            :aria-label="t('publications.buttons.close')"
          >
            <i class="fas fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <p class="cite-paper" v-html="citePub.title"></p>
        <pre class="cite-code">{{ getBibtex(citePub) }}</pre>
        <div class="cite-actions">
          <button type="button" class="cite-copy" @click="copyBibtex">
            <i class="fas" :class="citeCopied ? 'fa-check' : 'fa-copy'" aria-hidden="true"></i>
            {{ citeCopied ? t('publications.buttons.copied') : t('publications.buttons.copyBibtex') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick, reactive, onMounted, onUnmounted } from 'vue';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';
import bibtexEntries from '@/data/bibtex';

// Swiper 核心及组件
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // 1. 引入导航样式
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // 2. 引入 Navigation 模块

const { t } = useI18n();
const publications = useLocaleData('publications', 'data');
const { starCounts, getRepoKey, fetchStarsForRepos } = useGitHubStars();

const expandedIndex = ref(-1);
const videoRefs = ref([]);
const swiperInstances = reactive({}); 
const citePub = ref(null);
const citeCopied = ref(false);
let citeTimer = null;

const onSwiperInit = (index, swiper) => {
  swiperInstances[index] = swiper;
};

const togglePublication = async (index) => {
  const isClosing = expandedIndex.value === index;
  if (isClosing) {
    expandedIndex.value = -1;
    return;
  }

  expandedIndex.value = index;
  await nextTick();

  // 视频重置
  const video = videoRefs.value[index];
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  // 轮播图强制回首页
  const swiper = swiperInstances[index];
  if (swiper) {
    swiper.slideToLoop(0, 0); 
    if (swiper.autoplay) {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  }
};

const stripHtml = (html) => String(html).replace(/<[^>]*>/g, '');
const pubTypeLabel = (pub) => t(`publications.types.${pub.category === 'vlm' ? 'vlm' : 'robotics'}`);
const getArxivId = (pub) => pub?.links?.arxiv?.split('/').pop() || '';
const getBibtex = (pub) => bibtexEntries[getArxivId(pub)] || '';

const openCite = async (pub) => {
  if (!getBibtex(pub)) return;
  citePub.value = pub;
  citeCopied.value = false;
  await nextTick();
  document.querySelector('.cite-copy')?.focus();
};

const closeCite = () => {
  clearTimeout(citeTimer);
  citePub.value = null;
  citeCopied.value = false;
};

const copyBibtex = async () => {
  const text = getBibtex(citePub.value);
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  citeCopied.value = true;
  clearTimeout(citeTimer);
  citeTimer = setTimeout(() => { citeCopied.value = false; }, 2000);
};

const onKeydown = (event) => {
  if (event.key === 'Escape' && citePub.value) closeCite();
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  clearTimeout(citeTimer);
});

const formatLinkText = (key) => t(`publications.buttons.${key}`);
const getIcon = (key) => {
  const iconMap = {
    project: '<i class="fas fa-globe"></i>',
    arxiv: '<i class="ai ai-arxiv"></i>',
    pdf: '<i class="fas fa-file-pdf"></i>',
    code: '<i class="fab fa-github"></i>'
  };
  return iconMap[key] || '';
};

watch(publications, (newPubs) => {
  if (!newPubs?.length) return;
  const githubUrls = [];
  newPubs.forEach(pub => pub.links?.code && githubUrls.push(pub.links.code));
  fetchStarsForRepos(githubUrls);
}, { immediate: true });
</script>

<style scoped>
.section {
  margin-top: 2.4rem;
  padding-top: 2.2rem;
  border-top: 1px solid var(--line);
}

.section h2 {
  font-family: var(--ff-display);
  font-size: 1.55rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 1.4rem;
  color: var(--ink);
}

.publication-list {
  display: flex;
  flex-direction: column;
}

.publication-item {
  background: transparent;
  border-top: 1px solid var(--line);
  border-radius: 0;
  box-shadow: none;
  padding: 1.5rem 0 1rem;
  cursor: pointer;
  transition: none;
}

.publication-item:hover {
  transform: none;
  box-shadow: none;
}

.pub-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1.5rem;
  padding: 0;
  background: none;
}

.pub-title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.pub-title h3 {
  min-width: 0;
}

.pub-type {
  display: inline-flex;
  align-items: center;
  flex: none;
  font-size: 0.76rem;
  line-height: 1;
  color: var(--ink-mute);
  transform: translateY(0.08em);
}

.pub-type--robotics {
  color: var(--pub-robotics-ink);
}

.pub-type--vlm {
  color: var(--pub-vlm-ink);
}

.pub-header h3 :deep(.highlight-red) {
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.1rem 0.42rem;
  border-radius: 2px;
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--ff-mono);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  line-height: 1.55;
  vertical-align: 0.08em;
}

.pub-header h3.pub-cat-robotics :deep(.highlight-red) {
  background: var(--pub-robotics-bg);
  color: var(--pub-robotics-ink);
}

.pub-header h3.pub-cat-vlm :deep(.highlight-red) {
  background: var(--pub-vlm-bg);
  color: var(--pub-vlm-ink);
}

.pub-header h3 {
  margin: 0;
  font-family: var(--ff-sans);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: -0.005em;
  color: var(--ink);
}

.pub-date {
  color: var(--ink-mute);
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
  flex-shrink: 0;
}

.pub-body {
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 1rem 0 0;
}

.publication-image {
  flex: 0 0 300px;
  max-width: 300px;
}

.publication-image img {
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
}

.publication-content {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  justify-content: flex-start;
}

.publication-content p {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.7;
  color: var(--ink-soft);
}

.pub-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
}

.keyword-tag {
  background: none;
  color: var(--ink-mute);
  padding: 0;
  border-radius: 0;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.keyword-tag + .keyword-tag::before {
  content: '/';
  margin: 0 0.55rem;
  color: var(--line-strong);
  font-weight: 400;
}

.pub-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.15rem;
  margin-top: 0.15rem;
}

.pub-link-btn {
  position: static;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  background: none;
  border: 0;
  border-radius: 0;
  color: var(--ink-soft);
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.pub-link-btn:hover {
  background: none;
  transform: none;
  text-decoration: underline;
}

.pub-link-btn:hover .link-icon {
  opacity: 1;
}

.pub-link-btn.link-project,
.pub-link-btn.link-project .link-icon {
  color: var(--link-project);
}

.pub-link-btn.link-arxiv,
.pub-link-btn.link-arxiv .link-icon {
  color: var(--link-arxiv);
}

.pub-link-btn.link-pdf,
.pub-link-btn.link-pdf .link-icon {
  color: var(--link-pdf);
}

.pub-link-btn.link-code,
.pub-link-btn.link-code .link-icon {
  color: var(--link-code);
}

.pub-link-btn .link-icon {
  position: static;
  display: inline-flex;
  font-size: 0.72rem;
  opacity: 0.9;
}

.star-count {
  margin-left: 0.8rem;
  color: var(--star);
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.22rem;
}

.cite-link {
  cursor: pointer;
}

.cite-backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(8, 14, 20, 0.55);
}

.cite-dialog {
  display: flex;
  flex-direction: column;
  width: min(720px, 100%);
  max-height: 82vh;
  background: var(--paper);
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.cite-dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 1.25rem 0.7rem;
  border-bottom: 1px solid var(--line);
}

.cite-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.cite-close {
  border: 0;
  background: none;
  padding: 0.25rem;
  color: var(--ink-mute);
  font-size: 0.9rem;
  cursor: pointer;
}

.cite-close:hover {
  color: var(--ink);
}

.cite-paper {
  margin: 0;
  padding: 0.9rem 1.25rem 0;
  font-family: var(--ff-sans);
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--ink);
}

.cite-code {
  flex: 1;
  min-height: 0;
  margin: 0.8rem 1.25rem 0.9rem;
  padding: 1rem;
  overflow: auto;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 2px;
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  line-height: 1.65;
  color: var(--ink-body);
  white-space: pre;
}

.cite-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 1.25rem 1.1rem;
}

.cite-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--accent);
  border-radius: 2px;
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--ff-sans);
  font-size: 0.78rem;
  cursor: pointer;
}

.cite-copy:hover {
  background: var(--accent);
  color: var(--paper);
}

.cite-copy i {
  font-size: 0.75rem;
}

.pub-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  padding: 0;
  cursor: default;
  transition: max-height 0.45s ease, opacity 0.3s ease;
}

.pub-details.show-details {
  max-height: 12000px;
  opacity: 1;
  padding: 1.5rem 0 0;
  margin-top: 1.4rem;
  border-top: 1px solid var(--line);
}

.detail-media-section {
  margin: 0 0 1.8rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h4 {
  font-family: var(--ff-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: 0.65rem;
  padding-left: 0;
  border-left: 0;
}

.detail-section p {
  margin: 0;
  max-width: none;
  font-size: 0.96rem;
  line-height: 1.78;
  color: var(--ink-body);
  text-wrap: pretty;
}

.detail-section ul {
  margin: 0;
  padding-left: 1.15rem;
}

.detail-section li {
  margin-bottom: 0.45rem;
}

.detail-section li::marker {
  color: var(--ink-mute);
}

.detail-section li p {
  font-size: 0.96rem;
}

.video-wrapper,
.swiper-wrapper {
  background: var(--surface-soft);
  padding: 0;
  border-radius: 2px;
  border: 0;
  box-shadow: none;
  overflow: hidden;
}

.detail-video {
  width: 100%;
  max-height: 440px;
  background: #0e1822;
  border-radius: 0;
}

.swiper-img-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--surface);
  padding: 1rem 1rem 0;
}

.swiper-img-container img {
  max-width: 100%;
  max-height: 430px;
  object-fit: contain;
}

.swiper-caption {
  position: static;
  width: 100%;
  background: none;
  color: var(--ink-soft);
  padding: 0.7rem 0.2rem 0.9rem;
  text-align: left;
}

.swiper-caption .caption-title {
  margin: 0;
  font-family: var(--ff-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--ink-soft);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--ink-soft);
  background: transparent;
  width: 28px;
  height: 28px;
  border-radius: 0;
  box-shadow: none;
  transition: color 0.2s ease;
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 14px;
  font-weight: 600;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: transparent;
  color: var(--accent);
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--accent);
}

.click-tip {
  text-align: left;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0.9rem 0 0;
  transition: color 0.2s ease;
}

.publication-item:hover .click-tip {
  color: var(--accent);
}

.show-details + .click-tip {
  display: none;
}

@media (max-width: 768px) {
  .section {
    margin-top: 1.7rem;
    padding-top: 1.7rem;
  }
  .section h2 {
    font-size: 1.35rem;
    margin-bottom: 1rem;
  }
  .publication-item {
    padding: 1.15rem 0 0.8rem;
  }
  .pub-header {
    align-items: flex-start;
    gap: 0.75rem;
  }
  .pub-title {
    gap: 0.4rem;
  }
  .pub-type {
    font-size: 0.7rem;
  }
  .pub-header h3 {
    font-size: 0.95rem;
  }
  .pub-header h3 :deep(.highlight-red) {
    padding: 0.08rem 0.35rem;
    font-size: 0.62rem;
    margin-right: 0.4rem;
  }
  .pub-date {
    font-size: 0.68rem;
  }
  .pub-body {
    flex-direction: column;
    gap: 0.85rem;
    padding-top: 0.8rem;
  }
  .publication-image {
    flex: none;
    max-width: 100%;
  }
  .publication-image img {
    max-height: 260px;
    object-fit: cover;
  }
  .publication-content p {
    font-size: 0.9rem;
  }
  .pub-links {
    gap: 0.3rem 1rem;
  }
  .pub-link-btn {
    font-size: 0.74rem;
  }
  .pub-details.show-details {
    margin-top: 1rem;
    padding-top: 1.1rem;
  }
  .detail-section h4 {
    font-size: 0.66rem;
  }
  .detail-section p,
  .detail-section li p {
    font-size: 0.9rem;
    line-height: 1.72;
  }
  .detail-video {
    max-height: 240px;
  }
  .swiper-img-container {
    padding: 0.6rem 0.6rem 0;
  }
  .swiper-img-container img {
    max-height: 250px;
  }
  .swiper-caption {
    padding: 0.5rem 0 0.6rem;
  }
  .swiper-caption .caption-title {
    font-size: 0.75rem;
  }
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }

  .cite-backdrop {
    padding: 0.8rem;
  }

  .cite-dialog {
    max-height: 88vh;
  }

  .cite-dialog-head {
    padding: 0.8rem 0.9rem 0.55rem;
  }

  .cite-paper {
    padding: 0.7rem 0.9rem 0;
    font-size: 0.82rem;
  }

  .cite-code {
    margin: 0.6rem 0.9rem;
    padding: 0.75rem;
    font-size: 0.68rem;
  }

  .cite-actions {
    padding: 0 0.9rem 0.9rem;
  }
}
</style>
