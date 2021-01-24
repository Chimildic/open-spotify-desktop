document.title = chrome.i18n.getMessage('redirect_title');
let params = new URLSearchParams(location.search);
window.open(params.get('url'));
window.close();
