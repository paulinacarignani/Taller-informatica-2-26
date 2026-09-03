const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const servidor = http.createServer((solicitud, respuesta) => {
    if (solicitud.url !== "/") {
        respuesta.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        respuesta.end("404 - Recurso no encontrado");
        return;
    }

    const rutaHTML = path.join(__dirname, "index.html");

    fs.readFile(rutaHTML, (error, contenido) => {
        if (error) {
            respuesta.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            respuesta.end("500 - No se pudo leer index.html");
            return;
        }

        respuesta.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        respuesta.end(contenido);
    });
});

servidor.listen(PORT, () => {
    console.log(`Servidor nativo activo en http://localhost:${PORT}`);
});
