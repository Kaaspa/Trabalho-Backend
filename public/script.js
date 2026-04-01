    const API = '/api/funcionarios';

    async function carregarFuncionarios() {
      try {
        const resposta = await fetch(API);
        const json = await resposta.json();
        const corpo = document.getElementById('corpo-tabela');
        if (!json.dados || json.dados.length === 0) {
          corpo.innerHTML = '<tr><td colspan="6" id="sem-dados">Nenhum funcionário cadastrado.</td></tr>';
          return;
        }
        corpo.innerHTML = json.dados.map(f => `
          <tr>
            <td>${f.id}</td>
            <td>${escaparHTML(f.nome)}</td>
            <td>${escaparHTML(f.cargo)}</td>
            <td>${formatarSalario(f.salario)}</td>
            <td>${f.criado_em}</td>
            <td>
              <button class="btn-editar" onclick="prepararEdicao(${f.id}, '${escaparJS(f.nome)}', '${escaparJS(f.cargo)}', ${f.salario})">Editar</button>
              <button class="btn-apagar" onclick="apagarFuncionario(${f.id}, '${escaparJS(f.nome)}')">Apagar</button>
            </td>
          </tr>
        `).join('');
      } catch (erro) {
        exibirMensagem('Erro ao conectar com o servidor.', false);
      }
    }

    async function salvarFuncionario() {
      const id      = document.getElementById('campo-id').value;
      const nome    = document.getElementById('campo-nome').value;
      const cargo   = document.getElementById('campo-cargo').value;
      const salario = document.getElementById('campo-salario').value;
      const metodo  = id ? 'PUT' : 'POST';
      const url     = id ? `${API}/${id}` : API;
      try {
        const resposta = await fetch(url, {
          method: metodo,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, cargo, salario }),
        });
        const json = await resposta.json();
        if (json.sucesso) {
          exibirMensagem(json.mensagem, true);
          limparFormulario();
          carregarFuncionarios();
        } else {
          exibirMensagem(json.mensagem, false);
        }
      } catch (erro) {
        exibirMensagem('Erro ao comunicar com o servidor.', false);
      }
    }

    async function apagarFuncionario(id, nome) {
      if (!confirm(`Deseja remover o funcionário "${nome}"?`)) return;
      try {
        const resposta = await fetch(`${API}/${id}`, { method: 'DELETE' });
        const json = await resposta.json();
        exibirMensagem(json.mensagem, json.sucesso);
        if (json.sucesso) carregarFuncionarios();
      } catch (erro) {
        exibirMensagem('Erro ao comunicar com o servidor.', false);
      }
    }

    function prepararEdicao(id, nome, cargo, salario) {
      document.getElementById('campo-id').value      = id;
      document.getElementById('campo-nome').value    = nome;
      document.getElementById('campo-cargo').value   = cargo;
      document.getElementById('campo-salario').value = salario;
      document.getElementById('form-titulo').textContent = '✏️ Editar Funcionário';
      document.getElementById('btn-cancelar').style.display = 'inline-block';
      document.getElementById('campo-nome').focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function limparFormulario() {
      document.getElementById('campo-id').value      = '';
      document.getElementById('campo-nome').value    = '';
      document.getElementById('campo-cargo').value   = '';
      document.getElementById('campo-salario').value = '';
      document.getElementById('form-titulo').textContent = '➕ Adicionar Funcionário';
      document.getElementById('btn-cancelar').style.display = 'none';
    }

    function cancelarEdicao() { limparFormulario(); }

    function exibirMensagem(texto, sucesso) {
      const el = document.getElementById('mensagem');
      el.textContent = texto;
      el.className = sucesso ? 'sucesso' : 'erro';
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 4000);
    }

    function formatarSalario(valor) {
      return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function escaparHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function escaparJS(str) {
      return String(str).replace(/'/g, "\\'");
    }

    carregarFuncionarios();