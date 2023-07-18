const $ = document.querySelector.bind(document);
var start = document.getElementById('start-btn');
var stop = document.getElementById('stop-btn');
var reset = document.getElementById('reset-btn');
var focus_time = document.getElementById('focus-option');
var rest_time = document.getElementById('rest-option');
var minutes_f = document.getElementById('minutes_f');
var seconds_f = document.getElementById('seconds_f');
var minutes_r = document.getElementById('minutes_r');
var seconds_r = document.getElementById('seconds_r');
var setFocusTime = focus_time.value;
var setRestTime = rest_time.value;
var interval;
var state = true;

window.onload = () => {
    minutes_f.textContent = setFocusTime;
    minutes_r.textContent = '0' + setRestTime;
    seconds_f.textContent = '00';
    seconds_r.textContent = '00';
}

focus_time.addEventListener('click', getOptionFT);
function getOptionFT(){
    clearInterval(interval);
    minutes_f.textContent = focus_time.value;
    setFocusTime = focus_time.value;
    seconds_f.textContent = '00';

}

rest_time.addEventListener('click', getOptionRT);
function getOptionRT(){
    clearInterval(interval);
    minutes_r.textContent = rest_time.value;
    setRestTime = rest_time.value;
    seconds_r.textContent = '00';
}

function timeStart(){
    var sfInt = Number.parseInt(seconds_f.textContent);
    var srInt = Number.parseInt(seconds_r.textContent)
    var mfInt = Number.parseInt(minutes_f.textContent);
    var mrInt = Number.parseInt(minutes_r.textContent);
    var s = state === true ? sfInt : srInt;
    var m = state === true ? mfInt : mrInt;
    var audio = new Audio("assets/Danger Alarm Meme Sound Effect.mp3");

    if(m === 0 && s === 0 && state === true){
        $('.timer .clock-focus').classList.remove('active');
        $('.timer .clock-rest').classList.add('active');
        state = false;
        minutes_f.textContent = setFocusTime;
        audio.play();
    }
    else if(m === 0 && s === 0 && state === false){
        $('.timer .clock-focus').classList.add('active');
        $('.timer .clock-rest').classList.remove('active');
        state = true;
        minutes_r.textContent = setRestTime;
        audio.play();
    }

    if(s === 0){
        s = 59;
        m--;
    } 
    else s--;
    if(state === true){
        seconds_f.textContent = (s >= 0) && (s < 10) ? '0' + s.toString() : s.toString();
        if(m >= 0){
            minutes_f.textContent = (m >= 0) && (m < 10) ? '0' + m.toString() : m.toString();
        } 
    }
    else{
        seconds_r.textContent = (s >= 0) && (s < 10) ? '0' + s.toString() : s.toString();
        if(m >= 0){
            minutes_r.textContent = (m >= 0) && (m < 10) ? '0' + m.toString() : m.toString();
        } 
    }
}

start.onclick = function(){
    interval = setInterval(timeStart,1000);
    $('.btn-section #start-btn').classList.remove('active_btn');
    $('.btn-section #stop-btn').classList.add('active_btn');
}

stop.onclick = function(){
    clearInterval(interval);
    $('.btn-section #start-btn').classList.add('active_btn');
    $('.btn-section #stop-btn').classList.remove('active_btn');
}

reset.onclick = function(){
    clearInterval(interval);
    minutes_f.textContent = focus_time.value;
    minutes_r.textContent = rest_time.value;
    seconds_f.textContent = '00';
    seconds_r.textContent = '00';
}

