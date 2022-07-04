var rod=document.querySelectorAll(".rod");
var circle=document.querySelector(".circle")

console.log("window width : ",window.innerWidth);

var middlePosForRods= (window.innerWidth-200)/2;
var middlePosForCircle=(window.innerWidth-25)/2;
rod[0].style.left=middlePosForRods+'px';
rod[1].style.left=middlePosForRods+'px';
var rodHeight=rod[0].getBoundingClientRect().height;
circle.style.top=rodHeight+'px';
circle.style.left=middlePosForCircle+'px';

(function (){
    var maxScore=localStorage.getItem("maxScore");
    if(maxScore===null){
        alert("Welcome! First time you are playing the game, LET'S START! ");
        maxScore=0;
    }
    else{
        alert("your max score is : "+maxScore);
    }
    movingBall();
})()


document.addEventListener("keypress",function(e){
    moveRods(e);
    
})

function moveRods(e){
    var r = rod[0].getBoundingClientRect();
    let rodSpeed=10;
    if(e.key=='d'){
        if((r.x+r.width+rodSpeed)<window.innerWidth){
            for(let x of rod){
                x.style.left= (r.x)+rodSpeed+'px';
            }
        }
    }
    if(e.key=='a'){
        if((r.x-rodSpeed)>0){
            for(let x of rod){
                x.style.left= (r.x)-rodSpeed+'px';
            }
        }
    }
}


function movingBall(){
    var dirl=1;
    var dirt=1;
    var tempScore=0;
    var ballMove= setInterval(() => {
        var c = circle.getBoundingClientRect();
        var rodPos=rod[0].getBoundingClientRect();
        var circleInnerHeight=(window.innerHeight-25);
        if(((c.x)+4)>(middlePosForCircle*2)){
            dirl=2;
        }
        if(((c.x)-4)<0){
            dirl=1;
        }
        if(((c.top)+4)>(circleInnerHeight-rodPos.height)){
            dirt=2
        }
        if(((c.top)-4)<rodHeight){
            dirt=1
        }
        if(c.x<rodPos.x && ((c.top)-4)<rodHeight){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is : "+tempScore);
            }
            else if(localStorage.getItem('maxScore')>=tempScore){
                alert("score is : "+tempScore);
            }
        }
        
        if(c.x<rodPos.x && ((c.top)+4)>circleInnerHeight-rodPos.height){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is : "+tempScore);
            }
            else if(localStorage.getItem('maxScore')>=tempScore){
                alert("score is : "+tempScore);
            }
        }
        
        
        if(c.x>rodPos.x && c.x>(rodPos.x)+200 ){
            if(((c.top)+4)>circleInnerHeight-rodPos.height){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is : "+tempScore);
            }
            else if(localStorage.getItem('maxScore')>tempScore){
                alert("score is : "+tempScore);
            }
            }
            
        }
        if(c.x>rodPos.x && c.x<(rodPos.x)+200 ){
            if(((c.top)+4)>circleInnerHeight){          
            tempScore+=5;
            }
        }
        if(c.x>rodPos.x && c.x>(rodPos.x)+200 ){
            if(((c.top)-4)<rodHeight){
                clearInterval(ballMove);
                if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                    localStorage.setItem("maxScore",tempScore);
                    alert("score is : "+tempScore);
                }
                else if(localStorage.getItem('maxScore')>tempScore){
                    alert("score is : "+tempScore);
                }
            }
            
            
        }
        if(c.x>rodPos.x && c.x<(rodPos.x)+200 ){
            if(((c.top)-4)<rodHeight){
                tempScore+=5;
            }
            
        }

        if(dirt==1 && dirl===1 ){
            circle.style.left=(c.x)+4+'px';
            circle.style.top=(c.top)+4+'px';
        }
        else if (dirt===2 && dirl===1){
            circle.style.left=(c.x)+4+'px';
            circle.style.top=(c.top)-4+'px';
        }
        else if (dirt===1 && dirl===2){
            circle.style.left=(c.x)-4+'px';
            circle.style.top=(c.top)+4+'px';
        }
        else if (dirt===2 && dirl===2){
            circle.style.left=(c.x)-4+'px';
            circle.style.top=(c.top)-4+'px';
        }
        
        
        }, 25);
};