<template>
  <header class="mobile-header">
    <button class="hamburger" @click="toggleNav" :aria-label="isNavOpen ? 'Close menu' : 'Open menu'">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <img class="mobile-avatar" src="../../assets/profile.png" alt="Profile Picture" />
    <div class="mobile-info">
      <span class="mobile-name" v-html="t('sections.name')"></span>
      <a class="mobile-email" href="mailto:shihan.wu.koorye@outlook.com">shihan.wu.koorye@outlook.com</a>
    </div>
    <button
      class="mobile-theme-toggle"
      type="button"
      @click="toggleTheme"
      :title="isDark ? t('sections.theme.light') : t('sections.theme.dark')"
      :aria-label="isDark ? t('sections.theme.light') : t('sections.theme.dark')"
      :aria-pressed="isDark"
    >
      <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'" aria-hidden="true"></i>
    </button>
  </header>

  <div class="drawer-backdrop" :class="{ visible: isNavOpen }" @click="isNavOpen = false"></div>

  <aside class="sidebar" :class="{ 'nav-open': isNavOpen }">
    <div class="profile-section">
      <img class="avatar" src="../../assets/profile.png" alt="Profile Picture" />
      <h1 class="name" v-html="t('sections.name')"></h1>
      <div class="location">
        <a href="mailto:shihan.wu.koorye@outlook.com">shihan.wu.koorye@outlook.com</a>
      </div>
    </div>

    <div class="toc-head">
      <p class="nav-label">{{ t('sections.contents') }}</p>
      <button
        class="theme-toggle"
        type="button"
        @click="toggleTheme"
        :title="isDark ? t('sections.theme.light') : t('sections.theme.dark')"
        :aria-label="isDark ? t('sections.theme.light') : t('sections.theme.dark')"
        :aria-pressed="isDark"
      >
        <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'" aria-hidden="true"></i>
      </button>
    </div>

    <nav class="navigation">
      <ul>
        <li
          v-for="section in sections"
          :key="section.id"
          :data-section="section.id"
          role="link"
          tabindex="0"
          @click="handleNavClick(section.id)"
          @keydown.enter.prevent="handleNavClick(section.id)"
          @keydown.space.prevent="handleNavClick(section.id)"
        >
          {{ section.title }}
        </li>
      </ul>
    </nav>

    <div class="contact-info">
      <p class="contact-title">{{ t('sections.contact.find') }}</p>
      <div class="contact-links">
        <a href="https://github.com/Koorye" target="_blank" rel="noopener noreferrer" class="contact-link" title="GitHub">
          <img src="../../assets/icons/github.svg" alt="GitHub" class="contact-icon contact-icon--github" />
          <span class="contact-text">{{ t('sections.contact.github') }}</span>
        </a>
        <a href="https://koorye.github.io/blog" target="_blank" rel="noopener noreferrer" class="contact-link" title="Blog">
          <img src="../../assets/icons/blog.svg" alt="Blog" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.blog') }}</span>
        </a>
        <a href="https://scholar.google.com/citations?user=7VCaV5EAAAAJ&hl=zh-CN" target="_blank" rel="noopener noreferrer" class="contact-link" title="Google Scholar">
          <img src="../../assets/icons/google-scholar.svg" alt="Google Scholar" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.gs') }}</span>
        </a>
        <a href="https://dblp.org/pid/132/9517-1" target="_blank" rel="noopener noreferrer" class="contact-link" title="DBLP">
          <img src="../../assets/icons/dblp.svg" alt="DBLP" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.dblp') }}</span>
        </a>
        <a href="https://www.linkedin.com/in/shihan-wu-koorye/" target="_blank" rel="noopener noreferrer" class="contact-link" title="LinkedIn">
          <img src="../../assets/icons/linkedin.svg" alt="LinkedIn" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.linkedin') }}</span>
        </a>
        <a href="resume-en.pdf" target="_blank" rel="noopener noreferrer" class="contact-link" title="CV">
          <img src="../../assets/icons/resume.svg" alt="CV" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.cv') }}</span>
        </a>
        <a href="resume-zh_CN.pdf" target="_blank" rel="noopener noreferrer" class="contact-link" title="简历">
          <img src="../../assets/icons/resume.svg" alt="简历" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.resume') }}</span>
        </a>
      </div>

      <div class="sidebar-actions">
        <div class="language-toggle">
          <button
            class="toggle-btn"
            :class="{ active: locale === 'en' }"
            @click="switchLanguage('en')"
          >
            EN
          </button>
          <div class="toggle-slider" :style="{ transform: `translateX(${locale === 'zh' ? '100%' : '0'})` }"></div>
          <button
            class="toggle-btn"
            :class="{ active: locale === 'zh' }"
            @click="switchLanguage('zh')"
          >
            中文
          </button>
        </div>
      </div>

      <p class="contact-desc">{{ t('sections.copyright') }}</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useI18n } from 'vue-i18n'
