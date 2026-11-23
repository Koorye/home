<template>
  <section id="skills" class="section">
    <h2>{{ t('skills.title') }}</h2>
    <p class="section-lead">{{ t('skills.lead') }}</p>
    <div class="skills-container">
      <div
        v-for="(skillGroup, index) in skillGroups"
        :key="index"
        class="skill-category"
      >
        <h3>{{ skillGroup.category }}</h3>
        <p class="skill-list">
          <span
            v-for="(skill, skillIndex) in skillGroup.skills"
            :key="skillIndex"
            class="skill-name"
          >{{ skill }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useLocaleData } from '@/composables/useLocaleData';

const { t } = useI18n();
const skillGroups = useLocaleData('skills', 'data');
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
  margin-bottom: 0.55rem;
  color: var(--ink);
}

.section-lead {
  max-width: 70ch;
  margin: 0 0 1.6rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--ink-soft);
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 2.2rem;
}

.skill-category {
  min-width: 0;
  padding: 0.9rem 0 1rem;
  border-top: 1px solid var(--line);
}

.skill-category h3 {
  font-family: var(--ff-sans);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 0.5rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  row-gap: 0.1rem;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.85;
  color: var(--ink-body);
}

.skill-name {
  white-space: nowrap;
}

.skill-name:not(:last-child)::after {
  content: ',';
  margin-right: 0.35rem;
}

@media (max-width: 768px) {
  .section {
    margin-top: 1.7rem;
    padding-top: 1.7rem;
  }
  .section h2 {
    font-size: 1.35rem;
    margin-bottom: 0.45rem;
  }
  .section-lead {
    font-size: 0.86rem;
    margin-bottom: 1.2rem;
  }
  .skills-container {
    grid-template-columns: 1fr 1fr;
    gap: 0 1.5rem;
  }
  .skill-category {
    padding: 0.75rem 0 0.8rem;
  }
  .skill-category h3 {
    font-size: 0.84rem;
    margin-bottom: 0.35rem;
  }
  .skill-list {
    font-size: 0.86rem;
    line-height: 1.75;
  }
}

@media (max-width: 480px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
}
</style>
