// ==UserScript==
// @name        Reddit_AutoHide
// @namespace   Reddit
// @description Hide all articles with F2/shift-F2
// @include     https://*.reddit.com/*
// @version     1.05b
// @grant       none
// ==/UserScript==
//1=true,0=false
var DEBUG=true;//log debug info
var log_only=false;//true->don't hide just log debug info
var only_visible=true;//hide only visible articles,Shift-F2 to bypass
var hide_interval=500;//milliseconds
var auto_refresh=true;//reload if all articles hidden (only_visible=false)
var auto_next=true;//load next page if all visible articles hidden.(only_visible=true)
var keyname='F2';//key to use, 
var isshift=0;//track bypass only_visible Shift-F2; setting to 1 will ignore only_visible


//================================

var process_article_counter=0;
function dbg(text){if(DEBUG){console.info(text)};}
function isHidden(el) {    return (el.offsetParent === null);}
function hidepress(e){if(e.code!=keyname)return;
isshift=e.shiftKey;hider();}

function handle_end(){dbg("Page hiding complete, total hidden;"+process_article_counter);
if(log_only)return;
if(!auto_next &&!auto_refresh)return;//no further actions
if(only_visible && !isshift && auto_next ){//normal next
document.querySelector('.nav-buttons>.nextprev>.next-button>a').click();return;}
if(auto_refresh&& (!only_visible||isshift)){
document.location.href=document.location.href; };return 0;}


function process_article(h){
h.setAttribute('processed-hidden',1);
if(!isshift && only_visible && isHidden(h))return 0;
var linkdata=h.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('a[data-event-action="title"]');
dbg("Hiding link:"+linkdata);
if(!log_only)h.click();process_article_counter++;
return 1;
}


function hider(){
var h=document.querySelector('[data-event-action="hide"]:not([processed-hidden])');
if(!h){return handle_end();}
var ret=process_article(h);
window.setTimeout(hider,ret?hide_interval:0);

}
window.addEventListener("keypress", hidepress);
