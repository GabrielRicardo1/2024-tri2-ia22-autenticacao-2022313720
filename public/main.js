document.addEventListener('DOMContentLoaded', () => {
    const pre = document.querySelector('pre');
    const form = document.querySelector('form');
  
    // Função para exibir dados no elemento <pre>
    const displayResponse = (response, data) => {
      pre.textContent = `${response.status}\n${JSON.stringify(data, null, 2)}`;
    };
  
    // Login
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = form.username.value;
      const password = form.password.value;
  
      try {
        const response = await fetch('/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha no login', data);
          alert('Falha no login');
          return;
        }
  
        console.log('Login bem-sucedido', data);
        localStorage.setItem('token', data.token);
        window.location.href = "listagem.html";
      } catch (error) {
        console.error('Erro na requisição de login', error);
        alert('Erro na requisição de login');
      }
    });
  
    // Obter Token
    document.querySelector('button.get-token').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/token/${token}`);
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha ao obter token', data);
          alert('Falha ao obter token');
          return;
        }
  
        console.log('Token obtido com sucesso', data);
      } catch (error) {
        console.error('Erro na requisição do token', error);
        alert('Erro na requisição do token');
      }
    });
  
    // Obter Usuários
    document.querySelector('button.get-users').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/users/${token}`);
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha ao obter usuários', data);
          alert('Falha ao obter usuários');
          return;
        }
  
        console.log('Usuários obtidos com sucesso', data);
      } catch (error) {
        console.error('Erro na requisição dos usuários', error);
        alert('Erro na requisição dos usuários');
      }
    });
  
    // Logout
    document.querySelector('button.logout').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/token/${token}`, { method: 'DELETE' });
        pre.textContent = response.status;
  
        if (!response.ok) {
          console.error('Falha no logout');
          alert('Falha no logout');
          return;
        }
  
        console.log('Logout realizado com sucesso');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Erro na requisição de logout', error);
        alert('Erro na requisição de logout');
      }
    });
  });
  