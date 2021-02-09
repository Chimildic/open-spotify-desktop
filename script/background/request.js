chrome.tabs.onUpdated.addListener(onTabsUpdated);

function onTabsUpdated(tabId, changeInfo, tab) {
    if (changeInfo.hasOwnProperty('url')) {
        onRequest(tabId, tab.url);
    }
}

function onRequest(tabId, url) {
    let modifiedUrl = createUrlToDesktopApp(url);
    if (modifiedUrl.length == 0) {
        return;
    }

    canCloseTab((result) => {
        result ? closeTab(tabId, onRedirect) : onRedirect();
    });

    function onRedirect() {
        openNewTab(modifiedUrl, () => showFeedbackPage());
    }
}

function createUrlToDesktopApp(urlSource) {
    let pattern = 'open.spotify.com/(track|playlist|album|artist|show|episode|concert|user)/([^?/#& ]+)';
    let [fullMatch, type, id] = urlSource.match(new RegExp(pattern, 'i')) || [];
    return fullMatch ? `/page/redirect.html?url=spotify:${type}:${id}` : '';
}
