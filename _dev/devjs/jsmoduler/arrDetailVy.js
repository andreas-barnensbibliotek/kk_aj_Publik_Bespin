/**
 * Detaljhanteraren har hand om visning av admindetaljvyn
 * @name arrDetailVy.js
 * @module arrDetailVy_mainmodule
 */
//här sätts alla pluggin och jquery.ready starters 
var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
var detailhandler = require("./arrDetailHandler.js");
var granska = require("./arrgranskahandler.js");
var _appsetting = appsettingsobject.config;

module.exports = {
    /**
    * DetailVy render hanterar detaljvyn data
    * @function fillDetaildata(arrid, "details") 
    */
    DetailVy: function (arrid) {

        fillDetaildata(arrid, "details");

        
    },    
    /**
    * Granskavy fyller granskavyn med detaljdata och sätter upp jqueryeventen för granskavyn 
    * DetailVy render hanterar detaljvyn data
    * @function fillDetaildata(arrid, "details") 
    */
    GranskaVy: function (arrid) {

        fillDetaildata(arrid, "granska");
        
        granska.granskahandler(arrid);

    }
};

var renderDetails = function (arrJson) {
    detailhandler.RenderMainContent(arrJson);
    detailhandler.RendeFaktaContent(arrJson);
    detailhandler.RenderUtovareContentJson(arrJson);
    detailhandler.RenderExempelContentJson(arrJson);
}


var fillDetaildata = function (arrid, typ) {

    Servicehandler(arrid, typ, function (data) {
        if (data.kk_aj_admin.ansokningarlista.ansokningarcount == "0") {
            //if (typ == "granska") {
            //    $('.detailblock').hide();
            //} else {
                window.location.href = "/404";
            
            return false;
        };
        fyllArrJson(data, function (json) {

            renderDetails(json);
            
        });
    })

}


var Servicehandler = function (arrid, typ, callback) {

    var arrurl = "/Api_v2/arrangemang/"+ typ +"/uid/0/typ/" + arrid + "/devkey/alf?type=json&callback=testar";
    var serverurl = _appsetting.globalconfig.apiserver + arrurl;

    $.ajax({
        async: true,
        type: "GET",
        url: serverurl,
        dataType: "json",
        success: function (data) {
            console.log("utövardata hämtad: ");
            callback(data, "funkar");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Nått blev fel hämtning utövardata!");
            alert("Nått blev fel hämtning utövardata!");
        }
    });   
}

