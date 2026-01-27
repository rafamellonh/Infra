# 🛠️ Recuperação do vPostgres no VCSA (Reset de WAL)

## 📌 Contexto
Este procedimento é utilizado quando o **vCenter Server Appliance (VCSA)** não consegue iniciar o serviço **`vmware-vpostgres`**, apresentando erros como:
- `FATAL: the database system is starting up`
- `startup process was terminated by signal 6: Aborted`
- Loop de crash-recovery do PostgreSQL

Nesses casos, o banco entra em estado inconsistente de **WAL (Write-Ahead Log)**.

---

## ⚠️ Avisos Importantes
- **Não remove** inventário, hosts ou VMs
- Pode haver **perda mínima de transações recentes**
- **Não restaurar snapshots** antes de tentar este procedimento
- Executar **no console do VCSA como root**

---

## 🔐 Pré-requisitos
- Acesso ao console do VCSA como `root`
- Usuário interno do PostgreSQL (`upostgres`) existente
- UID do usuário `upostgres` (normalmente `1012`)

---

## 🟢 OPÇÃO A — Procedimento recomendado

### 1️⃣ Acessar um diretório neutro
```bash
cd /tmp
```

### 2️⃣ Executar o reset do WAL
```bash
sudo -u '#1012' /opt/vmware/vpostgres/current/bin/pg_resetwal -f /storage/db/vpostgres
```

#### 🎯 Resultado esperado
- ✔️ Pode exibir **warnings**
- ❌ **Não pode** exibir erro fatal
- ✔️ Se terminar sem output → **SUCESSO**

---

## 🟢 OPÇÃO B — Alternativa (forçando HOME)
```bash
sudo -u '#1012' -H /opt/vmware/vpostgres/current/bin/pg_resetwal -f /storage/db/vpostgres
```

---

## 🚀 Sequência FINAL após o reset

### 3️⃣ Subir o supervisor do VCSA
```bash
systemctl start vmware-vmon
```

### 4️⃣ Subir o banco de dados
```bash
service-control --start vmware-vpostgres
service-control --status vmware-vpostgres
```

**Resultado esperado:**
```
Running: vmware-vpostgres
```

### 5️⃣ Subir o restante do vCenter
```bash
service-control --start vmware-stsd
service-control --start vmware-vpxd
service-control --start --all
```

⏳ A inicialização completa pode levar **10–15 minutos**.

---

## 🌐 Validação
- vCenter UI: `https://<IP_DO_VCSA>/ui`
- VAMI: `https://<IP_DO_VCSA>:5480`

---

## ✅ Resultado Final
- `vmware-vpostgres` em **Running**
- Serviços do vCenter operacionais
- Interface Web acessível
- Inventário preservado
