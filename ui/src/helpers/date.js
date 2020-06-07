function GetDate(){
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return month + "/" + day + "/" + year;
}

export default GetDate;