import { useLocaleData } from '@/composables/useLocaleData'

const { t, locale } = useI18n({ useScope: 'global' })

const sections = useLocaleData('sections', 'nav')

const { scrollToSection, initScrollListener, cleanupScrollListener } = useScroll(sections.value)

const isNavOpen = ref(false)

const theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const isDark = computed(() => theme.value === 'dark')

const applyTheme = (value) => {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
  localStorage.setItem('preferred-theme', value)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', value === 'dark' ? '#0b131b' : '#ffffff')
}

const toggleTheme = () => applyTheme(isDark.value ? 'light' : 'dark')

onMounted(async () => {
  await nextTick()
  initScrollListener()
})

onUnmounted(() => {
  cleanupScrollListener()
})

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const handleNavClick = (id) => {
  scrollToSection(id)
  isNavOpen.value = false
}

const switchLanguage = (lang) => {
  locale.value = lang
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  document.title = lang === 'zh'
    ? '吴世涵 | 北京智源人工智能研究院 具身智能研究员'
    : 'Shihan Wu | Embodied Intelligence Researcher at BAAI'
  localStorage.setItem('preferred-language', lang)
}

const savedLang = localStorage.getItem('preferred-language')
if (savedLang === 'zh' || savedLang === 'en') {
  switchLanguage(savedLang)
}
</script>

<style scoped>
/* ========== Desktop Sidebar ========== */
.sidebar {
  width: var(--toc-w);
  background-color: var(--paper);
  border-right: 0;
  padding: 2rem 1.5rem 1.5rem;
  position: fixed;
  top: 0;
  left: var(--page-gutter);
  height: 100vh;
  overflow-y: auto;
  box-shadow: none;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-header {
  display: none;
}

.drawer-backdrop {
  display: none;
}

.profile-section {
  text-align: left;
}

.avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background-color: var(--surface);
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

.name {
  font-family: var(--ff-display);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-bottom: 0.3rem;
  color: var(--ink);
}

.location {
  font-size: 0.7rem;
  color: var(--ink-mute);
  margin-bottom: 1.6rem;
}

.location a {
  color: var(--ink-mute);
  text-decoration: none;
}

.location a:hover {
  text-decoration: underline;
}

.toc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.55rem;
}

.nav-label {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  font-weight: 500;
  margin: 0;
}

.navigation {
  flex: 1;
  border-top: 1px solid var(--line);
  padding-top: 0.9rem;
}

.navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  padding: 0.3rem 0;
  cursor: pointer;
  border-radius: 0;
  transition: color 0.2s ease;
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.005em;
  color: var(--ink-soft);
  text-align: left;
}

.navigation li:hover {
  background-color: transparent;
  color: var(--ink);
}

.navigation li.active {
  background-color: transparent;
  color: var(--accent);
}

.contact-info {
  text-align: left;
  padding: 1.15rem 0 0;
  border-top: 1px solid var(--line);
}

