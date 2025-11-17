# lab-sample-app-quiz

Aplicação simples em **Python + Flask** com uma página de **quiz** para testes de GitLab e Docker.

## 📌 Objetivo

- Ter um repositório no GitLab com uma aplicação web simples.
- Rodar essa app em um container Docker.
- (Opcional) Usar um pipeline do GitLab CI/CD para testar e buildar a imagem.

---

## 🧱 Estrutura

- `app.py` – Código da aplicação Flask.
- `requirements.txt` – Dependências Python.
- `Dockerfile` – Definição da imagem Docker.
- `.gitlab-ci.yml` – Pipeline de exemplo para GitLab CI/CD.
- `templates/index.html` – Página web com quiz.
- `static/style.css` – Estilos da página.
- `static/scripts.js` – Lógica do quiz em JavaScript.

---

## ▶️ Rodando localmente com Docker

```bash
docker build -t lab-sample-app-quiz .
docker run -d -p 5000:5000 --name lab-sample-app-quiz lab-sample-app-quiz
```

Acesse:

- `http://localhost:5000/` – página do quiz.
- `http://localhost:5000/status` – status em JSON.

---

## 🧪 Usando no GitLab

1. Crie um projeto novo no GitLab chamado `lab-sample-app-quiz`.
2. No seu PC:

   ```bash
   git init
   git add .
   git commit -m "Primeira versão da app de quiz"
   git remote add origin http://SEU_GITLAB/SEU_USUARIO/lab-sample-app-quiz.git
   git push -u origin main
   ```

3. No GitLab, vá em **CI/CD → Pipelines** para ver o pipeline rodando (se o `.gitlab-ci.yml` estiver no repo e o runner configurado).
