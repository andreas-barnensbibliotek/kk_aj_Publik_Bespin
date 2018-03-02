<%@ Control Language="vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" TagName="LANGUAGE" Src="~/Admin/Skins/Language.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="NAV" Src="~/Admin/Skins/Nav.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TEXT" Src="~/Admin/Skins/Text.ascx" %>
<%@ Register TagPrefix="dnn" TagName="BREADCRUMB" Src="~/Admin/Skins/BreadCrumb.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LEFTMENU" Src="~/Admin/Skins/LeftMenu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKS" Src="~/Admin/Skins/Links.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="STYLES" Src="~/Admin/Skins/Styles.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKTOMOBILE" Src="~/Admin/Skins/LinkToMobileSite.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.DDRMenu.TemplateEngine" Assembly="DotNetNuke.Web.DDRMenu" %>
<%@ Register TagPrefix="dnn" TagName="MENU" Src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="CONTROLPANEL" Src="~/Admin/Skins/controlpanel.ascx" %>
<%@ Register TagPrefix="dnn" TagName="Meta" Src="~/Admin/Skins/Meta.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Register TagPrefix="fortyfingers" TagName="STYLEHELPER" Src="~/DesktopModules/40Fingers/SkinObjects/StyleHelper/StyleHelper.ascx" %>
<%@ Register TagPrefix="dnn" TagName="jQuery" Src="~/Admin/Skins/jQuery.ascx" %>
<%@ Register TagPrefix="dnn" TagName="JavaScriptLibraryInclude" Src="~/admin/Skins/JavaScriptLibraryInclude.ascx" %>

<dnn:DnnJsInclude runat="server" FilePath="~/Resources/Shared/Scripts/jquery/jquery-ui.min.js" />
<!-- Html Meta header -->
<fortyfingers:STYLEHELPER ID="STYLEHELPER3" AddToHead='<meta charset="UTF-8">' runat="server" />

<fortyfingers:STYLEHELPER ID="headMeta1" AddToHead='<meta http-equiv="X-UA-Compatible" content="IE=edge">' runat="server" />
<fortyfingers:STYLEHELPER ID="headMeta2" AddToHead='<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">' runat="server" />
<fortyfingers:STYLEHELPER ID="STYLEHELPER2" AddCssFile="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" runat="server" />

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<fortyfingers:STYLEHELPER ID="IE_LEE9" IfBrowser="IE<9" AddJsFile="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js" runat="server" />
<fortyfingers:STYLEHELPER ID="IE_LEE9_2" IfBrowser="IE<9" AddJsFile="https://oss.maxcdn.com/respond/1.4.2/respond.min.js" runat="server" />




