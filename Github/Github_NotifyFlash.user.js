// ==UserScript==
// @name        Github_NotifyFlash
// @namespace   Github
// @description notification flash on every open window title
// @include     https://github.com/*
// @version     1
// @grant       none
// ==/UserScript==

function check(){
var a=document.querySelector('a.notification-indicator');
if(a.getAttribute('aria-label').search("You have no unread notifications")==-1){
document.title=Math.random()>0.5?"NEW NOTES":"";
}
else{document.title="";}
setInterval(check,1000);

