var page = {
name : "name",
url: "url",
title: "title",
  elements : new Array,
};

var jdi_type = "jdi-type"
var jdi_name = "jdi-name"

window.addEventListener('load', function(){
  page.name = location.pathname;
  page.url = document.URL;
  page.title = document.title;

  var nodes = document.querySelectorAll("["+ jdi_type +"]");
  var array = Array.prototype.slice.call(nodes);
  for (item of array) {
   page.elements.push(getData(item));
  }

  var str = JSON.stringify(page);
  console.log(str)
});


function getData(item){
return {
        type : item.getAttribute(jdi_type),
        name : item.getAttribute(jdi_name),
        locator : "myLocator",
       }
}