// ==UserScript==
// @name        Imgur_Redir
// @namespace   proxy
// @description Redirect Imgur links
// @include     https://imgur.com/*
// @include     https://i.imgur.com/*
// @version     1
// @grant       none
// @run-at document-start
// ==/UserScript==
document.location.href=document.location.href.replace("imgur.com","imgurp.com");
