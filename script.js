const selectBox= document.querySelector(".select-box"),
SelectXBtn= selectBox.querySelector(".playerX"),
Select0Btn= selectBox.querySelector(".player0"),
playBoard= document.querySelector(".play-board"),
allBox= document.querySelectorAll("section span"),
players= document.querySelector(".players"),
resultBox= document.querySelector(".result-box"),
wonText= resultBox.querySelector(".won-text"),
replayBtn= resultBox.querySelector(".btn");

window.onload =()=>{
	for (let i = 0; i < allBox.length; i++) {
		allBox[i].setAttribute("onclick","clickedBox(this)");
	}
      SelectXBtn.onclick =()=>{
      	selectBox.classList.add("hide");
      	playBoard.classList.add("show");
      }
      Select0Btn.onclick =()=>{
      	selectBox.classList.add("hide");
      	playBoard.classList.add("show");
      	players.setAttribute("class","players active player");
      }
}
let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;
function clickedBox(element){
   if(players.classList.contains("player")){
      playerSign="0";
      element.innerHTML = `<i class="${playerOIcon}"></i>`;
      players.classList.remove("active");
      element.setAttribute("id", playerSign);
    }else{
      element.innerHTML = `<i class="${playerXIcon}"></i>`;
      element.setAttribute("id", playerSign);
      players.classList.add("active");
    }
   selectWinner();
   playBoard.style.pointerEvents="none";
   element.style.pointerEvents="none";
   let randomDelayTime=((Math.random()*1000)+200).toFixed();
   setTimeout(()=>{
      bot(runBot);
   },randomDelayTime);
}

function bot(runBot){
   let array =[];
   if(runBot){
      playerSign="0";
   for (let i = 0; i < allBox.length; i++) {
      if(allBox[i].childElementCount==0){
         array.push(i);
      }
   }
   let randomBox=array[Math.floor(Math.random()*array.length)];
   if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
   }
   allBox[randomBox].style.pointerEvents="none";
   playBoard.style.pointerEvents="auto";
   playerSign="X";
}
   }
function getClass(idname){
   return document.querySelector(".box"+idname).id;
}
function checkClass(val1,val2,val3,sign){
   if(getClass(val1)==sign&&getClass(val2)==sign&&getClass(val3)==sign){
      return true;
   }
}
function selectWinner(){
   if(checkClass(1,2,3,playerSign)||checkClass(4,5,6,playerSign)||checkClass(6,7,8,playerSign)||checkClass(2,5,8,playerSign)||checkClass(3,6,9,playerSign)||checkClass(1,5,9,playerSign)||checkClass(3,5,7,playerSign)){
      runBot=false;
      bot(runBot);
      setTimeout(()=>{
         playBoard.classList.remove("show");
         resultBox.classList.add("show");
      },700);
      wonText.innerHTML=`Player <a>${playerSign}</a> won the game!`;
   }
   else{
       if(getClass(1)!=""&&getClass(2)!=""&&getClass(3)!=""&&getClass(4)!=""&&getClass(5)!=""&&getClass(6)!=""&&getClass(7)!=""&&getClass(8)!=""&&getClass(9)!=""){
            runBot=false;
            bot(runBot);
            setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
      },700);
      wonText.textContent = "Match has been drawn!";
      }
   }
}
replayBtn.onclick = ()=>{
    window.location.reload();
}