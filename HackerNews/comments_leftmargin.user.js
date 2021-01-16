// ==UserScript==
// @name        hackernewsLeftMargin
// @namespace   HN
// @description reduce left margin in tables.
// @include     https://news.ycombinator.com/item*
// @version     1
// @grant       none
// ==/UserScript==
/*Forces table cell width reduction*/
var a=document.querySelectorAll('img[width]');
for(var i=0;i<a.length;i++){
a[i].setAttribute('width',parseInt(a[i].getAttribute('width'),10)/6);
}
