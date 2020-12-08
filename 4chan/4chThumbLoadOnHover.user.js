
// ==UserScript==
// @name        4chThumbLoadOnHover
// @namespace   4ch
// @description load Thumbs on Hover(hover out twice to unload)
// @include     https://boards.4chan.org/*
// @include     https://boards.4channel.org/*
// @version     1.03
// @grant       none
// ==/UserScript==
function th_load(){
var thumbs=document.querySelectorAll('.fileThumb:not([onmouseover])>img:not(.fileDeletedRes)')

for(var i=0;i<thumbs.length;i++){
thumbs[i].setAttribute("onmouseover","this.click()")}
window.setTimeout(th_load,4000);}
th_load()


