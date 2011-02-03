// 計分版
// 要實作的功能 
// [done]a. 打字速度α： (字/分)，利用 timer 每秒計算
// [done]b. 正確率β：(正確的字數/已經打過的字數)
// [done]c. 錯誤率：1 - 正確率
// d. 計分公式：滿分 100 分
//    α >= 100 
//    α >= 70
//    α >= 40
//    α >= 10
// 

// typeSpeed       => 打字速度 (字/分)
// correctRatio    => 正確率 (正確字數/所有字數)
// incorrectRatio  => 錯誤率 (1-正確率)
// passedTime      => 經過時間 (sec)
// correctWord     => 正確字數
// incorrectWord   => 錯誤字數
// totalWord       => 所有字數

// modify board info periodly (1s)
// use a global timer to register this function 
function updateBoardInfo()
{
  if (questionReady && !gamePause && !gameOver) {
    modifySpeed();
    modifyCorrectRatio();
    modifyIncorrectRatio();
    modifyFinishRatio();
    HTML_modify_score_board();
  }
/*  console.log("速率： "+typeSpeed);
  console.log("正確率： "+correctRatio);
  console.log("錯誤率： "+incorrectRatio);
  console.log("經過時間： "+passedTime);
  console.log("正確字數： "+correctWord);
  console.log("錯誤字數： "+incorrectWord);
  console.log("所有字數： "+totalWord);*/
}

function updatePassedTime()
{
  if (questionReady && !gamePause && !gameOver) {
    passedTimeIncrease();
  }
}

function HTML_modify_score_board()
{
  $("#typeSpeed").html(typeSpeed);
  $("#correctRatio").html(correctRatio);
  $("#incorrectRatio").html(incorrectRatio);
  $("#finishRatio").html(finishRatio);
  $("#passedTime").html( Math.floor(passedTime/60)+"分"+Math.floor(passedTime%60)+"秒" );
  $("#correctWord").html(correctWord);
  $("#incorrectWord").html(incorrectWord);
  $("#totalWord").html(totalWord+"/"+questionLength);
}

function modifySpeed()
{
  var min = (passedTime/60);

  if (min == 0) {
    typeSpeed = (0).toFixed( CONSTANT.TYPE_SPEED_PRECISION );
  }
  else {
    // Unit : words / min
    typeSpeed = (totalWord/min).toFixed( CONSTANT.TYPE_SPEED_PRECISION );
  }
}

function modifyCorrectRatio()
{
  if (totalWord == 0) {
    correctRatio = 0;
  }
  else {
    correctRatio = (100*(correctWord/totalWord)).toFixed( CONSTANT.RATIO_PRECISION );
  }
}

function modifyIncorrectRatio()
{
  if (totalWord == 0) {
    correctRatio = 0;
  }
  else {
    incorrectRatio = (100*(incorrectWord/totalWord)).toFixed( CONSTANT.RATIO_PRECISION );
  }
}

function modifyFinishRatio()
{
  if (totalWord == 0) {
    finishRatio = 0;
  }
  else {
    finishRatio = (100*(totalWord/questionLength)).toFixed( CONSTANT.RATIO_PRECISION );
  }
}

function wordIncrease(which)
{
  // The user's answer is correct
  if(true == which) {
    correctWordIncrease();
  }
  // Otherwise 
  else {
    incorrectWordIncrease(); 
  }

  // increase the total number of words at the same time
  totalWordIncrease();
}

function passedTimeIncrease()
{
  // in second
  if (typeof passedTime == 'undefined') {
    passedTime = 0;
  }
  passedTime ++;
}

function totalWordIncrease()
{
  if (typeof totalWord == 'undefined') {
    totalWord = 0;
  }
  totalWord ++;
}

function correctWordIncrease()
{
  if (typeof correctWord == 'undefined') {
    correctWord = 0;
  }
  correctWord ++;
}

function incorrectWordIncrease()
{
  if (typeof incorrectWord == 'undefined') {
    incorrectWord = 0;
  }
  incorrectWord ++;
}
