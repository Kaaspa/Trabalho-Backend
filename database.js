const fs   = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'funcionarios.json');

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ proximoId: 1, funcionarios: [] }, null, 2));
}

function lerDados() {
  const conteudo = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(conteudo);
}

function salvarDados(dados) {
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
}

function listarFuncionarios() {
  const dados = lerDados();
  return [...dados.funcionarios].sort((a, b) => a.nome.localeCompare(b.nome));
}

function buscarFuncionarioPorId(id) {
  const dados = lerDados();
  return dados.funcionarios.find(f => f.id === id);
}

function criarFuncionario(nome, cargo, salario) {
  const dados = lerDados();
  const agora = new Date().toLocaleString('pt-BR');
  const novoFuncionario = {
    id: dados.proximoId,
    nome,
    cargo,
    salario,
    criado_em: agora,
  };
  dados.funcionarios.push(novoFuncionario);
  dados.proximoId += 1;
  salvarDados(dados);
  return novoFuncionario;
}

function atualizarFuncionario(id, nome, cargo, salario) {
  const dados = lerDados();
  const indice = dados.funcionarios.findIndex(f => f.id === id);
  if (indice === -1) return null;
  dados.funcionarios[indice] = {
    ...dados.funcionarios[indice],
    nome,
    cargo,
    salario,
  };
  salvarDados(dados);
  return dados.funcionarios[indice];
}

function deletarFuncionario(id) {
  const dados = lerDados();
  const tamanhoAntes = dados.funcionarios.length;
  dados.funcionarios = dados.funcionarios.filter(f => f.id !== id);
  if (dados.funcionarios.length === tamanhoAntes) return false;
  salvarDados(dados);
  return true;
}

module.exports = {
  listarFuncionarios,
  buscarFuncionarioPorId,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
};
