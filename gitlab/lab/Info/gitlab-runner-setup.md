# Configuração Completa do GitLab Runner em Docker (Atualizado)

## 📌 1. Objetivo
Configurar um GitLab Runner em Docker, permitindo execução de pipelines e builds Docker usando o daemon do host através do socket `/var/run/docker.sock`.

---

## 📁 2. Arquitetura do Setup

### Diagrama da Arquitetura

```
                 ┌──────────────────────────────┐
                 │        GitLab Server         │
                 │  (container separado)        │
                 └──────────────┬───────────────┘
                                │
                                │ HTTP (CI/CD)
                                │
                 ┌──────────────▼───────────────┐
                 │      GitLab Runner           │
                 │    (docker container)        │
                 │                              │
                 │  - executor: docker           │
                 │  - usa docker do host         │
                 └──────────────┬───────────────┘
                                │
                                │ /var/run/docker.sock
                                ▼
                 ┌──────────────────────────────┐
                 │        Docker Host           │
                 │ (daemon real do Docker)      │
                 │                              │
                 │  Aqui os jobs criam:         │
                 │   - docker build             │
                 │   - docker run               │
                 │   - containers temporários   │
                 └──────────────────────────────┘
```

Diretório usado:

```
/data/docker/gitlab-runner/
└── config/
```

---

## 🧱 3. Docker Compose do GitLab Runner

Crie o arquivo:

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

## 🚀 4. Subindo o Container

```sh
docker compose up -d
```

---

## 🛠️ 5. Criando um Project Runner

GitLab → Projeto → **Settings → CI/CD → Runners → Create project runner**

Configurações:

- Tags: `runner-lab-gitlab`
- Description: `docker-runner-lab`
- Run untagged jobs: ON

---

## 🔗 6. Registrando o Runner

```sh
docker exec -it gitlab-runner gitlab-runner register
```

Responda:

```
URL: http://192.168.40.214/
Token: (cole o GR...)
Description: runner-lab-gitlab
Tags: runner-lab-gitlab
Executor: docker
Default image: docker:latest
```

---

## 📝 7. Arquivo config.toml

Local:

```
/data/docker/gitlab-runner/config/config.toml
```

Trecho essencial:

```toml
[runners.docker]
  image = "docker:latest"
  privileged = false
  volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
```

---

## 🧪 8. Teste do Pipeline

Crie `.gitlab-ci.yml`:

```yaml
test_job:
  stage: test
  script:
    - echo "Pipeline funcionando!"
```

Commit:

```sh
git add .
git commit -m "Teste CI"
git push
```

---

## 🔧 9. Comandos Úteis

```sh
docker logs -f gitlab-runner
docker restart gitlab-runner
nano /data/docker/gitlab-runner/config/config.toml
```

---

## 🏁 10. Conclusão

Runner configurado, integrado ao GitLab, e executando jobs Docker usando o daemon do host.
