const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// --- CONFIGURACIÓN SWAGGER ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Programación 4 - TP1',
            version: '1.0.0',
            description: 'API para gestión de usuarios UTN',
        },
        servers: [{ url: 'http://localhost:8080' }],
    },
    apis: ['./server.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// --- CONEXIÓN DB ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123', 
    database: 'utn_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// --- ENDPOINTS ---

/**
 * @openapi
 * /tp1/login:
 *   get:
 *     summary: Iniciar sesión
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *       - in: query
 *         name: pass
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK o ERROR según credenciales
 */
app.get('/tp1/login', (req, res) => {
    const { user, pass } = req.query;
    const query = 'SELECT * FROM usuarios_utn WHERE usuario = ? AND clave = ?';
    db.query(query, [user, pass], (err, results) => {
        if (err) return res.json({ respuesta: "ERROR", mje: err.message });
        if (results.length > 0) {
            res.json({ respuesta: "OK", mje: `Ingreso Valido. Usuario ${user}` });
        } else {
            res.json({ respuesta: "ERROR", mje: "Ingreso Invalido, usuario y/o clave incorrecta" });
        }
    });
});

/**
 * @openapi
 * /tp/lista:
 *   get:
 *     summary: Buscar, listar y bloquear usuarios
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [BUSCAR, BLOQUEAR]
 *       - in: query
 *         name: usuario
 *         schema:
 *           type: string
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios o resultado de operación
 */
app.get('/tp/lista', (req, res) => {
    const { action, usuario, idUser, estado } = req.query;

    if (action === 'BUSCAR') {
        let sql = 'SELECT id, usuario, bloqueado, apellido, nombre FROM usuarios_utn';
        let params = [];
        if (usuario) {
            sql += ' WHERE usuario LIKE ?';
            params.push(`%${usuario}%`);
        }
        db.query(sql, params, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    } 
    else if (action === 'BLOQUEAR') {
        const sql = 'UPDATE usuarios_utn SET bloqueado = ? WHERE id = ?';
        db.query(sql, [estado, idUser], (err, result) => {
            if (err) {
                res.json({ respuesta: "ERROR", mje: err.message });
            } else {
                res.json({ respuesta: "OK", mje: "Bloqueo Exitoso" });
            }
        });
    }
});
app.listen(8080, () => {
    console.log(' Servidor corriendo en http://localhost:8080');
    console.log(' Documentación disponible en http://localhost:8080/api-docs');
});