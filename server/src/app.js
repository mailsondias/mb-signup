import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../', 'dist')));

const records = [];

app.get('/users', (req, res) => {
  res.status(200).json(records)
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'dist', 'index.html'));
});

app.post('/registration', (req, res) => {
  records.push(req.body);
  res.status(201).send({
    ok: true,
    status: 201,
    message: 'Cadastro feito com sucesso.'
  });
});

export default app;
