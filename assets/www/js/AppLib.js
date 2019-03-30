var DriverLogger = {};
Date.prototype.ddmmyyyy =  function(){  var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

Date.prototype.hhmmss =  function(){  var d = new Date(),
        hour = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = d.getSeconds();

    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds= '0' + seconds;

    return [hour, minutes, seconds].join(':');
}

DriverLogger.GoBack = function (){
    window.history.back();
}

DriverLogger.GoNext = function (){
    window.history.forward();
}

