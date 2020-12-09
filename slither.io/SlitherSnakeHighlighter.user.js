// ==UserScript==
// @name     SlitherSnakeHighlighter
// @version  1.07d
// @author FrozenVoid
// @description Highlight snakes
// @include   /^http.+slither.io.?$/
// @grant    unsafeWindow
// ==/UserScript==

const vecradius=22;// radius of eye vector
const vec_distance=120;//distance from front of snake
const vector_alpha=0.22;//alpha transparency of vector circle.
const hidesnakenames=0;//hides snake names
const hidesnake_size=0;//hides sizes(added by default)
const plaincolors=1;//use plain colors for snakes.
const ensnake_name_color="white";//color for enemy snake names
const ensnake_vector_color="red";//color for enemy snake vector(circle)
//self-highlight
const ownhighlight=1;//highlight own snake/vector/name
const oursnake_name_color="green";//color for our snake name
const oursnake_vector_color="green";//color for our snake vector
const oursnakename_highlight=1;//highlight our snake name.
const custom_width=0;//1=use oursnake_width,0=no
const oursnake_width=1;// specific width for our snake

const snake_plain_colors=[35,18,33,32,31,9,12,6];

function setsnake(prop,val){
  Object.defineProperty(unsafeWindow.snake,prop,
                        {value:val,writable:false});}
function csetsnake(prop,val){
if(unsafeWindow.snake[prop]!=val)setsnake(prop,val);}

function highlight_snakes(){

       if(!unsafeWindow.playing||!unsafeWindow.snake)return;
if(!unsafeWindow.snakes||unsafeWindow.snakes.length==1)return;


  for(var i in unsafeWindow.snakes){
    if(unsafeWindow.snakes[i].marked)continue;
  if(unsafeWindow.snakes[i].id==unsafeWindow.snake.id){
    if(!ownhighlight)continue;
   if(custom_width) setsnake('sc',oursnake_width);
    setsnake('ed',vec_distance);
    setsnake('esp',0);
    setsnake('ec',oursnake_vector_color);
    setsnake('er',vecradius*2);
    setsnake('eca',vector_alpha);
  // setsnake('cv',38);

       if(oursnakename_highlight){
      setsnake('csw',oursnake_name_color);
      setsnake('na',32.0);}

    setsnake('marked',1);

    continue;}
    var sn_size=hidesnake_size?"":" ↔ "+unsafeWindow.snakes[i].pts.length;
    with(unsafeWindow.snakes[i]){
if(plaincolors){ rbcs=null; cv=snake_plain_colors[id&7];}//plain color

    ed=vec_distance;esp=0;ec=ensnake_vector_color;er=5*(vecradius/sc);
      one_eye=0;eac=0;na=32.0;
      nk=hidesnakenames?sn_size:
(nk.search("↔")!=-1?nk.replace(/ ↔ \d+|$/,sn_size):
 nk+sn_size);
       csw=ensnake_name_color;
      eca=vector_alpha;
      cs=cs04="#ffffff";marked=1;

    }

  }
  //endfunc
}
setInterval(highlight_snakes,125)
