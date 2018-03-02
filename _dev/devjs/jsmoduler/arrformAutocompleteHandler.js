/**
 * get aputocomplete handler främst utövaredata
 * Plats: arrformAutocompleteHandler.js    
 * @name arrformAutocompleteHandler.js
 * @module arrformAutocompleteHandler_js
 */
//här sätts alla pluggin och jquery.ready starters 
var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
var _appsetting = appsettingsobject.config;

module.exports = {
    /**
   * RenderMainContent render detaljvyn 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    getBefintligutovare: function (epost, postnr, callback) {
        var requesturl = "";
        var ok = "false";

        if (epost) {
            ok = true;
        }
        if (!postnr) {
            ok = false;
        }

        if (ok) {
            epost = epost.replace(/\s+/g, '');
            postnr = postnr.replace(/\s+/g, '');
       
            requesturl = _appsetting.globalconfig.apiserver + "/Api_v3/utovare/searchForm/user/" + epost + "/val/" + postnr + "/devkey/alf?type=json";

            servercall(requesturl, function (data, retmess) {
                if (retmess) {                    
                    callback(fyllutovaredata(data));
                    
                } else {
                    callback(false);
                    console.log("fel vid hämtning av befintlig utövardata");
                };

            });
          }             
        
    },
    /**
   * RenderMainContent render detaljvyn 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    allreadyExistsutovare: function (epost, postnr, callback) {
        var requesturl = "";
        var ok = "false";

        if (epost) {
            ok = true;
        }
        if (!postnr) {
            ok = false;
        }

        if (ok) {
            epost = epost.replace(/\s+/g, '');
            postnr = postnr.replace(/\s+/g, '');

            requesturl = _appsetting.globalconfig.apiserver + "/Api_v3/utovare/searchForm/user/" + epost + "/val/" + postnr + "/devkey/alf?type=json";

            servercall(requesturl, function (data, retmess) {
                console.log("detta är REtmess " +retmess);
                if (data.kk_aj_admin.antalutovare >0) {
                    callback(true);

                } else {
                    callback(false);
                    console.log("fel vid hämtning av befintlig utövardata");
                };

            });
        }

    },
    /**
   * RenderMainContent render detaljvyn 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    emptyutovareform: function () {
        tomutovarefield();
    },
    /**
   * RenderMainContent render detaljvyn 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    savekontaktuppgifter: function () {
        savekontaktupg();
    },
    /**
   * kopierakontaktuppgifter render detaljvyn 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    kopierakontaktuppgifter: function () {
        copykontaktupg();
    },
    /**
   * getutovareArrlist render hämtar tidigare arrangemang i en lista om det finns några 
   * Plats: arrformAutocompleteHandler.js
   * @description maincontent(arrJson) 
   */
    getutovareArrlist: function (utovareid) {
        var requesturl = "";
        var ok = "false";

        if (utovareid) {
            ok = true;
        }

        if (ok) {
            //http://localhost:60485/Api_v2/arrangemang/byutovare/uid/0/typ/0/val/78/devkey/alf?type=json&callback=testar
                requesturl = _appsetting.globalconfig.apiserver + "/Api_v2/arrangemang/byutovare/uid/0/typ/0/val/" + utovareid + "/devkey/alf?type=json";

            servercall(requesturl, function (data, retmess) {
                console.log("detta är REtmess " + retmess);

                $.each(data.kk_aj_admin.ansokningarlista.ansokningar, function (i, option) {
                    $('#arr_getTidigareArrangemang').append($('<option/>').attr("value", option.ansokningid).text(option.ansokningtitle));
                });                
            });
        }
    },
    /**
   * getTidigareArrDetail render hämta tidigare arrangemangs detalj 
   * Plats: getTidigareArrDetail.js
   * @description getTidigareArrDetail(arrJson) 
   */
    getTidigareArrDetail: function (arrid, callback) {
        var requesturl = "";
        
        if (arrid){ 
            //http://localhost:60485/Api_v2/arrangemang/details/uid/0/typ/118/devkey/alf?type=json&callback=testar
            requesturl = _appsetting.globalconfig.apiserver + "/Api_v2/arrangemang/details/uid/0/typ/" + arrid + "/devkey/alf?type=json&callback=testar";

            servercall(requesturl, function (data, retmess) {
                console.log("detta är REtmess " + retmess);
                fyllarrangemangDetaildata(data, function (arrid,konstformid) {
                    callback(arrid,konstformid);
                });
               
            });
        };
    }

};

