let filter = { urls: ['*://open.spotify.com/*'] };
let extraInfoSpec = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, extraInfoSpec);

function onBeforeRequest(details) {
    let modifiedUrl = createUrlToDesktopApp(details.url);
    if (modifiedUrl.length > 0) {
        closeSelectedTab(() => openNewTab(modifiedUrl));
    }
}

function createUrlToDesktopApp(urlSource) {
    let pattern = 'open.spotify.com/(track|playlist|album|artist|show|episode|concert|user)/([^?/#& ]+)';
    let [fullMatch, type, id] = urlSource.match(new RegExp(pattern, 'i')) || [];
    return fullMatch ? `/page/redirect.html?url=spotify:${type}:${id}` : '';
}

function openNewTab(url) {
    chrome.tabs.create({ url: url });
}

function closeSelectedTab(callback) {
    chrome.tabs.getSelected((tab) => {
        if (typeof tab == 'object' && tab.id > 0) {
            chrome.tabs.remove(tab.id, callback);
        }
    });
}
