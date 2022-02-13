
let canvas;
let ctx;
let drawTimerID;    //描画タイマー
let raiseTimerID;   //上昇タイマー
let dropTimerID;    //下降タイマー

let ballX = 200;
let ballY = 100;
let ballDY = 1;
let s_time = new Date();
let time = 0;
const ballRadius = 2;   //ボール半径
const GRAVITY = 0.0098; //重力加速度
const CPS = 1;          //操作タイマーの周期
const FPS = 10;         //描画タイマーの周期



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
    
        ctx.font = "18px 'ＭＳ ゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("画面をクリックでスタート", 100, 300);
    } else {
        return;
    }

    //ボール位置の初期化
    ballY = 100;

    //落下速度の初期化
    ballDY = 0;

    //クリックでスタートの処理
    canvas.addEventListener('click', startGame, false);
}

//ゲームスタート
function startGame(){
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

    // collisionDetection();
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
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
        ctx.fill();
        ctx.closePath();

        ballY += ballDY;

        if(ballY >= (canvas.height-ballRadius) || ballY<ballRadius) resetGame();
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
