<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>The Book of Mormon</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <style>
                    ol {
                    counter-reset: item
                    }
                    li {
                    display: block
                    }
                    li:before {
                    content: counters(item, ".") " ";
                    counter-increment: item
                    }
                    .center_text {
                    margin-left: auto;
                    margin-right: auto;
                    width: 12em
                    }
                    .bg {
                    background-image: url("fundo3.jpg");
                    height: 100%; 
                    background-position: center;
                    background-repeat: repeat;
                    background-size: cover;
                    }
                    a:visited {
                    color: blue;
                    }
                    a:hover {
                    color: red;
                    }
                </style>
                <body class="bg">
                    <div class="w3-margin">
                        <xsl:apply-templates select="tstmt/coverpg"/>
                        <xsl:apply-templates select="tstmt/titlepg"/>
                        <h2 style="text-align:center">Contents</h2>
                        <ol class="center_text">
                            <li>
                                <a href="preface.html">Preface</a>
                            </li>
                            <xsl:apply-templates select="//bookcoll" mode="indice"/>
                        </ol>
                    </div>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="tstmt/coverpg">
        <h1 style="text-align:center"><xsl:value-of select="title"/></h1>
        <br/>
        <h3 style="text-align:center"><xsl:value-of select="title2"/></h3>
        <xsl:apply-templates select="subtitle"/>
        <br/>
    </xsl:template>
    
    <xsl:template match="tstmt/titlepg">
        <h3 style="text-align:center"><xsl:value-of select="title2"/></h3>
        <xsl:apply-templates select="p"/>
        <br/>
    </xsl:template>
    
    <xsl:template match="subtitle">
        <xsl:apply-templates select="p"/>
    </xsl:template>
    
    <xsl:template match="p">
        <p style="text-align:center"><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="bookcoll" mode="indice">
        <xsl:apply-templates mode="indice"/>
    </xsl:template>
    
    <xsl:template match="book" mode="indice">
        <li>
            <xsl:variable name="id" select="bktshort"/> 
            <a href="{$id}.html">
                <xsl:value-of select="bktshort"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="sura" mode="indice">
        <li>
            <xsl:variable name="id" select="bktshort"/> 
            <a href="{$id}.html">
                <xsl:value-of select="bktshort"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="preface">
        <xsl:result-document href="website/preface.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>Preface</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <style>
                    .bg {
                    background-image: url("fundo3.jpg");
                    height: 100%; 
                    background-position: center;
                    background-repeat: repeat;
                    background-size: cover;
                    }
                    a:hover {
                    color: red;
                    }
                </style>
                <body class="bg">
                    <div class="w3-margin">
                        <h1 style="text-align:center">Preface</h1>
                        <br/>
                        <xsl:apply-templates/>
                        <address style="text-align:center">[<a href="index.html">Voltar à página principal</a>]</address>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ptitle">
        <h2><xsl:value-of select="."/></h2>
        <xsl:apply-templates select="preface/p"/>
        <xsl:apply-templates select="witlist"/>
    </xsl:template>
    
    <xsl:template match="preface/p">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="witlist">
        <ul>
            <xsl:apply-templates/>
        </ul>
        <br/>
    </xsl:template>
    
    <xsl:template match="witness">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="book">
        <xsl:variable name="id" select="bktshort"/> 
        <xsl:result-document href="website/{$id}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="bktlong"/></title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <style>
                    .bg {
                    background-image: url("fundo3.jpg");
                    height: 100%; 
                    background-position: center;
                    background-repeat: repeat;
                    background-size: cover;
                    }
                    .sidenav {
                    height: 100%;
                    width: 0;
                    position: fixed;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    background-color: #111;
                    overflow-x: hidden;
                    transition: 0.5s;
                    padding-top: 60px;
                    }
                    .sidenav a {
                    padding: 8px 8px 8px 32px;
                    text-decoration: none;
                    font-size: 25px;
                    color: #818181;
                    display: block;
                    transition: 0.3s;
                    }
                    .sidenav a:hover {
                    color: #f1f1f1;
                    }
                    .sidenav .closebtn {
                    position: absolute;
                    top: 0;
                    right: 25px;
                    font-size: 36px;
                    margin-left: 50px;
                    }
                    #main {
                    transition: margin-left .5s;
                    padding: 16px;
                    }
                    @media screen and (max-height: 450px) {
                    .sidenav {padding-top: 15px;}
                    .sidenav a {font-size: 18px;}
                    }
                    a:hover {
                    color: red;
                    }
                </style>
                <script>
                    function openNav() {
                    document.getElementById("mySidenav").style.width = "250px";
                    document.getElementById("main").style.marginLeft = "250px";
                    }
                    
                    function closeNav() {
                    document.getElementById("mySidenav").style.width = "0";
                    document.getElementById("main").style.marginLeft= "0";
                    }
                </script>
                <body class="bg">
                    <div id="mySidenav" class="sidenav">
                        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
                        <xsl:apply-templates select="chapter" mode="button"/>
                    </div>
                    <div id="main" class="w3-margin">
                        <span style="font-size:30px;cursor:pointer" onclick="openNav()"><a name="top">&#9776; Chapters</a></span>
                        <h1 style="text-align:center"><xsl:value-of select="bktlong"/></h1>
                        <h2 style="text-align:center"><xsl:value-of select="bktshort"/></h2>
                        <br/>
                        <xsl:if test="bksum">
                            <h3 style="text-align:center">Summary</h3>
                            <p style="text-align:center"><xsl:value-of select="bksum"/></p>
                        </xsl:if>
                        <br/>
                        <xsl:apply-templates select="chapter"/>
                        <address style="text-align:center">[<a href="index.html">Voltar à página principal</a>]</address>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="chapter" mode="button">
        <xsl:variable name="id" select="chtitle"/> 
        <a href="#{$id}"><xsl:value-of select="chtitle"/></a>
    </xsl:template>
    
    <xsl:template match="chapter">
        <hr/>
        <xsl:variable name="id" select="chtitle"/> 
        <h3 style="text-align:center"><a name="{$id}"><xsl:value-of select="chtitle"/></a></h3>
        <xsl:if test="chsum">
            <h4 style="text-align:center">Summary</h4>
            <p style="text-align:center"><xsl:value-of select="chsum"/></p>
        </xsl:if>
        <ol type="I">
            <xsl:apply-templates select="v"/>
        </ol>
        <br/>
        <address style="text-align:center">[<a href="#top">Voltar ao topo da página</a>]</address>
        <br/>
    </xsl:template>
    
    <xsl:template match="v">
        <li style="text-align:justify">
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="sura">
        <xsl:variable name="id" select="bktshort"/> 
        <xsl:result-document href="website/{$id}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="bktlong"/></title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <style>
                    .bg {
                    background-image: url("fundo3.jpg");
                    height: 100%; 
                    background-position: center;
                    background-repeat: repeat;
                    background-size: cover;
                    }
                    a:hover {
                    color: red;
                    }
                </style>
                <body class="bg">
                    <div class="w3-margin">
                        <h1 style="text-align:center"><a name="top"><xsl:value-of select="bktlong"/></a></h1>
                        <h2 style="text-align:center"><xsl:value-of select="bktshort"/></h2>
                        <br/>
                        <xsl:if test="bksum">
                            <h3 style="text-align:center">Summary</h3>
                            <p style="text-align:center"><xsl:value-of select="bksum"/></p>
                        </xsl:if>
                        <br/>
                        <hr/>
                        <ol type="I">
                            <xsl:apply-templates select="v"/>
                        </ol>
                        <br/>
                        <address style="text-align:center">[<a href="#top">Voltar ao topo da página</a>] [<a href="index.html">Voltar à página principal</a>]</address>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>

</xsl:stylesheet>