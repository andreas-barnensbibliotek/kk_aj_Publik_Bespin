var $ = require("jquery");
var appsettings = require("./appSettings.js");
var arrformhandler = require("./jqueryArrFormHandler.js");
var arrsearchhandler = require("./publiksearch.js");
var arrDetailvyHandler =require("./arrDetailVy.js")
module.exports = {    
    pageloader: function (pagetoload, val) {
       
        switch(pagetoload) {
            case "kk_aj_Publik_ArrangemangForm":
                arrformhandler.start(val);
                break;
            case "Dnn_module_kk_aj_Publik_productlist":
                arrsearchhandler.init(val);
                break;
            case "Dnn_module_kk_aj_Publik_detail":
                var granskapage = appsettings.config.globalconfig.granskavy;

                if ($('.kk_aj_CurrentPageName').html() == granskapage) {
                    arrDetailvyHandler.GranskaVy(val);
                } else {
                    arrDetailvyHandler.DetailVy(val);
                }                
                break;

            default:               
                //loadtemplateTypes(appsettings.topnavtemplate, appsettings.currentUserid);
                
                break;
        }        
    }
};