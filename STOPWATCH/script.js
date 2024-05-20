let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMilliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

function stopwatch() {
    stopwatchMilliseconds++;
    if (stopwatchMilliseconds === 100) {
        stopwatchMilliseconds = 0;
        stopwatchSeconds++;
    }
    if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }

    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMilliseconds));
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    laps = 0;
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html(""); // Clear laps when resetting
}

$(".start-stopwatch").click(function () {
    startStopwatch();
    $(".start-stopwatch").hide();
    $(".stop-stopwatch").show();
    $(".lap-stopwatch").show();
});

$(".stop-stopwatch").click(function () {
    stopStopwatch();
    $(".start-stopwatch").show();
    $(".stop-stopwatch").hide();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
    laps++;
    $(".laps").append(
        `<div class="lap">
            <p>Lap ${laps}</p>
            <p>${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMilliseconds)}</p>
        </div>`
    );

    $(".laps").scrollTop($(".laps")[0].scrollHeight);
});


$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

function addTrailingZero(number) {
    return number < 10 ? "0" + number : number;
}
