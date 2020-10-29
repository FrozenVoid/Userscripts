// ==UserScript==
// @name        Random_Street_View_Title
// @namespace   RStreetView
// @include     https://randomstreetview.com/
// @description Set longest title of place to document.title
// @version     1
// @grant       none
// ==/UserScript==
function ref(){
var longf=document.getElementsByClassName('gm-iv-long-address-description');
if(longf){longf=longf[0].innerHTML;}

var full=document.getElementById('address');
if(!full){}else{full=full.innerHTML}
var best=full.length>longf.length?full:longf;
if(document.title!=best)document.title=best;
}
setInterval(ref,1000);
