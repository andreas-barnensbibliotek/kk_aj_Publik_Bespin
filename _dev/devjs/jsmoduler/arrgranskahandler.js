var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
/* module.exports = granskahandler 
 Tar hand om godkänn/neka funktionen i granskavyn
*/
var _appsetting = appsettingsobject.config;
module.exports = {   
    granskahandler : function (arrid) {       
       
        let txtarrstod = $('#kk_aj_Motivering');

        $('.motiveringEditblock').attr('rel', arrid);       

        $('body').on('click', '.stdmottext', function (e) {
            $("#Motivering").val($(this).text());
            e.preventDefault();
        })
        $('.motiv_alt').on('click', function (e) {
            let premotivering = $(this).html();
            txtarrstod.append(premotivering);
        });

       
        /* godkänn arrangemanget i granskavy */
        $('body').on('click', '.kk_aj_detailapproved', function () {

            if (valideragranska("approve")) {
                updateArrangemangMotivering('2',arrid, function () {
                    $('.motiveringEditblock').hide();
                    $('.kk_aj_granskaBehandlat').show();
                });
            };
            return false;
        });
        /* neka arrangemanget i granskavy */
        $('body').on('click', '.kk_aj_detaildenied', function () {

            if (valideragranska("neka")) {
                updateArrangemangMotivering('3',arrid, function () {
                    $('.motiveringEditblock').hide();
                    $('.kk_aj_granskaBehandlat').show();
                });
            };
            return false;
        });
    }
};

var updateArrangemangMotivering = function (NyArrStatus,tmparrid, callback) {
    let tmpstatusid = parseInt(NyArrStatus) + 1;
    let userexists = $('.kk_aj_konsu').html();

    if (userexists) {
        let postjson = {
            CmdTyp: "arrstat",
            Userid: userexists,
            Arrid: tmparrid,
            Logtypid: "1",
            Logstatusid: tmpstatusid,
            Logbeskrivning: $('#kk_aj_Motivering').val(),
            UpdValue: NyArrStatus
        };
        var arridt = postjson.Arrid
        updatemotivering(postjson, function () {

            callback();
        });
    };
};
var updatemotivering = function (postjson, callback) {

    var currurl = _appsetting.globalconfig.apiserver + "/Api_v2/updatearrangemang/upd/devkey/alf";
    
    console.log("2. servicen POSTAR data");
    $.ajax({
        async: true,
        type: "POST",
        url: currurl,
        data: postjson,
        success: function (data) {
            console.log("Parameter updaterad: ");
            callback(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.log(xhr + ":: " + ajaxOptions + ":: " + thrownError);
            alert("Nått blev fel vid uppdatering av parametrarna!");
        }
    });

};

var valideragranska = function (typ) {
    let ret = true;
    let drparrstrod = $('#kk_aj_arrangorstod');
    let txtarrstod = $('#kk_aj_Motivering');

    drparrstrod.removeClass("errorborder");
    txtarrstod.removeClass("errorborder");

    if (txtarrstod.val() === "") {
        ret= false;
        txtarrstod.addClass("errorborder");
    };

    if (typ != "neka") {
        drparrstrod.removeClass("errorborder");
        if (drparrstrod.val() === "") {
            ret= false;
            drparrstrod.addClass("errorborder");
        };
    }    
   
    return ret;
}