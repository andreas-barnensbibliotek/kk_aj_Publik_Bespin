var $ = require("jquery");
require('jquery-ui-dist/jquery-ui.js');
var jplists = require("./externaljs/jplist_moduleexport.js");
var handlebarTemplethandler = require("./HandlebarTemplethandler.js");

var appsettingsobject = require("./appSettings.js");

var searchdataContainer = {
	"arrtypid": "",
	"cmdtyp": "",
	"konstartid": "",
	"publiceradJaNej": "",
	"searchstr": "",
	"startyear": "",
	"stopyear": ""	
}


module.exports = {
    search: function () {
        //var appsettings = appsettingsobject.config;       
    },
    init: function (val) {
        var appsettings = appsettingsobject.config;
        jplists.init();
            
        var initlist = function () {

            arrdataservice("", searchdataContainer, function (data) {
                handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", data, function (returtext) {

                    return(returtext)

                });
            });

        }
        initlist();
        
        publiksearchEvents()
    }
}

var handlebartempletService = function(targetClass, usetemplateName, currentdata, callback){
    
    var appsetting = appsettingsobject.config;

    var test = appsettingsobject.config.globalconfig.htmltemplateURL + "/" + usetemplateName;

    $.get(appsettingsobject.config.globalconfig.htmltemplateURL + "/" + usetemplateName, function (data) {
        var temptpl = Handlebars.compile(data);           
        var test = "ska funka";            
        $('#kk_aj_productlist').html(temptpl(currentdata)).hide().slideDown(2000);            
            
        $('#kk_aj_mainproductlistblock').jplist({
            command: 'empty'
        });

        
        $('#kk_aj_masterproductlistblock').jplist({
            itemsBox: ' #kk_aj_productlist ',
            itemPath: '.kk_aj_arritem',
            panelPath: '.jplist-panel',
            storage: 'localstorage',		
            storageName: 'KulturkatalogenStorage'            
        });
        callback(test);
    }, 'html');    
}


