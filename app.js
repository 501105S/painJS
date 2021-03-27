// canvas는 context를 가지고있는 HTML의 요소


const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;
// filling을 하고 있으면 그걸 나에게 말해줄 variable이 필요함

// 기본 캔버스 배경 색상 설정
ctx.fillStyle = "whtie";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



// canvas pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// 모든 마우스의 움직임을 감지하고 라인 생성
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){  // painting === false
        // 클릭하지 않고 마우스를 움직였을 때, path = line
        // path 생성 시 마우스의 xy좌표로 path 이동
        // path의 시작점 = 내 마우스가 있는 곳

        ctx.beginPath();   // 경로 생성
        ctx.moveTo(x,y);   // 선 시작 좌표
    } else{

        // path의 전 위치에서 현 위치까지 선으로 연결
        ctx.lineTo(x,y); // 선 끝 좌표
        ctx.stroke(); // 선 그리기
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = "Fill"
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if(canvas){
    // 마우스가 캔버스에서 움직이는 이벤트
    canvas.addEventListener("mousemove", onMouseMove);

    // 캔버스내에서 페인팅 이벤트 (마우스 클릭 이벤트) 
    canvas.addEventListener("mousedown", startPainting);

    // 캔버스에서 마우스를 떼면
    canvas.addEventListener("mouseup", stopPainting);

    // 캔버스에서 마우스가 벗어나면
    canvas.addEventListener("mouseleave", stopPainting);

    // 캔버스 클릭
    canvas.addEventListener("click", handleCanvasClick);

}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}


// 마우스를 클릭하지 않고 움직이면 painting=false이기 때문에
// 어떠한 효과도 나타나지않음
// mousedown 마우스 클릭 시 path stroke 생성


//fill
// fill버튼 클릭 - fill버튼이 paint버튼으로 바뀜 - color 선택 - canvas에 색상 적용