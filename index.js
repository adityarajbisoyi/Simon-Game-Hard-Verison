var requiredInput = [];
var given = ["green","red","yellow","blue"];
var count = 0;
var level = 1;

function pickOne(){
    var num = Math.floor(Math.random()*(given.length));
    var choosenColor =  given[num];
    playSound(choosenColor);
    flash(choosenColor);
    return choosenColor;
}


function appendRequiredInput(ri){
    requiredInput.push(ri);
}



function levelUp(){
    console.log("Great,try your meomry from start");
    setTimeout(appendRequiredInput(pickOne()),1000);
    level++;
    count = 0;
    console.log(requiredInput);
    $("#level-title").text("Your Current Level is "+level);
    
}
function retry(){
    count = 0;
    level = 1;
    console.log("Wrong Pattern, Lets start from begining");
    $("#level-title").text("Give Your Best,Your Current Level is "+level);

    requiredInput = [];
    appendRequiredInput(pickOne());
    console.log(requiredInput);
}


function makeGameOver(){
    $("#level-title").text("Game Over!, press any key to restart");
    playSound("wrong");
    flash("body");
    requiredInput=["black"];
    bgAnimate();
    setTimeout(bgAnimate,280);

}

function playSound(key){
    var audio = new Audio("sounds/"+ key+".mp3");
    audio.play();
}

function flash(color){
    var choosensId = "#" + color;
    $(choosensId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$("body").on("keydown",function(){
    retry();
}
)



$(".btn").on("click",function(){
    var userChoice =  this.id;
    playSound(userChoice);
    flash(userChoice);
    if(count < requiredInput.length){
        if(userChoice===requiredInput[count]){
            count++;
            console.log("you clicked "+ userChoice);
            if(count===requiredInput.length){
                setTimeout(levelUp,1000);
            }
        }
        else{
            makeGameOver();
            // setTimeout(retry,1000);
        }
    }
})

function bgAnimate(){
    $("body").toggleClass("red-background");
}