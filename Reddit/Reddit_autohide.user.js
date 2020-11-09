// ==UserScript==
// @name        Reddit_AutoHide
// @namespace   Reddit
// @description Hide all articles with F2
// @include     https://*.reddit.com/*
// @version     1.02
// @grant       none
// ==/UserScript==
const hide_interval=500;//milliseconds
const auto_refresh=true;//reload if all articles hidden
const keyname='F2'//key to use
function hidepress(e){if(e.code!=keyname)return;hider();}

function hider(){
var h=document.querySelector('[data-event-action="hide"]');
if(h){h.click();window.setTimeout(hider,hide_interval );}
else{if(auto_refresh)document.location.href=document.location.href;}
}
window.addEventListener("keypress", hidepress);
