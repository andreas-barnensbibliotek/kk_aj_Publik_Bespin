//här sätts alla pluggin och jquery.ready starters 
var detailhandler = require("./arrDetailHandler.js");

module.exports = {
    getArrFormJsonData: function (arrJson) {
        detailhandler.RenderMainContent(arrJson);
        detailhandler.RendeFaktaContent(arrJson);
        detailhandler.RenderUtovareContent(arrJson);
    }
};
