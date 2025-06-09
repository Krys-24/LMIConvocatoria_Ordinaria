import express from 'express';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';


// Inicialització d'Express
const app = express();
const PORT = 3000;

// Configuració de __dirname en mòduls ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Càrrega de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servim els arxius estàtics de /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/get-products', function (req, res) {
    res.json({
        "productes": [
            {
                "nom": "Programari de Gestió Empresarial",
                "descripcio": "Solució completa per a la gestió de recursos humans, finances i inventari. Ideal per a empreses mitjanes i grans.",
                "preu_unitari": 199.99,
                "imatge": "/media/gestioEmpresarial.png"
            },
            {
                "nom": "Aplicació Mòbil de Seguiment de Projectes",
                "descripcio": "Aplicació per a la gestió i seguiment de projectes de manera eficient, amb eines de col·laboració integrades.",
                "preu_unitari": 79.99,
                "imatge": "/media/mobile.png"
            },
            {
                "nom": "Antivirus Empresarial",
                "descripcio": "Protegeix les dades i sistemes de l'empresa contra amenaces digitals amb el nostre antivirus avançat.",
                "preu_unitari": 49.99,
                "imatge": "/media/antivirus.png"
            },
            {
                "nom": "Plataforma de Treball Col·laboratiu",
                "descripcio": "Plataforma en línia que facilita la col·laboració entre equips de treball, amb eines de xat, videoconferència i gestió de tasques.",
                "preu_unitari": 15.99,
                "imatge": "/media/people.png"
            },
            {
                "nom": "Solució de Còpia de Seguretat al Núvol",
                "descripcio": "Còpia de seguretat automàtica i segura per a tots els teus fitxers importants a través del núvol.",
                "preu_unitari": 19.99,
                "imatge": "/media/cloud.png"
            }
        ]
    });
});

// Endpoint POST per a rebre les dades del formulari
app.post('/concertar-cita', async (req, res) => {
    try {
        // 1. Recollir les dades del formulari
        const dadesCita = req.body;

        // 2. Generar XML amb les dades
        const xmlPath = path.join(__dirname, 'uploads', 'cita.xml');
        const xmlContent = generarXML(dadesCita);
        fs.writeFileSync(xmlPath, xmlContent);

        // 3. Aplicar transformació XSLT → XSL-FO
        const foPath = path.join(__dirname, 'uploads', 'cita.fo');
        await transformarXSLT(xmlPath, foPath);

        // 4. Generar PDF a partir del XSL-FO
        const pdfPath = path.join(__dirname, 'uploads', 'cita.pdf');
        await generarPDF(foPath, pdfPath);

        // 5. Enviar PDF com a resposta
        res.download(pdfPath, 'cita.pdf');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generant el PDF');
    }
});

// Funció auxiliar per a generar l'XML
function generarXML(dades) {
    /*
    TO-DO: Exercici 6a

    Amb les dades rebudes, generem un XML, amb el format corresponent (veieu enunciat)
    */
    return `
<cita>
  ...
</cita>
    `;
}

// Funció auxiliar per aplicar l'XSLT
function transformarXSLT(xmlPath, foPath) {
    return new Promise((resolve, reject) => {
        /*
        TO-DO: Exercici 6b

        Crea l'ordre xsltproc per convertir l'xml definit en xmlPath en un XML en format
        XSL-FO en foPath. 

        La plantilla la troareu en ./xslt/cita.xsl

        */
        const cmd = ``;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(`Error aplicant XSLT: ${error}`);
            } else {
                resolve();
            }
        });
    });
}

// Funció auxiliar per a generar el PDF (cridant Apache FOP)
function generarPDF(foPath, pdfPath) {
    return new Promise((resolve, reject) => {
        /* TO-DO:  Exercco 6.d
        
        Crea l'ordre que utilitzaràs amb fop per convertir l'XML-FO a PDF
        L'xml-fo es troba a foPath i el pdf el generaràs en pdfPath 

        */

        const cmd = ``;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(`Error generant PDF: ${error}`);
            } else {
                resolve();
            }
        });
    });
}

// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
