<!-- <template>
  <section id="publications" class="section">
    <h2>{{ t('publications.title') }}</h2>
    <div class="publication-list">
      <div 
        v-for="(pub, index) in publications" 
        :key="index" 
        class="publication-item"
        @click="togglePublication(index)"
      >
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
            <div v-if="pub.links" class="pub-links">
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
        <div class="pub-details" :class="{ 'show-details': expandedIndex === index }">
          <div class="detail-section">
            <h4>{{ t('publications.buttons.abstract') }}</h4>
            <p v-html="pub.abstract"></p>
          </div>
          <div class="detail-section">
            <h4>{{ t('publications.buttons.contributions') }}</h4>
            <ul>
              <li v-for="(contrib, i) in (pub.contributions)" :key="i">
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
import { ref, watch, onMounted } from 'vue';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

const { t } = useI18n();

const publications = useLocaleData('publications', 'data');

// GitHub Stars相关
const { starCounts, getRepoKey, fetchStarsForRepos, fetchStars } = useGitHubStars();

// 展开/收起控制
const expandedIndex = ref(-1);
const togglePublication = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
};

// 格式化链接文本
const formatLinkText = (key) => {
  return t(`publications.buttons.${key}`);
};

// 链接图标
const getIcon = (key) => {
  const iconMap = {
    project: '<i class="fas fa-globe"></i>',
    arxiv: '<i class="ai ai-arxiv"></i>',
    pdf: '<i class="fas fa-file-pdf"></i>',
    code: '<i class="fab fa-github"></i>'
  };
  return iconMap[key] || '';
};

// 监听publications变化，获取所有GitHub仓库的star数
watch(publications, (newPublications) => {
  if (newPublications && newPublications.length) {
    // 收集所有GitHub链接
    const githubUrls = [];
    newPublications.forEach(pub => {
      if (pub.links && pub.links.code) {
        githubUrls.push(pub.links.code);
      }
    });
    
    // 批量获取star数
    fetchStarsForRepos(githubUrls);
  }
}, { immediate: true });

// 也可以在点击时懒加载
const loadStarsOnClick = (link) => {
  const repoKey = getRepoKey(link);
  if (repoKey && !starCounts.value[repoKey]) {
    fetchStars(repoKey);
  }
};
</script>

<style scoped>
/* 原有样式保持不变 */
.section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eaeaea;
}

.section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #0056b3;
  padding-bottom: 0.5rem;
}

/* 出版物特有样式 */
.publication-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.publication-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  height: auto;
  cursor: pointer;
}

.publication-item:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 12px 20px rgba(0,0,0,0.15);
}

.pub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #eff4ff;
}

.pub-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #0056b3;
}

.pub-date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  background-color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #d1e7ff;
}

.pub-body {
  display: flex;
  flex: 1;
  padding-left: 10px;
}

.publication-image {
  flex: 0 0 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.publication-image img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.publication-item:hover .publication-image img {
  transform: scale(1.03);
}

.publication-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.publication-content p {
  margin: 0;
  line-height: 1.6;
}

.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  display: inline-block;
  background-color: #e1f0fa;
  color: #2980b9;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
}

.pub-links {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.pub-link-btn {
  padding: 4px 12px 4px 28px;
  position: relative;
  background-color: #e6f2ff;
  color: #0056b3;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #d1e7ff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.pub-link-btn:hover {
  background-color: #d1e7ff;
  transform: translateY(-2px);
}

.pub-link-btn .link-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1em;
}

/* Star 数样式增强 */
.star-count {
  color: #ff9800;
  font-weight: 600;
  font-size: 0.8em;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 20px;
}

.star-count .fa-spinner {
  color: #0056b3;
  font-size: 0.9em;
  animation: spin 1s linear infinite;
}

.star-count .fa-exclamation-circle {
  color: #e74c3c;
  font-size: 0.9em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 详情区域样式 */
.pub-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  padding: 0 1.5rem;
}

.pub-details.show-details {
  max-height: 1000px;
  opacity: 1;
  padding: 1.5rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  color: #0056b3;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.detail-section p {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #333;
}

.detail-section ul {
  padding-left: 1.8rem;
  margin: 0;
}

.detail-section li {
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
  color: #333;
}

.detail-section li:last-child {
  margin-bottom: 0;
}

.click-tip {
  font-size: 0.85rem;
  color: #888;
  text-align: center;
  margin-bottom: 0.5rem;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: 1;
  visibility: visible;
}

