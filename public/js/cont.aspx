<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cont.aspx.cs" Inherits="cont" %>

<%@ Register TagPrefix="AJ" TagName="Navigering" Src="~/kontroller/navigering.ascx" %>
<%@ Register TagPrefix="AJ" TagName="MainContent" Src="~/kontroller/maincontent.ascx" %>
<%@ Register TagPrefix="AJ" TagName="Blogg" Src="~/kontroller/bloggcontent.ascx" %>
<%@ Register TagPrefix="AJ" TagName="loggin" Src="~/kontroller/logincontrol.ascx" %>
<%@ Register TagPrefix="AJ" TagName="kontaktform" Src="~/kontroller/kontaktform.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Cardic</title>
    <meta name="keywords" content="Cardic" />
    <meta name="description" content="Cardic erbjuder utbildningar iHLR och D-HLR hjärt-lungräddning med hjärtstatare" />
    <link href="server/css/colorbox.css" rel="stylesheet" type="text/css" />
    <link href="server/thickbox/thickbox.css" rel="stylesheet" type="text/css" />
    <link rel="icon" type="image/x-icon" href="talivastIco.ico" />
    <script src="server/js/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="server/js/jquery.corner.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="css/templatemo_style.css" />
    <script language="javascript" type="text/javascript">
        function clearText(field) {
            if (field.defaultValue == field.value) field.value = '';
            else if (field.value == '') field.value = field.defaultValue;
        }
    </script>
</head>
<body>
    <form id="frm" runat="server">
<div id="templatemo_menu">
    <AJ:Navigering ID="Navigering1" runat="server" />
   
    

</div> <!-- end of templatemo_menu -->

<div id="templatemo_site_title_bar_wrapper">

	<div id="templatemo_site_title_bar">
    
    	<div class="site_title_left">
    
            <div id="site_title">
                <h1><a href="#"><asp:Image ID="Image1" ImageUrl="~/images/biomedicLogo.png" runat="server" />
                <span>Rätt hjälp i rätt tid räddar liv</span>	</a>
                </h1>
          </div>
            
        </div>
        
        <div class="site_title_right">
        	
            <h2><a href="#">Kurser och utbildningar</a></h2>
            <p>Cardic erbjuder utbildningar iHLR och D-HLR hjärt-lungräddning med 
                hjärtstatare.</p>
    	
        </div>
    
    </div> <!-- end of templatemo_site_title_bar -->

</div> <!-- end of templatemo_site_title_bar_wrapper -->

<div id="templatemo_content_wrapper_outter">

	<div id="templatemo_content_wrapper_inner">
    	
        <div id="templatemo_content_top"></div>
        
        <div id="templatemo_content">
        
        	<AJ:MainContent ID="maincont" runat="server"  />
            
            <AJ:Blogg ID="bloggCont" runat="server" Visible= "true"/> 
            <AJ:kontaktform id="kontfrmCont"  runat="server" />
            
            <div class="cleaner"></div>        
        </div>
        



        <div id="templatemo_content_bottom"></div>
        
        

    </div> <!-- end of templatemo_content_wrapper_inner -->

</div> <!-- end of templatemo_content_wrapper_outter -->

<div id="templatemo_footer_wrapper">

<div id="templatemo_footer">

    <div class="section_w280">
        
        <h3>Partners</h3>
        
        <div class="sub_content">
            
            <ul class="footer_list">
                <li><a href="http://www.biomatec.se" target="_parent">Biomatec</a></li>
                <li><a href="http://www.frontdata.se" target="_parent">Frontdata development</a></li>                             
            </ul>
            
        </div>
        
    </div>
    
    <div class="section_w280">
        
        <h3>Kontakt personer</h3>
        
        <div class="sub_content">
        
            <ul class="footer_list">
                <li><a href="mailto:niklas.josefsson@cardic.se">Niklas Josefsson</a> - telefon: 0321- 70071</li>                
                <li><a href="mailto:bengtgoran.josefsson@biomatec.se">Bengt-Göran Josefsson</a> - telefon 0321-15310</li>
                <li><a href="#">Webutveckling</a></li>
                <li><a href="mailto:andreas.josefsson@frontdata.se">Andreas Josefson</a> - telefon 0321-15310</li>
               
            </ul>
        
        </div>
        
    </div>
    
    <div class="section_w280">
        
        <h3>Cardic</h3>
        
        <div class="sub_content">
            <p>Grönahögsvägen 15<br />
                523 30 Ulricehamn<br />
                SWEDEN</p>
        </div>
        
    </div>
    
    <div class="cleaner_h40"></div>
    
    <center>
        Copyright © 2011 <a href="http://www.cardic.se">
        Cardic</a>, Niklas Josefsson 
        <a href="http://www.iwebsitetemplate.com" target="_parent" style="display:none;">Website Templates by</a>  <a href="http://www.templatemo.com" target="_parent" style="display:none;">Free CSS Templates</a>
    </center>

</div> <!-- end of footer -->
</div>


  <!-- Main Page Container dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd-->
 

                                                  
        

        
            
            
         
        <!-- Subcontent Loggin formulär unit -->
        <AJ:loggin ID="logginControl" runat="server" Visible="false" Onpubcmdweblogin_Click="DelegateOnpubcmdweblogin_Click"  />          
        
        
 </form> 
</body>
</html>
