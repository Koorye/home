<template>
  <section id="news" class="section">
    <h2>{{ t('news.title') }}</h2>

    <!-- 媒体报道 - 紧凑小卡片 -->
    <div class="media-section" v-if="mediaReports.length">
      <div class="section-subtitle">{{ t('news.reportTitle') }}</div>
      <div class="media-grid">
        <a
          v-for="(item, index) in mediaReports"
          :key="index"
          class="media-card"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="item.icon" alt="Media Icon" class="media-icon">
          <div class="media-text">
            <div class="media-title">{{ item.title }}</div>
            <div class="media-desc">{{ item.desc }}</div>
          </div>
        </a>
      </div>
    </div>

    <!-- 原有的时间线 -->
    <div class="news-timeline">
      <div v-for="(item, index) in newsList" :key="index" class="news-item">
        <div class="news-date">{{ item.date }}</div>
        <div class="news-content">
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

const { t } = useI18n();
const newsList = useLocaleData('news', 'data');
const mediaReports = useLocaleData('news', 'reports');
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
  padding-bottom: 0.5rem;
}

/* ====================================
   紧凑小卡片布局（不占空间）
==================================== */
.media-section {
  margin-bottom: 1.5rem;
}

.media-section .section-subtitle {
  font-size: 1rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.8rem;
}

.media-card {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #0056b3;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.media-card:hover {
  transform: translateY(-2px);
  background: #eef5ff;
}

/* 更小的图标 */
.media-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
}

/* 文字更紧凑 */
.media-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.media-title {
  font-weight: 600;
  color: #222;
  margin-bottom: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-desc {
  color: #666;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ====================================
   原有时间线样式
==================================== */
.news-timeline {
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  position: relative;
}

.news-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #dddddd;
}

.news-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.8rem 0;
}

.news-date {
  min-width: 80px;
  font-weight: 600;
  color: #0056b3;
  font-size: 0.9rem;
  white-space: nowrap;
  margin-top: 0.4rem;
  margin-left: 1rem;
}

.news-content {
  flex: 1;
  background-color: #f8f9fa;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  border-left: 3px solid #a0c1d9;
}

.news-content p {
  margin: 0;
  line-height: 1.5;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .news-timeline {
    padding-left: 0;
  }
  .news-timeline::before {
    display: none;
  }
  .news-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  .news-date {
    min-width: unset;
    color: #e74c3c;
  }
  .news-content {
    padding: 0.6rem 1rem;
  }
}
</style>