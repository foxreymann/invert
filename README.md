# Color Inverter Extension

A simple Chrome extension that inverts the colors of websites to provide a dark-mode like experience. Inversion is toggled per domain and remembered.

## How to Install

1. Open Google Chrome or any Chromium-based browser (e.g., Brave, Edge).
2. Navigate to `chrome://extensions/` in your address bar.
3. Enable **Developer mode** by clicking the toggle switch in the top right corner.
4. Click the **Load unpacked** button in the top left.
5. Select the directory containing this extension (`/home/user/code/foxreymann/invert` or the folder you downloaded it to).
6. The extension is now installed. Pin it to the toolbar for easy access.

## Usage

- Click the extension icon to turn inversion **on/off** for the current domain (e.g. `example.com`).
- The setting is remembered per domain (stored in `chrome.storage.local`), so the site stays inverted on future visits and in all tabs.
- An `ON` badge on the icon shows that inversion is active for the current tab's domain.

## Development

- `background.js` – service worker: handles icon clicks, stores the list of enabled domains, updates the badge.
- `content.js` – runs on every page; adds the `fox-invert` class to `<html>` when the page's domain is enabled.
- `content.css` – the actual inversion:
  ```css
  html.fox-invert {
    filter: invert(1) !important;
  }
  ```

No build steps are required. Simply edit the files, and click the "Reload" icon on the extension card in `chrome://extensions/` to apply updates.
