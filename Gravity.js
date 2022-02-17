
let canvas;
let ctx;
let drawTimerID;    //描画タイマー
let raiseTimerID;   //上昇タイマー
let dropTimerID;    //下降タイマー
let blockTimerID;   //障害物生成タイマー

let ballX = 150;
let ballY = [];
let ballDY = 1;
let ballTrajectory = 1;
let s_time = new Date();
let time = 0;
let distance = 0;
let block = [];
const ballRadius = 2;   //ボール半径 -> 描画方法をarcからfillRectに変えたので矩形の縦横の値
const GRAVITY = 0.0098; //重力加速度
const CPS = 2;          //操作タイマーの周期
const FPS = 6;         //描画タイマーの周期
const BLOCK_HEIGHT = 80;



//初期化処理（キャンバス初期化　イベントリスナー初期化）
function initialize() {
    //キャンバス要素の取得
    canvas = document.getElementById("myCanvas");
    
    // canvas.getContextは戻り値にオブジェクトを返す
    // if文の条件式においてオブジェクトはtrueとみなされる
    // （falseとみなされる値のほかはすべてtrueとみなされる）
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if(distance != 0){
            ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("Score: " + distance,100,200);
        }
    
        ctx.font = "18px 'ＭＳ ゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("画面をクリックでスタート", 100, 300);
    } else {
        return;
    }

    //ボール位置の初期化
    ballY[0] = 100;
    //落下速度の初期化
    ballDY = 0;
    for(i=1; i<=ballTrajectory; i++) {
        ballY[i] = -10;
    }
    //クリックでスタートの処理
    canvas.addEventListener('click', startGame, false);
}


//ゲームスタート
function startGame(){
    distance = 0;
    //キャンバス黒塗り
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //クリックのイベントリスナー解除
    canvas.removeEventListener("click", startGame, false);
    //マウスup/downのイベントリスナー設定
    canvas.addEventListener("mousedown", raiseBall, false);
    canvas.addEventListener("mouseup", dropBall, false);
    //drop/raiseのタイマー設定
    dropTimerID = setInterval(() => {ballDY += GRAVITY }, CPS);
    drawTimerID = setInterval(drawBall, FPS);
    blockTimerID = setTimeout(generateBlock, 2000);

}


//マウスのボタンが押されたときの処理
function raiseBall(e){
    //マウスの左ボタン .button == 0
    if(e.button == 0){
        clearInterval(dropTimerID);
        raiseTimerID = setInterval(() => {ballDY -= GRAVITY}, CPS);
    }
}


//マウスのボタンが離されたときの処理
function dropBall(e){
    if(e.button == 0){
        clearInterval(raiseTimerID);
        dropTimerID = setInterval(() => {ballDY += GRAVITY}, CPS);
    }
}


//ボール描画
function drawBall(){
        if(ballTrajectory > canvas.width/2) ballTrajectory = canvas.width/2;   

        // ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        for(let i=0; i<ballTrajectory; i++){
            // arcは描画が遅い？Rectにしてみる
            // ctx.arc(ballX-i, ballY[i], ballRadius, 0, Math.PI*2);
            // ctx.fill();
            ctx.fillRect(ballX-i, ballY[i], ballRadius, ballRadius);
        }
        // ctx.closePath();

        for (let i=ballTrajectory; i>0; i--){
            ballY[i] = ballY[i-1];
        }
        ballY[0] += ballDY;
        ballTrajectory++;
        distance++;
        drawDistance();
        drawBlock();
        
        if(ballY[0] >= (canvas.height-ballRadius) || ballY[0]<ballRadius) resetGame();
}

//障害物を作りたい
function generateBlock(){
    let height = canvas.height * Math.random();
    block[0] = height;
    console.log(block[0]);

    blockTimerID = setTimeout(generateBlock, 2000);
}

function drawBlock(){
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    // for (let i=0; i<canvas.width; i++){
        ctx.fillRect(canvas.width/2, block[0],20,160);
    // }
    ctx.closePath();
}


//スコア（距離）の描画
function drawDistance(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + distance, 10,20);
}

//リセット処理
function resetGame(){
    clearInterval(drawTimerID);
    clearInterval(raiseTimerID);
    clearInterval(dropTimerID);
    canvas.removeEventListener("mousedown", raiseBall, false);
    canvas.removeEventListener("mouseup", dropBall, false);
    initialize();
}





// ロードされたときの処理
window.addEventListener('load', initialize, false);
