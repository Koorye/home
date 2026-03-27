// composables/useGitHubStars.js
import { ref } from 'vue';

export function useGitHubStars() {
  const starCounts = ref({});

  // 从 GitHub URL 提取 owner/repo
  const getRepoKey = (url) => {
    if (!url || !url.includes('github.com')) return null;
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2]}` : null;
  };

  // ✅ 正确解析 star 数字（最终版）
  const fetchStars = async (repoKey) => {
    if (!repoKey || starCounts.value[repoKey]) return;

    try {
      starCounts.value[repoKey] = 'loading';

      // 请求 shields SVG
      const res = await fetch(`https://img.shields.io/github/stars/${repoKey}`);
      const svgText = await res.text();

      // 👇 这是能真正匹配到 star 数的正则（测试通过）
      const regex = />([\d,.]+)</g;
      const matches = [...svgText.matchAll(regex)];

      let stars = 0;
      if (matches.length >= 2) {
        // 取第二个数字，就是 star 数量
        stars = parseInt(matches[1][1].replace(/,/g, ''), 10) || 0;
      }

      starCounts.value[repoKey] = stars;

    } catch (err) {
      console.error('获取失败', repoKey, err);
      starCounts.value[repoKey] = 'error';
    }
  };

  // 批量获取
  const fetchStarsForRepos = (urls) => {
    const repoKeys = urls.map(getRepoKey).filter(Boolean);
    repoKeys.forEach(fetchStars);
  };

  return {
    starCounts,
    getRepoKey,
    fetchStars,
    fetchStarsForRepos
  };
}