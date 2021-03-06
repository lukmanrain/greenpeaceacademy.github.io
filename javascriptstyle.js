class date {
    constructor(id) {
        let currentdate = new Date();
        this.elementId = id;
        this.e = document.getElementById(id);
        this.selectedDays = new Array();
        this.startYear = 2019;
    }

    render() {
        let el = this;
        let element = this.e;
        let startYear = this.startYear;
        let endYear = this.startYear + 5;
        let filters = c('div');
        let dates = c('div');
        let currentdate = new Date();
        let currentmonth = currentdate.getMonth();
        let currentyear = currentdate.getFullYear();

        element.innerHTML = '';
        filters.className = 'calendar-filters';
        dates.className = 'calendar-dates';
        loadCalendarMonths();
        loadCalendarYears();

        element.appendChild(filters);
        element.appendChild(dates);

        loadCalendarDays();

        function c(el) {
            return document.createElement(el);
        }

        function loadCalendarDays() {
            dates.innerHTML = '';
            let div_days = c('div');
            div_days.className = 'days';

            let tmpDate = new Date(year, month, 0);
            let num = Calendar.daysInMonth(month, year);
            let dayofweek = tmpDate.getDay();       // find where to start calendar day of week

            for (let i = 0; i < Calendar.days.length; i++) {
                var d = document.createElement("div");
                d.classList.add("day");
                d.innerHTML = Calendar.days[i];
                div_days.appendChild(d);
            }

            for (let i = 0; i <= dayofweek; i++) {
                var d = document.createElement("div");
                d.classList.add("day");
                d.classList.add("blank");
                div_days.appendChild(d);
            }

            for (let i = 0; i < num; i++) {
                var tmp = i + 1;
                var d = document.createElement("div");
               // d.id = "calendarday_" + i;
                d.className = "day";
                d.innerHTML = tmp;
                d.dataset.day = tmp;

                /* ****************** Single Day Event ********************** */
                d.addEventListener('click', function () {
                    let _date = (month + 1) + '/' + this.dataset.day + '/' + year;

                    if (el.selectedDays.indexOf(_date) > -1) {
                        this.classList.toggle('selected');
                        el.selectedDays.splice(el.selectedDays.indexOf(_date), 1);
                    }

                    else {
                        let days = element.querySelectorAll('.day');
                        days.forEach(item => item.classList.remove('selected'));
                        this.classList.add('selected');
                        el.selectedDays.push(_date);
                    }
                });
                /* **************************************************** */

                div_days.appendChild(d);
            }

            var clear = document.createElement("div");
            clear.className = "clear";
            div_days.appendChild(clear);
            dates.appendChild(div_days);
        }

        function loadCalendarYears() {
            let div_filter = c('div');
            let div_label = c('div');
            let div_dropdown = c('div');

            div_label.className = 'filter-label';
            div_label.innerHTML = startYear;
            div_label.addEventListener('click', function () {
                $(div_dropdown).toggle('fast');
            });

            div_dropdown.classList.add('calendar-years');
            div_dropdown.classList.add('years');
            div_dropdown.classList.add('dropdown');

            for (let i = startYear; i <= endYear; i++) {
                let doc = c("div");
                doc.innerHTML = i;
                doc.classList.add("dropdown-item");

                doc.onclick = (function () {
                    let selectedYear = i;
                    return function () {
                        year = selectedYear;
                        div_label.innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${year}`;
                        loadCalendarDays();
                        return year;
                    }
                })();

                div_dropdown.appendChild(doc);
            }

            div_filter.appendChild(div_label);
            div_filter.appendChild(div_dropdown);
            filters.appendChild(div_filter);
        }

        function loadCalendarMonths() {
            let div_filter = c('div');
            let div_label = c('div');
            let div_dropdown = c('div');

            div_label.className = 'filter-label';
            div_label.innerHTML = Calendar.months[currentmonth];
            div_label.addEventListener('click', function () {
                $(div_dropdown).toggle('fast');
            });

            div_dropdown.classList.add('calendar-years');
            div_dropdown.classList.add('years');
            div_dropdown.classList.add('dropdown');

            for (var i = 0; i < months.length; i++) {
                var doc = document.createElement("div");
                doc.innerHTML = months[i];
                doc.classList.add("dropdown-item");

                doc.onclick = (function () {
                    var selectedMonth = i;
                    return function () {
                        month = selectedMonth;
                        div_label.innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${months[month]}`;
                        loadCalendarDays();
                        return month;
                    }
                })();

                div_dropdown.appendChild(doc);
            }

            div_filter.appendChild(div_label);
            div_filter.appendChild(div_dropdown);
            filters.appendChild(div_filter);
        }
    }

    setDate(dt) {
        let element = this.e;
        // convert the date to js object
        // parse and check if on current month, otherwise ignore
        let d = new Date(dt);

        if (d.getMonth() != NaN) {
            if (month == d.getMonth()) {
                let _date = (month + 1) + '/' + d.getDate() + '/' + year;

                let day = d.getDate() - 1;
                selectedDay = _date;
                let days = element.querySelectorAll('.day');
                days.forEach(item => item.classList.remove('selected'));
                element.querySelector(`[data-day="${day}"]`).classList.add('selected');
            }
        }
    }

    static daysInMonth(month, year) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    }
}

