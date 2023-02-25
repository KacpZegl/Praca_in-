function getDaysInMonth(year, month){
    return new Date(year, month+1, 0).getDate();
}

function getDays() {
    var fullDate = new Date();
    let currentYear = fullDate.getFullYear();
    let currentMonth = fullDate.getMonth();
    let currentDay = fullDate.getDate();

    let currentDaysInMonth = getDaysInMonth(currentYear, currentMonth) + 1;
    if (currentMonth < 9){
        var FirstDate = new Date(currentYear+"-"+"0"+(currentMonth+1)+"-01");
    } else {
        var FirstDate = new Date(currentYear+"-"+(currentMonth+1)+"-01");
    }
    let FirstDayOfMonth = FirstDate.getDay();

    var months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    var selectedMonthAndYear = months[currentMonth] + " " + currentYear;

/* funkcja odpowiadająca za wyświetlanie miesiąca i roku w kalendarzu */
    document.getElementById('monthAndYear').innerHTML = selectedMonthAndYear, currentYear;

/* funkcja odpowiadająca za numerowanie dni */
    if (FirstDayOfMonth > 0){
        for ( var i = 1 ; i<currentDaysInMonth; i++){
            var selectedDay = "day" + (FirstDayOfMonth - 1 + i);
            document.getElementById(selectedDay).innerHTML = i;
        }
    } else {
        for ( var i = 7 ; i<(currentDaysInMonth+6); i++){
            var selectedDay = "day" + (FirstDayOfMonth + i);
            document.getElementById(selectedDay).innerHTML = (i - 6);
        }
    }

/* funkcja odpowiadaja za wyszarzanie pustych okien w linijkach, które mają dni*/
    for (let i = 1 ; i<43; i++){
        var selectedDayEmpty = "day" + i;
        var tdElem = document.getElementById(selectedDayEmpty).textContent
        if (tdElem !== ""){
            // document.getElementById(selectedDayEmpty).style.border = "1px solid white";
        }
        if (tdElem == ""){
            // document.getElementById(selectedDay).style.border = "1px solid yellow";
            document.getElementById(selectedDayEmpty).style.opacity = "0.6";
            document.getElementById(selectedDayEmpty).style.boxShadow = "0px 0px 6px 0px white";
        }
    }
/* funckja odpowiadająca za oznaczenie obecego dnia na kalendarzu*/
if (FirstDayOfMonth > 0){
    var today = "day" + (currentDay + FirstDayOfMonth -1);
} else {
    var today = "day" + (currentDay + FirstDayOfMonth +6);
}
document.getElementById(today).style.border = "4px solid white";

/* Funkcja usuwająca ostatnią linijkę kalendarza jeśli ta nie zawiera dni*/
    if (document.getElementById('day36').textContent == ""){
        for (let i = 36 ; i < 43 ; i++){
            lastRow = "day" + i;
            document.getElementById(lastRow).style.display = "none";
        }
    }
}

getDays();
