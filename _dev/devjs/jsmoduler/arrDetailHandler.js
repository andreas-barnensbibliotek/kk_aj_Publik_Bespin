/**
 * Detaljhanteraren har hand om visning av admindetaljvyn
 * Plats: arrDetailHandler.js
 * @name arrDetailHandler.js
 * @module arrDetailHandler_js
 */

//här sätts alla pluggin och jquery.ready starters 
var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
var HandlebarTemplet = require("./HandlebarTemplethandler.js");
var _appsetting = appsettingsobject.config;

module.exports = {
    /**
    * RenderMainContent render detaljvyn 
    * Plats: arrDetailHandler.js
    * @description maincontent(arrJson) 
    */
    RenderMainContent: function (arrJson) {
        maincontent(arrJson);       
    },
    /**
    * RendeFaktaContent render detaljvyn
    * Plats: arrDetailHandler.js
    * @description faktaContent(arrJson)
    */
    RendeFaktaContent: function (arrJson) {       
        faktaContent(arrJson);
    },
    /**
    * RenderUtovareContent render detaljvyn
    * Plats: arrDetailHandler.js
    * @description utovareContent(arrJson)    
    */
    RenderUtovareContent: function (arrJson) {       
        utovareContent(arrJson);
    },
    /**
    * RenderUtovareContentJson render detaljvyn
    * Plats: arrDetailHandler.js
    * @description utovareContentJson(arrJson)    
    */
    RenderUtovareContentJson: function (arrJson) {
        utovareContentJson(arrJson);
    },
    /**
    * RenderExempelContentJson render detaljvyn
    * Plats: arrDetailHandler.js
    * @description  exempelcontent(arrJson)    
    */
    RenderExempelContentJson: function (arrJson) {
        exempelcontent(arrJson);
       
    }
};

/**
    * maincontent uppdaterar detaljvyn med rubrik underrubrik content och bild
    * Plats: arrDetailHandler.js    
    * @description maincontent: jqueryfunction updaterar huvudinnehållet i arrangemanget
    * @memberof arrDetailHandler_js    
    */
var maincontent = function (arrJson) {
     
    $('.granska_rubrik').html(arrJson.Rubrik);
    $('.granska_underrubrik').html(arrJson.UnderRubrik);
   
        let decodehtml = $('<div/>').html(arrJson.Innehall).text(); // detta behövs inte då decodingen görs i arrDetailVy.js -> fyllArrJson
        $('.granska_innehall').html(decodehtml);
        //$('.granska_innehall').html(arrJson.Innehall);
        //let decodehtml = $('<div/>').html(arrJson.Innehall).text(); // detta behövs inte då decodingen görs i arrDetailVy.js -> fyllArrJson
    //$('.granska_innehall').html(arrJson.Innehall);
    var imgsrc = "";
    if (arrJson.Arrid) {
        imgsrc = _appsetting.globalconfig.arrimgurl + arrJson.MainImage.MediaUrl;
    } else {
        let tidigarearrid = $('#arr_getTidigareArrangemang_Get').attr('rel');
        imgsrc = _appsetting.globalconfig.arrimgurl + arrJson.MainImage.MediaUrl;
        if (tidigarearrid > 0) {
            imgsrc = _appsetting.globalconfig.arrimgurl + '/' + arrJson.MainImage.MediaUrl;
        };     
       
    }
    
    $('.granska_pressentationsbild').attr('src', imgsrc);
    $('.granska_pressentationsbild').attr('alt', arrJson.MainImage.MediaAlt);
    $('.arrmainfoto').html('<span>Foto: </span> ' + arrJson.MainImage.MediaFoto);

    if (arrJson.MediaList.length > 0) {
        var headertext = $('.arrExempellistHeader');
        switch (arrJson.Arrangemangtyp) {
            case "Föreställning på turné":
                headertext.html("SMAKPROV FRÅN FÖRESTÄLLNINGEN");
                break;
            case "Skolbio":
                headertext.html("TRAILER FRÅN FILMEN");
                break;
            default:
                headertext.html("HÄR FÅR DU VETA MER");
        };

        $('.granska_exempel').show();
    } else {
        $('.granska_exempel').hide();
    }
    $(".faktaarrtyp").html(arrJson.Arrangemangtyp);
    $(".faktakonstform").html(arrJson.Konstform);
    
    $('#shareMail').attr('href', 'mailto:?Subject=Delat%20fr%C3%A5n+Kulturkatalogen%20V%C3%A4st%20-%20' + arrJson.Rubrik + '&body=Jag%20vill%20dela%20arrangemanget:%20%22' + arrJson.Rubrik + '%22%20%0D%0Afr%C3%A5n%20Kulturkatalogen%20V%C3%A4st%3A%20 http://kulturkatalog.kivdev.se/Kulturkatalogen/ArrangemangDetail/id/' + arrJson.Arrid);
    let facebokURI = "https://www.facebook.com/sharer.php?u=";
    facebokURI += encodeURIComponent('http://kulturkatalog.kivdev.se/Kulturkatalogen/ArrangemangDetail/id/') + arrJson.Arrid  +'&picture=&' + encodeURIComponent(imgsrc) + '&t=' + encodeURIComponent(arrJson.Rubrik) + '&description=' + encodeURIComponent(arrJson.UnderRubrik);
    $('#shareFacebook').attr('href', facebokURI);
       
    
};
/**
    * faktaContent uppdaterar detaljvyn med alla faktauppgifter
    * Plats: arrDetailHandler.js    
    * @description faktaContent: jqueryfunction updaterar faktainnehållet i arrangemanget
    * @memberof arrDetailHandler_js    
    */
