let filter = { urls: ['*://open.spotify.com/*'] };
let extraInfoSpec = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestToSpotify, filter, extraInfoSpec);

function onBeforeRequestToSpotify(details) {
    let modifiedUrl = createUrlToDesktop(details.url);
    if (modifiedUrl.length > 0) {
        closeTab(details.url, () => openTab(modifiedUrl));
    }
}

function createUrlToDesktop(url) {
    let modifiedUrl;
    if (isValidUrl()) {
        modifiedUrl = parseUrl();
    }
    return modifiedUrl || '';

    function isValidUrl() {
        return !['/embed', '/log'].some((str) => url.includes(str));
    }

    function parseUrl() {
        let groups = url.match(/[\/\&](track|playlist|album|artist|show|episode)\/([^\&\#\/\?]+)/i);
        if (groups && groups.length == 3) {
            return `spotify:${groups[1]}:${groups[2]}`;
        }
    }
}

function openTab(url) {
    chrome.tabs.create({ url: `/redirect.html?url=${url}` });
}

function closeTab(url, callback) {
    chrome.tabs.getSelected((tab) => {
        if (tab != undefined && tab.id > 0 && (tab.pendingUrl === url || tab.url === url)) {
            chrome.tabs.remove(tab.id, callback);
        }
    });
}
