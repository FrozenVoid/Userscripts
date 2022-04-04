// ==UserScript==
// @name        Telegram_Inline_Image
// @namespace   Telegram
// @description Inline_Telegram
// @include     https://t.me/*
// @version     1.01
// @grant       none
// @run-at document-start
// ==/UserScript==

function setst(){
var st=`#widget_actions_wrap{display:none!important;};header{position:relative!important;}
main div,html,main a,html>body,a.tgme_widget_message_video_player,iframe div,iframe body,.tgme_page_post{
		min-width:98vw!important;
		height:auto!important;
		margin:0!important;;padding:0!important;
	border:2px solid red !important;
		;max-width:100%!important;}`;

var cstinsert=document.getElementById('widetgram');
if(!cstinsert){var cst1=document.createElement('style');
cst1.id='widetgram';
cst1.innerHTML=st;
document.head.appendChild(cst1);
}}
setst();

function im()
{ var a=document.querySelectorAll(`i[style*=background-image]:not([loaded="full"])`);
for(var i=0;i<a.length;i++){
var lnk=a[i].getAttribute('style');
var lnk2=lnk.match(/url.*/)[0].replace("url('","").replace("')","").replace(/;.*/,"");

a[i].parentNode.innerHTML=`<embed   width=100%  src="${lnk2}">`;
a[i].setAttribute('loaded','full');

}


setTimeout(im,2000);

}
im();
function am(){
var c=document.querySelectorAll(`a[style*=background-image]:not([loaded="full2"])`);
for(var i=0;i<c.length;i++){
var lnk=c[i].getAttribute('style');
lnk=lnk.match(/url.*/)[0].replace("url('","").replace("')","");
console.log(lnk);
c[i].parentNode.innerHTML=`<embed     width=100%  src="${lnk}">`;
c[i].setAttribute('loaded','full2');

}
setTimeout(am,2000);
}
am();
