function showFeedbackPage() {
    chrome.storage.sync.get(null, function (items) {
        if (canShowFeedbackPage(items)) {
            openNewTab('/page/feedback.html');
        }
    });
}

function canShowFeedbackPage(items) {
    if (items.canShowFeedback) {
        let dateInstall = new Date(items.strDateInstall);
        let dateLastShown = new Date(items.lastShownFeedback);
        let today = new Date();
        return diffDays(today, dateInstall) > 2 && diffDays(today, dateLastShown) > 2;
    }
}

function diffDays(dateOne, dateTwo) {
    return (dateOne - dateTwo) / (60 * 60 * 24 * 1000);
}

function openNewTab(url) {
    return chrome.tabs.create({ url: url, selected: false });
}

function closeTab(tabId) {
    return chrome.tabs.remove(tabId);
}

async function canCloseTab() {
    let tabs = await chrome.tabs.query({ currentWindow: true });
    return tabs.length > 1;
}
