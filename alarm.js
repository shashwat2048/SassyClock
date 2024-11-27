const aName = document.getElementById("alarm-name");
const aTime = document.getElementById("alarm-time");
const aSound = document.getElementById("alarm-sound");
const rDays = document.getElementById("repeat-days");
const setAlarm = document.getElementById("set-alarm-btn");
const alist = document.getElementById("alarm-list");
const deleteAllBtn = document.getElementById("deleteAll");
const ipForm = document.getElementById("alarm-input-form");
const setBtn = document.getElementById("setBtn");
const aNum = document.getElementById("aNum");
let alarmChecker;
let isPlaying = false;
const activeAlarms = {}; 
deleteAllBtn.hidden = true;
ipForm.style.display = "none";
setBtn.style.display = "flex";
setBtn.addEventListener("click", () => {
    setBtn.style.display = "none";
    ipForm.style.display = "flex";
});

setAlarm.addEventListener("click", (e) => {
    e.preventDefault();
    ipForm.style.display = "none";
    setBtn.style.display = "flex";

    let alarmTime = aTime.value;
    let alarmSound = aSound.value || "default";
    let alarmName = aName.value || "Unnamed Alarm";
    let repDays = [];
    let active = true;
    if(alarmTime == ""){
        return alert("time can't be empty");
    }
    let checkBoxes = ipForm.querySelectorAll('input[type="checkbox"]:checked');
    checkBoxes.forEach((checkBox) => {
        repDays.push(checkBox.value);
    });

    let alarm = {
        id: Date.now(),
        time: alarmTime,
        name: alarmName,
        sound: alarmSound,
        repeat: repDays,
        isActive: active,
    };

    let alarms = getAlarmsFromLocalStorage();
    alarms.push(alarm);
    localStorage.setItem("alarms", JSON.stringify(alarms));
    updateAlarmList();
});

function getAlarmsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("alarms")) || [];
}

function updateAlarmList() {
    const alarmList = getAlarmsFromLocalStorage();
    alist.innerHTML = "";

    alarmList.forEach((alarm, index) => {
        let alarmCard = document.createElement("li");
        alarmCard.classList.add("alarmCard");
        alarmCard.innerHTML = `
            <div class="alarm-details">
                <h3 class="alarm-time">${alarm.time}</h3>
                <p class="alarm-name">${alarm.name}</p>
                <p class="alarm-days">Repeats: ${
                    alarm.repeat.length > 0 ? alarm.repeat.join(", ") : "None"
                }</p>
            </div>
            <div class="alarm-controls">
                <button class="delete-btn" onClick="handleDelete(${index})">Delete</button>
                <button class="stop-btn" onClick="handleStop(${index})">Stop</button>
                <label class="switch">
                    <input type="checkbox" class="toggle-btn" ${
                        alarm.isActive ? "checked" : ""
                    } onClick="handleToggle(${index})">
                    <span class="slider"></span>
                </label>
            </div>
        `;
        alist.appendChild(alarmCard);
    });
    let alength = alarmList.length;
    deleteAllBtn.hidden = alength === 0;
    aNum.innerText = `[ ${alength} ]`
    startAlarmChecker();
}

function handleDelete(index) {
    let alarms = getAlarmsFromLocalStorage();
    let alarm = alarms[index];
    if (activeAlarms[alarm.id]) {
        activeAlarms[alarm.id].pause();
        delete activeAlarms[alarm.id];
    }
    alarms.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarms));
    updateAlarmList();
}

function handleToggle(index) {
    let alarms = getAlarmsFromLocalStorage();
    alarms[index].isActive = !alarms[index].isActive;
    localStorage.setItem("alarms", JSON.stringify(alarms));
    updateAlarmList()
}

deleteAllBtn.addEventListener("click", () => {
    for (const alarmId in activeAlarms) {
        activeAlarms[alarmId].pause();
    }
    localStorage.clear();
    updateAlarmList();
});

function startAlarmChecker() {
    if (alarmChecker) {
        clearInterval(alarmChecker);
    }
    alarmChecker = setInterval(checkAlarms, 1000);
}

function checkAlarms() {
    const alarms = getAlarmsFromLocalStorage();
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDay = now.toLocaleString("en-us", { weekday: "short" }).toLowerCase();

    alarms.forEach((alarm) => {
        if (alarm.isActive && !isPlaying) {
            const isRepeatToday = alarm.repeat.includes(currentDay) || alarm.repeat.length === 0;
            if (alarm.time === currentTime && isRepeatToday) {
                activateAlarm(alarm);
                if (alarm.repeat.length === 0) {
                    alarm.isActive = false;
                    localStorage.setItem("alarms", JSON.stringify(alarms));
                }
            }
        }
    });
}

function activateAlarm(alarm) {
    if (isPlaying) return; 
    const alarmSound = new Audio(alarm.sound);
    alarmSound.loop = true;
    alarmSound.play();

    isPlaying = true;
    activeAlarms[alarm.id] = alarmSound;

    setTimeout(() => {
        if (activeAlarms[alarm.id]) {
            activeAlarms[alarm.id].pause();
            activeAlarms[alarm.id].currentTime = 0;
            delete activeAlarms[alarm.id];
        }
        isPlaying = false;
    }, 60000);
}

//  alert(`Alarm "${alarm.name}" is ringing!`);

function handleStop(index) {
    let alarms = getAlarmsFromLocalStorage();
    let alarm = alarms[index];
    if (activeAlarms[alarm.id]) {
        activeAlarms[alarm.id].pause();
        activeAlarms[alarm.id].currentTime = 0;
        delete activeAlarms[alarm.id];
    }
    isPlaying = false;
    updateAlarmList();
}

updateAlarmList();