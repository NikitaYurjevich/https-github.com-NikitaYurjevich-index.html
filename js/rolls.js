const ROLL_POSITIONS_LEFT_X={first:canvas.width/50,second:canvas.width/11.5,third:canvas.width/6.5},ROLL_POSITIONS_RIGHT_X={first:canvas.width-ROLL_POSITIONS_LEFT_X.first-ROLL_SIZE,second:canvas.width-ROLL_POSITIONS_LEFT_X.second-ROLL_SIZE,third:canvas.width-ROLL_POSITIONS_LEFT_X.third-ROLL_SIZE},ROLL_POSITIONS_TOP_Y={first:canvas.height/4,second:canvas.height/3.75,third:canvas.height/3.45},ROLL_POSITIONS_BOTTOM_Y={first:canvas.height/1.66,second:canvas.height/1.6,third:canvas.height/1.55},ROLLS_POSITIONS={topLeft:{id:"topLeft",first:{x:ROLL_POSITIONS_LEFT_X.first,y:ROLL_POSITIONS_TOP_Y.first},second:{x:ROLL_POSITIONS_LEFT_X.second,y:ROLL_POSITIONS_TOP_Y.second},third:{x:ROLL_POSITIONS_LEFT_X.third,y:ROLL_POSITIONS_TOP_Y.third}},topRight:{id:"topRight",first:{x:ROLL_POSITIONS_RIGHT_X.first,y:ROLL_POSITIONS_TOP_Y.first},second:{x:ROLL_POSITIONS_RIGHT_X.second,y:ROLL_POSITIONS_TOP_Y.second},third:{x:ROLL_POSITIONS_RIGHT_X.third,y:ROLL_POSITIONS_TOP_Y.third}},bottomRight:{id:"bottomRight",first:{x:ROLL_POSITIONS_RIGHT_X.first,y:ROLL_POSITIONS_BOTTOM_Y.first},second:{x:ROLL_POSITIONS_RIGHT_X.second,y:ROLL_POSITIONS_BOTTOM_Y.second},third:{x:ROLL_POSITIONS_RIGHT_X.third,y:ROLL_POSITIONS_BOTTOM_Y.third}},bottomLeft:{id:"bottomLeft",first:{x:ROLL_POSITIONS_LEFT_X.first,y:ROLL_POSITIONS_BOTTOM_Y.first},second:{x:ROLL_POSITIONS_LEFT_X.second,y:ROLL_POSITIONS_BOTTOM_Y.second},third:{x:ROLL_POSITIONS_LEFT_X.third,y:ROLL_POSITIONS_BOTTOM_Y.third}}},rollsList=[];function*rollSteps(O){return yield O.first,yield O.second,O.third}function createRoll(){let O=Math.round(100*Math.random()),t;t=O%2==0?O>=50?ROLLS_POSITIONS.topLeft:ROLLS_POSITIONS.topRight:O<=50?ROLLS_POSITIONS.bottomLeft:ROLLS_POSITIONS.bottomRight;let L=rollSteps(t),i=L.next(),I=new Date().getMilliseconds().toString();rollsList.push({id:I,step:i.value}),window.requestAnimationFrame(gameFrame);let S=setInterval(()=>{if(timer<=0)clearInterval(S);else{let O=L.next();O.done?(rollsList.find(O=>O.id===I).step=O.value,clearInterval(S),setTimeout(()=>{let O=rollsList.findIndex(O=>O.id===I);rollsList.splice(O,1),addScore(t.id)},ROLL_MOVING_SPEED)):rollsList.find(O=>O.id===I).step=O.value,window.requestAnimationFrame(gameFrame)}},ROLL_MOVING_SPEED)}
