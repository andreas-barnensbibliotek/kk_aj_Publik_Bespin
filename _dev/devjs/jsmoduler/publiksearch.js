var $ = require("jquery");
require('jquery-ui-dist/jquery-ui.js');
var jplists = require("./externaljs/jplist_moduleexport.js");
var handlebarTemplethandler = require("./HandlebarTemplethandler.js");
var minneslistaHandler = require("./minneslistaHandler.js");

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
// använder : https://github.com/julien-maurel/js-storage
var storage = Storages.localStorage;
var session = Storages.sessionStorage
 module.exports = {
     search: function () {
         //var appsettings = appsettingsobject.config;       
     },
     init: function (val) {
       
         var appsettings = appsettingsobject.config;
         jplists.init();
         
         if (isSessionSet()) {            
             var currdata = storage.get('currentdata');
             if (currdata) {
                 handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", currdata, function (returtext) {
                     
                     return (returtext)
                 });
             } else {
                 initlist();
             };
         } else {
             storage.removeAll()
             initlist();
         };

         minneslistaHandler.counter();
         publiksearchEvents()
     }
 };


var initlist = function () {

    arrdataservice("", searchdataContainer, function (data) {
        SetSession();
        handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", data, function (returtext) {
            
            return (returtext)

        });
    });

};

/* handlebartempletService hämtar handelbartemplate och uppdaterar produktlistan både i filter och i sök */
var handlebartempletService = function(targetClass, usetemplateName, currentdata, callback){
   
    var appsetting = appsettingsobject.config;
         
    $.get(appsettingsobject.config.globalconfig.htmltemplateURL + "/" + usetemplateName, function (data) {

        var fu = function (datat,currdata, callback) {
            
            currdata = localstorageHandler(currdata);
            if (minneslistaHandler.getminneslistan()) {
                currdata = minneslistaHandler.inlist(currdata);
            };
           
            var temptpl = Handlebars.compile(datat);
            $('#kk_aj_productlist').html(temptpl(currdata)).hide().slideDown(2000);
          
            callback();
        }
            
        fu(data, currentdata, function () {
            $('#kk_aj_mainproductlistblock').jplist({
                command: 'empty'
            });

            $('#kk_aj_masterproductlistblock').jplist({
                itemsBox: ' #kk_aj_productlist ',
                itemPath: '.kk_aj_arritem',
                panelPath: '.jplist-panel',
                storage: 'localstorage',               
                storageName: 'KulturkatalogenStorage',
                redrawCallback: function (collection, $dataview, statuses) {

                        /* döljer produktlistan om filter inte ger resultat */
                        if ($('.jplist-no-results').is(":visible")) {                           
                            $('#kk_aj_productlist').hide();
                        } else {
                            $('#kk_aj_productlist').show();
                        }                    
                }
            });

           
        });
        
    }, 'html');
    callback();
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
                scrolldowntosearchresult();
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
        initlist();
        resetfilterlist();
        return resetsearchform();
    });
    $('#kk_aj_freetextSearch').keypress(function (event) {
        if (event.which === 13) {
            freesearch();
            resetfilterlist();
            event.preventDefault(); // Stop the default behaviour
            
        }
    });

    $('#kk_aj_btnfreetextSearch').on('click', function (e) {        
        freesearch();
        resetfilterlist();
        
        return false;
    });
    ///MINNESLISTAN
    $('body').on('click', '#kk_aj_cmd_minneslistan', function (e) {
        resetfilterlist();
        let minneslistaData = minneslistaHandler.getminneslistan();
        if (minneslistaData) {
            handlebartempletService(".kk_aj_productlist", "kk_aj_mainarrangemangList.txt", minneslistaData, function (returtext) {
                scrolldowntosearchresult();
                return false;
            });
        };
        return false;
    });
    

    $('body').on('click','.kk_aj_arr_item_minneslista', function (e) {
        var arrid = $(this).attr("rel");
        if(!$(this).hasClass("inminneslist")){
            minneslistaHandler.addto(arrid);
            $(this).addClass("inminneslist");
        }
        return false;
    });
    $('body').on('click','.inminneslist', function (e) {
        var arrid = $(this).attr("rel");
        minneslistaHandler.removefrom(arrid);
        $(this).removeClass("inminneslist");
        return false;
    });

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
    
    $('.kontformBlock a').on('click', function (e) {
        let obj = $(this);
        if (obj.hasClass("vald")) {
            obj.removeClass("vald");
        } else {
            $('.kontformBlock a').removeClass("vald");
            obj.addClass("vald");
        }       

        return false;
    })
    $('body').on('keypress','a', function (e) {   
        let obj = $(this);
        alert("inne" + e.keyCode)
        if (e.keyCode === 0 || e.keyCode === 32) {
           alert("japp" + e.keyCode)
            if (obj.hasClass("vald")) {
                obj.removeClass("vald");
            } else {
                $('.kontformBlock a').removeClass("vald");
                obj.addClass("vald");
            }
        }
        return false;
    })
    

    $('.ArrangemangtypBlock a').on('click', function (e) {
        let obj = $(this);
        if (obj.hasClass("vald")) {
            obj.removeClass("vald");
        } else {
            $('.ArrangemangtypBlock a').removeClass("vald");
            obj.addClass("vald");
        }

        return false;
    })
}
var resetfilterlist = function () {
    $('#kk_aj_valdsokning').hide();
    $('#kk_aj_masterproductlistblock').jplist({
        command: 'empty'
    });   
   
}
var addvaldasokord = function (sokord) {
    let ulobj = $('#kk_aj_valdsokord');
    ulobj.append('<li class="removevaltsokord"><i class="fa fa-check-square-o" aria-hidden="true"></i> ' + sokord + '</li>');
    return false;
}
$('#kk_aj_valdsokord').on('click', 'li', function (e) {   
    $(this).remove();
});

