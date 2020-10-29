// ==UserScript==
// @name         Youtube_Keys
// @namespace    YT
// @version      1.0
// @description  F2:next video.
// @author       FrozenVoid
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function() {
 'use strict';
    function evproc(ev){
   switch(ev.key){
      case "F2":document.querySelector(
          "a.ytd-compact-video-renderer").click();break;
}
    }

   document.addEventListener("keypress",evproc);
;


  
})();
