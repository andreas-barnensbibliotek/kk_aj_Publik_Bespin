//här sätts alla pluggin och jquery.ready starters 
var $ = require("jquery");
var appsettingsobject = require("./appSettings.js");
var arrformjsonBuilder = require("./arrformJsonBuilder.js");
var handlebarTemplethandler = require("./HandlebarTemplethandler.js");
var arrformValidator = require("./arrFormValidator.js");
var arrGranskaVy = require("./arrGranskaVy.js");
var arrformAutocompleteHandler = require("./arrformAutocompleteHandler.js");
var editorHandler = require("./externaljs/editor.js");
var _exempellistobject = { "exempelitemlist": [] };

module.exports = {
    start: function (tab) {
        var appsettings = appsettingsobject.config;
        
        $(function () {
            arrformValidator.arrShowforminputs("0");           
            
            var storage = Storages.localStorage;
            var session = Storages.sessionStorage;


            var btn_ny_utovareBlock = $('.kk_aj_form_befintligutovare');
            var btn_befintlig_utovareBlock = $('.kk_aj_form_utovareuppgifter');
            var btn_befintlig_utovartxtBlock = $('.kk_aj_form_visa_utovarinfo');
            var btn_kontaktupg_arrangemangBlock = $('.kk_aj_form_kontaktuppgifterarr');
            var visagetTidigareArrBlock = $('.kk_aj_visagetTidigareArrBlock');
                       
            $('.ArrangemangtypBlock input:radio').on('click', function () {
                var vald = $('input[name=arr_radioValArrtyp]:checked', '.ArrangemangtypBlock').val();
                $('small.error').hide();
                $('.kontformBlock').removeClass("radioError");
                arrformValidator.arrShowforminputs(vald);
                    arrformValidator.arrtypimg(vald);                    
                });

            $('.kontformBlock input:radio').on('click', function () {
                var vald = $('input[name=arr_radioValkontstform]:checked', '.kontformBlock').val();
                //$(this).prev().attr('checked', true);
                arrformValidator.konsttypimg(vald);
                //alert("click" + vald);
            });
            // Nav Event
            $('body').on('click', '.kk_aj_btnbefintligutovare', function () {
                
                $('.kk_aj_form_utovareuppgifter :input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
                btn_befintlig_utovareBlock.hide();
                btn_befintlig_utovartxtBlock.hide();
                btn_kontaktupg_arrangemangBlock.hide();
                btn_ny_utovareBlock.show();
                $('.kk_aj_verifystep2').hide();                
                $('small.error').hide();
                $('#arr_presentationsbild').removeClass('novalidate');
                $(this).removeClass("secondary");
                $('.kk_aj_btnnyutovare').addClass("secondary");
                $('#utovare_epost').addClass('befintligutovare')
                
                return false;
            });
            $('body').on('click', '.kk_aj_btnnyutovare', function () {
                //tidigareutovaredisable(false);
                clearUtovareform();
                clearForm();
                arrformAutocompleteHandler.emptyutovareform();               
                btn_befintlig_utovareBlock.show();
                btn_ny_utovareBlock.hide();
                visagetTidigareArrBlock.hide();
                btn_kontaktupg_arrangemangBlock.show();
                $('#arr_presentationsbild').removeClass('novalidate');
                btn_befintlig_utovartxtBlock.hide();
                $('.kk_aj_verifystep2').show();
                $(this).removeClass("secondary");
                $('.kk_aj_btnbefintligutovare').addClass("secondary");
                $('#utovare_epost').removeClass('befintligutovare')
                $('.utovare_epost_errorutovareexeists').hide();
                return false;
            });

            // Get befintlig arrangör
            $('body').on('click', '.kk_aj_btnHamtakontaktupg', function () {
                //tidigareutovaredisable(true);
                var epost = $('.kk_aj_search_utovareEpost');
                var postnr = $('.kk_aj_search_utovarePostnr');
                var kk_aj_search_utovarePostnr_error = $('.kk_aj_search_utovarePostnr_error');
                var kk_aj_search_utovareEpost_error = $('.kk_aj_search_utovareEpost_error');                
                var kk_aj_search_Nothingtoshow_error = $('.kk_aj_search_Nothingtoshow_error').hide();

                var kk_aj_search_Nothingtoshow = $('.kk_aj_search_Nothingtoshow');
                var kk_aj_form_utovareuppgifter = $('.kk_aj_form_utovareuppgifter');
                var kk_aj_btnHamtakontaktupg = $('.kk_aj_btnHamtakontaktupg');
                $('#utovare_epost').removeClass('notYouTest');                
                $('.utovare_epost_errorNotYou').hide();
                
                var kk_aj_verifystep2 = $('.kk_aj_verifystep2');

                kk_aj_search_utovarePostnr_error.hide();
                kk_aj_search_utovareEpost_error.hide();
                kk_aj_search_Nothingtoshow.hide();
                kk_aj_search_Nothingtoshow_error.hide();
                                            
                kk_aj_btnHamtakontaktupg.removeClass('success').addClass('secondary');
                kk_aj_form_utovareuppgifter.removeClass('successborder').hide();

                if (epost.val() && postnr.val()) {
                    arrformAutocompleteHandler.getBefintligutovare(epost.val(), postnr.val(), function (data) {
                        btn_kontaktupg_arrangemangBlock.show();


                        if (!data == false) {
                            let currentutovareid = $('.kk_aj_form_befintligutovare').attr('rel');
                            $('#arr_presentationsbild').addClass('novalidate');
                            arrformAutocompleteHandler.getutovareArrlist(currentutovareid);
                            btn_befintlig_utovartxtBlock.show();
                            kk_aj_form_utovareuppgifter.hide()
                            kk_aj_btnHamtakontaktupg.removeClass('secondary').addClass('success');
                            visagetTidigareArrBlock.show();
                            //kk_aj_form_utovareuppgifter.addClass('successborder').show();
                            //$('.kk_aj_befintlignotme').show();
                            kk_aj_verifystep2.show();
                        } else {
                            $('#arr_presentationsbild').removeClass('novalidate');
                            visagetTidigareArrBlock.hide();
                            kk_aj_search_Nothingtoshow.show();
                            kk_aj_search_Nothingtoshow_error.show().attr("style", "display:block");
                            $('.kk_aj_befintlignotme').hide();
                            kk_aj_verifystep2.hide();
                        };
                    });

                } else {
                    kk_aj_search_utovarePostnr_error.show();
                    kk_aj_search_utovareEpost_error.show();
                    kk_aj_verifystep2.hide();
                };
                return false;
            });

            $('#arr_getTidigareArrangemang_Get').on('click', function (e) {

                let utovareid = $('#arr_getTidigareArrangemang').val();
                 
                arrformAutocompleteHandler.getTidigareArrDetail(utovareid, function (arrid,konstformid) {
                    arrformValidator.arrtypimg(arrid);
                    arrformValidator.konsttypimg(konstformid);
                    console.log("hämtat");
                   
                });
                return false;
            });            
            $("#arr_presentation").on("focus", function (e) {
                editorHandler.updatera();
            })
            $('#ChangeUppgifterKontakt').on('click', function (e) {
                btn_befintlig_utovartxtBlock.hide();
                btn_befintlig_utovareBlock.show();
                $('.SparaUppgifterKontaktBlock').show();
                return false;
            });

            $('#SparaUppgifterKontakt').on('click', function (e) {
                arrformAutocompleteHandler.savekontaktuppgifter();
                btn_befintlig_utovartxtBlock.show();
                btn_befintlig_utovareBlock.hide();
                $('.SparaUppgifterKontaktBlock').hide();
                return false;
            });

            $('.kk_aj_sammakontaktpers').on('click', function (e) {
                arrformAutocompleteHandler.kopierakontaktuppgifter();
                
                return false;
            })            

            // Verify steg 1
            $('.kk_aj_btn_next_step[rel=2]').on('click', function (e) {                
                var ret = true;

                arrformAutocompleteHandler.allreadyExistsutovare($('#utovare_epost').val(), $('#utovare_postnummer').val(), function (data) {
                    var ret = true;
                    if (!$('#utovare_epost').hasClass('befintligutovare')) {
                        if (data) {
                            utovareexeists();
                            ret = false;
                        };
                    };

                    if (!$('#utovare_epost').val() && !$('#utovare_postnummer').val()) {
                        if (arrformValidator.formvalidator(1) == true && ret == true) {

                            if ($('#utovare_epost').hasClass('notYouTest')) {
                                if ($('#utovare_epost').val() == $('.kk_aj_search_utovareEpost').val()) {
                                    isnotme();
                                    ret = false;
                                };
                            };

                            if (ret) {
                                tabnavigator(2);
                            };

                            return ret;

                        } else {
                            tabnavigator(1);
                            return false;
                        };
                    };
                
               

                    if (arrformValidator.formvalidator(1) == true && ret == true) {

                        if ($('#utovare_epost').hasClass('notYouTest')) {
                            if ($('#utovare_epost').val() == $('.kk_aj_search_utovareEpost').val()) {
                                isnotme();
                                ret = false;
                            };
                        };

                        if (ret) {
                            tabnavigator(2);
                        };

                        return ret;

                    } else {
                        tabnavigator(1);
                        return false;
                    };
              });
            });            
            
            // Verify steg 2
            $('.kk_aj_btn_next_step[rel=3]').on('click', function (e) {
                
                let missingimg = $('#kk_aj_tmpimg').attr("src");
                if (missingimg.indexOf("/missingimage.jpg") > 0) {
                    $('#arr_presentationsbild').removeClass('novalidate');
                } else {
                    $('#arr_presentationsbild').addClass('novalidate');
                };
                if (arrformValidator.formvalidator(2)) {
                    console.log("_exempellistobject " +_exempellistobject);
                    // FYll på inmatade värden i granskavyn!   
                    arrformjsonBuilder.getArrFormJsonData(_exempellistobject, function (callback) {
                        console.log(callback);
                        var jsonmainobject = callback;
                        arrGranskaVy.getArrFormJsonData(jsonmainobject);

                    });
                    tabnavigator(3);                                     
                    return false;
                    
                } else {
                    tabnavigator(2);
                    return false;
                }
            });
            // Verify steg 2
            $('.kk_aj_btn_next_step[rel=4]').on('click', function (e) {               
                    tabnavigator(4);
                //spara in allt i jsonobject och lägg i localstoragae

                    console.log("finns:" + _exempellistobject);
                    return true;                
            });

            //show step
            $('.kk_aj_tab[rel=1]').on('click', function (e) {               
                tabnavigator(1);
                if (appsettings.arrtab.currenttab > 1) {
                    arrformValidator.formvalidator(1);
                }
                appsettings.arrtab.currenttab = 1;
                return true;
            });
            $('.kk_aj_tab[rel=2]').on('click', function (e) {                
                tabnavigator(2);
                if (appsettings.arrtab.currenttab > 1) {
                    
                    arrformValidator.formvalidator(2);
                }
                appsettings.arrtab.currenttab = 2;
                return true;
            });
            $('.kk_aj_tab[rel=3]').on('click', function (e) {
                tabnavigator(3);
                if (appsettings.arrtab.currenttab > 3) {
                    arrformValidator.formvalidator(3);
                }
                appsettings.arrtab.currenttab = 3;
                return true;
            });
            $('.kk_aj_tab[rel=4]').on('click', function (e) {
                $('.tab-title[rel=4]').addClass('active').removeClass('done'); 
                tabnavigator(4);
                appsettings.arrtab.currenttab = 4;
                return true;
            });
            //back to steg 1
            $('.kk_aj_btn_to_step1').on('click', function (e) {
                tabnavigator(1);
                return true;                    
            });
            //back to steg 2
            $('.kk_aj_btn_to_step2').on('click', function (e) {
                tabnavigator(2);
                return true;
            });

            $('.kk_aj_btn_SendArr').on('click', function (e) {
                if ($('#chkApproved').is(':checked')) {
                    if (confirm('Är du säker på att du vill skicka in uppgifterna för arrangemanget?')) {
                        console.log(_exempellistobject);
                        arrformjsonBuilder.getArrFormJsonData(_exempellistobject, function (callback) {
                            console.log(callback);
                            var arrjson = callback;
                            // if utovareid>0 och arrid>0 och väljfil == 0 då behöver man inte ladda upp utan använder samma som tidigare
                            arrformjsonBuilder.PostMainArrangemang(arrjson, function (callbackarrid) {
                                console.log(callbackarrid);
                                var isbefintligutovare = $('.kk_aj_form_befintligutovare').attr('rel');

                                let bildfil = $("#arr_presentationsbild").get(0).files;
                                //if (bildfil.length > 0) {
                                    arrformjsonBuilder.tempuploadimage("uploadimg", bildfil, callbackarrid, function (callback) { return callback });
                                //}

                                let arr_cvmedverkande = $('#arr_cvmedverkande_file').get(0).files;
                                if (arr_cvmedverkande.length > 0) {
                                    arrformjsonBuilder.tempuploadimage("uploadimg", arr_cvmedverkande, callbackarrid, function (callback) {

                                        alert("Uppgifterna är nu inskickade!");
                                        clearUtovareform();
                                        clearForm();
                                        tabnavigator(1);
                                        return true;
                                    });
                                } else {
                                    alert("Uppgifterna är nu inskickade!");
                                    clearUtovareform();
                                    clearForm();
                                    tabnavigator(1);
                                    return true;
                                };

                            });
                        });
                        return false;

                    } else {
                        return false;
                    };
                } else {
                    alert("Du måste godkänna avtalet för att göra ansökan!")
                    return false
                }
            });

            $('.kk_aj_AvbrytSteps').on('click', function (e) {
                if (confirm('Är du säker på att du vill radera alla ifyllda uppgifter för arrangemanget? Raderade uppgifter går inte att ångra!')) {
                    clearUtovareform();
                    clearForm();
                    tabnavigator(1);
                    return true;
                } else {
                    return false;
                };
            });

            $('.kk_aj_btnnyttexemple').on('click', function (e) {                
                $('.arrExempel').slideToggle("slow");
                $(this).text(function (i, text) {
                    return text === "Lägg till exempel" ? "Avbryt lägg till exempel" : "Lägg till exempel";
                })
                return false;
            });            
            
            $('#kk_aj_addExempel').on('click', function (e) {               
                saveArrExempel();
                $('.arrExempel').slideToggle("slow");
                $('.kk_aj_btnnyttexemple').text("Lägg till exempel");
                return false;
            });
            $('#kk_aj_addfilmExempel').on('click', function (e) {
                saveArrfilmExempel();
                $('.arrExempel').slideToggle("slow");
                $('.kk_aj_btnnyttexemple').text("Lägg till exempel");
                return false;
            });

            $('body').on('click','.kk_aj_tabortexempel', function (e) {
                var deletetitle = $(this).attr('rel');
                tabortexempelfromJson(deletetitle);
                return false;
            });

            $('#kk_aj_laddatmpimg').on('click', function () {
                var spinner = appsettings.globalconfig.dnnURL + "/Portals/_default/Skins/kk_aj_Publik_Acklay/public/ajax-loader.gif";
                var orgimg = appsettings.globalconfig.dnnURL + "/DesktopModules/kk_aj_Publik_ArrangemangForm/images/missingimage.jpg";
                let spinnerobj = $('#kk_aj_tmpimg');
                var filinput = $("#arr_presentationsbild");
                spinnerobj.attr('src', spinner);

                var ext = filinput.val().split('.').pop().toLowerCase();
                if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                    alert("Du kan bara ladda upp filer i formaten: gif, png, jpg, jpeg");
                    filinput.val("");
                    spinnerobj.attr('src', orgimg);
                } else {
                    let files = filinput.get(0).files;
                    if (files[0].size <= 2000000) {                       
                        arrformjsonBuilder.tempuploadimage("tmpimg", files, "0", function (callback) {
                            console.log(callback);
                            spinnerobj.attr('src', callback);
                        });
                    } else {
                        alert("Filen är för stor! den får inte vara större än 2 MB!");
                        filinput.val("");
                        spinnerobj.attr('src', orgimg);
                    };
                }
                
                return false;
            });            
           
            $('.kk_aj_befintlignotme').on('click', function () {
                tidigareutovaredisable(false);
                isnotme();
                return false;
            });
            $('.info').on('click', function (e) {
               
                var classen = $(this).attr('rel');
                $('.' + classen +'text').toggle();
                return false;
            });
            $('#tab-cv-1').on('click', function (e) {
                $('#arr_cvmedverkande_file').val("");                
                
            });
            $('#tab-cv-2').on('click', function (e) {
                $('#arr_cvmedverkande_url').val("");
                
            });            

            editorHandler.init();


        });
              

        var clearForm = function () {
            let addarrtab_1 = $('#addarrtab-1');
            let addarrtab_2 = $('#addarrtab-2');
            let addarrtab_3 = $('#addarrtab-3');
            let addarrtab_4 = $('#addarrtab-4');
            addarrtab_1.show();
            addarrtab_2.show();
            addarrtab_3.show();
            addarrtab_4.show();
            $('#mainarrformcontainer :input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
            $('#mainarrformcontainer :checkbox, #mainarrformcontainer :radio').prop('checked', false);
            //addarrtab_1.hide();
            addarrtab_2.hide();
            addarrtab_3.hide();
            addarrtab_4.hide();
            $('#kk_aj_yearspan').html("");
            $('#kk_aj_speltid').html("");
            editorHandler.clear();

            //arrangemang images
            $('.img_resmalsbesok').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/besoksmalmedresestod.png');
            $('.img_forestallningtune').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/forestallningpatune.png');
            $('.img_Skolbio').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Skolbio.png');
            $('.img_Kulturpedagogiskaprojekt').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/workshops_projekt.png');
            $('.img_utstallningturne').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/utstallningpaturne.png');

            //Konstform EJ _invert
            $('.img_arkitektur').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Arkitekturochdesign.png');
            $('.img_dans').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/dans.png');
            $('.img_film').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Filmochmedia.png');
            $('.img_konst').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Konstformochdesign.png');
            $('.img_litteratur').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Litteraturberattandeskrivande.png');
            $('.img_musik').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/musik.png');

            $('.img_naturochkultruarv').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Naturochkulturarv.png');
            $('.img_nycirkus').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Nycirkus_cirkus.png');
            $('.img_slojd').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Slojd.png');
            $('.img_teater').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/teater.png');
            $('.img_teknik').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Teknikochmultimedia.png');
            $('.img_annascenkonst').attr('src', '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/Annanscenkonst.png');

            $('.arrExempellist').empty();

            let btn_ny_utovareBlock = $('.kk_aj_form_befintligutovare');
            let btn_befintlig_utovareBlock = $('.kk_aj_form_utovareuppgifter');
            let btn_befintlig_utovartxtBlock = $('.kk_aj_form_visa_utovarinfo');
            let btn_kontaktupg_arrangemangBlock = $('.kk_aj_form_kontaktuppgifterarr');
            let visagetTidigareArrBlock = $('.kk_aj_visagetTidigareArrBlock');
            $('#kk_aj_tmpimg').attr('src',  appsettings.globalconfig.dnnURL + '/DesktopModules/kk_aj_Publik_ArrangemangForm/images/missingimage.jpg');
            btn_ny_utovareBlock.hide();
            btn_befintlig_utovareBlock.removeClass('successborder').show();
            $('.kk_aj_verifystep2').show();
            $('.kk_aj_btnnyutovare').removeClass("secondary");
            $('.kk_aj_btnbefintligutovare').addClass("secondary");
            $('.kk_aj_form_befintligutovare').attr('rel', '0');
            $('.kk_aj_befintlignotme').hide();
            let securetext = "<h3>Datalagringsavtal</h3> <ul> <li>Jag godkänner att Kultur i Väst behandlar och lagrar användardata som har fyllts i i arrangörsformuläret.</li>";
            securetext += "<li>Kulturkatalogen Väst använder uppgifterna för att visa arrangemang i sin digitala utbudskatalog.</li>";
            securetext += "<li>Alla uppgifter i formuläret är publika förutom de uppgifter som har fyllts i under rubriken ”Information inför bedömning”. För förställning på turné och utställning på turné gäller att alla uppgifter är publika då de saknar bedömningsdelen.</li>";
            securetext += "<li>Användardata kommer att lagras för arkivering då det innefattas av offentlighetsprincipen eller tills det att du som användare aktivt väljer att ta bort datat. Att användaruppgifterna lagras förenklar även fortsatt förnyelse av ett arrangemang.</li></ul>";
           
            $('#ApproveText').html(securetext);

            btn_ny_utovareBlock.hide();
            visagetTidigareArrBlock.hide();
            btn_kontaktupg_arrangemangBlock.show();
            btn_befintlig_utovartxtBlock.hide();

        };
        var clearUtovareform = function () {
            $('#visa_utovareNamn2').html("");
            $('#visa_utovareHemsida2').html("");
            $('#visa_utovareAdress2').html("");
            $('#visa_utovarePostnr2').html("");
            $('#visa_utovareOrt2').html("");
            $('#visa_utovareKommun2').html("");
            $('#visa_utovareForamn2').html("");
            $('#visa_utovareEfternamn2').html("");
            $('#visa_utovareTelenr2').html("");
            $('#visa_utovareEpost2').html("");

            $('#utovare_aktor_grupp').val('');
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

       
    }
};


var tabnavigator = function (tab) {
    var addarrtab_1 = $('#addarrtab-1');
    var addarrtab_2 = $('#addarrtab-2');
    var addarrtab_3 = $('#addarrtab-3');
    var addarrtab_4 = $('#addarrtab-4');

    addarrtab_1.hide();
    addarrtab_2.hide();
    addarrtab_3.hide();
    addarrtab_4.hide();

    switch (tab) {
        case 1:
            addarrtab_1.show();
            break;
        case 2:
            addarrtab_2.show();
            break;
        case 3:
            addarrtab_3.show();
            break;
        case 4:
            addarrtab_4.show();
            break;
        default:
            addarrtab_1.show();
    };
    scrollup();
    changetabattr(tab);
};

var changetabattr = function (tab) {
    var curr = tab;
    var next = tab + 1;
    if (curr == 4) {
        next = curr;
    };


    if (curr == 4) {
        $('.tab-title[rel=' + curr + ']').addClass('active').removeClass('disabled');
        $('.tab-title[rel=3]').addClass('done').removeClass('active');
    } else {
        $('.tab-title[rel=' + tab + ']').addClass('active').removeClass('done').removeClass('disabled');
        for (next; next <= 4; next++) {
            $('.tab-title[rel=' + next + ']').addClass('disabled').removeClass('active').removeClass('done');
        }
    };
};

// Arrangemangs exempel START!
var saveArrExempel = function () {
    let val = $('#arr_ExempelRubrik').val()
    let bild_film_url = $('#arr_Exempelbild').val();       
    let index = _exempellistobject.exempelitemlist.findIndex(function (item, i) {
        return item.mediaTitle === val
    });
    if (index >= 0) {
        alert("Exemplet finns redan!");
        return false;
    }
    _exempellistobject.exempelitemlist.push(
        {
            "MediaUrl": bild_film_url,
            "MediaTyp": "1",
            "mediaTitle": $('#arr_ExempelRubrik').val(),
            "mediaBeskrivning": $('#arr_Exempelbeskrivning').val(),
            "mediaLink": $('#arr_ExempelUrl').val()
        }
    );
    handlebarTemplethandler.injecthtmltemplate(".arrExempellist", "kk_aj_arrformExempelList.txt", _exempellistobject);
    tomexempelform();
};

// Arrangemangs exempel START!
var saveArrfilmExempel = function () { 
    let val = $('#arr_ExempelfilmRubrik').val();
    let bild_film_url = $('#arr_Exempelfilm').val();

    let urlyoutubetest = bild_film_url.indexOf("https://youtu.be/");
    let urlvimeotest = bild_film_url.indexOf("https://vimeo.com/");
    let Errorverifymovie;
    let errormess = "";
    let fixurl = "";
    if (urlyoutubetest >= 0) {
        fixurl = bild_film_url.replace("https://youtu.be/", "");
        errormess = "youtube";
    }
    if (urlvimeotest >= 0) {
        fixurl = bild_film_url.replace("https://vimeo.com/", "");
        errormess = "vimeo";
    };

    if (errormess == "") {
        alert("Du måste ha en korrekt filmlänk! Använd antingen Youtube.com:s eller Vimeo.com:s delalänkar.");
        return false;
    };

    bild_film_url = fixurl;

    let index = _exempellistobject.exempelitemlist.findIndex(function (item, i) {
        return item.mediaTitle === val
    });

    if (index >= 0) {
        alert("Exemplet finns redan!");
        return false;
    }
    _exempellistobject.exempelitemlist.push(
        {
            "MediaUrl": bild_film_url,
            "MediaTyp": "2",
            "mediaTitle": $('#arr_ExempelfilmRubrik').val(),
            "mediaBeskrivning": $('#arr_Exempelfilmbeskrivning').val(),
            "mediaLink": $('#arr_ExempelfilmUrl').val()
        }
    );
    handlebarTemplethandler.injecthtmltemplate(".arrExempellist", "kk_aj_arrformExempelList.txt", _exempellistobject);
    tomexempelform();
};

var tomexempelform = function () {
    $('#arr_Exempelbild').val("");       
    $('#arr_ExempelRubrik').val("");
    $('#arr_Exempelbeskrivning').val("");
    $('#arr_ExempelUrl').val("");
    //film
    $('#arr_ExempelfilmRubrik').val("");       
    $('#arr_Exempelfilmbeskrivning').val("");
    $('#arr_Exempelfilm').val("");
    

}

var tabortexempelfromJson = function (delval) {
    var index = _exempellistobject.exempelitemlist.findIndex(function (item, i) {
        return item.mediaTitle === delval
    });
    _exempellistobject.exempelitemlist.splice(index, 1);    
    handlebarTemplethandler.injecthtmltemplate(".arrExempellist", "kk_aj_arrformExempelList.txt", _exempellistobject);
}
// Arrangemangs exempel STOPP!
var isnotme = function () {
    $('#utovare_epost').val("").addClass('notYouTest');
    $('.kk_aj_form_befintligutovare').attr('rel', '0');
    $('.utovare_epost_errorNotYou').show();
}
var utovareexeists = function () {
   
    $('.utovare_epost_errorutovareexeists').show();
    $('#utovare_epost').val("")
}
var tidigareutovaredisable = function (dodisable) {
    if (dodisable == true) {
        $('#utovare_aktor_grupp').attr('disabled', 'disabled');
        $('#utovare_orghemsida').attr('disabled', 'disabled');
        $('#utovare_adress').attr('disabled', 'disabled');
        $('#utovare_postnummer').attr('disabled', 'disabled');
        $('#utovare_ort').attr('disabled', 'disabled');
        $('#utovare_kommun').attr('disabled', 'disabled');
        $('#utovare_fornamn').attr('disabled', 'disabled');
        $('#utovare_efternamn').attr('disabled', 'disabled');
        $('#utovare_telefonnr').attr('disabled', 'disabled');
        $('#utovare_epost').attr('disabled', 'disabled');
    } else {
        $('#utovare_aktor_grupp').removeAttr('disabled');       
        $('#utovare_orghemsida').removeAttr('disabled');
        $('#utovare_adress').removeAttr('disabled');
        $('#utovare_postnummer').removeAttr('disabled');
        $('#utovare_ort').removeAttr('disabled');
        $('#utovare_kommun').removeAttr('disabled');
        $('#utovare_fornamn').removeAttr('disabled');
        $('#utovare_efternamn').removeAttr('disabled');
        $('#utovare_telefonnr').removeAttr('disabled');
        $('#utovare_epost').removeAttr('disabled');
    }
    
}
let scrollup = function () {
    $("html, body").animate({ scrollTop: 100 }, 500);
    return false;
};