var fyllArrJson = function (data, callback) {
    var arrdata = data.kk_aj_admin.ansokningarlista.ansokningar[0];

    // MAINBLOCK
    _arrjsondata.Arrid = arrdata.ansokningid;
    _arrjsondata.Rubrik = arrdata.ansokningtitle;
    _arrjsondata.UnderRubrik = arrdata.ansokningsubtitle;
    //_arrjsondata.Innehall = htmlEncode(arrdata.ansokningContent);
    _arrjsondata.Innehall = arrdata.ansokningContent;
    _arrjsondata.Arrangemangtyp = arrdata.ansokningtyp;
    _arrjsondata.Konstform = arrdata.ansokningkonstform;
    _arrjsondata.MainImage.MediaUrl = arrdata.ansokningMediaImage.MediaUrl;
    _arrjsondata.MainImage.MediaAlt = arrdata.ansokningMediaImage.MediaAlt;
    _arrjsondata.MainImage.MediaFoto = arrdata.ansokningMediaImage.MediaFoto;

    //UTÖVAREBLOCK
    _arrjsondata.UtovareData.UtovarID = arrdata.ansokningUtovardata.UtovarID;
    _arrjsondata.UtovareData.Organisation = arrdata.ansokningUtovardata.Organisation;
    _arrjsondata.UtovareData.Fornamn = arrdata.ansokningKontaktfornamn;
    _arrjsondata.UtovareData.Efternamn = arrdata.ansokningKontaktEfternamn;
    _arrjsondata.UtovareData.Telefon = arrdata.ansokningKontaktTelefon;
    _arrjsondata.UtovareData.Adress = arrdata.ansokningUtovardata.Adress;
    _arrjsondata.UtovareData.Postnr = arrdata.ansokningUtovardata.Postnr;
    _arrjsondata.UtovareData.Ort = arrdata.ansokningUtovardata.Ort;
    _arrjsondata.UtovareData.Epost = arrdata.ansokningKontaktEpost;
    _arrjsondata.UtovareData.Kommun = arrdata.ansokningUtovardata.Kommun;
    _arrjsondata.UtovareData.Weburl = arrdata.ansokningUtovardata.Weburl;
    
    // FAKTA BLOCK
    //_arrformjsondata.Faktalist = [];
    _arrjsondata.Faktalist.push({
        "Faktaid": "1",
        "FaktaTypID": 0,
        "Faktarubrik": "Arrarangemangstyp",
        "FaktaValue": _arrjsondata.Arrangemangtyp
    });
    _arrjsondata.Faktalist.push({
        "Faktaid": "1",
        "FaktaTypID": 0,
        "Faktarubrik": "Konstform",
        "FaktaValue": _arrjsondata.Konstform
    });
    $.each(arrdata.ansokningFaktalist, function (itm, val) {
        
        switch (val.FaktaTypID) {
            // FAKTA 1
            case 1: case 2: case 3: case 4: case 5: case 25: case 26: case 35: case 43: case 44: case 45: case 46:
                _arrjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;

                // LOKAL 2
            case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 27: case 28:
                _arrjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;

                // PUBLIK 3
            case 6: case 7: case 8: case 9:  case 36:

                if (val.FaktaTypID == 7 || val.FaktaTypID == 8) {
                    val.FaktaValue = val.FaktaValue + " år"
                };

                _arrjsondata.Faktalist.push({
                    "Faktaid": "3",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;

                // EKONOMI 4
            case 19: case 20: case 21: case 22: case 23: case 24: case 29: case 30: case 31: case 32: case 34: 
                _arrjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;
                // ÖVRIGT 5
            case 33:
                _arrjsondata.Faktalist.push({
                    "Faktaid": "5",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;

            // Fakta för konsulenten enbart
            case 37: case 38: case 39: case 40: case 41: case 42:
                break;
                // default är ÖVRIGT
            default:
                _arrjsondata.Faktalist.push({
                    "Faktaid": "5",
                    "FaktaTypID": val.FaktaTypID,
                    "Faktarubrik": val.Faktarubrik,
                    "FaktaValue": val.FaktaValue
                });
                break;
        };

    });

    $.each(arrdata.ansokningMedialist, function (itm, val) {

        if (val.MediaTyp == "2") {            
            val.MediaUrl = val.MediaUrl.replace("https://youtu.be/", "");
        };

        _arrjsondata.MediaList.push({
            "MediaID": val.MediaID,
            "MediaUrl": val.MediaUrl,
            "MediaFilename": val.MediaFilename,
            "MediaSize": val.MediaSize,
            "MediaAlt": val.MediaAlt,
            "MediaFoto": val.MediaFoto,
            "MediaTyp": val.MediaTyp,
            "mediaTitle": val.mediaTitle,
            "mediaBeskrivning": val.mediaBeskrivning,
            "mediaLink": val.mediaLink
        });               
    });

    _arrjsondata.Faktalist = sortByKey(_arrjsondata.Faktalist, "Faktalist.Faktarubrik")
    callback(_arrjsondata);


}
var _arrjsondata = {
    "Arrid" :"",
    "Rubrik": "",
    "UnderRubrik": "",
    "Innehall": "",
    "Arrangemangtyp": "",
    "Konstform": "",
    "Faktalist": [],
    "MediaList": [],
    "Username": "",
    "MainImage": {
        "MediaID": 0,
        "MediaUrl": "",
        "MediaFilename": "",
        "MediaSize": "",
        "MediaAlt": "",
        "MediaFoto": "",
        "MediaTyp": "",
        "MediaVald": "nej",
        "mediaTitle": "",
        "mediaBeskrivning": "",
        "mediaLink": "",
        "sortering": "0"
    },
    "Utovare": "0",
    "UtovareData": {
        "UtovarID": "0",
        "Organisation": "",
        "Fornamn": "",
        "Efternamn": "",
        "Telefon": "",
        "Adress": "",
        "Postnr": "",
        "Ort": "",
        "Epost": "",
        "Kommun": "",
        "Weburl": ""
    }
}


var htmlEncode= function(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

var htmlDecode= function(value) {
    return $('<div/>').html(value).text();
}

var sortByKey = function(objArray, prop, direction){
    if (arguments.length<2) throw new Error("ARRAY, AND OBJECT PROPERTY MINIMUM ARGUMENTS, OPTIONAL DIRECTION");
    if (!Array.isArray(objArray)) throw new Error("FIRST ARGUMENT NOT AN ARRAY");
    const clone = objArray.slice(0);
    const direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending
    const propPath = (prop.constructor===Array) ? prop : prop.split(".");
    clone.sort(function(a,b){
        for (let p in propPath){
            if (a[propPath[p]] && b[propPath[p]]){
                a = a[propPath[p]];
                b = b[propPath[p]];
            }
        }
        // convert numeric strings to integers
        a = a.match(/^\d+$/) ? +a : a;
        b = b.match(/^\d+$/) ? +b : b;
        return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
    });
    return clone;
}