Calendar.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
Calendar.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2000;
var endYear = 2020;
var month = 0;
var year = 0;
var selectedDays = new Array();
var selectedDay = '';

function loadCalendarMonths() {
    for (var i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${months[month]}`;
                loadCalendarDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(doc);
    }
}

function loadCalendarYears() {
    document.getElementById("years").innerHTML = "";

    for (var i = startYear; i <= endYear; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${year}`;
                loadCalendarDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(doc);
    }
}

function loadCalendarDays() {
    document.getElementById("calendarDays").innerHTML = "";

    var tmpDate = new Date(year, month, 0);
    var num = daysInMonth(month, year);
    var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

    for (var i = 0; i <= dayofweek; i++) {
        var d = document.createElement("div");
        d.classList.add("day");
        d.classList.add("blank");
        document.getElementById("calendarDays").appendChild(d);
    }

    for (var i = 0; i < num; i++) {
        var tmp = i + 1;
        var d = document.createElement("div");
        d.id = "calendarday_" + i;
        d.className = "day";
        d.innerHTML = tmp;
        d.dataset.day = tmp;

        /* ****************** Single Day Event ********************** */
        d.addEventListener('click', function () {
            let _date = (month + 1) + '/' + this.dataset.day + '/' + year;

            if (selectedDay == _date) {
                selectedDay = '';
                this.classList.toggle('selected');
            } else {
                selectedDay = _date;
                var days = document.querySelectorAll('.day');
                days.forEach(item => item.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
        /* **************************************************** */

        document.getElementById("calendarDays").appendChild(d);
    }

    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year)
{
    var d = new Date(year, month+1, 0);
    return d.getDate();
}

function setDate(dt) {
    // convert the date to js object
    // parse and check if on current month, otherwise ignore
    let d = new Date(dt);

    if (d.getMonth() != NaN) {
        if (month == d.getMonth()) {
            let _date = (month + 1) + '/' + d.getDate() + '/' + year;

            var day = d.getDate() - 1;
            selectedDay = _date;
            var days = document.querySelectorAll('.day');
            days.forEach(item => item.classList.remove('selected'));
            document.getElementById(`calendarday_${day}`).classList.add('selected');
        }
    }
}

window.addEventListener('load', function () {
    //var date = new Date();
    //month = date.getMonth();
    //year = date.getFullYear();
    //document.getElementById("curMonth").innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${months[month]}`;
    //document.getElementById("curYear").innerHTML = `<span class='fa fa-caret-down fa-fw'></span> ${year}`;
    //loadCalendarMonths();
    //loadCalendarYears();
    //loadCalendarDays();
});