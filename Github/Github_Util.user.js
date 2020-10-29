// ==UserScript==
// @name        github_util
// @namespace   github
// @include     https://github.com/*
// @version     1
// @description disable sticky messages, fast submit
// @run-at     document-start
// @grant unsafeWindow
// ==/UserScript==


function load(){
/*Annoying stickies with trivial content*/
var a=document.querySelectorAll(".js-sticky")
for(var i=0;i<a.length;i++){a[i].removeAttribute('style')}
/* Submit button glitches on older browsers*/
var b=document.getElementById("submit-file");
if(b)b.removeAttribute('disabled');

}
setTimeout(load,1000);
