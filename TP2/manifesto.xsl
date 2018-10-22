<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <meta charset="UTF-8"></meta>
            </head>
            <style>
                .dropbtn {
                background-color: #3498DB;
                color: white;
                padding: 16px;
                font-size: 16px;
                border: none;
                cursor: pointer;
                }
                .dropdown {
                position: relative;
                display: inline-block;
                }
                .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                }
                .dropdown-content a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                }
                .dropdown-content a:hover {
                background-color: #f1f1f1
                }
                .dropdown:hover .dropdown-content {
                display: block;
                }
                .dropdown:hover .dropbtn {
                background-color: #2980B9;
                }
            </style>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <h1 style="text-align:center;">Manifesto</h1>
        <div class="dropdown" style="margin-left: 47%;">
            <button class="dropbtn">Índice</button>
            <div class="dropdown-content">
                <a href="#1">Equipa</a>
                <a href="#2">Resumo</a>
                <a href="#3">Resultados</a>
            </div>
        </div>
        <hr/>
        <p><b>Título: </b><xsl:value-of select="identificador"/> - <xsl:value-of select="título"/></p>
        <xsl:variable name="sub" select="subtítulo"/> 
        <xsl:if test="$sub != ''">
            <p><b>Subtítulo: </b><xsl:value-of select="subtítulo"/></p>
        </xsl:if>
        <p><b>Data de início: </b><xsl:value-of select="dinício"/></p>
        <p><b>Data de fim: </b><xsl:value-of select="dfim"/></p>
        <xsl:apply-templates select="supervisor"></xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <form action="mailto:{email}">
            <p><b>Supervisor: </b>
                <a href="{website}">
                    <xsl:value-of select="nome"/>
                </a>
                <input type="submit" value="Enviar correio" style="margin:5px"/>
            </p>
        </form>
        <hr/>
    </xsl:template>
    
    <xsl:template match="equipa">
        <hr/>
        <h2><a name="1">Equipa</a></h2>
        <ol>
        <xsl:for-each select="membro">
            <li>
                <xsl:apply-templates select="foto"/>
                <div style="display:inline;">
                    <p><b>Nome: </b> <xsl:value-of select="nome"/></p>
                    <p><b>Número: </b> <xsl:value-of select="identificador"/></p>
                    <p><b>Email: </b><a href="mailto:{email}"><xsl:value-of select="email"/></a></p>
                </div>
                <div style="float: none; clear: both;"></div>  
            </li>
        </xsl:for-each>
        </ol> 
        <hr/>
    </xsl:template>
    
    <xsl:template match="foto">
        <div style="display:inline">
            <img src="{@path}" align="left" style="margin-left:5px" width="8.5%" height="15.5%"/>
        </div>
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr/>
        <h2><a name="2">Resumo</a></h2>
        <xsl:for-each select="para">
            <p><xsl:apply-templates/></p>
        </xsl:for-each>
        <hr/>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="a">
        <a href="{@href}"><xsl:apply-templates/></a>
    </xsl:template>

    <xsl:template match="resultados">
        <hr/>
        <h2><a name="3">Resultados</a></h2>
        <ul>
        <xsl:for-each select="resultado">
            <li>
                <a href="{@url}">
                    <xsl:value-of select="."/>
                </a>
            </li>
        </xsl:for-each>
        </ul>
    </xsl:template>
    
</xsl:stylesheet>