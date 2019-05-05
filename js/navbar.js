// Code for forming a good navigation bar at the top of the page

// Menu Data (someday read from a file)
var menuOptions = ["Home", "About Me", "Education", "Experience", "Activities", "Skills"];
var refList ={
    "Home":"../index.html",
    "About Me":"aboutMe.html",
    "Education":"education.html",
    "Experience":"experience.html",
    "Activities":"activitiesAndLeadership.html",
    "Skills":"skills.html"
};
var dropdownLists = {
    "Education": {
        "Coursework":"coursework.html",
        "Research":"research.html",
        "My resume":"resume.html"
    },
    "Skills": {
        "Computer Science":"computerSkills.html",
        "Music":"music.html",
        "Honors/Awards":"honorsAndAwards.html"
    },
    "Activities": {
        "Community Service":"communityService.html"
    },
    "Experience" : {
        "Jobs, Internships, and Coops":"jobsInternshipsCoops.html",
        "Other Work Experience":"otherWork.html"
    }
};
var htmlPath;
if (document.title == "Troy's ePortfolio Home") {
    htmlPath = "html/";
}
else {
    htmlPath = "";
}


// First, the boilerplate:

var navTag = document.createElement("nav");
navTag.setAttribute("class","navbar navbar-expand-lg navbar-light");
var divTag = document.createElement("div");
divTag.setAttribute("class","collapse navbar-collapse");
divTag.setAttribute("id","navbarSupportedContent");
var ulTag = document.createElement("ul");
ulTag.setAttribute("class","navbar-nav mr-auto");
ulTag.setAttribute("id","navbarList");

// Button for collapsing:
var navButton = document.createElement("button");
navButton.className = "navbar-toggler";
navButton.setAttribute("type", "button");
navButton.setAttribute("data-toggle", "collapse");
navButton.setAttribute("data-target", "#navbarSupportedContent");
navButton.setAttribute("aria-controls", "navbarSupportedContent");
navButton.setAttribute("aria-expanded", "false");
navButton.setAttribute("aria-label", "Toggle navigation");
var collapseLogo = document.createElement("span");
collapseLogo.className = "navbar-toggler-icon";
navButton.appendChild(collapseLogo);
navTag.appendChild(navButton);

divTag.appendChild(ulTag);
navTag.appendChild(divTag);
// Insert the menu at the beginning of the body:
var content = document.body.getElementsByTagName("div")[0];
content.insertBefore(navTag, content.childNodes[0]);

// Then the cool stuff:

function colorItem(item, color) {
    item.className += " aggie-" + color;
}

function makeNavbarLink(navbar, i) {
    var menuItem = document.createElement("li");
    var itemLink = document.createElement("a");

    menuItem.className = "nav-item active";
    itemLink.className = "nav-link";
    itemLink.setAttribute("align", "center");

    colorItem(itemLink, "maroon");

    itemLink.textContent = menuOptions[i];
    itemLink.href = htmlPath + refList[menuOptions[i]];

    menuItem.appendChild(itemLink);
    navbar.appendChild(menuItem);
}

function makeNavbarDropdown(navbar, i) {
    var menuItem = document.createElement("li");
    menuItem.className = "dropdown nav-item";

    var dropButton = document.createElement("a");
    dropButton.className = "nav-link";
    dropButton.textContent = menuOptions[i];
    dropButton.href = htmlPath +  refList[menuOptions[i]];
    dropButton.setAttribute("align", "center");
    colorItem(dropButton, "maroon");
    menuItem.appendChild(dropButton);

    var menuDiv = document.createElement("div");
    menuDiv.className = "dropdown-menu";
    menuDiv.setAttribute("aria-labelledby","navbarDropdown");
    menuItem.appendChild(menuDiv);

    var dropdownOptions = dropdownLists[menuOptions[i]];
    var keys = Object.keys(dropdownOptions);

    for (var j = 0; j < keys.length; j++) {
        var itemLink = document.createElement("a");
        itemLink.textContent = keys[j];
        itemLink.className = "dropdown-item";
        itemLink.href = htmlPath +  dropdownOptions[keys[j]];
        colorItem(itemLink, "maroon");
        itemLink.setAttribute("align", "center");
        menuDiv.appendChild(itemLink);
    }

    navbar.appendChild(menuItem);
}

var navbar = ulTag;

for (var i = 0; i < menuOptions.length; i++) {
    if (dropdownLists[menuOptions[i]] != undefined) {
        makeNavbarDropdown(navbar, i);
    }
    else {
        makeNavbarLink(navbar, i);
    }
}

var siteName = document.createElement("font");
siteName.textContent = "ePortfolio";
siteName.setAttribute("size", "+2");
siteName.className = "aggie-maroon";
// Add after the navbar
navbar.parentElement.appendChild(siteName);