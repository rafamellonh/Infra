# Usando `less` com `grep`

O `grep` é usado para **filtrar** linhas que correspondem a um padrão. Já o `less` é usado para **navegar** pela saída. Eles costumam ser usados juntos com pipes (`|`).

---

## Filtrar e navegar

```bash
grep "error" /var/log/messages | less
```

Mostra apenas as linhas que contêm `error` e permite navegar com o `less`.

---

## Ignorar maiúsculas/minúsculas

```bash
grep -i "error" /var/log/messages | less
```

Encontra:

- ERROR
- Error
- error

---

## Procurar múltiplas palavras

```bash
grep -E "error|failed|critical" /var/log/messages | less
```

ou

```bash
egrep "error|failed|critical" /var/log/messages | less
```

> `egrep` é equivalente a `grep -E` (recomendado usar `grep -E`).

---

## Mostrar número das linhas

```bash
grep -n "PermitRootLogin" /etc/ssh/sshd_config | less
```

Resultado:

```text
35:PermitRootLogin no
```

---

## Exibir linhas antes e depois da ocorrência

Mostrar **3 linhas antes** e **2 depois**:

```bash
grep -B 3 -A 2 "ERROR" application.log | less
```

Ou de forma resumida:

```bash
grep -C 3 "ERROR" application.log | less
```

---

## Procurar recursivamente

```bash
grep -r "Listen 80" /etc/httpd | less
```

ou

```bash
grep -R "Listen 80" /etc/httpd | less
```

---

## Excluir uma palavra

Mostrar tudo, exceto linhas com `DEBUG`:

```bash
grep -v "DEBUG" application.log | less
```

---

## Destacar resultados

```bash
grep --color=always "failed" /var/log/secure | less -R
```

A opção `-R` do `less` preserva as cores do `grep`.

---

## Combinar com outros comandos

### `journalctl`

```bash
journalctl -u nginx | grep -i error | less
```

---

### `ps`

```bash
ps aux | grep nginx | less
```

---

### `docker`

```bash
docker logs meu_container | grep ERROR | less
```

---

### `kubectl`

```bash
kubectl logs meu-pod | grep Exception | less
```

---

### `dmesg`

```bash
dmesg | grep -i usb | less
```

---

## Pesquisar novamente dentro do `less`

Mesmo depois de usar `grep`, você pode fazer outra busca no `less`:

```text
/timeout
```

Próxima ocorrência:

```text
n
```

Ocorrência anterior:

```text
N
```

---

# Exemplos úteis para administração

## Encontrar falhas no SSH

```bash
grep -i failed /var/log/secure | less
```

---

## Procurar erros no Apache

```bash
grep -i error /var/log/httpd/error_log | less
```

---

## Procurar conexões recusadas

```bash
grep -i refused application.log | less
```

---

## Procurar múltiplos erros

```bash
grep -Ei "error|failed|timeout|refused" application.log | less
```

---

## Encontrar configurações

```bash
grep -n "^PermitRootLogin" /etc/ssh/sshd_config | less
```

---

## Excluir comentários de um arquivo de configuração

```bash
grep -v "^#" /etc/ssh/sshd_config | less
```

---

## Excluir comentários e linhas em branco

```bash
grep -Ev "^#|^$" /etc/ssh/sshd_config | less
```

---

# Dicas para RHCE/EX294

Procurar falhas de autenticação:

```bash
journalctl -xe | grep -i failed | less
```

Ver apenas erros de um serviço:

```bash
journalctl -u httpd | grep -i error | less
```

Encontrar parâmetros em arquivos de configuração:

```bash
grep -Rn "DocumentRoot" /etc/httpd | less
```

Analisar logs ignorando mensagens de debug:

```bash
grep -vi debug application.log | less
```

Preservar cores ao destacar ocorrências:

```bash
grep --color=always -Ei "error|failed|timeout" application.log | less -R
```
