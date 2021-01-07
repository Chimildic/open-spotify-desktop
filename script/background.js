let filter = { urls: ['*://open.spotify.com/*'] };
let extraInfoSpec = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, extraInfoSpec);

function onBeforeRequest(details) {
    let modifiedUrl = createUrlToDesktopApp(details.url) || '';
    if (modifiedUrl.length > 0) {
        closeSelectedTab(details.url, () => openNewTab(modifiedUrl));
    }
}

function createUrlToDesktopApp(urlSource) {
    if (isValidUrlSource()) {
        return parse();
    }

    function isValidUrlSource() {
        return !['/embed', '/log'].some((str) => urlSource.includes(str));
    }

    function parse() {
        let pattern = '\/(track|playlist|album|artist|show|episode|user)\/([^\#\/\?]+)';
        let groups = urlSource.match(new RegExp(pattern, 'i'));
        if (groups != null && groups.length == 3) {
            return `/page/redirect.html?url=spotify:${groups[1]}:${groups[2]}`;
        }
    }
}

function openNewTab(url) {
    chrome.tabs.create({ url: url });
}

function closeSelectedTab(url, callback) {
    chrome.tabs.getSelected((tab) => {
        if (typeof tab == 'object' && tab.id > 0 && (tab.pendingUrl === url || tab.url === url)) {
            chrome.tabs.remove(tab.id, callback);
        }
    });
}
