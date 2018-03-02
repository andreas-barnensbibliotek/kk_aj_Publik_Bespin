//här sätts alla pluggin och jquery.ready starters 
var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
var _appsetting = appsettingsobject.config;
//var jsJquerySteps = require("./externaljs/jquerySteps.js");
var _arrjsondata ={
    "Rubrik": "",
    "UnderRubrik": "",
    "Innehall": "",
    "Arrangemangtyp": "",
    "Konstform": "",
    "Konstform2": "",
    "Konstform3": "",
    "KontaktId": "",
    "Kontaktfornamn": "",
    "KontaktEfternamn": "",
    "KontaktTelefon": "",
    "KontaktEpost": "",
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
module.exports = {
    getArrFormJsonData: function (mediaExempledata, callback) {
        
       // $(function () {

        let arrformjsondata = _arrjsondata;

        arrformjsondata.Rubrik = cleanWordPaste($('#arr_rubrik').val());
        arrformjsondata.UnderRubrik = cleanWordPaste($('#arr_underrubrik').val());
        arrformjsondata.Innehall = htmlEncode(cleanWordPaste($('#arr_presentation').val()));
        arrformjsondata.Arrangemangtyp = $('input[name=arr_radioValArrtyp]:checked').val();
        arrformjsondata.Konstform = $('input[name=arr_radioValkontstform]:checked').val();
        arrformjsondata.Konstform2 = $('#formFler1KonstformId').val();
        arrformjsondata.Konstform3="";        
        arrformjsondata.Kontaktfornamn = $('#arr_kontakt_fornamn').val();
        arrformjsondata.KontaktEfternamn = $('#arr_kontakt_efternamn').val();
        arrformjsondata.KontaktTelefon = $('#arr_kontakt_telefonnr').val();
        arrformjsondata.KontaktEpost = $('#arr_kontakt_epost').val();

            let arr_antalmedverkande = $('#arr_antalmedverkande');
            arrformjsondata.Faktalist = [];

            if (arr_antalmedverkande.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_antalmedverkande.attr('rel'),
                    "Faktarubrik": "Antal medverkande",
                    "FaktaValue": arr_antalmedverkande.val(),
                });
            };
            let arr_medverkande = $('#arr_medverkande');
            if (arr_medverkande.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_medverkande.attr('rel'),
                    "Faktarubrik": "Medverkande",
                    "FaktaValue": arr_medverkande.val(),
                });
            };

            let arr_pedagogiskverksamhet = $('#arr_pedagogiskverksamhet');
            if (arr_pedagogiskverksamhet.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_pedagogiskverksamhet.attr('rel'),
                    "Faktarubrik": "Pedagogisk verksamhet",
                    "FaktaValue": arr_pedagogiskverksamhet.val(),
                });
            };

            let arr_marknadsforing = $('#arr_marknadsforing');
            if (arr_marknadsforing.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_marknadsforing.attr('rel'),
                    "Faktarubrik": "Marknadföring",
                    "FaktaValue": arr_marknadsforing.val(),
                });
            };

            let arr_utstallningsperiod = $('#arr_utstallningsperiod');
            if (arr_utstallningsperiod.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_utstallningsperiod.attr('rel'),
                    "Faktarubrik": "Utställningsperiod",
                    "FaktaValue": arr_utstallningsperiod.val(),
                });
            };

            let arr_Premiardatum = $('#arr_Premiardatum');
            if (arr_Premiardatum.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_Premiardatum.attr('rel'),
                    "Faktarubrik": "Premiärdatum",
                    "FaktaValue": arr_Premiardatum.val(),
                });
            };
            let arr_Bokningsbar = $('#arr_Bokningsbar');
            if (arr_Bokningsbar.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_Bokningsbar.attr('rel'),
                    "Faktarubrik": "Bokningsbar",
                    "FaktaValue": arr_Bokningsbar.val(),
                });
            };
            let arr_laromedel = $('#arr_laromedel');
            if (arr_laromedel.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "1",
                    "FaktaTypID": arr_laromedel.attr('rel'),
                    "Faktarubrik": "Lärarhandledning",
                    "FaktaValue": arr_laromedel.val(),
                });
            };

            let formBuildTimeId = $('#formBuildTimeId');
            if (formBuildTimeId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formBuildTimeId.attr('rel'),
                    "Faktarubrik": "Byggtid",
                    "FaktaValue": formBuildTimeId.val(),
                });
            };                        
            let formDemolishTimeId = $('#formDemolishTimeId');
            if (formDemolishTimeId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": $('#formDemolishTimeId').attr('rel'),
                    "Faktarubrik": "Rivtid",
                    "FaktaValue": $('#formDemolishTimeId').val(),
                });
            };
            let formVenueWidthId = $('#formVenueWidthId');
            if (formVenueWidthId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formVenueWidthId.attr('rel'),
                    "Faktarubrik": "Bredd på scen",
                    "FaktaValue": formVenueWidthId.val(),
                });
            };
            let formVenueDepthId = $('#formVenueDepthId');
            if (formVenueDepthId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formVenueDepthId.attr('rel'),
                    "Faktarubrik": "Djup på scen",
                    "FaktaValue": formVenueDepthId.val(),
                });
            };
            let formVenueHeightId = $('#formVenueHeightId');
            if (formVenueHeightId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formVenueHeightId.attr('rel'),
                    "Faktarubrik": "Takhöjd över scen",
                    "FaktaValue": formVenueHeightId.val(),
                });
            };            
            if ($("input:radio[name=arr_ljud]").is(":checked")) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": $('input[name=arr_ljud]:checked').attr('rel'),
                    "Faktarubrik": "Ljud",
                    "FaktaValue": $('input[name=arr_ljud]:checked').val(),
                });
            };            
            //if ($('input[name=arr_ljus]:checked').val()) {
            if($("input:radio[name=arr_ljus]").is(":checked")) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": $('input[name=arr_ljus]:checked').attr('rel'),
                    "Faktarubrik": "Ljus",
                    "FaktaValue": $('input[name=arr_ljus]:checked').val(),
                });
            };
            if($("input:radio[name=arr_morklaggning]").is(":checked")) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": $('input[name=arr_morklaggning]:checked').attr('rel'),
                    "Faktarubrik": "Mörkläggning krävs",
                    "FaktaValue": $('input[name=arr_morklaggning]:checked').val(),
                });
            };
            let formCarriersId = $('#formCarriersId');
            if (formCarriersId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formCarriersId.attr('rel'),
                    "Faktarubrik": "Bärhjälp behövs",
                    "FaktaValue": formCarriersId.val(),
                });
            };
            let formElectricityId = $('#formElectricityId');
            if (formElectricityId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formElectricityId.attr('rel'),
                    "Faktarubrik": "El",
                    "FaktaValue": formElectricityId.val(),
                });
            };
            let formVenueRequiermentsId = $('#formVenueRequiermentsId');
            if (formVenueRequiermentsId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": formVenueRequiermentsId.attr('rel'),
                    "Faktarubrik": "Övrigt om lokal",
                    "FaktaValue": formVenueRequiermentsId.val(),
                });
            };
            let arr_yta = $('#arr_yta');
            if (arr_yta.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "2",
                    "FaktaTypID": arr_yta.attr('rel'),
                    "Faktarubrik": "Yta",
                    "FaktaValue": arr_yta.val(),
                });
            };         

            let formMaxAudienceId = $('#formMaxAudienceId');
            if (formMaxAudienceId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "3",
                    "FaktaTypID": formMaxAudienceId.attr('rel'),
                    "Faktarubrik": "Max publik",
                    "FaktaValue": formMaxAudienceId.val(),
                }); 
            };
            let formMaxParticipantsId = $('#formMaxParticipantsId');
            if (formMaxParticipantsId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "3",
                    "FaktaTypID": formMaxParticipantsId.attr('rel'),
                    "Faktarubrik": "Max antal deltagare",
                    "FaktaValue": formMaxParticipantsId.val(),
                });
            };           
            let kk_aj_yearspan = $('#kk_aj_yearspan');
            let minYearInt = kk_aj_yearspan.html().replace(/år/g, '').split(" ").join("").split("-")[0];
            let maxYearInt = kk_aj_yearspan.html().replace(/år/g, '').split(" ").join("").split("-")[1];

            if (minYearInt > 0 && maxYearInt > 0) {
                if (kk_aj_yearspan.html()) {
                    arrformjsondata.Faktalist.push({
                        "Faktaid": "3",
                        "FaktaTypID": kk_aj_yearspan.attr('rel'),
                        "Faktarubrik": "Ålder lägst",
                        "FaktaValue": minYearInt
                    });
                    arrformjsondata.Faktalist.push({
                        "Faktaid": "3",
                        "FaktaTypID": kk_aj_yearspan.attr('rev'),
                        "Faktarubrik": "Ålder högst",
                        "FaktaValue": maxYearInt
                    });
                };
            };
            
            let formMaxShowsId = $('#formMaxShowsId');
            if (formMaxShowsId.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "3",
                    "FaktaTypID": formMaxShowsId.attr('rel'),
                    "Faktarubrik": "Föreställningar per dag",
                    "FaktaValue": formMaxShowsId.val(),
                });
            };        
            let kk_aj_speltid = $('#kk_aj_speltid');
            if (kk_aj_speltid.html() !="") {
                if (kk_aj_speltid.html() != "0min") {
                    arrformjsondata.Faktalist.push({
                        "Faktaid": "3",
                        "FaktaTypID": kk_aj_speltid.attr('rel'),
                        "Faktarubrik": "Speltid",
                        "FaktaValue": kk_aj_speltid.html().replace(/min/g, ''),
                    });
                };
            }

            let arr_ekonomikostnad = $('#arr_ekonomikostnad');
            if (arr_ekonomikostnad.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": arr_ekonomikostnad.attr('rel'),
                    "Faktarubrik": "Kostnad/Pris",
                    "FaktaValue": arr_ekonomikostnad.val(),
                });
            };           

            if ($("input:radio[name=arr_resor]").is(":checked")) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": $('input[name=arr_resor]:checked').attr('rel'),
                    "Faktarubrik": "Resor",
                    "FaktaValue": $('input[name=arr_resor]:checked').val(),
                });
            };
            if ($("input:radio[name=arr_logi]").is(":checked")) {            
                arrformjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": $('input[name=arr_logi]:checked').attr('rel'),
                    "Faktarubrik": "Logi",
                    "FaktaValue": $('input[name=arr_logi]:checked').val(),
                }); 
            };
            if ($("input:radio[name=arr_Traktamente]").is(":checked")) {            
                arrformjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": $('input[name=arr_Traktamente]:checked').attr('rel'),
                    "Faktarubrik": "Traktamente",
                    "FaktaValue": $('input[name=arr_Traktamente]:checked').val(),
                }); 
            };

            let arr_resorovrigt = $('#arr_resorovrigt');
            if (arr_resorovrigt.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "4",
                    "FaktaTypID": arr_resorovrigt.attr('rel'),
                    "Faktarubrik": "Övrigt om kostnader",
                    "FaktaValue": arr_resorovrigt.val(),
                });
            };
            let arr_overiganoter = $('#arr_overiganoter');
            if (arr_overiganoter.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "5",
                    "FaktaTypID": arr_overiganoter.attr('rel'),
                    "Faktarubrik": "Övriga noteringar",
                    "FaktaValue": arr_overiganoter.val(),
                });
            };
            
            // övrig info            
            let arr_cvmedverkande_url = $('#arr_cvmedverkande_url');
            let arr_cvmedverkande_file = $('#arr_cvmedverkande_file').get(0).files;
            if (arr_cvmedverkande_url.val() || arr_cvmedverkande_file.length > 0) {
                let filval = "";
                if (arr_cvmedverkande_url.val()) {
                    filval = arr_cvmedverkande_url.val();
                } else {
                    if (arr_cvmedverkande_file.length > 0) {
                        filval = arr_cvmedverkande_file[0].name;
                    };
                };
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": $('.arr_cvmedverkande').attr('rel'),
                    "Faktarubrik": "CV",
                    "FaktaValue": filval,
                });
            };
            if ($('input[name=arr_statligtstodjanej]:checked').val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": $('input[name=arr_statligtstodjanej]:checked').attr('rel'),
                    "Faktarubrik": "Bidrag/stöd",
                    "FaktaValue": $('input[name=arr_statligtstodjanej]:checked').val(),
                });
            };            
            let arr_statligtstodtxt = $('#arr_statligtstodtxt');
            if (arr_statligtstodtxt.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": arr_statligtstodtxt.attr('rel'),
                    "Faktarubrik": "Bidrag/stöd från",
                    "FaktaValue": arr_statligtstodtxt.val(),
                });
            };
            if ($('input[name=arr_fskattsedeljanej]:checked').val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": $('input[name=arr_fskattsedeljanej]:checked').attr('rel'),
                    "Faktarubrik": "F-skattsedel",
                    "FaktaValue": $('input[name=arr_fskattsedeljanej]:checked').val(),
                });
            };
            if ($('input[name=arr_centrumbildningjanej]:checked').val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": $('input[name=arr_centrumbildningjanej]:checked').attr('rel'),
                    "Faktarubrik": "Medlem i centrumbildning",
                    "FaktaValue": $('input[name=arr_centrumbildningjanej]:checked').val(),
                });
            };
            let arr_overiginformation = $('#arr_overiginformation');
            if (arr_overiginformation.val()) {
                arrformjsondata.Faktalist.push({
                    "Faktaid": "0",
                    "FaktaTypID": arr_overiginformation.attr('rel'),
                    "Faktarubrik": "Övrig information",
                    "FaktaValue": arr_overiginformation.val(),
                });
            };

            if (mediaExempledata.exempelitemlist) {
                if (mediaExempledata.exempelitemlist.length >= 0) {
                    arrformjsondata.MediaList = mediaExempledata.exempelitemlist;
                }
            };
                                
            let filen = $("#arr_presentationsbild").get(0).files;
            if (filen.length > 0) {
                arrformjsondata.MainImage.MediaUrl = filen[0].name;
            } else {
                arrformjsondata.MainImage.MediaUrl = $('#kk_aj_tmpimg').attr("alt");
            }
            arrformjsondata.MainImage.MediaSize = $('#arr_sizefoto').val();
            arrformjsondata.MainImage.MediaAlt = $('#arr_altfoto').val();
            arrformjsondata.MainImage.MediaFoto = $('#arr_fotograf').val();

            let isbefintligutovare = $('.kk_aj_form_befintligutovare').attr('rel');
            if (isbefintligutovare > 0) {
                arrformjsondata.Utovare = isbefintligutovare;
                arrformjsondata.UtovareData.UtovarID = isbefintligutovare;
            } else {
                arrformjsondata.Utovare = "0";
                arrformjsondata.UtovareData.UtovarID = "0";
            };            

            arrformjsondata.UtovareData.Organisation = $('#utovare_aktor_grupp').val();
            arrformjsondata.UtovareData.Fornamn = $('#utovare_fornamn').val();
            arrformjsondata.UtovareData.Efternamn = $('#utovare_efternamn').val();
            arrformjsondata.UtovareData.Telefon = $('#utovare_telefonnr').val().replace(/\s/g, '');
            arrformjsondata.UtovareData.Adress = $('#utovare_adress').val();
            arrformjsondata.UtovareData.Postnr = $('#utovare_postnummer').val().replace(/\s/g, '');
            arrformjsondata.UtovareData.Ort = $('#utovare_ort').val();
            arrformjsondata.UtovareData.Epost = $('#utovare_epost').val();
            arrformjsondata.UtovareData.Kommun = $('#utovare_kommun').val();
            arrformjsondata.UtovareData.Weburl = $('#utovare_orghemsida').val();
            

            callback(arrformjsondata);

        //});
    },
    tempuploadimage: function (cmd, files, nyttarrid, callback) {
       
            var data = new FormData();
                       
            data.append("cmd", cmd);

            if (nyttarrid != "0") {
                data.append("arrid", nyttarrid);
            };
               
            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            } else {
                data.append("UploadedImage", "");
            }
                // Make Ajax request with the contentType = false, and procesDate = false

                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: _appsetting.globalconfig.apiserver + "/Api/uploadmedia/devkey/alf",
                    contentType: false,
                    processData: false,
                    data: data
                });

                ajaxRequest.done(function (xhr, textStatus) {
                    var retfileurl = "";
                    if (files.length > 0) {
                        var retfileurl = _appsetting.globalconfig.arrimgurl + files[0].name;
                    }
                    callback(retfileurl)
                       
                });       
    },
    PostMainArrangemang: function (Arrjson, callback) {

        var currurl = _appsetting.globalconfig.apiserver + "/Api_v2/arrangemang/add/devkey/alf";

        console.log("2. servicen POSTAR data");
        $.ajax({
            async: true,
            type: "POST",
            url: currurl,
            data: Arrjson,
            success: function (data) {
                console.log("Parameter updaterad: ");
                callback(data.kk_aj_admin.ansokningarlista.ansokningar[0].ansokningid);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr + ":: " + ajaxOptions + ":: " + thrownError);
                alert("Nått blev fel vid uppdatering av parametrarna!");
            }
        });
    }    
};

