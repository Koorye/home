<template>
  <section id="awards" class="section">
    <h2>{{ $t('awards.title') }}</h2>
    <div class="awards-grid">
      <div 
        v-for="(award, index) in awardsList" 
        :key="index" 
        class="award-item"
      >
        <div class="award-icon">{{ award.icon }}</div>
        <div class="award-content">
          <h3>{{ award.title }}</h3>
          <p>{{ award.issuer }} - {{ award.year }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useLocaleData } from '@/composables/useLocaleData'

const awardsList = useLocaleData('awards', 'data')
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

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0 2rem;
}

.award-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  background: none;
  padding: 0.9rem 0;
  border-top: 1px solid var(--line);
  border-left: 0;
  border-radius: 0;
  transition: none;
}

.award-item:hover {
  transform: none;
  box-shadow: none;
}

.award-icon {
  display: none;
}

.award-content h3 {
  font-family: var(--ff-sans);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--ink);
  margin-bottom: 0.15rem;
}

.award-content p {
  color: var(--ink-mute);
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0;
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
  .awards-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .award-item {
    padding: 0.7rem 0;
  }
  .award-content h3 {
    font-size: 0.85rem;
  }
  .award-content p {
    font-size: 0.74rem;
  }
}
</style>