<!-- ### OFFCANVAS START ################################################################################################ --> 
 <div class="off-canvas-wrap" data-offcanvas>
     <div class="inner-wrap">
         
         <!-- ### MENYBALK START (NAV)################################################################################################ -->
         <nav class="tab-bar">
             <section class="left-small">

                 <a class="left-off-canvas-toggle" href="#"><span>MENY artikel</span></a>
             </section>

             <section class="right tab-bar-section tab-bar-logosection">
                 <a href="index.html">
                     <img src="http://kulturivast.se/sites/all/themes/kivnew/images/kivlogo.png" alt="Kultur i V&auml;st" /></a>
             </section>

             <section class="right-small">
                 <a href="#"><span>S&Ouml;K</span></a>
             </section>
         </nav>
         <!-- ### MENYBALK END (NAV) ################################################################################################ -->

         <aside class="left-off-canvas-menu">
             <ul class="off-canvas-list">       
                 <li>
                     <label></label>
                 </li>
                 <li class="menu-mlid-7255"><a href="" class="active-trail  togglebgimageshow" title="">Det h&auml;r jobbar vi med</a></li>
                 <ul class="off-canvas-submenu multiColumn">
                     <li><a href="mosaikListview2.html">Arkitektur</a></li>
                     <li><a href="mosaikListview2.html">Arrang&ouml;rsutveckling</a></li>
                     <li><a href="listview.html">Bibliotek</a></li>
                     <li><a href="artikel4.html">Dans</a></li>
                     <li><a href="listview2.html">Film</a></li>
                     <li><a href="listview2.html">Klangf&auml;rg</a></li>
                     <li><a href="listview2.html">Konst</a></li>
                     <li><a href="listview2.html">Kulturkatalogen V&auml;st</a></li>
                     <li><a href="listview2.html">Litteratur</a></li>
                     <li><a href="listview2.html">Musik och ljudkonst</a></li>
                     <li><a href="listview2.html">Samh&auml;llsutveckling</a></li>
                     <li><a href="listview2.html">Teater</a></li>

                     <li><a href="listview2.html">Barn och unga</a></li>
                     <li><a href="listview2.html">Fria kulturlivet</a></li>
                     <li><a href="listview2.html">Internationellt</a></li>
                     <li><a href="listview2.html">J&auml;mst&auml;lldhet</a></li>
                     <li><a href="listview2.html">Kultur och h&auml;lsa</a></li>
                     <li><a href="listview2.html">Kultur och l&auml;rande</a></li>
                     <li><a href="listview2.html">M&aring;ngfald</a></li>
                     <li><a href="listview2.html">Pedagogik</a></li>
                     <li><a href="listview2.html">Projekt</a></li>
                     <li><a href="listview2.html">Samarbeten</a></li>
                     <li><a href="listview2.html">Tillg&auml;nglighet</a></li>
                 </ul>
                 <li><a href="#">Kurser | N&auml;tverkstr&auml;ffar | Event</a></li>
                 <li><a href="#">Kalender</a></li>
                 <li><a href="#">Arrangera | Boka</a></li>
                 <li><a href="#">Kulturkatalogen V&auml;st</a></li>
                 <li><a href="#">Trycksaker | Publikationer</a></li>
                 <li><a href="#">Webb tv</a></li>
                 <li><a href="#">Kontakt</a></li>
                 <li><a href="#">Om oss</a></li>
                 <li><a href="#">Press</a></li>
                 <li><a href="#">In English</a></li>
                 <li>
             </ul>
             <dnn:MENU ID="MENU1" MenuStyle="Simple" runat="Server" />
         </aside>
         <a class="exit-off-canvas"></a>
<!-- ### OFFCANVAS END ################################################################################################ -->

<!-- CONTENTPANE START ################################################################################################ -->

         <div class="searchMainWrapper search-opener" style="display:none;">
             <div class="small-12 columns">
                 <div class="row">
                     <div class="small-12 columns">
                         <div class="searchmainContent">
                             <input type="text" class="searchinputbox" placeholder="S&ouml;k p&aring; kulturivast.se" />
                             <button type="button" class="searchButton">
                                 <img src="http://kulturivast.se/sites/all/themes/kivnew/images/PilVanster28.png" /></button>
                         </div>
                     </div>

                 </div>
             </div>
         </div>

         <!-- Navigerings breadcrumb START -->
         <div class="small-12 columns">
             <div class="row">
                 <div class="menybreadcrumb">
                     <dnn:BREADCRUMB ID="dnnBreadcrumb" runat="server" CssClass="mbc_navlinklist" RootLevel="0" Separator=" | " HideWithNoBreadCrumb="true" />           
                 </div>
             </div>
         </div>
         <!-- Navigerings breadcrumb END -->

         <br>
         <div class="small-12 columns contentboxheight artikelSuperBlock">
             <!-- ################################################################################################ -->
            
                <!-- Content Wrapper. Contains page content -->
            <div class="row">
                <div id="MainMenuPane" class="MainMenuPane content-wrapper" runat="server">
                    <div class="loader">
                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                     </div>
                </div>
              </div>
                <!-- /.content-wrapper -->
                 <!-- Artikel START -->
                <div class="artikelwrapper level1">
                    <div class="row">
                        <div class="small-12 columns">
                            <div id="MainRubrikPane" class="MainRubrikPane content-wrapper" runat="server">
                                <div class="loader">
                                     <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                                 </div>
                            </div>
                        </div>
                    </div>
	                <div class="row">
		                <div class="medium-8 columns artmaincontent">
		                <!--Maincontent -->
                            <div id="ContentPane" class="contentPane content-wrapper" runat="server">
                                <div class="loader">
                                     <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                                 </div>
                            </div>
		                </div>
		                <div class="medium-4 columns">
			                <div class="FaktaMainblock Fakta_mainblock">				
				                <!--Faktablock -->
                                 <div id="FaktaPane" class="faktaPane content-wrapper" runat="server">
                                    <div class="loader">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                                     </div>
                                </div>	
			                </div>
			                <div class="artsidecontainer Kontakt_mainblock">
				                <!--Kontaktblock -->
                                <div id="KontaktPane" class="KontaktPane content-wrapper" runat="server">
                                    <div class="loader">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                                     </div>
                                </div>		                                        
			                </div>
			                <div class="artsidecontainer Dela_mainblock">
				                <!--Delablock -->	
                                <div id="DelaPan" class="DelaPane content-wrapper" runat="server">
                                    <div class="loader">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/page-loader.gif" />
                                     </div>
                                </div>		  
			                </div>
		                </div>
	                </div>
                </div>
                <!-- ARtikel END -->
                <!-- ################################################################################################ -->
              
             <a href="#" id="myBtn" title="Go to top">
                <i class="fa fa-arrow-up"></i>
             </a>

         </div>

