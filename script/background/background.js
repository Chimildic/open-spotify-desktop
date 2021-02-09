chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onMessage.addListener(onContentMessage);

function onInstalled(details) {
    if (details.reason == 'install') {
        setDefaultOptions();
    } else if (details.reason == 'update') {
        patchOptions();
    }
}

function onContentMessage(message, sender, sendResponse) {
    if (message.action == 'setOptions') {
        setOptions(message.content);
    }
    return true;
}