//HELPER
var searchformcollector = function () {
    $('#kk_aj_valdsokord').html("");
    $('#kk_aj_valdsokning').show();
    let ArrangemangtypBlock =$('.ArrangemangtypBlock a.vald');
    let kontformBlock = $('.kontformBlock a.vald');

    let tmparrtypid = ArrangemangtypBlock.attr("rel");
    let tmpkonstartid = kontformBlock.attr("rel");
    let tmpstartyear = $("#kk_aj_yearspan2").attr("rel");
    let tmpstopyear = $("#kk_aj_yearspan2").attr("rev");

           
    searchdataContainer.arrtypid = "0";
    searchdataContainer.konstartid = "0";
    searchdataContainer.startyear = "0";
    searchdataContainer.stopyear="0";

    if (tmparrtypid !== undefined) {
        searchdataContainer.arrtypid = tmparrtypid;
        addvaldasokord(ArrangemangtypBlock.html());
    }
    if (tmpkonstartid !== undefined) {
        searchdataContainer.konstartid = tmpkonstartid;
        addvaldasokord(kontformBlock.html());
    }
    if (tmpstartyear !== undefined) {
        searchdataContainer.startyear = tmpstartyear;        
    }
    if (tmpstopyear !== undefined) {
        searchdataContainer.stopyear = tmpstopyear;        
        if (searchdataContainer.startyear == 0 && searchdataContainer.stopyear > 0) {
            searchdataContainer.startyear = 1
        };
    }
    if (tmpstartyear != 0 || tmpstopyear != 0) {
        addvaldasokord("Ålder: " + tmpstartyear + "-" + tmpstopyear);
    }
   
    return searchdataContainer;    
}

var resetsearchform = function () {
    //$(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    //$(':checkbox, :radio').prop('checked', false);
    $('.kk_aj_mainsearchblock a').removeClass("vald");
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

var scrolldowntosearchresult = function () {
    $('html, body').animate({
        scrollTop: $(".kk_aj_searchbuttonblock").offset().top
    }, 500);
    return false;

}

// LOCALSTORAGE
// används för att rätt listningar skall visas om användaren öppnar sidan för förstagången = alla arr annars senaste sökningen och
// om användaren går till detalj skall senaste sökningen visas.

var SetSession = function () {
    session.set("Session", "true");
}
var isSessionSet = function () {

    if (session.get("Session")) {
        return true;
    }

    return false;
}

var localstorageHandler = function (stdata) {

    if (stdata) {
        storage.set('currentdata', stdata);
    } else {
        stdata = storage.get('currentdata');
    }
    return stdata;
};