<!-- CONTENTPANE END ################################################################################################ -->  
         <div class="small-12 columns footencol">
             <footer class="footer" style="margin-top: 2rem;">
                 <div class="row">
                     <div class="small-12 medium-12 large-12 columns">
                         <div class="vglogo">
                             <a href="http://www.vgregion.se" target="_blank">
                                 <img alt="V&auml;stra G&ouml;talandsregionen" src="http://kulturivast.se/sites/all/themes/kivnew/images/vg_logo_white.png">
                             </a>
                         </div>
                     </div>
                 </div>
                 <div class="row footdelare">
                     <div class="small-12 medium-6 large-6 columns">
                         <div class="foot-kivlogo-container">
                             <a href="/">
                                 <img alt="Kultur i V&auml;st" src="http://kulturivast.se/sites/all/themes/kivnew/images/kivlogo.png"></a>
                         </div>
                     </div>
                     <div class="small-12 medium-6 large-6 columns">
                         <div class="foot-social-container">
                             <ul class="socialiconlist">
                                 <li>
                                     <a href="https://www.facebook.com/kulturivast/" target="_blank">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/FACEBOOKlogga.png" alt="www.facebook.com/kulturivast/"></a>
                                 </li>
                                 <li>
                                     <a href="https://twitter.com/kulturivast" target="_blank">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/TWITTERlogga.png" alt="www.twitter.com/kulturivast"></a>
                                 </li>
                                 <li>
                                     <a href="https://www.instagram.com/kulturivast/" target="_blank">
                                         <img src="http://kulturivast.se/sites/all/themes/kivnew/images/INSTAGRAMlogga.png" alt="www.instagram.com/kulturivast"></a>
                                 </li>
                             </ul>
                         </div>
                     </div>
                     <div class="small-12 columns footdelarehrbox">
                        <span id="kk_aj_CurrentUserid" class="kk_aj_CurrentUserid"><%= UserController.Instance.GetCurrentUserInfo().UserID%></span>
                        <hr>                         
                     </div>
                 </div>
                 <div class="row adressrow">
                     <!--<div class="small-12 medium-12 columns kivfootbottom">-->

                     <div class="small-12 medium-6 large-3 columns">
                        <h3>Postadress</h3>
                        Kultur i V&auml;st
                        <br>
                        405 44 G&ouml;teborg 
                     </div>
                     <div class="small-12 medium-6 large-3 columns">
                        <h3>Bes&ouml;ksadress</h3>
                        Rosenlundsgatan 4<br>
                        411 20 G&ouml;teborg
                     </div>
                     <div class="small-12 medium-6 large-3 columns">
                        <h3>Telefon</h3>
                        031 333 51 00 (v&auml;xel)<br>
                        031 333 51 01 (reception) 
                     </div>
                     <div class="small-12 medium-6 large-3 columns">
                        <h3>E-post</h3>
                        <a href="mailto:info@kulturivast.se">info@kulturivast.se</a>
                     </div>
                     
                     <!--</div>-->
                 </div>
             </footer>
         </div>
            <a href="#0" class="scroll-top"><i class="fi-arrow-up"></i></a>
        
         <!-- END INNER WRAP -->

     </div>
     <!-- END OFF CANVAS WRAP -->

     

    
     
 </div>

<dnn:jQuery ID="dnnjQuery" runat="server" />
<fortyfingers:STYLEHELPER ID="STYLEHELPER1" AddJsFile="public/js/kk_aj_publicbundle.js" runat="server" />
<fortyfingers:STYLEHELPER ID="STYLEHELPER4" AddJsFile="public/js/modernizr.js" runat="server" />
<dnn:SEARCH ID="dnnSearch2" runat="server" ShowSite="false" ShowWeb="false" EnableTheming="true" Submit="Search" CssClass="SearchButton" Visible="false" />