var htmlEncode = function(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

//var cleanWordPaste_old = function (in_word_text) {
//    var tmp = document.createElement("DIV");
//    tmp.innerHTML = in_word_text;
//    var newString = tmp.innerHTML;
//    // this next piece converts line breaks into break tags
//    // and removes the seemingly endless crap code
//    newString = newString.replace(/\n\n/g, "<br />").replace(/.*<!--.*-->/g, "");
  
//    // this next piece removes any break tags (up to 10) at beginning
//    for (i = 0; i < 10; i++) {
//        if (newString.substr(0, 6) == "<br />") {
//            newString = newString.replace("<br />", "");
//        }
//    }
//    return CleanWordPastedHTML(newString);
//}

//var CleanWordPastedHTML =function(sTextHTML) {
//    var sStartComment = "<!--", sEndComment = "-->";
//    while (true) {
//        var iStart = sTextHTML.indexOf(sStartComment);
//        if (iStart == -1) break;
//        var iEnd = sTextHTML.indexOf(sEndComment, iStart);
//        if (iEnd == -1) break;
//        sTextHTML = sTextHTML.substring(0, iStart) + sTextHTML.substring(iEnd + sEndComment.length);
//    }
//    return sTextHTML;
//}

var cleanWordPaste = function (html) {

    // Remove additional MS Word content
    html = html.replace(/<(\/)*(\\?xml:|meta|link|span|font|del|ins|st1:|[ovwxp]:)((.|\s)*?)>/gi, ''); // Unwanted tags
    html = html.replace(/(class|style|type|start)=("(.*?)"|(\w*))/gi, ''); // Unwanted sttributes
    html = html.replace(/<style(.*?)style>/gi, '');   // Style tags
    html = html.replace(/<script(.*?)script>/gi, ''); // Script tags
    html = html.replace(/<!--(.*?)-->/gi, '');        // HTML comments

    return html;
}

//var CleanWordHTML = function (str) {
//    str = str.replace(/<o:p>\s*<\/o:p>/g, "");
//    str = str.replace(/<o:p>.*?<\/o:p>/g, "&nbsp;");
//    str = str.replace(/\s*mso-[^:]+:[^;"]+;?/gi, "");
//    str = str.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi, "");
//    str = str.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"");
//    str = str.replace(/\s*TEXT-INDENT: 0cm\s*;/gi, "");
//    str = str.replace(/\s*TEXT-INDENT: 0cm\s*"/gi, "\"");
//    str = str.replace(/\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"");
//    str = str.replace(/\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"");
//    str = str.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"");
//    str = str.replace(/\s*tab-stops:[^;"]*;?/gi, "");
//    str = str.replace(/\s*tab-stops:[^"]*/gi, "");
//    str = str.replace(/\s*face="[^"]*"/gi, "");
//    str = str.replace(/\s*face=[^ >]*/gi, "");
//    str = str.replace(/\s*FONT-FAMILY:[^;"]*;?/gi, "");
//    str = str.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
//    str = str.replace(/<(\w[^>]*) style="([^\"]*)"([^>]*)/gi, "<$1$3");
//    str = str.replace(/\s*style="\s*"/gi, '');
//    str = str.replace(/<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, '&nbsp;');
//    str = str.replace(/<SPAN\s*[^>]*><\/SPAN>/gi, '');
//    str = str.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
//    str = str.replace(/<SPAN\s*>(.*?)<\/SPAN>/gi, '$1');
//    str = str.replace(/<FONT\s*>(.*?)<\/FONT>/gi, '$1');
//    str = str.replace(/<\\?\?xml[^>]*>/gi, "");
//    str = str.replace(/<\/?\w+:[^>]*>/gi, "");
//    str = str.replace(/<H\d>\s*<\/H\d>/gi, '');
//    str = str.replace(/<H1([^>]*)>/gi, '');
//    str = str.replace(/<H2([^>]*)>/gi, '');
//    str = str.replace(/<H3([^>]*)>/gi, '');
//    str = str.replace(/<H4([^>]*)>/gi, '');
//    str = str.replace(/<H5([^>]*)>/gi, '');
//    str = str.replace(/<H6([^>]*)>/gi, '');
//    str = str.replace(/<\/H\d>/gi, '<br>'); //remove this to take out breaks where Heading tags were 
//    str = str.replace(/<(U|I|STRIKE)>&nbsp;<\/\1>/g, '&nbsp;');
//    str = str.replace(/<(B|b)>&nbsp;<\/\b|B>/g, '');
//    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
//    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
//    str = str.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/g, '');
//    //some RegEx code for the picky browsers
//    var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "gi");
//    str = str.replace(re, "<div$2</div>");
//    var re2 = new RegExp("(<font|<FONT)([^*>]*>.*?)(<\/FONT>|<\/font>)", "gi");
//    str = str.replace(re2, "<div$2</div>");
//    str = str.replace(/size|SIZE = ([\d]{1})/g, '');
//    return str;
//}