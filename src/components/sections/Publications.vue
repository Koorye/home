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
          <h3 v-html="pub.title"></h3>
          <span class="pub-date">{{ pub.date }}</span>
        </div>

        <div class="pub-body">
          <div class="publication-image">
            <img :src="pub.image" :alt="pub.title" />
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
                class="pub-link-btn"
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
            </div>
          </div>
        </div>

        <!-- 详情区域 -->
        <div 
          class="pub-details" 
          :class="{ 'show-details': expandedIndex === index }"
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
                    <img :src="img.url" :alt="img.title || '详情图'" />
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
  </section>
</template>

<script setup>
import { ref, watch, nextTick, reactive } from 'vue';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

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
/* 基础样式保持不变 */
.section { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eaeaea; }
.section h2 { font-size: 1.8rem; font-weight: 600; margin-bottom: 1.5rem; color: #0056b3; }
.publication-list { display: flex; flex-direction: column; gap: 2rem; }
.publication-item { background-color: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.4s ease; cursor: pointer; }
.publication-item:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0,0,0,0.12); }
.pub-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background-color: #eff4ff; }
.pub-header h3 { margin: 0; font-size: 1.1rem; color: #0056b3; }
.pub-date { color: #666; font-size: 0.9rem; background: #fff; padding: 2px 8px; border-radius: 4px; border: 1px solid #d1e7ff;}
.pub-body { display: flex; padding: 1rem; }
.publication-image { flex: 0 0 320px; max-width: 320px; display: flex; align-items: center;}
.publication-image img { width: 100%; border-radius: 4px; object-fit: cover; }
.publication-content { flex: 1; padding: 0 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; justify-content: center;}
.pub-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.keyword-tag { background-color: #e1f0fa; color: #2980b9; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; }
.pub-links { display: flex; gap: 0.6rem; margin-top: 0.5rem; flex-wrap: wrap; }
.pub-link-btn { text-decoration: none; font-size: 0.85rem; padding: 4px 12px 4px 28px; background: #e6f2ff; border: 1px solid #d1e7ff; border-radius: 4px; color: #0056b3; transition: 0.2s; position: relative; display: inline-flex; align-items: center; }
.pub-link-btn:hover { background: #d1e7ff; transform: translateY(-2px); }
.pub-link-btn .link-icon { position: absolute; left: 8px; }

/* 详情动画 */
.pub-details { max-height: 0; overflow: hidden; opacity: 0; transition: all 0.5s ease; padding: 0 1.5rem; cursor: default; }
.pub-details.show-details { max-height: 5000px; opacity: 1; padding-bottom: 2rem; }

/* 媒体区域 */
.detail-media-section { margin: 1.5rem 0; }
.detail-section h4 { color: #0056b3; margin-bottom: 0.8rem; font-size: 1.1rem; border-left: 4px solid #0056b3; padding-left: 10px; }
.video-wrapper, .swiper-wrapper { background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0, 86, 179, 0.08); overflow: hidden; }
.detail-video { width: 100%; max-height: 450px; background: #000; border-radius: 6px; }

/* Swiper 样式定制 */
.swiper-img-container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #fafafa; }
.swiper-img-container img { max-width: 100%; max-height: 450px; object-fit: contain; }
.swiper-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; padding: 20px 10px 10px; text-align: center; }

/* 3. 自定义左右按钮样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #0056b3; /* 改为你的主题色 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 16px; /* 缩小箭头 */
  font-weight: bold;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: #0056b3;
  color: #fff;
}

/* 指示点颜色 */
:deep(.swiper-pagination-bullet-active) {
  background: #0056b3;
}

.click-tip { text-align: center; font-size: 0.85rem; color: #aaa; margin: 10px 0; transition: 0.3s; }
.show-details + .click-tip { opacity: 0; height: 0; margin: 0; overflow: hidden; }

@media (max-width: 768px) {
  .pub-body { flex-direction: column; }
  .publication-image { max-width: 100%; flex: none; }
  .publication-content { padding: 1rem 0; }
  :deep(.swiper-button-next), :deep(.swiper-button-prev) { display: none; } /* 移动端隐藏按钮，靠滑动 */
}
</style>