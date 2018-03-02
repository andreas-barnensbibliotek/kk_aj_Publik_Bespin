var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");

var storage = Storages.localStorage;
module.exports = {
    getminneslistan: function () {
       return storage.get('minneslistan');
    },
    addto: function (id) {
        if (id) {
            let currentdata = storage.get('currentdata');
            return getItemTromCurrentlist(currentdata, id, "add");
        }
        return false;
    },
    removefrom: function (id) {
        if (id) {
            let currentdata = storage.get('minneslistan');
            return getItemTromCurrentlist(currentdata, id, "del");
        }
        return false;
    },
    counter: function () {
        let obj = storage.get('minneslistan');
        if (obj) {
            $('.cmd_minneslistan').html("(" + obj.kk_aj_admin.ansokningarlista.ansokningarcount + ")");
        };
    },
    inlist: function (curdatat) {
       return getinlist(curdatat);
    }
};
var getinlist = function (curdata) {
    let datat = storage.get('minneslistan');
    let obj = curdata.kk_aj_admin.ansokningarlista.ansokningar;
    for (var i = 0; i < obj.length; i++) {
        
        if (checkifinlist(obj[i].ansokningid, datat)) {
            obj[i].ansokningstatus = "inminneslist"
        } else {
            obj[i].ansokningstatus = ""
        };  
    };
    curdata.kk_aj_admin.ansokningarlista.ansokningar = obj;
    return curdata;
};

var checkifinlist = function (arrid, storeddata) {
    var ret = false;
    let obj = storeddata.kk_aj_admin.ansokningarlista.ansokningar
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].ansokningid == arrid) {
            ret = true;
            break;
        }
    }
    return ret;
}

var getItemTromCurrentlist = function (datat, arrid, cmd) {
    var obj = datat.kk_aj_admin.ansokningarlista.ansokningar;
    // iterate over each element in the array
    for (var i = 0; i < obj.length; i++) {
        // look for the entry with a matching `code` value
        if (cmd == "add") {
            if (obj[i].ansokningid == arrid) {
                minneslistanobj.kk_aj_admin.ansokningarlista.ansokningar.push(obj[i]);
                break;
            }
        };

        if (cmd == "del") {
            if (obj[i].ansokningid == arrid) {
                minneslistanobj.kk_aj_admin.ansokningarlista.ansokningar.splice(i, 1);
                break;
            }
        };        
    };
    var antal = minneslistanobj.kk_aj_admin.ansokningarlista.ansokningar.length;
    minneslistanobj.kk_aj_admin.ansokningarlista.ansokningarcount = antal;
    $('.cmd_minneslistan').html("(" + antal + ")");
    
    storage.set('minneslistan', minneslistanobj);
};

var minneslistanobj =
    {
        "kk_aj_admin": {
            "Ansokningstyp": "0",
            "ansokningarlista": {
                "ansokningarcount": "0",
                "ansokningar": []
            },
            "Ansokningarlistacount": 0,
            "Ansokningarlistacurrentpage": 0,
            "Ansokningarlistatotalpages": 0,
            "nyaansokningarcount": 0,
            "approvedansokningarcount": 0,
            "deniedansokningarcount": 0,
            "status": "Minneslista"
        }
    };