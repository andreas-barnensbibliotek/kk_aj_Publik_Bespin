var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");

module.exports = {
    start: function (tab) {

    },
    injecthtmltemplate: function (targetClass, usetemplateName, currentdata) {

        var appsetting = appsettingsobject.config;

        var test = appsettingsobject.config.globalconfig.htmltemplateURL + "/" + usetemplateName;

        $.get(appsettingsobject.config.globalconfig.htmltemplateURL + "/" + usetemplateName, function (data) {
            var temptpl = Handlebars.compile(data);
            $(targetClass).html(temptpl(currentdata));
            //callback(htmltemplate)
        }, 'html');
    }
}

// kollar om ansökningar är lästa eller ej
Handlebars.registerHelper('iffilm', function (object, url) {
    
    var rettext = "";
    switch (object) {
        case "1":
            rettext = '<img src="' + url + '" />';
            break;
        case "2":
            if (isNaN(url)) {
                urltoMovie = "https://www.youtube.com/embed/" + url;
            } else {
               urltoMovie = "https://player.vimeo.com/video/" + url; 
            };
            rettext = '<iframe width="auto" height="auto" src="' + urltoMovie + '" frameborder="0" allowfullscreen="true" style="max-width:100%;"></iframe>';

            break;
        case "3":
            //rettext = '<audio name="ljudspelare" src="' + url + '" preload />';
            rettext = '<audio preload id="audio1" src="' + url + '" controls="controls">Your browser does not support HTML5 Audio!</audio>'
            break;
    }

    return rettext;
});


Handlebars.registerHelper('faktatyp', function (Faktaid, Faktarubrik, FaktaValue) {
    var ret = "";
    if (Faktaid === "1") {
        ret+= "<div class='row'><div class='small-12 medium-6 columns faktalabel'>";
        ret += Faktarubrik;
        ret += "</div><div class='small-12 medium-6 columns'>";               
        ret += FaktaValue
        if (!isNaN(parseFloat(FaktaValue))) {
            ret += faktavalueextention(Faktarubrik);
        };
        ret += "</div></div>";
        
    }
    return ret;
});

Handlebars.registerHelper('lokaltyp', function (Faktaid, Faktarubrik, FaktaValue, Faktatypid) {
    var ret = "";
    if (Faktaid === "2") {
        
        ret += "<div class='row'><div class='small-12 medium-6 columns faktalabel'>";
        ret += Faktarubrik;
        if (Faktatypid == "18" && FaktaValue.length >18) {
            ret += "</div><div class='small-12 columns'>";
        } else {
            ret += "</div><div class='small-12 medium-6 columns'>";
        }       
        ret += FaktaValue
        if (!isNaN(parseFloat(FaktaValue))) {
            ret += faktavalueextention(Faktarubrik);
        };
        ret += "</div></div>";

    }
    return ret;
});
Handlebars.registerHelper('publiktyp', function (Faktaid, Faktarubrik, FaktaValue) {
    let ret = "";
    let age = false;
    if (Faktarubrik == "Ålder lägst" && FaktaValue <= 0) {
        age = true;
    }
    if (Faktarubrik == "Ålder högst" && FaktaValue <= 0) {
        age = true;
    }

    if (Faktaid === "3"&& age == false) {
        ret += "<div class='row'><div class='small-12 medium-6 columns faktalabel'>";
        ret += Faktarubrik
        ret += "</div><div class='small-12 medium-6 columns'>"
        ret += FaktaValue;
        if (!isNaN(FaktaValue)) {
            ret += faktavalueextention(Faktarubrik);
        };
        ret += "</div></div>";
    }
    return ret;
});
Handlebars.registerHelper('ekonomityp', function (Faktaid, Faktarubrik, FaktaValue, Faktatypid) {
    var ret = "";
    if (Faktaid === "4") {
        ret += "<div class='row'><div class='small-12 medium-6 columns faktalabel'>";
        ret += Faktarubrik
        if (Faktatypid == "30" && FaktaValue.length > 18) {
            ret += "</div><div class='small-12 columns'>";
        } else {
            ret += "</div><div class='small-12 medium-6 columns'>";
        }
        ret += FaktaValue;
        if (!isNaN(FaktaValue)) {
            ret += faktavalueextention(Faktarubrik);
        };
        ret += "</div></div>";
    }
    return ret;
});

Handlebars.registerHelper('faktatypvisas', function (faktalist, val, opts) {
    var ret = false;
    var langd = faktalist.filter(function (lista) { return lista.Faktaid == val }).length;
    if (langd) {
        return opts.fn(this);
    }
    
});

Handlebars.registerHelper('ovrigttyp', function (Faktaid, Faktarubrik, FaktaValue, Faktatypid) {
    var ret = "";
    if (Faktaid === "5") {

        ret += "<div class='row'><div class='small-12 medium-6 columns faktalabel'>";
        ret += Faktarubrik;
        if (Faktatypid == "33" && FaktaValue.length > 18) {
            ret += "</div><div class='small-12 columns'>";
        } else {
            ret += "</div><div class='small-12 medium-6 columns'>";
        }
        ret += FaktaValue
        if (!isNaN(FaktaValue)) {
            ret += faktavalueextention(Faktarubrik);
        };
        ret += "</div></div>";

    }
    return ret;
});

Handlebars.registerHelper('showyearspan', function (ansokningstatus) {
    var rettext = '';
    if (ansokningstatus.trim() != "-") {
        rettext = 'Ålder ' + ansokningstatus + ' år';
    }
    ret = rettext;
    return ret;
});

Handlebars.registerHelper('inMemList', function (yearspan) {
    var ret = '<img src="/Portals/_default/Skins/kk_aj_Publik_Bespin/public/images/Add-New-32.png" alt="Lägg till i minneslistan" title="Lägg till i minneslistan"/>';
    if (yearspan === "inminneslist") {
        ret = '<img src="/Portals/_default/Skins/kk_aj_Publik_Bespin/public/images/Check-32.png" alt="Ta bort från minneslistan" title="Ta bort från minneslistan"/>';
    }

    return ret;
});

// kollar om bilden är ny eller redan finns
Handlebars.registerHelper('imgfix', function (id, imgfile) {
    if (imgfile.indexOf(id) == -1) {
        imgfile = id + "_" + imgfile;
    }
    return imgfile;
});
var faktavalueextention =function(typ){
    let fixat = typ.replace(/^\s+|\s+$/gm, '').toLowerCase();
    

    switch (fixat) {
        case "ålder lägst":
            return " år";
            break;
        case "ålder högst":
            return " år";
            break;
        case "takhöjd över scen":
            return " m";
            break;
        case "bredd på scen":
            return " m";
            break;
        case "djup på scen":
            return " m";
            break;
        case "byggtid":
            return " min";
            break;
        case "rivtid":
            return " min";
            break;
        case "speltid":
            return " min";
            break;
        case "kostnad/pris":
            return " kr";
            break;
        default:
            return "";
    }
}