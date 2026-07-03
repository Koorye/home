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

    <nav class="navigation">
      <ul>
        <li
          v-for="section in sections"
          :key="section.id"
          @click="handleNavClick(section.id)"
        >
          {{ section.title }}
        </li>
      </ul>
    </nav>

    <div class="contact-info">
      <p class="contact-title">{{ t('sections.contact.find') }}</p>
      <div class="contact-links">
        <a href="https://github.com/Koorye" target="_blank" class="contact-link" title="GitHub">
          <img src="../../assets/icons/github.svg" alt="GitHub" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.github') }}</span>
        </a>
        <a href="https://koorye.github.io/blog" target="_blank" class="contact-link" title="Blog">
          <img src="../../assets/icons/blog.svg" alt="Blog" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.blog') }}</span>
        </a>
        <a href="https://scholar.google.com/citations?user=7VCaV5EAAAAJ&hl=zh-CN" target="_blank" class="contact-link" title="Google Scholar">
          <img src="../../assets/icons/google-scholar.svg" alt="Google Scholar" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.gs') }}</span>
        </a>
        <a href="https://dblp.org/pid/132/9517-1" target="_blank" class="contact-link" title="DBLP">
          <img src="../../assets/icons/dblp.svg" alt="DBLP" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.dblp') }}</span>
        </a>
        <a href="https://www.linkedin.com/in/shihan-wu-koorye/" target="_blank" class="contact-link" title="LinkedIn">
          <img src="../../assets/icons/linkedin.svg" alt="LinkedIn" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.linkedin') }}</span>
        </a>
        <a href="resume-en.pdf" target="_blank" class="contact-link" title="CV">
          <img src="../../assets/icons/resume.svg" alt="CV" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.cv') }}</span>
        </a>
        <a href="resume-zh_CN.pdf" target="_blank" class="contact-link" title="简历">
          <img src="../../assets/icons/resume.svg" alt="简历" class="contact-icon" />
          <span class="contact-text">{{ t('sections.contact.resume') }}</span>
        </a>
      </div>

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

      <p class="contact-desc">{{ t('sections.copyright') }}</p>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useI18n } from 'vue-i18n'
import { useLocaleData } from '@/composables/useLocaleData'

const { t, locale } = useI18n({ useScope: 'global' })

const sections = useLocaleData('sections', 'nav')

const { scrollToSection } = useScroll(sections)

const isNavOpen = ref(false)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const handleNavClick = (id) => {
  scrollToSection(id)
  isNavOpen.value = false
}

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('preferred-language', lang)
}

const savedLang = localStorage.getItem('preferred-language')
if (savedLang) {
  locale.value = savedLang
}
</script>

<style scoped>
/* ========== Desktop Sidebar ========== */
.sidebar {
  width: 280px;
  background-color: #e6f2ff;
  padding: 2rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
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
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #a0c1d9;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

.name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.location {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.location a {
  color: #555;
  text-decoration: none;
}

.location a:hover {
  text-decoration: underline;
}

.navigation {
  flex: 1;
}

.navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  padding: 0.3rem 0;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: center;
}

.navigation li:hover {
  background-color: #c2d9f0;
}

.navigation li.active {
  background-color: #a0c1d9;
  color: white;
}

.contact-info {
  text-align: center;
  padding: 1rem 0;
}

.contact-title {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.contact-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  padding: 0 0.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  background-color: #f0f7ff;
  padding: 0.6rem 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background-color: #d1e7ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  width: 22px;
  height: 22px;
  display: inline-block;
}

.contact-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.contact-desc {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
}

.language-toggle {
  position: relative;
  display: inline-flex;
  border-radius: 20px;
  background-color: #d1e7ff;
  overflow: hidden;
  margin: 12px 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toggle-btn {
  padding: 8px 20px;
  border: none;
  background: transparent;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  transition: color 0.3s ease;
}

.toggle-btn.active {
  color: white;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background-color: #4a89dc;
  border-radius: 20px;
  transition: transform 0.3s ease;
  z-index: 1;
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
    padding: 0.4rem 0.8rem;
    background-color: #e6f2ff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 120;
    height: 48px;
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
    background-color: #333;
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

  .mobile-name {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    display: block;
  }

  .mobile-email {
    font-size: 0.82rem;
    color: #555;
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
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem;
    margin-bottom: 0.4rem;
    padding: 0;
  }

  .contact-link {
    padding: 0.35rem 0.5rem;
    border-radius: 6px;
    gap: 0.3rem;
  }

  .contact-icon {
    width: 22px;
    height: 22px;
  }

  .contact-text {
    font-size: 0.88rem;
  }

  .contact-desc {
    font-size: 0.82rem;
    margin-top: 0.2rem;
  }

  .toggle-btn {
    padding: 5px 14px;
    font-size: 0.82rem;
  }

  .language-toggle {
    margin: 4px 0;
  }
}
</style>
