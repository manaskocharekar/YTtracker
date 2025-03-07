let lastUpdateTime = Date.now();
let watchTime = 0;

function updateWatchTime() {
    const video = document.querySelector("video");

    if (video && !video.paused) {
        let currentTime = Date.now();
        watchTime += (currentTime - lastUpdateTime) / 1000; // Convert ms to seconds
        lastUpdateTime = currentTime;

        // Store the updated time in Chrome storage
        chrome.storage.local.get(["watchTime"], (data) => {
            let totalWatchTime = (data.watchTime || 0) + 1; // Add 1 sec
            chrome.storage.local.set({ watchTime: totalWatchTime });
        });
    }
}

// Check video status every second
setInterval(updateWatchTime, 1000);