var arrdataservice = function (callTyp, searchdata, callback) {
    var appsettings = appsettingsobject.config;
    var currurl = "";
    switch (callTyp) {
        case "mainsearch":
            currurl = appsettings.globalconfig.apiserver + "/Api_v2/search/mainsearch/devkey/alf?type=json&callback=testar";
            break;
        case "freesearch":
            currurl = appsettings.globalconfig.apiserver + "/Api_v2/search/freesearch/devkey/alf?type=json&callback=testar";
            break;
        default:
            currurl = appsettings.globalconfig.apiserver + "/Api_v2/search/mainsearch/devkey/alf?type=json&callback=testar";
            // list all arrangemang
            searchdata.arrtypid = "0";
            searchdata.konstartid = "0";
            searchdata.startyear = "0";
            break;
    }

    //console.log("Searchservicen hämtar Arrangemangdata");
    $.ajax({
        async: true,
        type: "POST",
        url: currurl,
        data: searchdata,
        success: function (data) {
            console.log("Search arrangemang hämtat: ");
            callback(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Nått blev fel vid hämtning av arrangemang!");
        }
    });
};

// EVENTS
var publiksearchEvents = function () {
    var appsettings = appsettingsobject.config;
    $('.kk_aj_searchformbutton').on('click', function (e) {
        resetfilterlist();
        var tempsearchformcollector = searchformcollector();
        
        arrdataservice("mainsearch", tempsearchformcollector, function (data) {
            handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", data, function (returtext) {
                //scrolla till resultatlistan
                $('html, body').animate({
                    scrollTop: $(".kk_aj_searchbuttonblock").offset().top
                }, 500);
                return false;

            });
        });

        return false;
    });
    $('.jplist-pagination').on('click', '> *', function (e) {
        var searchbox = $(".kk_aj_searchbuttonblock").offset().top;
        $('html, body').animate({
            scrollTop: searchbox
        }, 500);        
    });
    
    $('.kk_aj_searchRensaformbutton').on('click', function (e) {
        resetfilterlist();
        return resetsearchform();
    });
    $('#kk_aj_freetextSearch').keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault(); // Stop the default behaviour
            freesearch();
        }
    });

    $('#kk_aj_btnfreetextSearch').on('click', function (e) {
        resetfilterlist();
        freesearch();
        return false;
    });

    $('input:radio').bind('click mousedown', (function () {
        //Capture radio button status within its handler scope,
        //so we do not use any global vars and every radio button keeps its own status.
        //This required to uncheck them later.
        //We need to store status separately as browser updates checked status before click handler called,
        //so radio button will always be checked.
        var isChecked;

        return function (event) {
            //console.log(event.type + ": " + this.checked);

            if (event.type == 'click') {
                //console.log(isChecked);

                if (isChecked) {
                    //Uncheck and update status
                    isChecked = this.checked = false;
                } else {
                    //Update status
                    //Browser will check the button by itself
                    isChecked = true;

                    //Do something else if radio button selected
                    /*
                    if(this.value == 'somevalue') {
                        doSomething();
                    } else {
                        doSomethingElse();
                    }
                    */
                }
            } else {
                //Get the right status before browser sets it
                //We need to use onmousedown event here, as it is the only cross-browser compatible event for radio buttons
                isChecked = this.checked;
            }
        }
    })());

    // AUTOCOMPLETE Freetextsearch
    $('body').on('keydown', '#kk_aj_freetextSearch', function (event) {
       
        $(this).autocomplete({
            source: function (request, response) {
                searchdata = searchdataContainer;
                searchdata.searchstr = $.trim(request.term);

                $.ajax({
                    async: true,
                    type: "POST",
                    url: appsettings.globalconfig.apiserver + "/Api_v2/search/freesearch/devkey/alf?type=json&callback=testar",
                    data: searchdata,
                    success: function (data) {
                        response(data.kk_aj_admin.ansokningarlista.ansokningar);
                    }
                });
            },
            minLength: 2,
            select: function (event, ui) {
                $('#kk_aj_freetextSearch').val(ui.item.ansokningtitle);

                return false;
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
              .append("<div>" + item.ansokningtitle + " <i>(" + item.ansokningutovare + ")</i></div>")
              .appendTo(ul);
        };
    });
    $('#kk_aj_reset').on('click', function (e) {
       
        return false;
    });
    

}
var resetfilterlist = function () {

    $('#kk_aj_masterproductlistblock').jplist({
        command: 'empty'
    });
}


//HELPER
var searchformcollector = function () {
    var tmparrtypid = $('input[name=arr_radioValArrangemang]:checked').val();
    var tmpkonstartid = $('input[name=arr_radioValkontstform]:checked').val();
    var tmpstartyear = $("#kk_aj_yearspan2").attr("rel");
    var tmpstopyear = $("#kk_aj_yearspan2").attr("rev");

    searchdataContainer.arrtypid = "0";
    searchdataContainer.konstartid = "0";
    searchdataContainer.startyear = "0";
    searchdataContainer.stopyear="0";

    if (tmparrtypid !== undefined) {
        searchdataContainer.arrtypid = tmparrtypid;
    }
    if (tmpkonstartid !== undefined) {
        searchdataContainer.konstartid = tmpkonstartid;
    }
    if (tmpstartyear !== undefined) {
        searchdataContainer.startyear = tmpstartyear;
    }
    if (tmpstopyear !== undefined) {
        searchdataContainer.stopyear = tmpstopyear;
    }

    return searchdataContainer;    
}

var resetsearchform = function () {
    $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $(':checkbox, :radio').prop('checked', false);
    $("#kk_aj_yearspan2").attr("rel", "0");
    $("#kk_aj_yearspan2").attr("rev", "0");
    return false;
}


var freesearch = function () {
    var freetextinput = $('#kk_aj_freetextSearch');
    console.log("freetextinput" + freetextinput.val())
    if (freetextinput.val()) {
        var tempfreesearchcollector = searchdataContainer;
        tempfreesearchcollector.arrtypid = "0";
        tempfreesearchcollector.konstartid = "0";
        tempfreesearchcollector.startyear = "0";
        tempfreesearchcollector.stopyear = "0";
        tempfreesearchcollector.searchstr = freetextinput.val();

        arrdataservice("freesearch", tempfreesearchcollector, function (data) {
            handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", data, function (returtext) {
                //scrolla till resultatlistan
                $('html, body').animate({
                    scrollTop: $(".kk_aj_searchbuttonblock").offset().top
                }, 1000);
                return false;

            });
        });
    };
}