// ==UserScript==
// @name        slither-feed-highlight
// @namespace   slither
// @description highlight food/prey by size
// @include     http://slither.io/
// @version     1.01
// @grant       unsafeWindow
// @run-at document-start
// ==/UserScript==
var minfood=2;//minimal food size, hide below

function fsize(f){
var r=(f/16)*(f>minfood);
return r>1?1:r;}

function hl(){
if(!unsafeWindow.playing
   ||!unsafeWindow.connected
   ||unsafeWindow.connecting)return

 if(unsafeWindow.foods){
  for(var i=0;i<unsafeWindow.foods.length;i++)   {
if(!unsafeWindow.foods[i]
   ||unsafeWindow.foods[i].marked) continue;
   var size=unsafeWindow.foods[i].sz;
  unsafeWindow.foods[i].marked=1;
   unsafeWindow.foods[i].gr=0;
   unsafeWindow.foods[i].rad=fsize(size);
  unsafeWindow.foods[i].wsp=0;
   unsafeWindow.foods[i].fr=1;
   unsafeWindow.foods[i].lrrad=0;
  } }

  if(unsafeWindow.preys){
  for(var i=0;i<unsafeWindow.preys.length;i++)     {
   if(!unsafeWindow.preys[i]
      ||unsafeWindow.preys[i].marked) continue;
 with(unsafeWindow.preys[i])rad=sz/4,gr=gfr=0,fr=gfw=1,marked=1;

 }
}}
setInterval(hl,100)

