let hrs = document.getElementById("clock_hrs");
let min = document.getElementById("clock_min");
let sec = document.getElementById("clock_sec");
const hourInput = document.getElementById("hours");
const minuteInput = document.getElementById("minuts");
const activeAlarms = document.querySelector(".activeAlaramList");

const addAlarm = document.getElementById("add_btn");
let alarmsArray = [];
let alarmSound = new Audio(
  "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg"
);
let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;
//Get Time and show
setInterval(() => {
  let currentDateTime = new Date();
  let hours =
    (currentDateTime.getHours() < 10 ? "0" : "") + currentDateTime.getHours();
  let minutes =
    (currentDateTime.getMinutes() < 10 ? "0" : "") +
    currentDateTime.getMinutes();
  let seconds =
    (currentDateTime.getSeconds() < 10 ? "0" : "") +
    currentDateTime.getSeconds();

  hrs.innerHTML = hours;
  min.innerHTML = minutes;
  sec.innerHTML = seconds;

  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}, 1000);

//set root variable value of css
function setRootV() {
var clientHeight = document.getElementById("clock").clientHeight;
document.documentElement.style.setProperty("--top", clientHeight - 65 + "px");
}

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = inputValue < 10 ? "0" + inputValue : inputValue;
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div
const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
  setRootV();
};

//Add Alarm
addAlarm.addEventListener("click", () => {
  alarmIndex += 1;
  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = initialHour < 10 ? "0" + initialHour : initialHour;
  minuteInput.value = initialMinute < 10 ? "0" + initialMinute : initialMinute;
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    if (obj.isActive == true) {
        alarmsArray[index].isActive = false;
        alarmSound.pause();
    }
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
    setRootV();
  }
};

window.onload = () => {
    setRootV();
};