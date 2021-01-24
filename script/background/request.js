let filter = { urls: ['*://open.spotify.com/*'] };
let extraInfoSpec = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, extraInfoSpec);

function onBeforeRequest(details) {
    let modifiedUrl = createUrlToDesktopApp(details.url);
    if (modifiedUrl.length > 0) {
        closeSelectedTab(() => openNewTab(modifiedUrl, () => showFeedbackPage()));
    }
}

function createUrlToDesktopApp(urlSource) {
    let pattern = 'open.spotify.com/(track|playlist|album|artist|show|episode|concert|user)/([^?/#& ]+)';
    let [fullMatch, type, id] = urlSource.match(new RegExp(pattern, 'i')) || [];
    return fullMatch ? `/page/redirect.html?url=spotify:${type}:${id}` : '';
}
