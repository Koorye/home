<template>
  <section id="gallery" class="section">
    <h2>{{ t('gallery.title') }}</h2>

    <!-- 瀑布流容器 -->
    <div class="masonry-gallery">
      <div 
        v-for="(photo, index) in galleryPhotos" 
        :key="index" 
        class="masonry-item"
      >
        <img 
          :src="photo.image" 
          :alt="photo.title" 
          loading="lazy"
        >
        <div class="caption">
          <h3>{{ photo.title }}</h3>
          <p>{{ photo.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

// 🔥 已删除所有 Swiper 相关代码
const { t } = useI18n();
const galleryPhotos = useLocaleData('gallery', 'data');
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

/* ======================
   瀑布流核心样式
====================== */
.masonry-gallery {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /* 原生 CSS 瀑布流（自动多列、自适应） */
  column-count: 3;
  column-gap: 1.2rem;
}

.masonry-item {
  break-inside: avoid; /* 防止卡片被截断 */
  margin-bottom: 1.2rem;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.masonry-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.caption {
  padding: 1rem;
}

.caption h3 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  color: #222;
}

.caption p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

/* ======================
   响应式适配
====================== */
@media (max-width: 992px) {
  .masonry-gallery {
    column-count: 2;
  }
}

@media (max-width: 576px) {
  .masonry-gallery {
    column-count: 1;
  }
}
</style>