<template>
  <div class="home-container">
    <Sidebar />
    
    <main class="content">
      <div class="content-wrapper">
        <div class="banner-container">
          <img src="../assets/banner.jpg" alt="Banner" class="banner" />
        </div>
        <p class="banner-caption" v-html="t('home.banner')"></p>
        <Introduction />
        <News />
        <Experience />
        <Publications />
        <Awards />
        <Skills />
        <Gallery />
      </div>
      <div class="map-wrapper">
        <h3 class="highlight-blue">{{ t('home.map') }}</h3>
        <div class="map-container" ref="mapContainer"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// 导入组件
import Sidebar from '@/components/layout/Sidebar.vue';
import Introduction from '@/components/sections/Introduction.vue';
import Experience from '@/components/sections/Experience.vue';
import News from '@/components/sections/News.vue';
import Publications from '@/components/sections/Publications.vue';
import Awards from '@/components/sections/Awards.vue';
import Skills from '@/components/sections/Skills.vue';
import Gallery from '@/components/sections/Gallery.vue';

// 导入组合式函数
const { t } = useI18n();

const mapContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // 检查脚本是否已经存在
  if (document.getElementById('mapmyvisitors')) {
    return;
  }
  
  // 创建脚本元素
  scriptElement = document.createElement('script');
  scriptElement.id = 'mapmyvisitors';
  scriptElement.type = 'text/javascript';
  scriptElement.src = '//mapmyvisitors.com/map.js?cl=2c37b1&w=a&t=n&d=ls-3Plf1605cuP3jr7En9809TySixy9TuZAJlI_DmFg&co=ffffff&cmo=3acc3a&cmn=ff5353&ct=808080';
  
  // 添加到容器或body中
  if (mapContainer.value) {
    mapContainer.value.appendChild(scriptElement);
  } else {
    document.body.appendChild(scriptElement);
  }
});

onUnmounted(() => {
  // 组件卸载时清理脚本，防止内存泄漏
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
  
  // 也可以清理生成的地图元素
  const mapElement = document.querySelector('.mapmyvisitors-map');
  if (mapElement && mapElement.parentNode) {
    mapElement.parentNode.removeChild(mapElement);
  }
});
</script>

<style scoped>
/* 全局布局样式 */
.home-container {
  display: flex;
  min-height: 100vh;
  font-family: var(--ff-sans);
  background-color: var(--paper);
}

.content {
  flex: 1;
  margin-left: calc(var(--page-gutter) + var(--toc-offset));
  overflow-y: auto;
  height: 100vh;
  background-color: var(--paper);
}

/* Banner 样式：与正文同宽，悬停展开 */
.banner-container {
  position: relative;
  width: 100%;
  max-height: 280px;
  overflow: hidden;
  cursor: pointer;
  transition: max-height 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}

.banner {
  width: 100%;
  height: auto;
  display: block;
}

.banner-container::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 72px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--paper));
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.banner-container:hover {
  max-height: 1400px;
}

.banner-container:hover::after {
  opacity: 0;
}

.banner-caption {
  text-align: center;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
  color: var(--ink-mute);
  padding: 0.7rem 0 0;
  margin: 0 0 1.2rem;
}

.content-wrapper {
  padding: 0 0 4rem;
  max-width: var(--article-w);
  margin: 0;
}

.highlight-blue-bold {
  color: inherit;
  font-weight: 500;
}

.map-wrapper {
  text-align: center;
  max-width: var(--article-w);
  margin: 0;
  padding: 2.4rem 0 3rem;
  border-top: 1px solid var(--line);
}

.map-container {
  display: flex;
  justify-content: center;
  border-radius: 0;
  max-width: 600px;
  margin: 1rem auto 0;
  opacity: 0.9;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
    overflow: auto;
  }
  
  .content {
    margin-left: 0;
    height: auto;
    overflow-y: visible;
    padding-top: 52px;
  }
  
  .content-wrapper {
    max-width: none;
    padding: 0 1.15rem 3rem;
  }

  .content-wrapper :deep(.section) {
    margin-top: 1.7rem;
    padding-top: 1.7rem;
  }

  .content-wrapper :deep(.section h2) {
    font-size: 1.35rem;
    margin-bottom: 1rem;
  }
  
  .content-header h1 {
    font-size: 2rem;
    margin-top: 0;
  }
  
  /* Banner 移动端适配 */
  .banner-container {
    max-height: none;
  }
  .banner-container::after {
    display: none;
  }
  .banner-caption {
    font-size: 0.74rem;
    padding: 0.55rem 0 0;
    margin-bottom: 1rem;
  }
  .map-wrapper {
    max-width: none;
    padding: 2rem 1.15rem;
  }
}

@media (min-width: 1200px) {
  .content-wrapper {
    padding-bottom: 4.5rem;
  }
}

/* 滚动条样式优化 */
.content::-webkit-scrollbar {
  width: 6px;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: var(--line-strong);
  border-radius: 3px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: var(--ink-mute);
}
</style>