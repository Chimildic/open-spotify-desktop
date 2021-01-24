document.addEventListener('DOMContentLoaded', onLoadedPage);

function onLoadedPage() {
    onClickWebStorePage.addEventListener('click', openWebStorePage);
}

function openWebStorePage() {
    window.open(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);
}
