// ==UserScript==
// @name        Reddit_AddComments_Link
// @namespace   reddit
// @description Adds All Comments Link to subreddit tabmenu
// @include     https://www.reddit.com/*
// @include     https://old.reddit.com/*
// @version     1.02
// @license   Affero GPL 3.0
// @author  FrozenVoid
// @grant       none
// @run-at document-end
// ==/UserScript==
var commentslink=document.querySelector('.titlebox')
if(commentslink){
var url=document.querySelector('h1.redditname>a.hover').href;
if(url){
commentslink.innerHTML+=`<li><a class='sub-allcomments' href='${url}comments/'>[All Comments]</a></li>`}}
