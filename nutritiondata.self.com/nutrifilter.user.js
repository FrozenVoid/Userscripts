// ==UserScript==
// @name        Nutrifilter_Self.com
// @namespace   Nutri
// @include     https://nutritiondata.self.com/*
// @version     1
// @grant       none
// ==/UserScript==
var enable=1;



var filter=/soft drink|-flavored\b|\bflavor|juice pack|juice drinks|fast food|refrigerated|precooked|roasted|toasted|oil-roasted|all-purpose|industrial|bleached|enriched|sweetener|sweetened|light syrup|heavy syrup|aspartame|fat free|nonfat|defatted|lowfat|low fat|reduced fat|\bcalcium reduced|glucose reduced|-fortified|with added \w|hydrogenated|\bblanched|sugared|candied|energy drink|extra sweet|alcoholic beverage|cocktail mix|shortening|seasoning mix|grease|dessert topping|bouillon|gravy|cooking (or|and) salad|salad (or|and) cooking|breakfast|whiskey|sulfured|sulfate|powder$|lemonade|nectar|juice|potatoes|potato|noodles|tomato products|sandwich|burger|substitute|cooking spray|margarine|cheese sauce|cheese food|cheese.+product|oil-butter|canola|rapeseed|made from soy|^soy|soybean|miso|edamame|tofu|natto|soyburgers?|soymilk|\bsoy\b|meatless|vegetarian|veggie|vegetable|tomatoes|tomato|kidney|fava|lima|^meat|corn flour|cornmeal|wheat-based|^corn|pasta|macaroni|spaghetti|whitener|dressing|catsup|drink mix/gmi
var catfilter=/fast-foods|foods-from|baby-foods|sweets|beef-products|ethnic-foods|pork-products|sausages-and-luncheon-meats|lamb-veal|poultry-products|meals|finfish|breakfast-cereals|snacks|baked-products/gmi
function filt(){
var a=document.querySelectorAll("p.foodUrl a");
for(var i=0;i<a.length;i++){
if(enable){

if(a[i].innerHTML.search(filter)!=-1||a[i].href.search(catfilter)!=-1)a[i].parentNode.parentNode.setAttribute('style','display:none!	important');
}}



}
setTimeout(filt,400);