.publication-item .pub-details.show-details + .click-tip {
  opacity: 0;
  visibility: hidden;
  height: 0;
  margin-bottom: 0;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .pub-body {
    flex-direction: column;
  }
  
  .publication-image {
    flex: 0 0 200px;
  }
  
  .pub-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .pub-details.show-details {
    max-height: 2000px;
  }
}
</style> -->

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
            <div v-if="pub.links" class="pub-links">
              <a 
                v-for="(link, key) in pub.links" 
                :key="key" 
                :href="link" 
                target="_blank" 
                class="pub-link-btn"
                @click.stop
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
        <div class="pub-details" :class="{ 'show-details': expandedIndex === index }">
          
          <!-- ====================== -->
          <!-- 视频展示（美化版） -->
          <!-- ====================== -->
          <div v-if="pub.video" class="detail-media-section">
            <div class="detail-section">
              <h4>{{ t('publications.videoTitle') }}</h4>
            </div>
            <div class="video-wrapper">
              <video 
                class="detail-video"
                controls
                muted
                loop
                playsinline
                autoplay
                preload="metadata"
              >
                <source :src="pub.video" type="video/mp4" />
                您的浏览器不支持视频播放
              </video>
            </div>
          </div>

          <!-- ====================== -->
          <!-- Swiper 轮播（无箭头、美化版） -->
          <!-- ====================== -->
          <div v-if="pub.detailImages && pub.detailImages.length" class="detail-media-section">
            <div class="detail-section">
              <h4>{{ t('publications.swiperTitle') }}</h4>
            </div>
            <div class="swiper-wrapper">
              <swiper
                :modules="[Autoplay, Pagination]"
                :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: false }"
                :pagination="{ clickable: true }"
                :navigation="false"
                class="mySwiper"
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
import { ref, watch } from 'vue';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const { t } = useI18n();
const publications = useLocaleData('publications', 'data');
const { starCounts, getRepoKey, fetchStarsForRepos } = useGitHubStars();

const expandedIndex = ref(-1);
const togglePublication = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
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

watch(publications, (newPublications) => {
  if (!newPublications?.length) return;
  const githubUrls = [];
  newPublications.forEach(pub => pub.links?.code && githubUrls.push(pub.links.code));
  fetchStarsForRepos(githubUrls);
}, { immediate: true });
</script>

<style scoped>
/* 原有样式保持不变 */
.section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eaeaea;
}
.section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #0056b3;
  padding-bottom: 0.5rem;
}
.publication-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.publication-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  height: auto;
  cursor: pointer;
}
.publication-item:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 12px 20px rgba(0,0,0,0.15);
}
.pub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #eff4ff;
}
.pub-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #0056b3;
}
.pub-date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  background-color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #d1e7ff;
}
.pub-body {
  display: flex;
  flex: 1;
  padding-left: 10px;
}
.publication-image {
  flex: 0 0 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publication-image img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.publication-item:hover .publication-image img {
  transform: scale(1.03);
}
.publication-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.publication-content p {
  margin: 0;
  line-height: 1.6;
}
.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.keyword-tag {
  display: inline-block;
  background-color: #e1f0fa;
  color: #2980b9;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
}
.pub-links {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}
.pub-link-btn {
  padding: 4px 12px 4px 28px;
  position: relative;
  background-color: #e6f2ff;
  color: #0056b3;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #d1e7ff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.pub-link-btn:hover {
  background-color: #d1e7ff;
  transform: translateY(-2px);
}
.pub-link-btn .link-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1em;
}
.star-count {
  color: #ff9800;
  font-weight: 600;
  font-size: 0.8em;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 20px;
}
.star-count .fa-spinner {
  color: #0056b3;
  font-size: 0.9em;
  animation: spin 1s linear infinite;
}
.star-count .fa-exclamation-circle {
  color: #e74c3c;
  font-size: 0.9em;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.pub-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  padding: 0 1.5rem;
}
.pub-details.show-details {
  max-height: 3000px;
  opacity: 1;
  padding: 1.5rem;
}
.detail-section {
  margin-bottom: 1.5rem;
}
.detail-section:last-child {
  margin-bottom: 0;
}
.detail-section h4 {
  color: #0056b3;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
}
.detail-section p {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #333;
}
.detail-section ul {
  padding-left: 1.8rem;
  margin: 0;
}
.detail-section li {
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
  color: #333;
}
.detail-section li:last-child {
  margin-bottom: 0;
}
.click-tip {
  font-size: 0.85rem;
  color: #888;
  text-align: center;
  margin-bottom: 0.5rem;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: 1;
  visibility: visible;
}
.publication-item .pub-details.show-details + .click-tip {
  opacity: 0;
  visibility: hidden;
  height: 0;
  margin-bottom: 0;
}

/* ========================== */
/* ✅ 统一美化：视频 + 轮播 */
/* ========================== */
.detail-media-section {
  margin-bottom: 1.8rem;
}

.video-wrapper {
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 86, 179, 0.06);
  overflow: hidden;
}
.detail-video {
  width: 100%;
  display: block;
  max-height: 320px;
  object-fit: contain;
  border-radius: 8px;
}

.swiper-wrapper {
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 86, 179, 0.06);
  overflow: hidden;
}
.mySwiper {
  border-radius: 8px;
  overflow: hidden;
}
.swiper-img-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
}
.swiper-img-container img {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
  display: block;
}
.swiper-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 14px;
  background: linear-gradient(to top, rgba(0,0,0,0.35), transparent);
  color: #fff;
  border-radius: 0 0 8px 8px;
}
.caption-title {
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* 轮播指示器样式（柔和） */
:deep(.swiper-pagination-bullet) {
  background: rgba(0, 86, 179, 0.3);
  opacity: 1;
  width: 8px;
  height: 8px;
}
:deep(.swiper-pagination-bullet-active) {
  background: #0056b3;
}

/* 响应式 */
@media (max-width: 768px) {
  .pub-body {
    flex-direction: column;
  }
  .publication-image {
    flex: 0 0 200px;
  }
  .pub-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .swiper-img-container img,
  .detail-video {
    max-height: 240px;
  }
}
</style>