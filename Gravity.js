
let canvas;
let ctx;

let ballX = 200;
let ballY = 100;
let ballDY = 1;
let s_time = new Date();
let time = 0;
const GRAVITY = 0.098;



//初期化処理（キャンバス初期化　イベントリスナー初期化）
function initialize() {


    canvas = document.getElementById("myCanvas");

    // canvas.getContextは戻り値にオブジェクトを返す
    // if文の条件式においてオブジェクトはtrueとみなされる
    // （falseとみなされる値のほかはすべてtrueとみなされる）
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = "18px 'ＭＳ ゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("画面をクリックでスタート", 100, 300);
    } else {
        return;
    }

    canvas.addEventListener('click', startGame, false);
}

function drawBall(){
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

        ctx.beginPath();
        ctx.arc(ballX, ballY, 5, 0, Math.PI*2)
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
}

function fall(){
    time = (new Date() - s_time)/1000;
    ballDY += GRAVITY * time;
    ballY += ballDY;
}

function collisionDetection(){
    if (ballY >= canvas.height - 5) ballDY = -ballDY;
    if (ballY >= canvas.height + 10) resetGame();
}

function mouseDownHandler(e){
    // if (e.button == 0){
    //     time = (new Date() - s_time)/1000;
    //     // ballDY = -Math.abs(ballDY);
    //     ballDY -= GRAVITY *time;
    //     ballY += ballDY;

    // }
}


function resetGame(){
    initialize();
}


function startGame(){
    canvas.removeEventListener('click', startGame, false);
    drawBall();
    fall();
    collisionDetection();
    // requestAnimationFrame(startGame);
    // console.log(ballY + " : " + ballDY);
}


// ロードされたとき
window.addEventListener('load', initialize, false);
