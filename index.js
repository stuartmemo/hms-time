var getMinutes = function (seconds) {
    return Math.floor(seconds / 60);
};

var getHours = function (minutes) {
    return Math.floor(minutes / 60);
};

var getMilliseconds = function (seconds) {
    var milliseconds = Math.floor(seconds * 1000);
    return milliseconds.toString().slice(0, 3);
};

var takeOffMinutes = function (seconds, minutes) {
    return parseFloat((seconds - (minutes * 60)).toFixed(3), 10);
};

var takeOffSeconds = function (milliseconds, seconds) {
    return milliseconds - (seconds * 1000);
};

var takeOffHours = function (minutes, hours) {
    return minutes - (hours * 60);
};

var takeOffMilliseconds = function (seconds) {
    return parseInt(seconds, 10);
};

var getMillisecondsFromAfterDecimal = function (seconds) {
    var milliseconds = 0;

    if (!isInteger(seconds)) {
        seconds = seconds.toFixed(3);
        milliseconds = seconds.toString().split('.')[1];
    }

    return milliseconds;
};

var isInteger = function (n) {
    return n % 1 === 0;
}

var hmsTime = function (seconds, simple) {
    var hours = '0',
        minutes = '00',
        milliseconds = '000';

    // Make seconds positive.
    seconds = Math.abs(seconds); 

    if (seconds > 59) {
        minutes = getMinutes(seconds);
        seconds = takeOffMinutes(seconds, minutes);
    }

    if ((seconds > 0) && (seconds < 1)) {
        milliseconds = getMilliseconds(seconds);
        seconds = 0;
    } else {
        milliseconds = getMillisecondsFromAfterDecimal(seconds);
        seconds = takeOffMilliseconds(seconds);
    }

    if (minutes > 59) {
        hours = getHours(minutes);
        minutes = takeOffHours(minutes, hours);
    }

    /**
     * Add padding.
     */
    if (seconds.toString().length === 1) {
        seconds = '0' + seconds;
    }

    if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
    }

    milliseconds = milliseconds.toString();

    if (milliseconds.length === 1) {
        milliseconds = '00' + milliseconds;
    } else if (milliseconds.length === 2) {
        milliseconds = '0' + milliseconds;
    }

    // Limit hours to 9.
    if (hours > 9) {
        hours = 9;
        minutes = 59;
        seconds = 59;
        milliseconds = 999;
    }

    // Return formatted string.

    if (simple) {
        if (hours === '0') {
            if (minutes === '00') {
                return seconds + '.' + milliseconds;
            } else {
                return minutes + ':' + seconds;
            }
        } else {
            return hours + ':' + minutes + ':' + seconds;
        }
    }

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
};

module.exports = hmsTime;
