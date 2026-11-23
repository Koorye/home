<template>
  <div id="introduction">
    <header class="content-header">
      <h1 v-html="$t('introduction.name')"></h1>
      <a href="mailto:shihan.wu.koorye@outlook.com" class="highlight-link">
        shihan.wu.koorye@outlook.com
      </a>
    </header>
    <section class="section">
      <template v-for="(paragraph, index) in introductionData" :key="index">
        <p v-html="paragraph"></p>
        <div v-if="index === 0" class="research-block">
          <p class="research-lead" v-html="$t('introduction.researchLead')"></p>
          <ul class="research-list">
            <li v-for="(item, itemIndex) in researchData" :key="itemIndex" v-html="item"></li>
          </ul>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>
import { useLocaleData } from '@/composables/useLocaleData';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true,
});

const introductionData = useLocaleData('introduction', 'data');
const researchData = useLocaleData('introduction', 'research');
</script>

<style scoped>
.content-header {
  margin-bottom: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
}

.content-header h1 {
  font-family: var(--ff-display);
  font-size: 2.6rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: 0.45rem;
  color: var(--ink);
}

.content-header .highlight-link {
  font-size: 0.86rem;
  color: var(--ink-mute);
  font-weight: 400;
}

.content-header .highlight-link:hover {
  color: var(--accent);
}

.section {
  margin-top: 1.6rem;
  padding-top: 0.4rem;
}

.section h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.1rem;
  color: var(--ink);
}

.section p {
  font-size: 1rem;
  line-height: 1.72;
  color: var(--ink-body);
  max-width: none;
}

.research-block {
  margin: 1.15rem 0 1.45rem;
}

.research-lead {
  margin-bottom: 0.55rem;
  color: var(--ink);
}

.research-list {
  display: grid;
  gap: 0.42rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.research-list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 1rem;
  line-height: 1.68;
  color: var(--ink-body);
}

.research-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 768px) {
  .content-header {
    padding-bottom: 1rem;
  }

  .content-header h1 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0.3rem;
  }

  .section {
    margin-top: 1.2rem;
  }

  .section p,
  .research-list li {
    font-size: 0.96rem;
    line-height: 1.65;
  }

  .research-block {
    margin: 1rem 0 1.2rem;
  }
}
</style>