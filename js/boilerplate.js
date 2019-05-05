// A few components of every page follow the same rules...

var firstScript = document.body.getElementsByTagName("script")[0];

var footer = document.createElement("footer");
footer.className = "page-footer pt-3";
footer.setAttribute("align", "right");

var texts = ["Troy Fulton","(832)-552-6257","troyfulton@tamu.edu"];

var b = document.createElement("b");
footer.appendChild(b);

for (var i = 0; i < texts.length; i++) {
    var newItem = document.createElement("div");
    newItem.textContent = texts[i];
    b.appendChild(newItem);
}

document.body.insertBefore(footer, firstScript);
