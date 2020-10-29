// ==UserScript==
// @name         Youtube_Keys
// @namespace    YT
// @version      1.01
// @description  F2 to next video.
// @author       FrozenVoid
// @match        https://www.youtube.com/watch?v*
// @grant        none
// ==/UserScript==

(function() {
 'use strict';
    function evproc(ev){
      if(ev.key=="F2")document.querySelector(
          "a.ytd-compact-video-renderer").click();


    }

   document.addEventListener("keypress",evproc);
;


  
})();
