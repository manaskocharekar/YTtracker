document.addEventListener("DOMContentLoaded", () => {
    const watchTimeEl = document.getElementById("watchTime");
    const trackingStartEl = document.getElementById("trackingStart");
    const resetButton = document.getElementById("resetButton");

    function updateTime() {
        chrome.storage.local.get(["watchTime", "trackingStart"], (data) => {
            let watchTime = data.watchTime || 0;
            let startTime = data.trackingStart ? new Date(data.trackingStart).toLocaleString() : "Unknown";

            if (watchTimeEl) watchTimeEl.textContent = formatTime(watchTime);
            if (trackingStartEl) trackingStartEl.textContent = startTime;
        });
    }

    // Initial update
    updateTime();

    // Update every 5 seconds
    setInterval(updateTime, 5000);

    // Reset button functionality
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            let newStartTime = Date.now();
            chrome.storage.local.set({ watchTime: 0, trackingStart: newStartTime }, () => {
                chrome.runtime.sendMessage({ action: "resetWatchTime" }, () => {
                    updateTime(); // Update popup immediately after reset
                });
            });
        });
    }
});

// Function to format watch time (convert seconds to hh:mm:ss)
function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}
