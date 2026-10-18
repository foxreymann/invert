const getDomain = (url) => {
  try {
    const { protocol, hostname } = new URL(url);
    return /^(https?|file|ftp):$/.test(protocol) && hostname ? hostname : null;
  } catch {
    return null;
  }
};

const getDomains = async () => (await chrome.storage.local.get({ domains: [] })).domains;

const updateBadge = async (tabId, url) => {
  const domain = getDomain(url);
  const on = domain !== null && (await getDomains()).includes(domain);
  await chrome.action.setBadgeText({ tabId, text: on ? 'ON' : '' });
};

chrome.action.setBadgeBackgroundColor({ color: '#e8590c' });

chrome.action.onClicked.addListener(async (tab) => {
  const domain = getDomain(tab.url);
  if (!domain) return;

  const domains = await getDomains();
  const next = domains.includes(domain)
    ? domains.filter((d) => d !== domain)
    : [...domains, domain];
  await chrome.storage.local.set({ domains: next });

  // Tabs opened before the extension was installed/reloaded have no content script yet.
  await chrome.scripting
    .insertCSS({ target: { tabId: tab.id }, files: ['content.css'] })
    .catch(() => {});
  await chrome.scripting
    .executeScript({ target: { tabId: tab.id }, files: ['content.js'] })
    .catch(() => {});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === 'loading') updateBadge(tabId, tab.url);
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  updateBadge(tabId, tab.url);
});

chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area !== 'local' || !changes.domains) return;
  for (const tab of await chrome.tabs.query({})) updateBadge(tab.id, tab.url);
});
