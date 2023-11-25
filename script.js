const popupboxEl=document.getElementById("popup-box");
const gameContainerEl=document.getElementById("game-container");
const resultContainerEl=document.getElementById('result');
const startBtnEl=document.getElementById("startBtn");
const scoreEl=document.getElementById("score");
const operand1El=document.getElementById("operand1");
const operand2El=document.getElementById("operand2");
const ansDisplayEl=document.getElementById("dispAns");
const inputedAnsEl=document.getElementById("answer");
const difficulty=document.getElementById("difficulty");
const time=document.getElementById("time");
const leftTimeEl=document.getElementById("time-left");
const submitBtnEl=document.getElementById("submitBtn");
const exitBtnEl=document.getElementById("exitBtn");
let score=0;
let answer;
let randDigit1;
let randDigit2,recall=0;
let totalQuestion=1,correctAnswer=0,wrongAnswer=0;
const resultTotalTimeEl=document.getElementById("totalTime");
const resultTotalQuetionEl=document.getElementById("totalQuest");
const resultTotalCorrectEl=document.getElementById("correct");
const resultTotalWrongEl=document.getElementById("wrong");
const resultTotalScoreEl=document.getElementById("totalScore");
const retryBtn=document.getElementById("retry");
const homeBtn=document.getElementById('home');
let unAttempt=0;
let tickTimeout,countdownTimeout;
let resetFun;
let totalTime;
var checkAns;
var timeInterval;

resetFun=()=>{
    score=0;
    scoreEl.innerText=(score<10)?"0"+score:score;
    totalQuestion=1,correctAnswer=0,wrongAnswer=0;
    inputedAnsEl.value="";
}
startBtnEl.addEventListener('click',startingPoint=()=>{
    resetFun();
    document.addEventListener('keypress',(key)=>{
        if(key.key=="Enter"){
            checkAns();
        }
    })
    totalTime=parseInt(time.value);
    popupboxEl.style.display="none";
    gameContainerEl.style.display="flex";
    countdown(totalTime);
    if(difficulty.value=="Easy"){
        easy();
        recall=0;
        inputedAnsEl.style.width="60%"
    }
    else if(difficulty.value=="Normal"){
        normal();
        recall=1;
        inputedAnsEl.style.width="55%"
    }
    else{
        hard(); 
        recall=2;
        inputedAnsEl.style.width="55%"
    }
})
function easy(){
    randDigit1=Math.floor(Math.random()*10+1);
    randDigit2=Math.floor(Math.random()*10+1);
    operand1El.innerText=randDigit1;
    operand2El.innerText=randDigit2;
    answer=(randDigit1+randDigit2);
}
function normal(){
    randDigit1=Math.floor(Math.random()*100+1);
    randDigit2=Math.floor(Math.random()*100+1);
    operand1El.innerText=randDigit1;
    operand2El.innerText=randDigit2;
    answer=(randDigit1+randDigit2);
}
function hard(){
    randDigit1=Math.floor(Math.random()*1000+1);
    randDigit2=Math.floor(Math.random()*1000+1);
    operand1El.innerText=randDigit1;
    operand2El.innerText=randDigit2;
    answer=(randDigit1+randDigit2);
}
exitBtnEl.addEventListener('click',()=>{
    gameContainerEl.style.display="none";
    popupboxEl.style.display="flex";
    clearInterval(timeInterval);
})

submitBtnEl.addEventListener('click',checkAns=()=>{
    if(inputedAnsEl.value==answer){
        ansDisplayEl.style.color="rgb(0,255,0)";
        ansDisplayEl.innerText="Correct Answer";
        score++;
        scoreEl.innerText=(score<10)?"0"+score:score;
        inputedAnsEl.value="";
        totalQuestion=totalQuestion+1;
        correctAnswer=correctAnswer+1;
        if(recall==0){
            setTimeout(()=>{
                easy();
            },200)
        }
        else if(recall==1){
            setTimeout(()=>{
                normal();
            },200)
        }
        else{
            setTimeout(()=>{
                hard();
            },200);
        }
        setTimeout(()=>{
            ansDisplayEl.innerHTML="";
        },500);    
    }
    else if(inputedAnsEl.value==""){
        ansDisplayEl.style.color="rgb(220,150,0)";
        ansDisplayEl.innerText="Please input your answer";
        setTimeout(()=>{
            ansDisplayEl.innerHTML="";
        },800);  
    }
    else{
        ansDisplayEl.style.color="rgb(255,0,0)";
        ansDisplayEl.innerText="Incorrect Answer Try Again!!!";
        inputedAnsEl.value=""; 
        totalQuestion=totalQuestion+1;
        if(recall==0){
            setTimeout(()=>{
                easy();
            },200)
        }
        else if(recall==1){
            setTimeout(()=>{
                normal();
            },200)
        }
        else{
            setTimeout(()=>{
                hard();
            },200);
        }
        setTimeout(()=>{
            ansDisplayEl.innerHTML="";
        },500);   
        wrongAnswer=wrongAnswer+1;
    }
})

function countdown(totalTime) {
    let timeLeft=totalTime;//60
    timeInterval;
    let seconds=timeLeft%60;
    let minutes=Math.floor(timeLeft/60);
    leftTimeEl.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`+" left";
    var updateTimerDisplay=()=>{
        minutes=Math.floor(timeLeft/60);
        seconds=timeLeft%60;
        leftTimeEl.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`+" left";
    }
    function startTimer(){
        timeInterval=setInterval(function(){
            if(timeLeft>0){
                timeLeft--;
                updateTimerDisplay();
            }
            else{
                gameContainerEl.style.display="none";
                resultContainerEl.style.display="flex";
                clearInterval(timeInterval);
                showResult();
            }
        },1000)
    }
    startTimer();
}
function showResult(){
    let time=totalTime;
    console.log(time)
    leftTimeEl.innerText=((time/60)<10?"0"+(time/60):(time/60)+":"((time%60)<10?"0"+(time%60):(time%60)));
    resultTotalQuetionEl.innerText=totalQuestion;
    resultTotalCorrectEl.innerText=correctAnswer;
    resultTotalWrongEl.innerText=wrongAnswer;
    resultTotalScoreEl.innerText=score;
}
homeBtn.addEventListener('click',()=>{
    gameContainerEl.style.display="none";
    resultContainerEl.style.display="none";
    popupboxEl.style.display="flex";
})
retryBtn.addEventListener('click',()=>{
    resultContainerEl.style.display="none";
    startingPoint();
})