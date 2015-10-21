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
        str = JSON.stringify(res, undefined, 4);
        openResults(str);
    }
});

function openResults(data){
    win = window.open("", "Result JSON", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top="+(screen.height-400)+", left="+(screen.width-840));

    win.document.head.innerHTML = "<style> \
                                       pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; } \
                                       .string { color: green; } \
                                       .number { color: darkorange; } \
                                       .boolean { color: blue; } \
                                       .null { color: magenta; } \
                                       .key { color: red; } \
                                   </style>"
    win.document.body.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(data);
}



function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

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