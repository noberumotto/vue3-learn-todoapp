export const timeStampToString = (time: number | undefined, parseStr = "y-m-d h:i") => {
    // let date = time ;

    if (time == undefined) {
        time = new Date().getTime();
    }

    time = time.toString().length == 10 ? time * 1000 : time;

    const date = new Date(time);


    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let monthStr = month < 10 ? "0" + month : month;
    let dayStr = day < 10 ? "0" + day : day;

    let hoursStr = hours < 10 ? "0" + hours : hours;
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;

    parseStr = parseStr.replace("y", year.toString());
    parseStr = parseStr.replace("m", monthStr.toString());
    parseStr = parseStr.replace("d", dayStr.toString());
    parseStr = parseStr.replace("h", hoursStr.toString());
    parseStr = parseStr.replace("i", minutesStr.toString());
    parseStr = parseStr.replace("s", secondsStr.toString());

    return parseStr;
}