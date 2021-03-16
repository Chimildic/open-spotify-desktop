chrome.tabs.onUpdated.addListener(onTabsUpdated);

function onTabsUpdated(tabId, changeInfo, tab) {
    if (changeInfo.hasOwnProperty('url')) {
        onRequest(tabId, tab.url);
    }
}

async function onRequest(tabId, url) {
    let modifiedUrl = createUrlToDesktopApp(url);
    if (modifiedUrl.length == 0) {
        return;
    } else if (await canCloseTab()) {
        closeTab(tabId);
    }
    openNewTab(modifiedUrl);
    showFeedbackPage();
}

function createUrlToDesktopApp(urlSource) {
    let pattern = 'open.spotify.com/(track|playlist|album|artist|show|episode|concert|user)/([^?/#& ]+)';
    let [fullMatch, type, id] = urlSource.match(new RegExp(pattern, 'i')) || [];
    return fullMatch ? `/page/redirect.html?url=spotify:${type}:${id}` : '';
}
