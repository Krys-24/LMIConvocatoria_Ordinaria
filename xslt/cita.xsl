<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:fo="http://www.w3.org/1999/XSL/Format">

    <xsl:output method="xml" indent="yes" />

    <xsl:template match="/">

        <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
            <fo:layout-master-set>
                <fo:simple-page-master master-name="pagina"
                    page-height="29.7cm"
                    page-width="21cm"
                    margin="2cm">
                    <fo:region-body />
                </fo:simple-page-master>
            </fo:layout-master-set>

            <fo:page-sequence master-reference="pagina">
                <fo:flow flow-name="xsl-region-body">

                    <!-- Títol -->
                    <fo:block text-align="center" font-size="20pt" font-weight="bold"
                        space-after="1cm">
                        Cita per a la demo
                    </fo:block>

                    <!-- Dades Personals en Taula -->
                    <fo:table table-layout="fixed" width="100%" border="solid 1px black"
                        border-collapse="collapse" space-after="1cm">
                        <fo:table-column column-width="50%" />
                        <fo:table-column column-width="50%" />
                        <fo:table-body>
                            <fo:table-row>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>Nom:</fo:block>
                                </fo:table-cell>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>
                                        <!-- TO-DO 6c. Incorpora aci la ruta per accedir al nom del client -->
                                        <xsl:value-of select="/cita/client/nom"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>Correu electrònic:</fo:block>
                                </fo:table-cell>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>
                                        <!-- TO-DO 6c. Incorpora aci la ruta per accedir al correu del client -->
                                        <xsl:value-of select="/cita/client/email"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>Telèfon:</fo:block>
                                </fo:table-cell>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>
                                        <!-- TO-DO 6c. Incorpora aci la ruta per accedir al telèfon del client-->
                                        <xsl:value-of select="/cita/client/telefon"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>Producte:</fo:block>
                                </fo:table-cell>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>
                                        <!-- TO-DO 6c. Incorpora aci la ruta per accedir al producte-->
                                        <xsl:value-of select="/cita/producte"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>

                            <fo:table-row>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>Data:</fo:block>
                                </fo:table-cell>
                                <fo:table-cell border="solid 1px black" padding="5pt">
                                    <fo:block>
                                        <!-- TO-DO 6c. Incorpora aci la ruta per accedir a la data -->
                                        <xsl:value-of select="/cita/data"/>
                                    </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                        </fo:table-body>
                    </fo:table>

                </fo:flow>
            </fo:page-sequence>
        </fo:root>

    </xsl:template>

</xsl:stylesheet>