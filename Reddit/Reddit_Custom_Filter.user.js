// ==UserScript==
// @name        Reddit_Custom_Filters
// @namespace   reddit_filters
// @description custom filter example
// @include     https://*.reddit.com/*
// @version     1.00
// @grant      unsafeWindow
// @run-at document-start
// ==/UserScript==
var debug=1;
var words={};

function dbg(text){if(debug){console.info(text)};}
function addarrays(){const prefixmap=['prefix','word','contains','suffix'];
for(var i=0;i<arguments.length;i++){if(!words[arguments[i]])words[arguments[i]]={};
for(var k=0;k<prefixmap.length;k++)if(!words[arguments[i]][prefixmap[k]])words[arguments[i]][prefixmap[k]]={};}}
addarrays('domain','permalink','subreddit','author','url','title');
words['domain']['suffix']['reddit_image_hosting']=`.redd.it`;
var str=JSON.stringify(words);
//send JSON string object to window.
unsafeWindow["reddit_csscustom_filt2"]=str;
