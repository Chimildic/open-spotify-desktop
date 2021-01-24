const DEFAULT_OPTIONS = {
    canShownFeedback: true,
    lastShownFeedback: new Date().toUTCString(),
    strDateInstall: new Date().toUTCString(),
};

function patchOptions() {
    chrome.storage.sync.get(null, (items) => {
        upToDefault(items);
        downToDefault(items);
        setOptions(items);
    });

    function upToDefault(items) {
        Object.keys(DEFAULT_OPTIONS).forEach((key) => {
            if (!items.hasOwnProperty(key) || typeof items[key] != typeof DEFAULT_OPTIONS[key]) {
                items[key] = DEFAULT_OPTIONS[key];
            }
        });
    }

    function downToDefault(items) {
        Object.keys(items).forEach((key) => {
            if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
                delete items[key];
            }
        });
    }
}

function setDefaultOptions() {
    setOptions(DEFAULT_OPTIONS);
}

function setOptions(json) {
    chrome.storage.sync.set(json);
}
