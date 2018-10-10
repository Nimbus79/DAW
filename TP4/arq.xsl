<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h2>Arquiossítios do NW português</h2>
                    <hr/>
                    <ol>
                        <xsl:apply-templates select="//CONCEL[not(.=preceding::CONCEL)]"> <!--Para não haver concelhos iguais no índice-->
                            <xsl:sort select="."/> <!-- Ver normalize-space -->
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="arqelems"/>
    </xsl:template>
    
    <!-- Templates para as páginas individuais -->
    
    <xsl:template match="ARQELEM" mode="arqelems">
        <xsl:result-document href="website/html/{generate-id()}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <h2><xsl:value-of select="DESCRI"/></h2>
                    <dl>
                        <dt>Lugar:</dt>
                        <dd><xsl:value-of select="LUGAR"/></dd>
                        <dt>Freguesia:</dt>
                        <dd><xsl:value-of select="FREGUE"/></dd>
                        <dt>Concelho:</dt>
                        <dd><xsl:value-of select="CONCEL"/></dd>
                    </dl>
                    <p>
                        <xsl:value-of select="ACESSO"/>
                    </p>
                    <p>
                        <xsl:value-of select="QUADRO"/>
                    </p>
                    <p>
                        <xsl:value-of select="DARQ"/>
                    </p>
                    <address>[<a href="http://localhost:1079/index">Voltar à página principal</a>]</address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <!-- Templates para o index.html -->
    
    <xsl:template match="CONCEL">
        <xsl:variable name="c" select="."/>
        <li>
            <xsl:value-of select="."/>
            <ol>         
                <xsl:for-each select="//ARQELEM[$c = CONCEL]">
                    <xsl:sort select="IDENTI"/>
                    <li>
                        <a href="http://localhost:1079/arqelem/{generate-id()}">
                            <xsl:value-of select="IDENTI"/>
                        </a>
                    </li>
                </xsl:for-each>
            </ol>
        </li>
    </xsl:template>
    
    
</xsl:stylesheet>