let gameSeq=[];
let userSeq=[];

let btns=["purple","red","yellow","blue"]; // array store color values of button  

let started =false;
let level =0;
let h2=document.querySelector("h2");
// game started after presing a key 
document.addEventListener("keypress", function (){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});


// to automatically flash any random button and change its  background color when any key is pressed to start a game 
function gameFlash(btn) {
    btn.classList.add("flash");// adding class flash in the button 
    setTimeout(function () {
        btn.classList.remove("flash");// removing flash class from the button 
    }, 250);// remove flash after 0.25 sec 
}

//to  change color when user press a button and flash 
function userFlash(btn) {
    btn.classList.add("userFlash");// adding class flash in the button 
    setTimeout(function ()  {
        btn.classList.remove("userFlash");// removing flash class from the button 
    }, 250);// remove flash after 0.25 sec 
}


// after every click level up 
function levelUp(){
    //after level up user sequence resets and user has to again  press things from start 
    // means press all the colors of prevoius leval and then new flashed item to inccrease level 
    userSeq=[];
    level++;
    h2.innerText=`Level${level}`;
    // game choose a random button then it will flash it 

    let randIdx=Math.floor(Math.random()*3);// choosing a random index to choose a color using a variable 
    let randColor=btns[randIdx]; // choosing a random color in array 
    let randBtn=document.querySelector(`.${randColor}`); // jo bhi color aaya hai randidx se us class ka button access kar sakte hai 
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    // as soon as game sequence is generated push it in the game sequence
    gameSeq.push(randColor);
    console.log(gameSeq); 
    gameFlash(randBtn); // to flash a button 

}
// to check if the user seq and game seq is equal or not 
function checkAns(idx) {
    // console.log("check level : ",level);
    // let idx=level-1; it is a fixed index 
    if (userSeq[idx]===gameSeq[idx]) {
        // console.log("same value");
        if(userSeq.length==gameSeq.length){
            // increase level 
            setTimeout(levelUp,1000);

        }
        // we need to find current level that we are checking on which index 


        
    }else{
        // to display the score or the level we have reached 
        h2.innerHTML=`Game Over ! Your score was <b>${level}</b> <br> Press any key to start`;
        // to make the background color red as soon as we press the key
        document.querySelector("body").style.backgroundColor="red"; 
        setTimeout( function() {
            // reset backgroundcolor back to white after 0.15 ms 
            document.querySelector("body").style.backgroundColor="white"; 


        }, 150); 
        reset();
    }


}

// detecting which button is pressed 
// so that clash dont happen 
function btnPress() {
    // console.log(this);
// jo button ham click karenge whi flash hoga 
    let btn=this;
    userFlash(btn);

    // as the user presses a button then the user button is added in user sequence  
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    // pass those index in which user color is pushed 
    checkAns(userSeq.length-1); //passing the last index to check the last button we have pressed  


}

// accesing all buttons from index.html 
let allBtns=document.querySelectorAll(".btn");// selcting all buttons who has this class
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
//to reset the game when user press a wrong option 
function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    


}