// ==UserScript==
// @name        Reddit_SimilarSubs
// @namespace   reddit
// @description Add subreddit link to similar subs
// @include     https://*.reddit.com/*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==
function add(){
var a=document.querySelector(".titlebox>.redditname");
if(!a)return;
var subs="https://subredditstats.com/subreddit-user-overlaps/"+a.textContent;
var nlink=document.createElement('a')
nlink.href=subs;nlink.innerHTML="\n->Similar Subs";
a.appendChild(nlink);
}
window.addEventListener('DOMContentLoaded', add);
