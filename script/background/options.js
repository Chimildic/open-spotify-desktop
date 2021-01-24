const DEFAULT_OPTIONS = {
    canShownFeedback: true,
    lastShownFeedback: new Date().toUTCString(),
    strDateInstall: new Date().toUTCString(),
};

function patchCurrentOptions() {
    chrome.storage.sync.get(null, (items) => {
        let defaultKeys = Object.keys(DEFAULT_OPTIONS);
        defaultKeys.forEach((key) => {
            if (!items.hasOwnProperty(key) || typeof items[key] != typeof DEFAULT_OPTIONS[key]) {
                items[key] = DEFAULT_OPTIONS[key];
            }
        });

        let currentKeys = Object.keys(items);
        currentKeys.forEach((key) => {
            if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
                delete items[key];
            }
        });

        setOptions(items);
    });
}

function setDefaultOptions() {
    setOptions(DEFAULT_OPTIONS);
}

function setOptions(json) {
    chrome.storage.sync.set(json);
}
