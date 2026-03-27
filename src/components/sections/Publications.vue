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
        <!-- 1. 顶部预览区域：点击切换展开/收起 -->
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
            
            <!-- 链接按钮：@click.stop 阻止折叠 -->
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

        <!-- 2. 详情区域：@click.stop 确保点击内部任何地方都不会关闭 -->
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
                :modules="[Autoplay, Pagination]"
                :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: true }"
                :pagination="{ clickable: true }"
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

// Swiper 相关
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const { t } = useI18n();
const publications = useLocaleData('publications', 'data');
const { starCounts, getRepoKey, fetchStarsForRepos } = useGitHubStars();

const expandedIndex = ref(-1);
const videoRefs = ref([]);
const swiperInstances = reactive({}); // 存储每个列表项的 Swiper 实例

// 捕获 Swiper 实例
const onSwiperInit = (index, swiper) => {
  swiperInstances[index] = swiper;
};

const togglePublication = async (index) => {
  const wasExpanded = expandedIndex.value === index;

  if (wasExpanded) {
    expandedIndex.value = -1;
    return;
  }

  expandedIndex.value = index;

  // 等待 DOM 完成渲染展开动画和 v-if 逻辑
  await nextTick();

  // 1. 重置并播放视频
  const video = videoRefs.value[index];
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  // 2. 强制轮播图回到第一张 (slideToLoop 是循环模式下最稳妥的方法)
  const swiper = swiperInstances[index];
  if (swiper) {
    swiper.slideToLoop(0, 0); // (索引0, 速度0ms即瞬间跳转)
    if (swiper.autoplay && swiper.autoplay.running) {
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
  cursor: pointer;
}
.publication-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.12);
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
  background: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}
.pub-body {
  display: flex;
  padding: 1rem;
}
.publication-image {
  flex: 0 0 300px;
  max-width: 300px;
}
.publication-image img {
  width: 100%;
  border-radius: 4px;
}
.publication-content {
  flex: 1;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.keyword-tag {
  background-color: #e1f0fa;
  color: #2980b9;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}
.pub-links {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
.pub-link-btn {
  text-decoration: none;
  font-size: 0.85rem;
  padding: 4px 10px;
  background: #fff;
  border: 1px solid #d1e7ff;
  border-radius: 4px;
  color: #0056b3;
  transition: 0.2s;
}
.pub-link-btn:hover {
  background: #0056b3;
  color: #fff;
}
.pub-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease-out;
  padding: 0 1.5rem;
  cursor: default; /* 详情内部鼠标设为默认，提示此处非整体点击收起区 */
}
.pub-details.show-details {
  max-height: 4000px;
  opacity: 1;
  padding-bottom: 2rem;
}
.detail-media-section {
  margin: 1.5rem 0;
}
.video-wrapper, .swiper-wrapper {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.detail-video, .swiper-img-container img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 4px;
}
.swiper-caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 8px;
  text-align: center;
}
.click-tip {
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  padding-bottom: 1rem;
}
.show-details + .click-tip {
  display: none;
}
@media (max-width: 768px) {
  .pub-body { flex-direction: column; }
  .publication-image { max-width: 100%; flex: none; }
}
</style>