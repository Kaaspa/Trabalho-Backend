const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/funcionarios', (req, res) => {
  try {
    const funcionarios = db.listarFuncionarios();
    res.status(200).json({ sucesso: true, dados: funcionarios });
  } catch (erro) {
    console.error('[ERRO GET /funcionarios]', erro.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao buscar funcionários.' });
  }
});

app.post('/api/funcionarios', (req, res) => {
  try {
    const { nome, cargo, salario } = req.body;

    if (!nome || !cargo || salario === undefined || salario === null) {
      return res.status(400).json({ sucesso: false, mensagem: 'Campos obrigatórios: nome, cargo e salario.' });
    }

    const salarioNumerico = parseFloat(salario);
    if (isNaN(salarioNumerico) || salarioNumerico < 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Salário inválido. Deve ser um número positivo.' });
    }

    const nomeLimpo = String(nome).trim();
    const cargoLimpo = String(cargo).trim();

    if (nomeLimpo.length === 0 || cargoLimpo.length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Nome e cargo não podem ser vazios.' });
    }

    const novoFuncionario = db.criarFuncionario(nomeLimpo, cargoLimpo, salarioNumerico);

    res.status(201).json({ sucesso: true, mensagem: 'Funcionário cadastrado com sucesso.', dados: novoFuncionario });
  } catch (erro) {
    console.error('[ERRO POST /funcionarios]', erro.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao cadastrar funcionário.' });
  }
});

app.put('/api/funcionarios/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
    }

    const funcionarioExistente = db.buscarFuncionarioPorId(id);
    if (!funcionarioExistente) {
      return res.status(404).json({ sucesso: false, mensagem: `Funcionário com ID ${id} não encontrado.` });
    }

    const { nome, cargo, salario } = req.body;

    if (!nome || !cargo || salario === undefined || salario === null) {
      return res.status(400).json({ sucesso: false, mensagem: 'Campos obrigatórios: nome, cargo e salario.' });
    }

    const salarioNumerico = parseFloat(salario);
    if (isNaN(salarioNumerico) || salarioNumerico < 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Salário inválido. Deve ser um número positivo.' });
    }

    const nomeLimpo = String(nome).trim();
    const cargoLimpo = String(cargo).trim();

    if (nomeLimpo.length === 0 || cargoLimpo.length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Nome e cargo não podem ser vazios.' });
    }

    const funcionarioAtualizado = db.atualizarFuncionario(id, nomeLimpo, cargoLimpo, salarioNumerico);

    res.status(200).json({ sucesso: true, mensagem: 'Funcionário atualizado com sucesso.', dados: funcionarioAtualizado });
  } catch (erro) {
    console.error('[ERRO PUT /funcionarios/:id]', erro.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao atualizar funcionário.' });
  }
});

app.delete('/api/funcionarios/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
    }

    const funcionarioExistente = db.buscarFuncionarioPorId(id);
    if (!funcionarioExistente) {
      return res.status(404).json({ sucesso: false, mensagem: `Funcionário com ID ${id} não encontrado.` });
    }

    db.deletarFuncionario(id);

    res.status(200).json({ sucesso: true, mensagem: `Funcionário "${funcionarioExistente.nome}" removido com sucesso.` });
  } catch (erro) {
    console.error('[ERRO DELETE /funcionarios/:id]', erro.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao remover funcionário.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
