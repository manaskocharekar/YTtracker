let watchTimes = {}; // Track time per tab

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["trackingStart", "watchTime"], (data) => {
        if (!data.trackingStart) {
            chrome.storage.local.set({ trackingStart: Date.now(), watchTime: 0 });
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "updateWatchTime") {
        let tabId = sender.tab.id;
        if (!watchTimes[tabId]) watchTimes[tabId] = 0;
        watchTimes[tabId] += message.timeSpent;

        // Store total watch time
        chrome.storage.local.get({ totalWatchTime: 0 }, (data) => {
            let newTotal = (data.totalWatchTime || 0) + message.timeSpent;
            chrome.storage.local.set({ totalWatchTime: newTotal });
        });
    }
});

// Ensure content script runs on already open YouTube tabs when extension reloads
chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
    for (let tab of tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "resetWatchTime") {
        chrome.storage.local.set({ watchTime: 0, trackingStart: Date.now() });
    }
});