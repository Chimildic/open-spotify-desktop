let filter = { urls: ['*://open.spotify.com/*'] };
let extraInfoSpec = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, extraInfoSpec);

function onBeforeRequest(details) {
    let modifiedUrl = createUrlToDesktopApp(details.url);
    if (modifiedUrl.length == 0) {
        return;
    }

    canCloseSelectedTab((result) => {
        result ? closeSelectedTab(callback) : callback();
    });

    function callback(){
        openNewTab(modifiedUrl, () => showFeedbackPage());
    }
}

function createUrlToDesktopApp(urlSource) {
    let pattern = 'open.spotify.com/(track|playlist|album|artist|show|episode|concert|user)/([^?/#& ]+)';
    let [fullMatch, type, id] = urlSource.match(new RegExp(pattern, 'i')) || [];
    return fullMatch ? `/page/redirect.html?url=spotify:${type}:${id}` : '';
}
