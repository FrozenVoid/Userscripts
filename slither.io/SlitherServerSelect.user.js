// ==UserScript==
// @name     SlitherServerSelect
// @version  1.03
// @author FrozenVoid
// @description Server select when F2 is pressed
// @include   http://slither.io/
// @grant    unsafeWindow
// ==/UserScript==

const selectbutton="F2";//key name
const clusters=["Unknown",1,"Germany","Canada","Singapore",
              "Brazil",6,"Australia","US East 1",
              "France","US East 2","Hong Kong","Japan",
              "US West1","US East 3","Poland",
              "Great Britain",
              17,"US East 4" ,
              19,20,21,22,23,24,25,26,27,28,29];


function setserver(server){
unsafeWindow.forcing = true;
for(var i in unsafeWindow.sos){
if(i==server)continue;
unsafeWindow.sos.ac=1;}
unsafeWindow.sos[server].ac=9999;
unsafeWindow.bso=unsafeWindow.sos[server];}

function buildslist(){var s="";
if(unsafeWindow.playing||!unsafeWindow.sos||!unsafeWindow.sos.length)return "Waiting for server list";
for(var i in unsafeWindow.sos){
if(!unsafeWindow.sos[i])continue;
s+=
`${i} ->[ ${unsafeWindow.sos[i].ip }:${unsafeWindow.sos[i].po} ](${clusters[unsafeWindow.sos[i].clu||"Unknown region"]}) Ping:${unsafeWindow.sos[i].ptm||"?"}}  \n`;}
return s;
}
function serverchange(ev){
if(ev.key!="F2")return;

var servlist=buildslist();
var server=prompt(`Select Server number:\n${servlist}`);
setserver(server);

}

  document.addEventListener("keypress",serverchange);
