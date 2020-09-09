let session_length = 30;
let break_length = 5;
let duration_type = "Session";
let timer_run_status = false;
let session_time = true;
let time_type;
let intervalFunction;
let timer_status = "normal";

document.getElementById('session-length').innerHTML = session_length;
document.getElementById('break-length').innerHTML = break_length;
document.getElementById('minutes').innerHTML = session_length;
document.getElementById('seconds').innerHTML = "00";
document.getElementById('duration-type').innerHTML = duration_type;


//for incrementing and decrementing the session lengths
let regulateSessionLength = (operation_type) => {
    if(timer_status === "session_active"){
        return;
    }
    
    if(timer_run_status){
        return;
    }
   
    if(operation_type === "plus"){
        session_length++; 
    }
    else if(operation_type === "minus"){
        if(session_length <= 1){
            return;
        }
        session_length--; 
    }

    document.getElementById('session-length').innerHTML = session_length;
    if(timer_status === "normal"){
        document.getElementById('minutes').innerHTML = session_length;
    }
   
}

//for incrementing and decrementing the break lengths
let regulateBreakLength = (operation_type) => {

    if(timer_status == "break_active"){
        return;
    }
  

    if(timer_run_status){
        return;
    }

    
    
    if(operation_type === "plus"){
        break_length++; 
    }
    else if(operation_type === "minus"){
        if(break_length <= 1){
            return;
        }
        break_length--;   
    }

    document.getElementById('break-length').innerHTML = break_length;
}

//for resetting the values of break lengths and session length to default value
let resetTime = () => {

    clearInterval(intervalFunction);

    timer_run_status = false;
    timer_status = "normal";

    session_length = 30;
    break_length = 5;

    document.getElementById('session-length').innerHTML = session_length;
    document.getElementById('break-length').innerHTML = break_length;
    document.getElementById('minutes').innerHTML = session_length;
    document.getElementById('seconds').innerHTML = '00';

    document.getElementById('play-pause-icon').classList.remove('fas', 'fa-pause');
    document.getElementById('play-pause-icon').classList.add('fas', 'fa-play');

 
}

//for running the timer or stopping the time
let regulateTimer = () => {
    timer_run_status= !timer_run_status;   // for toggling timer run status on click of play/pause button
  
    if(timer_run_status){
        document.getElementById('play-pause-icon').classList.remove('fas', 'fa-play');
        document.getElementById('play-pause-icon').classList.add('fas', 'fa-pause');
        intervalFunction = setInterval(updateTimeEverySecond, 1000);
    }
    else{
        document.getElementById('play-pause-icon').classList.remove('fas', 'fa-pause');
        document.getElementById('play-pause-icon').classList.add('fas', 'fa-play');
        clearInterval(intervalFunction);
    }
    
}


let updateTimeEverySecond = () => {
    //if session time is active
    if(session_time){
        timer_status = "session_active";
        let total_seconds = session_length * 60 - 1 ;
        if(total_seconds >= 0){
            let minutes = Math.floor(total_seconds / 60);
            let seconds = Math.floor(total_seconds) - minutes * 60;
        
            document.getElementById('minutes').innerHTML = minutes.toString().length <= 1 ? '0'+minutes : minutes;
            document.getElementById('seconds').innerHTML = seconds.toString().length <= 1 ? '0'+seconds : seconds;
            session_length = minutes + (seconds / 60);
        }
        else{  //for updating break time for a second after session time becomes 0
            playAudio();  //for playing alarm

            break_length = Number(document.getElementById('break-length').textContent);
            session_time = false;
            timer_status = "break_active";
            duration_type="Break";
            total_seconds = break_length * 60 - 1 ;
    
            let minutes = Math.floor(total_seconds / 60);
            let seconds = Math.floor(total_seconds) - minutes * 60;
        
            document.getElementById('minutes').innerHTML = minutes.toString().length <= 1 ? '0'+minutes : minutes;
            document.getElementById('seconds').innerHTML = seconds.toString().length <= 1 ? '0'+seconds : seconds;
            document.getElementById('duration-type').innerHTML = duration_type;
            break_length = minutes + (seconds / 60);
           
        }
    }
    else{  //if break time is active
        let total_seconds = break_length * 60 - 1 ;
        timer_status = "break_active";
        if(total_seconds >= 0){
            let minutes = Math.floor(total_seconds / 60);
            let seconds = Math.floor(total_seconds) - minutes * 60;
        
            document.getElementById('minutes').innerHTML = minutes.toString().length <= 1 ? '0'+minutes : minutes;
            document.getElementById('seconds').innerHTML = seconds.toString().length <= 1 ? '0'+seconds : seconds;
            break_length = minutes + (seconds / 60);
        }
        else{   //for updating session time for a second after break time becomes 0
            playAudio(); //for playing alarm

            session_length = Number(document.getElementById('session-length').textContent);
            session_time = true;
            timer_status = "session_active";
            duration_type="Session";
            total_seconds = session_length * 60 - 1 ;
    
            let minutes = Math.floor(total_seconds / 60);
            let seconds = Math.floor(total_seconds) - minutes * 60;
        
            document.getElementById('minutes').innerHTML = minutes.toString().length <= 1 ? '0'+minutes : minutes;
            document.getElementById('seconds').innerHTML = seconds.toString().length <= 1 ? '0'+seconds : seconds;
            document.getElementById('duration-type').innerHTML = duration_type;
            session_length = minutes + (seconds / 60);
           
        }
    }
    
}

let playAudio = () => {
    var audio = new Audio('alarm-sound.mp3');
    audio.play();
}