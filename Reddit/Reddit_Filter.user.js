// ==UserScript==
// @name        Reddit_Filter
// @namespace   reddit_filters
// @description Filter content on reddit by title,domain,user,subreddit
// @include     https://*.reddit.com/*
// @version     1.04
// @grant       none
// ==/UserScript==
/* this script assumes Old Reddit interface not the JS-based one:
IT WILL NOT WORK ON NEW REDDIT due lack of data- attributes in elements*/
//tagged categories:: switch quickly by uncommenting lines.
//1=true,0=false
var DEBUG=true;//false //log each filter actions/debug info
//const DEBUG=false //log each filter actions/debug info

//var disable_on_specific_subreddits=true;//use only on /r/all
var disable_on_specific_subreddits=false;//use outside /r/all
var disable_on_frontpage=true;//don't use on frontpage,since user
var disable_on_otherpages=true;//don't use on non-subreddit pages (without  /r/subname)

var load_default_filters=true;//load default filters
//var load_default_filters=false;//load default filters

var blocknsfw=false;//block nsfw content
//var blocknsfw=true;//block nsfw content
var blockselfposts=false;//(self.subname)
//var blockselfposts=true;//(self.subname)

var block_promoted=false;//promoted posts
//var block_promoted=true;//promoted posts

var block_crossposts=false;//crossposts.
//var block_crossposts=true;//crossposts.


//========================================================
//========================================================
var rpath=document.location.pathname;
var onfrontpage=(rpath==="/");
var onrall=(rpath==="/r/all/");
var onsub=!onfrontpage && !onrall && (rpath.search(/\/r\//)!=-1);
var onother=!onfrontpage && !onrall && !onsub;// non subreddit page


function dbg(text){if(DEBUG){console.info(text)};}
dbg("DEBUG mode");
function modeof(m){var pref='';
switch(m){
case 'word':pref='~';break;//word match
case 'contains':pref='*';break;//text match
case 'prefix':pref='^';break;//prefix
case 'suffix':pref='$';break;//suffix
default:;break;}
return pref;}

function addtitles(){//fix reddit lack of 'data-title'
var a=document.querySelectorAll('[data-subreddit]');
for(var i=0;i<a.length;i++){
var title=a[i].querySelector('a[data-event-action="title"]');
if(!title)continue; a[i].setAttribute('data-title',title.innerHTML.toString());}}

function addcssitem(category,mode,item){
dbg(`Adding item#${csscounter++} : ${item} in:${category} mode: ${mode.toString()}`);
return `,[data-${category}${mode}="${item}"]`;}

function addarrays(){const prefixmap=['prefix','word','contains','suffix'];
for(var i=0;i<arguments.length;i++){words[arguments[i]]=[];
for(var k=0;k<prefixmap.length;k++)words[arguments[i]][prefixmap[k]]=[];}}



//page loaded
dbg(onfrontpage?"Loaded frontpage":(onrall?"Loaded /r/all":onsub?"Loaded Subreddit:"+rpath:"Other page load:"+rpath));
var words=[],csscounter=0;
//comma separated lists, comment out those you don't need
addarrays('domain','permalink','subreddit','author','url','title')


/*  prefix/suffix filter=filter names with prefix/suffix, 
contains=match any text that contains it(used with title/permalink)
word=match a complete word or exact name (use 'contains' for permalinks)
permalink is the shortened link title, which can be used for filtering content
*/
//format:  words[ subreddit,author,permalink,domain][prefix,suffix,word,contains][name-of-filter-list]=`name1,name2`
//comment //out unused lists
if(load_default_filters){
words['domain']['word']['media_hosts']=`i.redd.it,v.redd.it,gfycat.com,i.imgur.com,imgur.com,redgifs.com`;
words['domain']['suffix']['reddit_internal']=`.redd.it`;
words['subreddit']['word']['word_games']=`AskOuija,IsTodayFridayThe13th`;


dbg("default filters loaded");}
//-------Write your filters here, example lists
words['domain']['word']['my_category']=`exact_domain_name_filter`;
words['domain']['suffix']['my_category']=`domain_suffix_filter.domain`;
words['subreddit']['suffix']['subreddit_filter1']=`name_ends_with_x,name_ends_with_y`;
words['url']['contains']['link_filter']=`linkURL_contains_x`;
words['permalink']['contains']['reddit_link_filter']=`reddit_comments_URL_contains_x`;
words['title']['word']['title_wordfilter']=`url_Title_words1,url_Title_words2,`;
words['author']['prefix']['user_filter1']=`username_begins_with_x`;

//-----main
function gencss(){ var res=[];res.push(`[category-name="cat-value"]`);
if((disable_on_specific_subreddits && onsub)||
(disable_on_frontpage && onfrontpage)||
(disable_on_otherpages && onother)){
dbg("filtering disabled on;"+rpath);
return `/* filters for url path: '${rpath}' content disabled in Reddit_Filter prefs*/`;}
dbg("tag filters")
addtitles();//fix lack of title css
if(blocknsfw){res.push(',[data-nsfw="true"]');}
if(block_crossposts){res.push(`,[data-num-crossposts]:not([data-num-crossposts="0"])`)}
if(block_promoted){res.push(`,[data-promoted="true"]`);}
if(blockselfposts){res.push(`,.self[data-domain^="self."]`);}
dbg("main css loop")
for(var t in words){var typ=words[t],typname=t;//domain/permalink/author/subreddit

for(var cat in typ){var c=typ[cat];var pref=modeof(cat);//prefix type $^~*
dbg("processing data-"+t+" mode:"+cat);
 for(var str in c){var wordlist=c[str].split(',');// filtered comma separated text chunks
for(var i=0;i<wordlist.length;i++){if(!wordlist[i].length)continue;
res.push(addcssitem(typname,pref,wordlist[i]));
  }}}};
res.push(`{display:none!important}`);
 dbg("Successfully added filters to CSS");
return res.join("");}

//--- add CSS to page---

var csscontainer=document.createElement('style');
csscontainer.id='redditcssfilter1';
csscontainer.innerHTML=gencss();
document.body.appendChild(csscontainer);
dbg("idle, elements inserted:"+csscounter);
dbg(document.getElementById('redditcssfilter1').innerHTML.toString())

