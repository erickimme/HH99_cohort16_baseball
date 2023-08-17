// 1주차 야구게임 과제 
// Due: 2023.08.17 (Thurs) 21:00 
// 컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!
// 1번째 시도 : 134
// 0B0S
// 2번째 시도 : 238
// 1B1S
// 3번째 시도 : 820
// 2B1S
// 4번째 시도 : 028
// 3B
// 5번째 시도 : 280
// 3S
// 4번만에 맞히셨습니다. 
// 게임을 종료합니다.



// 게임 시작
console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");

// 컴퓨터 숫자 3자리 난수 만들기: 중복되는 숫자가 있는지 확인 후 있으면 다시 랜덤 생성
let ranNum;
generateRanNum();
let whileCnt = 1;
while (hasDuplicateCharacters(ranNum)){ // 3개 숫자 중에 중복되는 숫자가 나오면 숫자 생성을 계속 반복한다.
    // console.log(ranNum);
    generateRanNum()
    // while이 끝나는 조건
    if (!hasDuplicateCharacters(ranNum)){ // 3개 숫자 중 중복되는 숫자가 없으면 while에서 나온다
        // console.log("new: " + ranNum + "=> breaking while, " + "whileCnt: " + whileCnt);
        break;
    }
    whileCnt++;
}

// 사용자 맞추기 시도 인터페이스
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
rl.on("line", (line) => {
    // 입력 숫자: 한 줄씩 입력받은 후 실행할 코드, 입력된 값은 line에 저장된다.
    // console.log("line: " + line, typeof (line)); // string

    count++;
    // input 이 3자리가 아닐 시 에러
    let inputStrLength = line.length; 
    if (inputStrLength !== 3) {
        console.log("입력해주신 숫자는 " + inputStrLength + "자리 숫자입니다. 3자리 숫자만을 입력해주세요.")
    } else {
        console.log(count + "번째 시도 : " + line);
        if (checkStrikeBall(ranNum, line)) {
            rl.close();
        } 
    }
})
rl.on('close', () => {
    // 입력이 끝난 후 실행할 코드
    console.log(count + "번만에 맞히셨습니다.");
    console.log("게임을 종료합니다.");
    process.exit();
})

// 규칙 시행
// - 숫자의 값과 위치가 모두 일치하면 S
// - 숫자의 값은 일치하지만 위치가 틀렸으면 B
function checkStrikeBall(ranNum, line) {
    // console.log("input: " + line, "random: " + ranNum); // this shows the random number
    let rightNumRightPlaceCount = 0; // Strike count
    let rightNumWrongPlaceCount = 0; // Ball count

    //280 134 0B0S -> 280 238 1B1S -> 280 820 2B1S -> 280 028 3B -> 280 280 3S
    for (let i = 0; i < ranNum.length; i++) {
        if ((ranNum.includes(line[i])) && (ranNum[i] === line[i])) { // 자리도 맞고 숫자도 같을 때
            // console.log(line[i]);
            rightNumRightPlaceCount++;
        } else if (ranNum.includes(line[i])) { // 자리는 안맞고 숫자는 포함될 때
            // console.log(line[i]);
            rightNumWrongPlaceCount++;
        }
    }
    // result output
    let result = "";
    if (rightNumWrongPlaceCount > 0 && rightNumRightPlaceCount === 0) {
        result = rightNumWrongPlaceCount + "B";
    } else if (rightNumWrongPlaceCount === 0 && rightNumRightPlaceCount > 0) {
        result = rightNumRightPlaceCount + "S";
    } else {
        result = rightNumWrongPlaceCount + "B" + rightNumRightPlaceCount + "S"; // 0B0S or 
    }
    console.log(result);
    
    // 답을 맞췄을 때 true를 반환
    if (result === "3S") {
        return true;
    }
}

// 기타 함수
function generateRanNum(){
    ranNum = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString(); 
    //  (end Number - start Number + 1 ) = the number of possible
    return ranNum;
}

function hasDuplicateCharacters(str) {
    const charMap = {}; // 등장한 문자를 저장하기 위한 객체
  
    for (const char of str) {
      if (charMap[char]) {
        return true; // 이미 등장한 문자인 경우 true 반환
      }
      charMap[char] = true; // 등장한 문자를 표시
    }
  
    return false; // 모든 문자를 검사했는데 중복이 없으면 false 반환
  }