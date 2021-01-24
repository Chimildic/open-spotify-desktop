const WEBSTORE_PAGE = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;
document.addEventListener('DOMContentLoaded', onLoadedPage);

function onLoadedPage() {
    setLocale();
    setShareLink();
    onClickWebStorePage.addEventListener('click', showWebStorePage);
}

function setLocale() {
    let elements = document.querySelectorAll('[data-locale]');
    elements.forEach((el) => (el.innerHTML = chrome.i18n.getMessage(el.dataset.locale)));
}

function setShareLink(){
    hrefTwitter.href = `http://twitter.com/share?text=${chrome.i18n.getMessage('share_twitter')}&url=${WEBSTORE_PAGE}`;
}

function showWebStorePage() {
    window.open(WEBSTORE_PAGE);
    chrome.runtime.sendMessage({
        action: 'setOptions',
        content: {
            canShownFeedback: false,
            lastShownFeedback: new Date().toUTCString(),
        },
    });
}
