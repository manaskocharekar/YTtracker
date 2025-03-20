document.addEventListener("DOMContentLoaded", function () {
    const watchTimeElement = document.getElementById("watchTime");

    chrome.storage.local.get("trackingStart", (data) => {
        let startTime = data.trackingStart ? new Date(data.trackingStart).toLocaleString() : "Unknown";
        document.body.insertAdjacentHTML("afterbegin", `<p>Tracking since: ${startTime}</p>`);
    });
    
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
