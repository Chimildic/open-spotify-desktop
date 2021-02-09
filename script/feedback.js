const WEBSTORE_PAGE = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;
document.addEventListener('DOMContentLoaded', onLoadedPage);
setOptions({ lastShownFeedback: new Date().toUTCString() });

function onLoadedPage() {
    setLocale();
    setHrefShare();
    elWebStorePage.addEventListener('click', onClickWebStorePage);
}

function setLocale() {
    let elements = document.querySelectorAll('[data-locale]');
    elements.forEach((el) => (el.innerHTML = chrome.i18n.getMessage(el.dataset.locale)));
}

function setHrefShare() {
    let twitterText = chrome.i18n.getMessage('share_twitter');
    elTwitter.href = `https://twitter.com/share?text=${twitterText}&url=${WEBSTORE_PAGE}`;
}

function onClickWebStorePage() {
    window.open(WEBSTORE_PAGE);
    setOptions({ canShowFeedback: false });
}

function setOptions(content) {
    chrome.runtime.sendMessage({
        action: 'setOptions',
        content: content,
    });
}
