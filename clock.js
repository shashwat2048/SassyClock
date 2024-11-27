setInterval(()=>{
    displayTime();
},1000);

let format = true;
document.getElementById("formatBtn").addEventListener("click",()=>{
    if(format == true){format = false;}
    else{format = true;}
})

function displayTime(){
    const d = new Date();
    let timeString = d.toLocaleString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: format
    });
    const [date, time] = timeString.split(" at ");
    timeContainer.textContent = time;
    dateContainer.textContent = date;
}