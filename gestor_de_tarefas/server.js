// server.js - Integração Next.js + Express para GESTÃO DE TAREFAS

const express = require('express');
const next = require('next');
const cors = require('cors');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

// Base de dados para TAREFAS
const DB_FILE = './db.json';

function carregarTarefas() {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  return data.tarefas || [];
}

function guardarTarefas(tarefas) {
  const data = { tarefas };
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ===== ROTAS DA API PARA TAREFAS =====

// GET /api/tarefas
app.get('/api/tarefas', (req, res) => {
  res.json(carregarTarefas());
});

// GET /api/tarefas/:id
app.get('/api/tarefas/:id', (req, res) => {
  const tarefas = carregarTarefas();
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

// POST /api/tarefas
app.post('/api/tarefas', (req, res) => {
  const tarefas = carregarTarefas();
  const { nome, checked = false } = req.body;

  const novaTarefa = {
    id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome,
    checked: Boolean(checked)
  };

  tarefas.push(novaTarefa);
  guardarTarefas(tarefas);
  res.status(201).json(novaTarefa);
});

// PUT /api/tarefas/:id
app.put('/api/tarefas/:id', (req, res) => {
  const tarefas = carregarTarefas();
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  // Atualiza mantendo a estrutura correta
  tarefas[index] = {
    ...tarefas[index],
    ...req.body,
    checked: req.body.checked !== undefined ? Boolean(req.body.checked) : tarefas[index].checked
  };

  guardarTarefas(tarefas);
  res.json(tarefas[index]);
});

// DELETE /api/tarefas/:id
app.delete('/api/tarefas/:id', (req, res) => {
  let tarefas = carregarTarefas();
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  tarefas.splice(index, 1);
  guardarTarefas(tarefas);
  res.json({ mensagem: 'Tarefa eliminada com sucesso' });
});

// ===== NEXT.JS HANDLE =====
app.use((req, res) => {
  return handle(req, res);
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    console.log(`✅ API de tarefas disponível em http://localhost:${PORT}/api/tarefas`);
  });
});