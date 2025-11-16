# Configuração Completa do GitLab Runner em Docker
Documentação detalhada do processo de criação de um GitLab Runner separado usando Docker Compose e sua integração com um projeto GitLab.

---

## 📌 1. Objetivo
Permitir que os jobs do GitLab CI/CD deixem de ficar em estado **Pending/Stuck**, configurando um **GitLab Runner Docker** externo e vinculando-o ao projeto `lab-gitlab`.

---

## 📁 2. Arquitetura do Setup

Você possui:
- **GitLab CE** executando em um container Docker separado.
- Um **GitLab Runner Docker** rodando em outro container.
- O GitLab Runner configurado como **Project Runner**, exclusivo do projeto `lab-gitlab`.

Estrutura de diretórios usada:

```
/data/docker/gitlab-runner/
└── config/        # onde o runner salva o arquivo config.toml
```

---

## 🧱 3. Docker Compose do GitLab Runner

Criar o arquivo:

```
/data/docker/gitlab-runner/docker-compose.yml
```

Conteúdo:

```yaml
version: "3.8"

services:
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    container_name: gitlab-runner
    restart: always

    volumes:
      - /data/docker/gitlab-runner/config:/etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock
```

---

## 🚀 4. Subindo o Container do Runner

```sh
docker compose up -d
docker ps | grep gitlab-runner
```

---

## 🛠️ 5. Criando um Project Runner no GitLab

1. No GitLab, abra o projeto `lab-gitlab`
2. Vá em **Settings → CI/CD → Runners**
3. Clique em **Create project runner**

Preencha:

- **Tags:** `runner-lab-gitlab`
- **Run untagged jobs:** ativado
- **Description:** `docker-runner-lab`
- Não marque Paused, Protected ou Lock to current projects

---

## 🔑 6. Registration Token

Após criar o runner, copie o token exibido (começa com `GR...`).

---

## 🔗 7. Registrando o runner

```sh
docker exec -it gitlab-runner gitlab-runner register
```

Responda:

- URL: `http://192.168.40.214/`
- Token: (cole o GR...)
- Description: `docker-runner-lab`
- Tags: `runner-lab-gitlab`
- Executor: `docker`
- Default image: `alpine:latest`

O arquivo de configuração será salvo em:

```
/data/docker/gitlab-runner/config/config.toml
```

---

## 🟢 8. Validando

Aparecerá em:

**Settings → CI/CD → Runners → Project Runners**

```
docker-runner-lab — online
```

---

## 🧪 9. Teste do pipeline

Crie o arquivo `.gitlab-ci.yml`:

```yaml
test_job:
  stage: test
  script:
    - echo "Pipeline funcionando!"
```

Rode:

```sh
git add .
git commit -m "Teste CI"
git push
```

---

## 🔧 10. Comandos úteis

```sh
docker logs -f gitlab-runner
docker restart gitlab-runner
nano /data/docker/gitlab-runner/config/config.toml
```

---

## 🏁 11. Conclusão

Setup completo do GitLab Runner funcionando e pipelines rodando.
