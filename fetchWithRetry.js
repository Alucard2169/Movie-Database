// Retry wrapper for flaky TMDB connections (ISP resets TLS intermittently).
// Tries up to `retries` times with a short delay between attempts.
const fetchWithRetry = async (url, retries = 3, delay = 300) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      if (i === retries) {
        console.error(`TMDB fetch failed after ${retries + 1} attempts: ${url}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  return null;
};

module.exports = { fetchWithRetry };
