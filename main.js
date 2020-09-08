let session_length = 30;
let break_length = 5;
let timer_run_status = false;
let intervalFunction;

document.getElementById('session-length').innerHTML = session_length;
document.getElementById('break-length').innerHTML = break_length;
document.getElementById('minutes').innerHTML = session_length;


//for incrementing and decrementing the session lengths
let regulateSessionLength = (operation_type) => {
    if(timer_run_status){
        return;
    }
    
    if(operation_type == "plus"){
        session_length++; 
    }
    else if(operation_type == "minus"){
        if(session_length <= 1){
            return;
        }
        session_length--; 
    }

    document.getElementById('session-length').innerHTML = session_length;
    document.getElementById('minutes').innerHTML = session_length;
}

//for incrementing and decrementing the break lengths
let regulateBreakLength = (operation_type) => {

    if(timer_run_status){
        return;
    }
    
    if(operation_type == "plus"){
        break_length++; 
    }
    else if(operation_type == "minus"){
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

    session_length = 30;
    break_length = 5;

    document.getElementById('session-length').innerHTML = session_length;
    document.getElementById('break-length').innerHTML = break_length;
    document.getElementById('minutes').innerHTML = session_length;
    document.getElementById('seconds').innerHTML = '00';

    document.getElementById('play-pause-icon').classList.remove('fas', 'fa-pause');
    document.getElementById('play-pause-icon').classList.add('fas', 'fa-play');

 
}


let runTimer = () => {
    timer_run_status= !timer_run_status;
  
    if(timer_run_status){
        document.getElementById('play-pause-icon').classList.remove('fas', 'fa-play');
        document.getElementById('play-pause-icon').classList.add('fas', 'fa-pause');
        console.log('set interval');
        intervalFunction = setInterval(updateTimeEverySecond, 1000);
    }
    else{
        document.getElementById('play-pause-icon').classList.remove('fas', 'fa-pause');
        document.getElementById('play-pause-icon').classList.add('fas', 'fa-play');
        console.log('Clear Interval')
        clearInterval(intervalFunction);
    }
    
}


let updateTimeEverySecond = () => {
    let total_seconds = session_length * 60 - 1 ;
    let minutes = Math.floor(total_seconds / 60);
    let seconds = Math.floor(total_seconds) - minutes * 60;

    document.getElementById('minutes').innerHTML = minutes.toString().length <= 1 ? '0'+minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds.toString().length <= 1 ? '0'+seconds : seconds;

    session_length = minutes + (seconds / 60);
}