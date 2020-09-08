let session_length = 30;
let break_length = 5;

document.getElementById('session-length').innerHTML = session_length;
document.getElementById('break-length').innerHTML = break_length;
document.getElementById('minutes').innerHTML = session_length;


//for incrementing and decrementing the session lengths
let regulateSessionLength = (operation_type) => {
    
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
    session_length = 30;
    break_length = 5;

    document.getElementById('session-length').innerHTML = session_length;
    document.getElementById('break-length').innerHTML = break_length;
    document.getElementById('minutes').innerHTML = session_length;
}


let runTimer = () => {
    console.log(session_length);
}