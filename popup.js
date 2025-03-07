document.addEventListener("DOMContentLoaded", function () {
    const watchTimeElement = document.getElementById("watchTime");

    function updateWatchTime() {
        chrome.storage.local.get(["watchTime"], (data) => {
            let totalSeconds = data.watchTime || 0;
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            watchTimeElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        });
    }

    // Update immediately and refresh every second
    updateWatchTime();
    setInterval(updateWatchTime, 1000);
});
