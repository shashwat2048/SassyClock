const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const watch = document.getElementById("watchContainer");
const stopBtn = document.createElement("button");
stopBtn.textContent = "stop";
stopBtn.id = "stop";
let h=0,m=0,s=0,ms=0;
let timer;
startBtn.addEventListener("click", ()=>{
    startBtn.replaceWith(stopBtn);
    watch.classList.add("glow"); 
    timer = setInterval(()=>{
        ms++;
        if(ms>99){
            s++;
            ms=0;
        }
        if(s>59){
            m++;
            s=0;
        }
        if(m>59){
            h++;
            m=0;
        }
        watch.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}:${ms > 9 ? ms : "0"+ms}`;
    },10)
})

stopBtn.addEventListener("click",()=>{
    clearTimeout(timer);
    stopBtn.replaceWith(startBtn);
    watch.classList.remove("glow");
})

resetBtn.addEventListener("click",()=>{
    stopBtn.click();
    h=0,m=0,s=0,ms=0;
    watch.textContent = `${h > 9 ? h : "0"+h}:${m > 9 ? m : "0"+m}:${s > 9 ? s : "0"+s}:${ms > 9 ? ms : "0"+ms}`;
})
resetBtn.click();
