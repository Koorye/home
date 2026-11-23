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
          decoding="async"
        >
        <div class="caption">
          <h3>{{ photo.title }}</h3>
          
          <!-- 详情描述 -->
          <p class="desc" v-if="photo.description">{{ photo.description }}</p>

          <!-- 时间 + 位置 一行优雅展示 -->
          <div class="meta" v-if="photo.time || photo.location">
            <span class="time" v-if="photo.time">{{ photo.time }}</span>
            <span class="meta-sep" v-if="photo.time && photo.location">·</span>
            <span class="location" v-if="photo.location">{{ photo.location }}</span>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

const { t } = useI18n();
const galleryPhotos = useLocaleData('gallery', 'data');
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

.masonry-gallery {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  column-count: 5;
  column-gap: 1.2rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.7rem;
  background: none;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  transition: none;
  cursor: pointer;
}

.masonry-item:hover {
  transform: none;
  box-shadow: none;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 2px;
  transition: opacity 0.25s ease;
}

.masonry-item:hover img {
  opacity: 0.9;
}

.caption {
  padding: 0.65rem 0 0;
}

.caption h3 {
  margin: 0 0 0.2rem;
  font-family: var(--ff-sans);
  font-size: 0.88rem;
  color: var(--ink);
  font-weight: 600;
  line-height: 1.45;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-family: var(--ff-mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.time,
.location {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.meta-sep {
  color: var(--line-strong);
}

.desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ink-soft);
  line-height: 1.55;
}

@media (max-width: 1200px) {
  .masonry-gallery {
    column-count: 4;
  }
}

@media (max-width: 992px) {
  .masonry-gallery {
    column-count: 3;
  }
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
  .masonry-gallery {
    column-count: 2;
    column-gap: 1rem;
    max-width: 100%;
  }
  .masonry-item {
    margin-bottom: 1.1rem;
  }
  .caption {
    padding: 0.5rem 0 0;
  }
  .caption h3 {
    font-size: 0.82rem;
  }
  .desc {
    font-size: 0.78rem;
    line-height: 1.45;
  }
  .meta {
    font-size: 0.66rem;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
}

@media (max-width: 480px) {
  .masonry-gallery {
    column-gap: 0.75rem;
  }
  .masonry-item {
    margin-bottom: 0.9rem;
  }
  .caption {
    padding: 0.4rem 0 0;
  }
  .caption h3 {
    font-size: 0.78rem;
  }
  .desc {
    font-size: 0.72rem;
  }
}
</style>
