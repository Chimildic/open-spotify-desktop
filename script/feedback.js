document.addEventListener('DOMContentLoaded', onLoadedPage);

function onLoadedPage() {
    setLocale();
    onClickWebStorePage.addEventListener('click', openWebStorePage);
}

function setLocale(){
    let elements = document.querySelectorAll('[data-locale]');
    elements.forEach(el => el.innerHTML = chrome.i18n.getMessage(el.dataset.locale));
}

function openWebStorePage() {
    window.open(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);
}