var fyllutovaredata = function (data) {
    var utovare = data.kk_aj_admin.Utovarelist[0];
    tomutovarefield();
    if (utovare) {
        $('.kk_aj_form_befintligutovare').attr('rel', utovare.UtovarID);
       
        $('#utovare_aktor_grupp').val(utovare.Organisation);
        $('#visa_utovareNamn2').html(utovare.Organisation);

        $('#utovare_orghemsida').val(utovare.Weburl);
        $('#visa_utovareHemsida2').html(utovare.Weburl);

        $('#utovare_adress').val(utovare.Adress);
        $('#visa_utovareAdress2').html(utovare.Adress);

        $('#utovare_postnummer').val(utovare.Postnr);
        $('#visa_utovarePostnr2').html(utovare.Postnr);

        $('#utovare_ort').val(utovare.Ort);
        $('#visa_utovareOrt2').html(utovare.Ort);

        $('#utovare_kommun').val(utovare.Kommun);
        $('#visa_utovareKommun2').html(utovare.Kommun);

        $('#utovare_fornamn').val(utovare.Fornamn);
        $('#visa_utovareForamn2').html(utovare.Fornamn);

        $('#utovare_efternamn').val(utovare.Efternamn);
        $('#visa_utovareEfternamn2').html(utovare.Efternamn);

        $('#utovare_telefonnr').val(utovare.Telefon);
        $('#visa_utovareTelenr2').html(utovare.Telefon);

        $('#utovare_epost').val(utovare.Epost);
        $('#visa_utovareEpost2').html(utovare.Epost);
        return true;
    } else {
        return false;
    };

}
var savekontaktupg = function () {
    let grupp = $('#utovare_aktor_grupp').val();
    $('#visa_utovareNamn2').html(grupp);

    let orghemsida = $('#utovare_orghemsida').val();
    $('#visa_utovareHemsida2').html(orghemsida);

    let Adress = $('#utovare_adress').val();
    $('#visa_utovareAdress2').html(Adress);

    let Postnr = $('#utovare_postnummer').val();
    $('#visa_utovarePostnr2').html(Postnr);

    let Ort = $('#utovare_ort').val();
    $('#visa_utovareOrt2').html(Ort);

    let Kommun = $('#utovare_kommun').val();
    $('#visa_utovareKommun2').html(Kommun);

    let Fornamn = $('#utovare_fornamn').val();
    $('#visa_utovareForamn2').html(Fornamn);

    let Efternamn = $('#utovare_efternamn').val();
    $('#visa_utovareEfternamn2').html(Efternamn);

    let Telefon = $('#utovare_telefonnr').val();
    $('#visa_utovareTelenr2').html(Telefon);

    let Epost = $('#utovare_epost').val();
    $('#visa_utovareEpost2').html(Epost);
    
};

var copykontaktupg = function () {

    let Fornamn = $('#utovare_fornamn').val();
    $('#arr_kontakt_fornamn').val(Fornamn);

    let Efternamn = $('#utovare_efternamn').val();
    $('#arr_kontakt_efternamn').val(Efternamn);
    
    let Telefon = $('#utovare_telefonnr').val();
    $('#arr_kontakt_telefonnr').val(Telefon);    

    let Epost = $('#utovare_epost').val();
    $('#arr_kontakt_epost').val(Epost);    

}


