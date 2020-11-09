// ==UserScript==
// @name        Reddit_AutoHide
// @namespace   Reddit
// @description Hide all articles with F2
// @include     https://*.reddit.com/*
// @version     1.05
// @grant       none
// ==/UserScript==
//1=true,0=false
const DEBUG=true;//log debug info
const log_only=false;//true->don't hide just log debug info
const only_visible=true;//hide only visible articles
const hide_interval=500;//milliseconds
const auto_refresh=true;//reload if all articles hidden (only_visible=false)
const auto_next=true;//load next page if all visible articles hidden.(only_visible=true)
const keyname='F2'//key to use
//================================

var process_article_counter=0;
function dbg(text){if(DEBUG){console.info(text)};}
function isHidden(el) {    return (el.offsetParent === null)}
function hidepress(e){if(e.code!=keyname)return;hider();}

function handle_end(){dbg("Page hiding complete, total hidden;"+process_article_counter);
if(only_visible && auto_next && !log_only){document.querySelector('.nav-buttons>.nextprev>.next-button>a').click();}
if(!only_visible && auto_refresh && !log_only){document.location.href=document.location.href;} return 0;}


function process_article(h){
h.setAttribute('processed-hidden',1);
if(only_visible && isHidden(h))return 0;
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
