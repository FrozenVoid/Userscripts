// ==UserScript==
// @name        Reddit_Filter
// @namespace   reddit_filters
// @description Filter content on reddit by title,domain,user,subreddit
// @include     https://www.reddit.com/r/*
// @include     https://old.reddit.com/r/*
// @include     https://www.reddit.com/r/all/*
// @include     https://old.reddit.com/r/all/*
// @version     1.01
// @grant       none
// ==/UserScript==
/* this script assumes Old Reddit interface not the JS-based one:
IT WILL NOT WORK ON NEW REDDIT due lack of data- attributes in elements*/
//tagged category
const DEBUG=false;//log each filter actions/debug info
var enable_on_rall_only=false;//use only on /r/all
var default_filters=true;//load default filters
var blocknsfw=false;//block nsfw content
var blockselfposts=false;//(self.subname)
var block_promoted=false;//promoted posts
var block_crossposts=false;//crossposts.


function dbg(text){if(DEBUG){console.info(text)};}
dbg("DEBUG mode");
function modeof(m){var pref='';
switch(m){
case 'word':pref='~';break;//word match
case 'contains':pref='*';break;//text match
case 'prefix':pref='^';break;
case 'suffix':pref='$';break;
default:;break;}
return pref;}

function addcssitem(category,mode,item){
if(DEBUG)csscounter++;
dbg(`Adding item#${csscounter} : ${item} in:${category} mode: ${mode.toString()}`);
return `,[data-${category}${mode}="${item}"]`;}

function addarrays(obj,name){
obj[name]=[];
obj[name]['prefix']=[];
obj[name]['word']=[];
obj[name]['contains']=[];
obj[name]['suffix']=[];}

dbg("page load");


var words=[],csscounter=0;//comma separated lists, comment out those you don't need
addarrays(words,'domain');
addarrays(words,'permalink');
addarrays(words,'subreddit');
addarrays(words,'author');



/*  prefix/suffix filter=filter names with prefix/suffix, 
contains=match any text that contains it(used with title/permalink)
word=match a complete word or exact name (use 'contains' for permalinks)
permalink is the shortened link title, which can be used for filtering content
*/
//format:  words[ subreddit,author,permalink,domain][prefix,suffix,word,contains][name-of-filter-list]=`name1,name2`
//comment //out unused lists
if(default_filters){
words['domain']['word']['media_hosts']=`i.redd.it,v.redd.it,gfycat.com,i.imgur.com`;
words['domain']['suffix']['reddit_internal']=`.redd.it`;
words['domain']['word']['reddit_internal']=`reddit.com`;
dbg("default filters loaded");}
//-------Write your filters here
words['domain']['word']['my_category']=`exact_domain_name_filter`;
words['domain']['suffix']['my_category']=`domain_suffix_filter.domain`;
words['subreddit']['suffix']['subreddit_filter1']=`name_ends_with_x,name_ends_with_y`;
words['permalink']['contains']['title_filter']=`text_contains_x`;
words['author']['prefix']['user_filter1']=`username_begins_with_x`;

//-----main
function gencss(){ var res=[];res.push(`[category-name="cat-value"]`);
if(enable_on_rall_only && document.location.href.search(".com/r/all/")==-1){
dbg("filtering on non /r/all pages disabled")
return `/* filters for non-/r/all content disabled in Reddit_Filter prefs*/`;}
dbg("tag filters")
if(blocknsfw){res+=',[data-nsfw="true"]';}
if(block_crossposts){res+=`,[data-num-crossposts]:not([data-num-crossposts="0"])`}
if(block_promoted){res+=`,[data-promoted="true"]`;}
if(blockselfposts){res+=`,.self[data-domain^="self."]`;}
for(var t in words){var typ=words[t],typname=t;
for(var cat in typ){var c=typ[cat];var pref=modeof(cat);
 for(var str in c){var wordlist=c[str].split(',');
for(var i=0;i<wordlist.length;i++){if(!wordlist[i].length)continue;
res.push(addcssitem(typname,pref,wordlist[i]));
  }}}};
res.push(`{display:none!important}`);
 dbg("Successfully added filters to CSS");
return res.join("");}


var csscontainer=document.createElement('style');
csscontainer.id='redditcssfilter1';
csscontainer.innerHTML=gencss();
document.body.appendChild(csscontainer);
dbg("idle, elements inserted:"+csscounter);
dbg(document.getElementById('redditcssfilter1').innerHTML.toString())
