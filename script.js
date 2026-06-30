function updateClock() {

const now = new Date();

document.getElementById("clock").innerHTML =
now.toLocaleString(undefined, {
weekday:"long",
year:"numeric",
month:"long",
day:"numeric",
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
});

document.getElementById("timezone").innerHTML =
"Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone;

}

setInterval(updateClock, 1000);
updateClock();


// 🌍 Convert event time → local time
function showLocal(dateStr, id) {
    const d = new Date(dateStr);

    document.getElementById(id).innerHTML =
        d.toLocaleString(undefined, {
            weekday:"short",
            hour:"2-digit",
            minute:"2-digit"
        });
}

showLocal("2026-08-02T19:00:00", "local1");
showLocal("2026-08-09T19:30:00", "local2");
showLocal("2026-08-16T19:00:00", "local3");


// 📅 Add to Calendar (iOS + Android)
function addToCalendar(title, location, start, end) {

const ics =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
LOCATION:${location}
DTSTART:${format(start)}
DTEND:${format(end)}
DESCRIPTION:Concert Event
END:VEVENT
END:VCALENDAR`;

const blob = new Blob([ics], {type:"text/calendar"});
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "event.ics";
a.click();

}

// format date for calendar
function format(dateStr){
return new Date(dateStr)
.toISOString()
.replace(/[-:]/g,"")
.split(".")[0]+"Z";
}
