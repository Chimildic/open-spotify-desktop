document.addEventListener('DOMContentLoaded', onLoadedPage);

function onLoadedPage() {
    setLocale();
    onClickWebStorePage.addEventListener('click', showWebStorePage);
}

function setLocale() {
    let elements = document.querySelectorAll('[data-locale]');
    elements.forEach((el) => (el.innerHTML = chrome.i18n.getMessage(el.dataset.locale)));
}

function showWebStorePage() {
    window.open(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);
    chrome.runtime.sendMessage({
        action: 'setOptions',
        content: {
            canShownFeedback: false,
            lastShownFeedback: new Date().toUTCString(),
        },
    });
}
