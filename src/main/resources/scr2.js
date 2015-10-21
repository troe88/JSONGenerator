var jdi_type = "jdi-type";
var jdi_name = "jdi-name";
var base = "http://localhost:63342/HTMLParse/";
var pages  = ["index.html", "page1.html"];

window.addEventListener('load', function(){
    exec();
    count = getCount();
    if(count < pages.length){
        url = base + pages[count];
        getPage(pages[count]);
    } else {
        res = {
            domain : base,
            pages : new Array
        }
        for (item of pages) {
            res.pages.push(JSON.parse(Cookies.get("/HTMLParse/" + item)));
        }
        str = JSON.stringify(res);
        Cookies.set(location.pathname, res);
        console.log(str);
    }
});

function getCount(){
    i = Cookies.get("count");
    if(i == undefined || i >= pages.length){
        i = 0;
        Cookies.set("count", i);
    } else {
        i++;
        Cookies.set("count", i);
    }
    return i;
}

function exec(){
    page = {
        name     : location.pathname,
        url      : document.URL,
        title    : document.title,
        elements : getPageElements(),
    }

    str = JSON.stringify(page);
    Cookies.set(location.pathname, str);
}

function getPage(path){
    url = base + path;
    console.log(url);
    location.assign(url);
    Cookies.remove(path);
}

function getPageElements(){
    data = new Array;
    nodes = document.querySelectorAll("["+ jdi_type +"]");
    array = Array.prototype.slice.call(nodes);
    for (item of array) {
        data.push(getElementData(item));
    }
    return data;
}

function getElementData(item){
return {
        type : item.getAttribute(jdi_type),
        name : item.getAttribute(jdi_name),
        locator : "[" + jdi_name + "='" + item.getAttribute(jdi_name) + "']",
       }
}