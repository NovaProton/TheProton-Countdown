document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const startButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");
    const timeDisplay = document.getElementById("time");
    const water = document.querySelector(".water");

    let interval;
    let endTime;

    resetButton.classList.add("hidden");

    if (sessionStorage.getItem("countdownEndTime")) {
        resumeCountdown();
    }

    startButton.addEventListener("click", startCountdown);
    resetButton.addEventListener("click", resetCountdown);

    function startCountdown() {
        let water = document.querySelector(".water");
        if (!water) {
            console.error("Water element not found!");
            return;
        }

        hoursInput.classList.add("hidden");
        minutesInput.classList.add("hidden");
        startButton.classList.add("hidden");
        resetButton.classList.remove("hidden");

        const duration =
            parseInt(hoursInput.value || 0) * 60 * 60 * 1000 +
            parseInt(minutesInput.value || 0) * 60 * 1000;
        endTime = new Date().getTime() + duration;
        sessionStorage.setItem("countdownEndTime", endTime.toString());
        sessionStorage.setItem("countdownInitialDuration", duration.toString());

        updateTimer();
        setWaterHeight(100);
        interval = setInterval(function() {
            updateTimer();
            setWaterHeight(getHeight());
            if (getTimeLeft() <= 0) {
                clearInterval(interval);
                wellDoneMessage();
            }
        }, 1000);
    }

    function resetCountdown() {
        clearInterval(interval);
        sessionStorage.removeItem("countdownEndTime");
        sessionStorage.removeItem("countdownInitialDuration");
        hoursInput.classList.remove("hidden");
        minutesInput.classList.remove("hidden");
        startButton.classList.remove("hidden");
        resetButton.classList.add("hidden");
        timeDisplay.textContent = "";
        setWaterHeight(0);
        hoursInput.value = "";
        minutesInput.value = "";
    }

    function resumeCountdown() {
        let water = document.querySelector(".water");
        if (!water) {
            console.error("Water element not found!");
            return;
        }

        hoursInput.classList.add("hidden");
        minutesInput.classList.add("hidden");
        startButton.classList.add("hidden");
        resetButton.classList.remove("hidden");

        endTime = parseInt(sessionStorage.getItem("countdownEndTime"));

        updateTimer();
        setWaterHeight(getHeight());
        interval = setInterval(function() {
            updateTimer();
            setWaterHeight(getHeight());
            if (getTimeLeft() <= 0) {
                clearInterval(interval);
                wellDoneMessage();
                setTimeout(() => {
                    resetCountdown();
                }, 2000);
            }
        }, 1000);
    }

    function getTimeLeft() {
        return endTime - new Date().getTime();
    }

    function getHeight() {
        const initialDuration = parseInt(sessionStorage.getItem("countdownInitialDuration"));
        const percentage = (getTimeLeft() / initialDuration) * 100;
        return percentage;
    }

    function setWaterHeight(percentage) {
        const maxHeight = window.innerHeight;
        const height = Math.max(0, Math.floor((percentage / 100) * maxHeight));
        water.style.height = `${height}px`;
        water.style.top = `${maxHeight - height}px`;
    }

    function updateTimer() {
        const timeLeft = Math.floor(getTimeLeft() / 1000);
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeDisplay.textContent = formattedTime;
    }

    function wellDoneMessage() {
        timeDisplay.textContent = "Well done!";
    }

    hoursInput.addEventListener("input", validateInput);
    minutesInput.addEventListener("input", validateInput);

    function validateInput(e) {
        const input = e.target;
        const value = input.value;

        if (!Number.isInteger(Number(value))) {
            alert("Please enter a whole number.");
            input.value = "";
            return;
        }

        if (value < 0) {
            alert("Please enter a whole number greater than or equal to 0.");
            input.value = "";
            return;
        }
    }

    hoursInput.addEventListener("keydown", restrictInput);
    minutesInput.addEventListener("keydown", restrictInput);

    function restrictInput(e) {
        const keyCode = e.keyCode;
        if (
            (keyCode >= 48 && keyCode <= 57) || // Allow numeric input (0-9)
            (keyCode >= 96 && keyCode <= 105) || // Allow numeric input on numpad (0-9)
            keyCode === 8 || // Allow backspace
            keyCode === 46 || // Allow delete
            keyCode === 37 || // Allow left arrow
            keyCode === 39 // Allow right arrow
        ) {
            // Allow valid input
        } else {
            e.preventDefault();
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const infoButton = document.querySelector(".info-button");
    const infoPopup = document.querySelector(".info-popup");

    infoButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevents the click event from bubbling up to the document
        infoPopup.style.display = infoPopup.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function() {
        infoPopup.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // The rest of your DOMContentLoaded function, if any
    function updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const copyrightElement = document.getElementById("copyright");
        copyrightElement.innerHTML = `&copy; ${currentYear} <a href="https://www.theproton.space/" target="_blank"> TheProton</a>. <br> All rights reserved.`;
    }
    // Add this line at the end of the DOMContentLoaded function
    updateCopyrightYear();
});