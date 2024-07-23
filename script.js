let arrX = [];
let arrO = [];
var turn = true;
function drawX(nam){
    can = document.getElementById(nam);
    ctx = can.getContext('2d');
    ctx.lineWidth = 20;
    ctx.fillStyle = 'violet';
    ctx.strokeStyle = 'white';
    ctx.fillRect(0,0,300,200);
    ctx.lineCap = 'round';
    ctx.moveTo(60,40);
    ctx.lineTo(240,120);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(240,40);
    ctx.lineTo(60,120);
    ctx.stroke();
    arrX.push(nam);
    //console.log(arrX,arrO);

}
function drawO(nam){
    canv = document.getElementById(nam);
    ctx = canv.getContext('2d');
    ctx.lineWidth = 20;
    ctx.fillStyle = 'darkviolet';
    ctx.strokeStyle = 'white';
    ctx.fillRect(0,0,300,200);
    ctx.lineCap = 'round';
    ctx.arc(150,80,50,0,Math.PI*2);
    ctx.stroke();
    arrO.push(nam);
}
function draw(nam){
    if(turn){
        drawX(nam);
        turn = false;
    }
    else{
        drawO(nam);
        turn = true;
    }
}
function matched(item1,item2,item3,colour){
    arr = [item1,item2,item3];
    arr.forEach(element => {
        can = document.getElementById(element);
        ctx = can.getContext('2d');
        ctx.fillStyle = colour;
        ctx.fillRect(0,0,300,200);
    });
}
function winner(arr,colour){
    if(arr.includes('c1')&&arr.includes('c2')&&arr.includes('c3')){
        matched('c1','c2','c3',colour);
        return true;
    }
    if(arr.includes('c1')&&arr.includes('c4')&&arr.includes('c7')){
        matched('c1','c4','c7',colour);
        return true;
    }
    if(arr.includes('c1')&&arr.includes('c5')&&arr.includes('c9')){
        matched('c1','c5','c9',colour);
        return true;
    }
    if(arr.includes('c4')&&arr.includes('c5')&&arr.includes('c6')){
        matched('c4','c5','c6',colour);
        return true;
    }
    if(arr.includes('c7')&&arr.includes('c8')&&arr.includes('c9')){
        matched('c7','c8','c9',colour);
        return true;
    }
    if(arr.includes('c2')&&arr.includes('c5')&&arr.includes('c8')){
        matched('c2','c5','c8',colour);
        return true;
    }
    if(arr.includes('c3')&&arr.includes('c6')&&arr.includes('c9')){
        matched('c3','c6','c9',colour);
        return true;
    }
    if(arr.includes('c3')&&arr.includes('c5')&&arr.includes('c7')){
        matched('c3','c5','c7',colour);
        return true;
    }
    return false;
}
const tbl = document.getElementById('table');
const container = document.getElementById('main-container');
tbl.addEventListener('click',e=>{
    if((!arrX.includes(e.target.id))&&(!arrO.includes(e.target.id))){
        draw(e.target.id);
        let xWon = winner(arrX,'rgba(0,255,0,0.7');
        if(arrX.length+arrO.length!=9&&!xWon){       
            while(true){
                num = (Math.floor(Math.random()*9))+1;
                if(arrX.includes('c'+num)||arrO.includes('c'+num)){
                    continue;
                }
                draw('c'+num);
                break;
            }
        }
        console.log(arrX,arrO);
        let oWon = winner(arrO,'rgba(255,0,0,0.6');
        if(arrX.length+arrO.length==9){
            setTimeout(() => {
                container.innerHTML =`<h1 style="color:blue;">Game Over!!</h1><br><br>
                <input type="button" id="restartbtn" value="PLAY AGAIN" onclick="history.go(0)">`
            }, 700);
        }
        if(xWon||oWon){
            if(xWon){
                setTimeout(() => {
                    container.innerHTML =`<h1 style="color:green;text-shadow: 3px 3px 3px rgb(255, 255, 255);">Congratulations!!<br>You Won!!</h1><br><br>
                    <input type="button" id="restartbtn" value="PLAY AGAIN" onclick="history.go(0)">`
                }, 700);
                console.log('You won');
            }
            else{
                setTimeout(() => {
                    container.innerHTML =`<h1 style="color:red;">You Lost!!<br>Try Again!!</h1><br><br>
                    <input type="button" id="restartbtn" value="PLAY Again" onclick="history.go(0)">`
                }, 700);
            }
        }
    }
});
