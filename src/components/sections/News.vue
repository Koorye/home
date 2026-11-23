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
          <div class="media-content">
            <img :src="item.icon" alt="Media Icon" class="media-icon" loading="lazy" decoding="async">
            <div class="media-text">
              <div class="media-title">{{ item.title }}</div>
              <div class="media-desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="click-more">{{ t('news.clickMore') }}</div>
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

.media-section {
  margin-bottom: 2.2rem;
}

.media-section .section-subtitle {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0 0 1rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 2rem;
}

.media-card {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 0 0.7rem;
  background: none;
  border: 0;
  border-top: 1px solid var(--line);
  border-radius: 0;
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  transition: none;
  cursor: pointer;
}

.media-card:hover {
  transform: none;
  background: none;
}

.media-content {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  flex-shrink: 0;
}

.media-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.media-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.media-title {
  font-family: var(--ff-sans);
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
  margin-bottom: 0.15rem;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.media-card:hover .media-title {
  color: var(--accent);
}

.media-desc {
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.click-more {
  display: none;
}

.news-timeline {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  position: static;
}

.news-timeline::before {
  display: none;
}

.news-item {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: baseline;
  padding: 0.7rem 0;
  border-top: 1px solid var(--line);
}

.news-date {
  min-width: 0;
  margin: 0;
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ink-mute);
  white-space: nowrap;
}

.news-content {
  background: none;
  border: 0;
  border-radius: 0;
  padding: 0;
}

.news-content p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--ink-body);
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
  .media-section {
    margin-bottom: 1.7rem;
  }
  .media-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0 1rem;
  }
  .media-card {
    padding: 0.7rem 0 0.55rem;
  }
  .media-icon {
    width: 20px;
    height: 20px;
  }
  .media-title {
    font-size: 0.8rem;
  }
  .media-desc {
    font-size: 0.78rem;
  }
  .news-item {
    grid-template-columns: 1fr;
    gap: 0.15rem;
    padding: 0.55rem 0;
  }
  .news-date {
    font-size: 0.68rem;
  }
  .news-content p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .media-grid {
    grid-template-columns: 1fr;
  }
}
</style>
