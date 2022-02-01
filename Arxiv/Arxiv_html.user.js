// ==UserScript==
// @name        arxiv_html
// @namespace   Arxiv
// @description Add HTML conversion link
// @include     https://arxiv.org/abs/*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==

document.querySelector(`#abs-outer .full-text`).innerHTML+=`<a href="${document.location.href.replace("arxiv.org","ar5iv.org")}">HTML ver</a>`
