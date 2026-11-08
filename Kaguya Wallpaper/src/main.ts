import './style.css'

function updateClock(): void {
    const timeElement = document.querySelector<HTMLDivElement>("#time");
    const dayElement = document.querySelector<HTMLDivElement>("#day");
    const dateElement = document.querySelector<HTMLDivElement>("#date");

    if (!timeElement || !dayElement || !dateElement) {
        throw new Error("Clock elements not found");
    }

    const now = new Date();

    timeElement.textContent =
        `- ${now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        })} -`;

    dayElement.textContent =
        now.toLocaleDateString("en-IN", {
            weekday: "long"
        });

    dateElement.textContent =
        now.toLocaleDateString("en-IN", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });
}

updateClock();
setInterval(updateClock, 1000);