// ==UserScript==
// @name         Youtube_Keys
// @namespace    YT
// @version      1.01e
// @description  F2 to next video.
// @author       FrozenVoid
// @match        https://www.youtube.com/watch?v*
// @grant       none
// ==/UserScript==


window.addEventListener("keypress",function (ev){
      if(ev.key=="F2"){var c=document.querySelector(
          "a.ytd-compact-video-renderer");if(c)c.click();}
    });



