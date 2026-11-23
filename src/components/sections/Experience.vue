<template>
  <section id="experience" class="section">
    <h2>{{ t('experience.title') }}</h2>
    <div class="timeline">
      <div 
        v-for="(exp, index) in experiences" 
        :key="index" 
        class="timeline-item"
      >
        <div class="timeline-marker">
          <img :src="exp.logo" :alt="exp.organization" class="logo" loading="lazy" decoding="async" />
          <div class="timeline-line" v-if="index < experiences.length - 1"></div>
        </div>
        <div class="timeline-content">
          <h3>{{ exp.title }} - <a v-if="exp.link" :href="exp.link" target="_blank" class="highlight-link">{{ exp.organization }}</a><span v-else>{{ exp.organization }}</span> <span class="timeline-date">{{ exp.date }}</span></h3>
          <p>{{ exp.description }}</p>
          <div v-if="exp.details" class="exp-details">
            <div v-for="(detail, detailIndex) in exp.details" :key="detailIndex" class="p-close">
              <span v-if="detail.label" class="highlight-red">{{ detail.label }}:</span> {{ detail.text }}
            </div>
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
const experiences = useLocaleData('experience', 'data');
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

.timeline {
  position: static;
  padding-left: 0;
}

.timeline::before {
  display: none;
}

.timeline-item {
  display: flex;
  gap: 1.25rem;
  margin: 0;
  padding: 1.15rem 0;
  border-top: 1px solid var(--line);
  position: static;
}

.timeline-marker {
  display: block;
  margin: 0;
  flex-shrink: 0;
  position: static;
  z-index: auto;
}

.logo {
  width: 64px;
  padding: 0;
  border-radius: 0;
}

.timeline-line {
  display: none;
}

.timeline-content {
  flex: 1;
  padding: 0;
}

.timeline-content h3 {
  font-family: var(--ff-sans);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--ink);
}

.timeline-content h3 .highlight-link {
  color: var(--ink);
  font-weight: 600;
}

.timeline-content h3 .highlight-link:hover {
  color: var(--accent);
}

.timeline-date {
  color: var(--ink-mute);
  font-family: var(--ff-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-left: 0.35rem;
}

.timeline-content p {
  font-size: 0.84rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0.25rem 0 0;
}

.exp-details {
  margin-top: 0.35rem;
}

.p-close {
  margin-bottom: 0.15rem;
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--ink-soft);
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
  .timeline-item {
    gap: 0.9rem;
    padding: 0.85rem 0;
  }
  .logo {
    width: 44px;
  }
  .timeline-content h3 {
    font-size: 0.86rem;
    line-height: 1.45;
  }
  .timeline-date {
    display: block;
    margin-left: 0;
    font-size: 0.68rem;
  }
  .timeline-content p {
    font-size: 0.8rem;
  }
  .p-close {
    font-size: 0.76rem;
  }
}
</style>
