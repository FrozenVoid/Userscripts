// ==UserScript==
// @name        Reddit_Filter
// @namespace   reddit_filters
// @description Filter content on reddit by title,domain,user,subreddit
// @include     https://*.reddit.com/*
// @version     1.06c
// @run-at    document-idle
// @grant      unsafeWindow
// ==/UserScript==
/* this script assumes Old Reddit interface not the JS-based one:
IT WILL NOT WORK ON NEW REDDIT due lack of data- attributes in elements*/
var DEBUG=true;//false //log each filter actions/debug info
var DEBUG2=0;//false log misc. processing

//var disable_on_specific_subreddits=true;//use only on /r/all
var disable_on_specific_subreddits=true;//use outside /r/all e.g. r/AskReddit
var disable_on_frontpage=true;//don't use on frontpage
var disable_on_otherpages=true;//don't use on non-subreddit pages (without  /r/subname)

var load_custom_window_filters=1;//load window-specific filters from other scripts.
var blocknsfw=false;//block nsfw content
var blockselfposts=false;//(self.subname)
var block_promoted=false;//promoted posts
var block_crossposts=false;//crossposts.
var customcssvar=["reddit_csscustom_filt2"];//window variables which loads custom css

//========================================================
var rpath=document.location.pathname;
var onfrontpage=(rpath==="/");
var onrall=(rpath==="/r/all/");
var onsub=!onfrontpage && !onrall && (rpath.search(/\/r\//)!=-1);
var onother=!onfrontpage && !onrall && !onsub;// non subreddit page
var words={},csscounter=0;
//----------------------------------------
dbg2(onfrontpage?"Loaded frontpage":(onrall?"Loaded /r/all":onsub?"Loaded Subreddit:"+rpath:"Other page load:"+rpath));
addarrays('domain','permalink','subreddit','author','url','title')

/*  prefix/suffix filter=filter names with prefix/suffix, 
contains=match any text that contains it(used with title/permalink)
word=match a complete word or exact name (use 'contains' for permalinks)
permalink is the shortened link title, which can be used for filtering content
*/
//format:  words[ subreddit,author,permalink,domain][prefix,suffix,word,contains][name-of-filter-list]=`name1,name2`
//comma separated lists, comment out those you don't need
//-------Write your filters here, example lists
words['domain']['word']['my_category']=`exact_domain_name_filter`;
words['domain']['suffix']['my_category']=`domain_suffix_filter.domain`;
words['subreddit']['suffix']['subreddit_filter1']=`name_ends_with_x,name_ends_with_y`;
words['url']['contains']['link_filter']=`linkURL_contains_x`;
words['permalink']['contains']['reddit_link_filter']=`reddit_comments_URL_contains_x`;
words['title']['word']['title_wordfilter']=`url_Title_words1,url_Title_words2,`;
words['author']['prefix']['user_filter1']=`username_begins_with_x`;
//------------
dbg2("user filters loaded")
function dbg2(text){if(DEBUG2){console.info(text)};}
function dbg(text){if(DEBUG){console.info(text)};}
dbg2("DEBUG mode");
function modeof(m){var pref='';
switch(m){
case 'word':pref='~';break;//word match
case 'contains':pref='*';break;//text match
case 'prefix':pref='^';break;//prefix
case 'suffix':pref='$';break;//suffix
default:;break;}
return pref;}
//------------------------------------------------------------

function addtitles(){//fix reddit lack of 'data-title'
var a=document.querySelectorAll('[data-subreddit]');
for(var i=0;i<a.length;i++){
var title=a[i].querySelector('a[data-event-action="title"]');
if(!title)continue;
 a[i].setAttribute('data-title',title.innerHTML.toString());}}
//-----------------------------------------------
function addcssitem(category,mode,item){
dbg(`Adding item#${csscounter++} : ${item} in:${category} mode: ${mode.toString()}`);
return `,[data-${category}${mode}="${item}"]`;}
//-------------------------------------------------
function addarrays(){const prefixmap=['prefix','word','contains','suffix'];
for(var i=0;i<arguments.length;i++){if(!words[arguments[i]])words[arguments[i]]={};
for(var k=0;k<prefixmap.length;k++)if(!words[arguments[i]][prefixmap[k]])words[arguments[i]][prefixmap[k]]={};}}

//-----main
function gencss(words){ 
var res=[];res.push(`[category-filter="${DEBUG2?words.toSource():"reddit"}"]`);
if((disable_on_specific_subreddits && onsub)||
(disable_on_frontpage && onfrontpage)||
(disable_on_otherpages && onother)){
dbg("filtering disabled on;"+rpath);
return `/* filters for url path: '${rpath}' content disabled in Reddit_Filter prefs*/`;}
dbg2("tag filters");
addtitles();//fix lack of title css
if(blocknsfw){res.push(',[data-nsfw="true"]');}
if(block_crossposts){res.push(`,[data-num-crossposts]:not([data-num-crossposts="0"])`)}
if(block_promoted){res.push(`,[data-promoted="true"]`);}
if(blockselfposts){res.push(`,.self[data-domain^="self."]`);}
dbg2("main css loop")
for(var t in words){var typ=words[t],typname=t;//domain/permalink/author/subreddit
for(var cat in typ){var c=typ[cat];var pref=modeof(cat);//prefix type $^~*
dbg2("processing data-"+t+" mode:"+cat);
 for(var str in c){var wordlist=c[str].split(',');// filtered comma separated text chunks
for(var i=0;i<wordlist.length;i++){if(!wordlist[i].length)continue;
res.push(addcssitem(typname,pref,wordlist[i]));
  }}}};
res.push(`{display:none!important}`);
 dbg2("Successfully added filters to CSS");
return res.join("");}
//------------
function customfilters(){var css2=``;
if(!load_custom_window_filters)return css2;
dbg2("loading custom filters");
for(var z in customcssvar){
var rcont=unsafeWindow[customcssvar[z]];
if(!rcont){dbg("Cannot load custom filter container:"+rcont);continue}
dbg2('loaded:'+rcont);
var rcustomfilters = JSON.parse(rcont); 
dbg2("gencss new filters");
css2+=gencss(rcustomfilters);
dbg2("loaded custom filters");
}  return css2;}


var csscontainer=document.createElement('style');
csscontainer.id='redditcssfilter1';
csscontainer.innerHTML=customfilters()+gencss(words);
document.body.appendChild(csscontainer);
dbg2("idle, elements inserted:"+csscounter);
dbg2(document.getElementById('redditcssfilter1').innerHTML.toString())