.contact-title {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: 0.55rem;
  font-weight: 500;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.9rem;
  padding: 0;
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.45rem;
  text-decoration: none;
  color: var(--ink-soft);
  background-color: transparent;
  padding: 0.18rem 0;
  border-radius: 0;
  transition: color 0.2s ease;
}

.contact-link:hover {
  background-color: transparent;
  color: var(--ink);
  transform: none;
  box-shadow: none;
  text-decoration: none;
}

.contact-icon {
  width: 15px;
  height: 15px;
  display: inline-block;
  opacity: 0.95;
}

.contact-link:hover .contact-icon {
  opacity: 1;
}

.contact-text {
  font-size: 0.82rem;
  font-weight: 400;
}

.contact-desc {
  font-size: 0.64rem;
  line-height: 1.5;
  color: var(--ink-mute);
  margin-top: 0.6rem;
  white-space: nowrap;
}

.language-toggle {
  position: relative;
  display: inline-flex;
  gap: 0.9rem;
  border-radius: 0;
  background-color: transparent;
  overflow: visible;
  margin: 0;
  box-shadow: none;
}

.sidebar-actions {
  display: flex;
  align-items: center;
  margin: 0.2rem 0 0.8rem;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--ink-soft);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.theme-toggle i {
  font-size: 0.68rem;
}

.toggle-btn {
  padding: 0 0 2px;
  border: none;
  border-bottom: 1px solid transparent;
  background: transparent;
  color: var(--ink-mute);
  cursor: pointer;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  z-index: 2;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.toggle-btn.active {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

.toggle-slider {
  display: none;
}

/* ========== Mobile ========== */
@media (max-width: 768px) {
  .mobile-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.4rem 0.9rem;
    background-color: var(--paper);
    border-bottom: 1px solid var(--line);
    box-shadow: none;
    z-index: 120;
    height: 52px;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }

  .hamburger-line {
    display: block;
    width: 18px;
    height: 2px;
    background-color: var(--ink);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .nav-open .hamburger .hamburger-line:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
  }

  .nav-open .hamburger .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .nav-open .hamburger .hamburger-line:nth-child(3) {
    transform: translateY(-5px) rotate(-45deg);
  }

  .mobile-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .mobile-info {
    min-width: 0;
    line-height: 1.2;
  }

  .mobile-theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    margin-left: auto;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 50%;
    background: none;
    color: var(--ink-soft);
    cursor: pointer;
  }

  .mobile-theme-toggle:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  .mobile-theme-toggle i {
    font-size: 0.72rem;
  }

  .mobile-name {
    font-family: var(--ff-display);
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--ink);
    display: block;
  }

  .mobile-email {
    font-size: 0.76rem;
    color: var(--ink-mute);
    text-decoration: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .drawer-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 105;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .drawer-backdrop.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    z-index: 110;
    transform: translateX(-100%);
    padding: 0.8rem 0.8rem;
    padding-top: 50px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar.nav-open {
    transform: translateX(0);
  }

  .profile-section {
    display: none;
  }

  .navigation li {
    font-size: 1rem;
    padding: 0.45rem 0;
  }

  .contact-info {
    padding: 0.6rem 0;
  }

  .contact-title {
    font-size: 0.88rem;
    margin-bottom: 0.35rem;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    margin-bottom: 0.5rem;
    padding: 0;
  }

  .contact-link {
    padding: 0;
    border-radius: 0;
    gap: 0.35rem;
  }

  .contact-icon {
    width: 14px;
    height: 14px;
  }

  .contact-text {
    font-size: 0.8rem;
  }

  .contact-desc {
    font-size: 0.7rem;
    margin-top: 0.4rem;
  }

  .toggle-btn {
    padding: 0 0 2px;
    font-size: 0.74rem;
  }

  .sidebar-actions {
    margin: 0.2rem 0 0.6rem;
  }
}
</style>
