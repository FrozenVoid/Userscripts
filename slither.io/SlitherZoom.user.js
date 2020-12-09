// ==UserScript==
// @name     SlitherZoom
// @version  1.07b
// @author FrozenVoid
// @description Zoom using mousewheel
// @include   /^http.+slither.io.?$/
// @grant    unsafeWindow
// ==/UserScript==
var v_zoom=0.4;// used as initial zoom value
var min_zoom=0.03// minimal zoom value(max map view)
var max_zoom=1.5//maximum zoom value

//-------------------
//unsafeWindow.want_quality=0;
function zoomfunc(e){
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return; //ignore shortcuts.
     v_zoom*=e.deltaY <0?1.02:0.98;
  if(v_zoom<min_zoom)v_zoom=min_zoom;
  if(v_zoom>max_zoom)v_zoom=max_zoom;
unsafeWindow.sgsc=v_zoom;
unsafeWindow.gsc=v_zoom;}


//-----------------
//native zoom handler removal
function rem_zoom_handler(){
  if(!unsafeWindow.redraw){setTimeout(rem_zoom_handler,1000);return;}
unsafeWindow.sgsc=v_zoom;
unsafeWindow.gsc=v_zoom;
var r=unsafeWindow.redraw.toSource();
r=r.replace(`if(snake){var c=.64285+.514285714/Math.max(1,(snake.sct+16)/36);gsc!=c&&(gsc<c?(gsc+=2E-4,gsc>=c&&(gsc=c)):(gsc-=2E-4,gsc<=c&&(gsc=c)))}`,"");
unsafeWindow.redraw=unsafeWindow.eval(r);}
rem_zoom_handler();

//---------------------
window.addEventListener("wheel",zoomfunc,true)