var faktaContent = function (fakalistJson) {

    HandlebarTemplet.injecthtmltemplate(".granskaFaktaMainblock", "kk_aj_granskafaktaList.txt", fakalistJson);

};

/**
    * exempelcontent uppdaterar detaljvyn med alla exempel
    * Plats: arrDetailHandler.js    
    * @description exempelcontent: jqueryfunction updaterar exempelinnehållet i arrangemanget
    * @memberof arrDetailHandler_js    
    */
var exempelcontent = function (arrJson) {
    HandlebarTemplet.injecthtmltemplate(".arrExempellist", "kk_aj_arrpubExempelList.txt", arrJson);
}

/**
    * utovareContent uppdaterar detaljvyn kopierar alla utövardata till kontaktuppgifter för arrangemanget
    * Plats: arrDetailHandler.js    
    * @description utovareContent: kopierar alla utövardata till kontaktuppgifter för arrangemanget
    * @memberof arrDetailHandler_js    
    */
var utovareContent = function (utovareJson) {
    $('.granska_Utovare_Organisation').html($('#utovare_aktor_grupp').val());
    $('.granska_Utovare_namn').html($('#arr_kontakt_fornamn').val() + " " + $('#arr_kontakt_efternamn').val());
    $('.granska_Utovare_Adress').html($('#utovare_adress').val());
    $('.granska_Utovare_postort').html($('#utovare_postnummer').val() + " " + $('#utovare_ort').val());
    $('.granska_Utovare_tfn').html($('#arr_kontakt_telefonnr').val());
    $('.granska_Utovare_epost').html($('#arr_kontakt_epost').val());
    $('.granska_Utovare_hemsida').html($('#utovare_orghemsida').val());
};

/**
    * utovareContentJson uppdaterar detaljvyn med alla utövardata 
    * Plats: arrDetailHandler.js    
    * @description utovareContent: uppdaterar detaljvyn med alla utövardata för arrangemanget ingår i postdata json
    * @memberof arrDetailHandler_js    
    */
var utovareContentJson = function (utovareJson) {
    $('.granska_Utovare_Organisation').html(utovareJson.UtovareData.Organisation);
    $('.granska_Utovare_namn').html(utovareJson.UtovareData.Fornamn + " " + utovareJson.UtovareData.Efternamn);
    $('.granska_Utovare_Adress').html(utovareJson.UtovareData.Adress);
    $('.granska_Utovare_postort').html(utovareJson.UtovareData.Postnr + " " + utovareJson.UtovareData.Ort);
    $('.granska_Utovare_tfn').html(utovareJson.UtovareData.Telefon);
    $('.granska_Utovare_epost').html(utovareJson.UtovareData.Epost);
    $('.granska_Utovare_hemsida').html(utovareJson.UtovareData.Weburl);
};

