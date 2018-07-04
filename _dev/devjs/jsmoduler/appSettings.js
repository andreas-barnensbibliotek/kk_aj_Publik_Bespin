
window.kk_aj_publikAppsettings =
    {
        globalconfig: {
            //apiserver: "http://localhost:60485",
            //dnnURL: "http://dnndev.me",           
            //localOrServerURL: "http://localhost:60485/Api_v2",
            //htmltemplateURL: "http://dnndev.me/Portals/_default/Skins/kk_aj_Publik_Bespin/htmltemplates",
            //detailediturl: "http://localhost:60485/Api_v3/updatearrangemang",
            //basepageUri: "/KulturkatalogenAdmin",
            //arrtmpimgurl: "http://dnndev.me/Portals/0/kulturkatalogenArrImages/tmp/",
            //arrimgurl: "http://dnndev.me/Portals/0/kulturkatalogenArrImages/",
            //granskavy: "GranskaDetalj"
            
            //NYA SERVERN www2.kulturkatalogenvast.org
            //apiserver: "http://apidev.kulturkatalogenvast.org:8080",
            //dnnURL: "http://www2.kulturkatalogenvast.org",
            //localOrServerURL: "http://apidev.kulturkatalogenvast.org:8080/Api_v2",
            //htmltemplateURL: "http://www2.kulturkatalogenvast.org/Portals/_default/Skins/kk_aj_Publik_Bespin/htmltemplates",
            //detailediturl: "http://apidev.kulturkatalogenvast.org:8080/Api_v3/updatearrangemang",
            //basepageUri: "/KulturkatalogenAdmin",
            //arrtmpimgurl: "http://www2.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/tmp/",
            //arrimgurl: "http://www2.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/",
            //granskavy: "GranskaDetalj"

            ////SERVERN kulturkatalogenvast.org
            apiserver: "http://kulturkatalog.kivdev.se:8080",
            dnnURL: "http://www.kulturkatalogenvast.org",
            localOrServerURL: "http://kulturkatalog.kivdev.se:8080/Api_v2",
            htmltemplateURL: "http://www.kulturkatalogenvast.org/Portals/_default/Skins/kk_aj_Publik_Bespin/htmltemplates",
            detailediturl: "http://kulturkatalog.kivdev.se:8080/Api_v3/updatearrangemang",
            basepageUri: "/KulturkatalogenAdmin",
            arrtmpimgurl: "http://www.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/tmp/",
            arrimgurl: "http://www.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/",
            granskavy: "GranskaDetalj"

            //SERVERN DEV dev.kulturkatalogenvast.org
            //apiserver: "http://dev.kulturkatalogenvast.org:8080",
            //dnnURL: "http://dev.kulturkatalogenvast.org",
            //localOrServerURL: "http://dev.kulturkatalogenvast.org:8080/Api_v2",
            //htmltemplateURL: "http://dev.kulturkatalogenvast.org/Portals/_default/Skins/kk_aj_Publik_Bespin/htmltemplates",
            //detailediturl: "http://dev.kulturkatalogenvast.org:8080/Api_v3/updatearrangemang",
            //basepageUri: "/KulturkatalogenAdmin",
            //arrtmpimgurl: "http://dev.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/tmp/",
            //arrimgurl: "http://dev.kulturkatalogenvast.org/Portals/0/kulturkatalogenArrImages/",
            //granskavy: "GranskaDetalj"
            
        },
        userinfo: {
            userid: "",
            rollid: ""
        },
        arrtab: {
            currenttab: 0           
        },
        currentpage: "",
        datepicksetting : {
            language: 'sv',
            format: 'yyyy-mm-dd',
            disableDblClickSelection: true,
            leftArrow: '<<',
            rightArrow: '>>',
            closeIcon: 'X',
            closeButton: true
        },
        debug: "false" // true / false
    };

module.exports = {  
    config: window.kk_aj_publikAppsettings
}

