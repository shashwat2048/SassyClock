const startBtn = document.getElementById("start");
const endBtn = document.getElementById("end");
const timer = document.getElementById("timerBox");
const submitBtn = document.getElementById("submit-Btn");
const inputForm = document.getElementById("time-input-form");
const stopBtn = document.createElement("button");
stopBtn.textContent = "stop";
stopBtn.id = "stop";
let h=0,m=0,s=0;
let t;
const hIn = document.getElementById("hrs");
const mIn = document.getElementById("mins");
const sIn =document.getElementById("secs");
timer.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}`;
submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    h = Number(hIn.value) ;
    m = Number(mIn.value) ;
    s = Number(sIn.value) ;
    if (h < 0 || h > 99) {
        alert("Hours must be between 0 and 99");
        return;
    }

    if (m < 0 || m > 59) {
        alert("Minutes must be between 0 and 59");
        return;
    }

    if (s < 0 || s > 59) {
        alert("Seconds must be between 0 and 59");
        return;
    }

    timer.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}`;
    hIn.value = "", mIn.value = "", sIn.value = "";
})

startBtn.addEventListener("click", ()=>{
    startBtn.replaceWith(stopBtn);
    timer.classList.add("glow"); 
    inputForm.style.display = "none";
    t = setInterval(()=>{
        s--;
        if(s<0){
            m--;
            s=59;
        }
        if(m<0){
            h--;
            m=59;
        }
        if(h<0){
            endBtn.click();
        }
        timer.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}`;
    },1000)
})

stopBtn.addEventListener("click",()=>{
    clearInterval(t);
    stopBtn.replaceWith(startBtn);
    timer.classList.remove("glow");
})

endBtn.addEventListener("click",()=>{
    stopBtn.click();
    inputForm.style.display = "block";
    h=0,m=0,s=0;
    timer.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}`;
})