var fyllarrangemangDetaildata = function (data,callback) {

    var arrval = data.kk_aj_admin.ansokningarlista.ansokningar;
    var yearMin = "";
    var yearMax = "";
    if (arrval.length > 0) {
        $('#arr_getTidigareArrangemang_Get').attr('rel', arrval[0].ansokningid);
        $('ul.ArrangemangtypBlock input[name=arr_radioValArrtyp][value="' + arrval[0].ansokningtypid + '"] ').click();
        $('ul.kontformBlock input[name=arr_radioValkontstform][value="' + arrval[0].ansokningkonstformid + '"] ').click();
        $('#arr_rubrik').val(arrval[0].ansokningtitle);
        $('#arr_underrubrik').val(arrval[0].ansokningsubtitle);
        $('#arr_presentation').val(arrval[0].ansokningContent).text();
        
        var text = $('<div/>').html(arrval[0].ansokningContent).text();
        window.editorobj.activeEditor.setContent(text);
        let imgurl = _appsetting.globalconfig.dnnURL + "/Portals/0/kulturkatalogenArrImages/" + arrval[0].ansokningid + "_" + arrval[0].ansokningMediaImage.MediaUrl
        let imgfilenamn = arrval[0].ansokningid + "_" + arrval[0].ansokningMediaImage.MediaUrl;

        //let imgurl = _appsetting.globalconfig.dnnURL + "/Portals/0/kulturkatalogenArrImages/" + arrval[0].ansokningMediaImage.MediaUrl
        //let imgfilenamn = arrval[0].ansokningMediaImage.MediaUrl;

        let imgobj = $('#kk_aj_tmpimg');
        imgobj.attr("src", imgurl);
        imgobj.attr("alt", imgfilenamn);
        imgobj.attr("title", imgfilenamn);
        //$('#arr_presentationsbild').val(arrval[0].ansokningMediaImage.MediaUrl);
        $('#arr_altfoto').val(arrval[0].ansokningMediaImage.MediaAlt);
        $('#arr_fotograf').val(arrval[0].ansokningMediaImage.MediaFoto);
        
        $.each(arrval[0].ansokningFaktalist, function (i, val) {

            if (val.FaktaTypID == "2") {
                $('#arr_antalmedverkande').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "3") {
                $('#arr_medverkande').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "5") {
                $('#arr_Bokningsbar').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "6") {
                $('#formMaxAudienceId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "7") {
                yearMin = val.FaktaValue;
            };
            if (val.FaktaTypID == "8") {
                yearMax = val.FaktaValue;
            };
            if (val.FaktaTypID == "9") {
                $('#formMaxShowsId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "10") {
                $('#formBuildTimeId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "11") {
                $('#formDemolishTimeId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "12") {
                $('#formVenueWidthId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "13") {
                $('#formVenueDepthId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "14") {
                $('#formVenueHeightId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "15") {
                $('input[name=arr_ljus][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "16") {
                $('#formCarriersId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "17") {
                $('#formElectricityId').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "19") {
                $('#arr_ekonomikostnad').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "21") {
                $('input[name=arr_resor][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "22") {
                $('input[name=arr_logi][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "24") {
                $('input[name=arr_Traktamente][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "25") {
                $('#arr_laromedel').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "26") {
                $('#kk_aj_speltid').html(val.FaktaValue + "min");
            };
            if (val.FaktaTypID == "27") {
                $('input[name=arr_morklaggning][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "28") {
                $('input[name=arr_ljud][value="' + val.FaktaValue + '"] ').click();
            };
            if (val.FaktaTypID == "30") {
                $('#arr_resorovrigt').html(val.FaktaValue);
            };
            if (val.FaktaTypID == "33") {
                $('#arr_overiganoter').html(val.FaktaValue);
            };
            if (val.FaktaTypID == "35") {
                $('#arr_Premiardatum').val(val.FaktaValue);
            };
            if (val.FaktaTypID == "36") {
                $('#formMaxParticipantsId').val(val.FaktaValue);
            };          

        });
        let test = arrval[0].ansokningkonstformid;
        $('#kk_aj_yearspan').html(yearMin + "år - " + yearMax + "år");
        callback(arrval[0].ansokningtypid, test);
    };
};


var servercall = function (currurl, callback) {
    
    $.ajax({
        async: true,
        type: "GET",
        url: currurl,
        dataType: "json",            
        success: function (data) {
            console.log("utövardata hämtad: ");
            callback(data,"funkar");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Nått blev fel hämtning utövardata!");
            alert("Nått blev fel hämtning utövardata!");
        }
    });

}

var tomutovarefield = function () {
    $('.kk_aj_form_befintligutovare').attr('rel', '0');
    $('#utovare_aktor_grupp').val("");
    $('#utovare_orghemsida').val("");
    $('#utovare_adress').val("");
    $('#utovare_postnummer').val("");
    $('#utovare_ort').val("");
    $('#utovare_kommun').val("");
    $('#utovare_fornamn').val("");
    $('#utovare_efternamn').val("");
    $('#utovare_telefonnr').val("");
    $('#utovare_epost').val("");
};