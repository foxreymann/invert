(() => {
  if (window.__foxInvertLoaded) return;
  window.__foxInvertLoaded = true;

  const CLASS = 'fox-invert';
  let enabled = false;
  let observed = null;

  const sync = () => {
    const html = document.documentElement;
    if (!html) return;
    if (html.classList.contains(CLASS) !== enabled) html.classList.toggle(CLASS, enabled);
    if (observed !== html) {
      observed = html;
      // SPA routers (e.g. Astro ClientRouter, Turbo) overwrite <html> attributes on navigation.
      attrObserver.disconnect();
      attrObserver.observe(html, { attributes: true, attributeFilter: ['class'] });
    }
  };

  const attrObserver = new MutationObserver(sync);
  // Catch the <html> element itself being replaced.
  new MutationObserver(sync).observe(document, { childList: true });

  const apply = (domains = []) => {
    enabled = domains.includes(location.hostname);
    sync();
  };

  chrome.storage.local.get({ domains: [] }, ({ domains }) => apply(domains));

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.domains) apply(changes.domains.newValue);
  });
})();
