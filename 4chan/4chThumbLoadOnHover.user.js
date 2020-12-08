// ==UserScript==
// @name        4chThumbLoadOnHover
// @namespace   4ch
// @description load Thumbs on Hover
// @include     https://boards.4chan.org/*
// @include     https://boards.4channel.org/*
// @version     1.04
// @grant       none
// ==/UserScript==
function th_load(){
var thumbs=document.querySelectorAll('.fileThumb:not([onmouseover])>img:not(.fileDeletedRes)')

for(var i=0;i<thumbs.length;i++){
thumbs[i].setAttribute("onmouseover","this.click();")}

}
window.addEventListener('DOMSubtreeModified',th_load)
th_load();

