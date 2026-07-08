# Comando `less`

O comando `less` é um paginador no Linux/Unix. Ele permite visualizar arquivos de texto grandes sem carregar tudo na tela de uma vez. Diferente do `cat`, você pode navegar para frente e para trás.

## Sintaxe

```bash
less arquivo.txt
```

Exemplo:

```bash
less /var/log/syslog
```

ou

```bash
less /etc/passwd
```

---

## Navegação

| Tecla | Ação |
|-------|------|
| ↓ ou `j` | Linha abaixo |
| ↑ ou `k` | Linha acima |
| `Space` | Próxima página |
| `b` | Página anterior |
| `g` | Ir para o início |
| `G` | Ir para o final |
| `50g` | Ir para a linha 50 |
| `q` | Sair |

---

## Pesquisar texto

Pesquisar para frente:

```text
/palavra
```

Exemplo:

```text
/error
```

Pressione:

```text
n
```

para a próxima ocorrência.

Para voltar à ocorrência anterior:

```text
N
```

---

Pesquisar para trás:

```text
?palavra
```

---

## Mostrar números das linhas

```bash
less -N arquivo.txt
```

Exemplo:

```bash
less -N /etc/passwd
```

Resultado:

```text
1  root:x:0:0:root:/root:/bin/bash
2  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
```

---

## Abrir já na última linha

Muito útil para logs.

```bash
less +G arquivo.log
```

ou

```bash
less +F arquivo.log
```

O `+F` funciona como um `tail -f`, acompanhando novas linhas.

Para sair do modo acompanhamento:

```text
Ctrl + C
```

Depois você continua navegando normalmente.

---

## Destacar pesquisas

Dentro do `less`:

```text
/failed
```

As ocorrências ficam destacadas.

---

## Ignorar maiúsculas/minúsculas

```bash
less -i arquivo.txt
```

ou

```bash
less -I arquivo.txt
```

- `-i`: ignora maiúsculas se a busca estiver em minúsculas.
- `-I`: sempre ignora maiúsculas/minúsculas.

---

## Abrir saída de outro comando

É muito comum usar `less` com pipes.

```bash
ps aux | less
```

```bash
docker logs container | less
```

```bash
kubectl describe pod nginx | less
```

```bash
journalctl | less
```

---

## Procurar rapidamente em um log

```bash
less /var/log/messages
```

Dentro do `less`:

```text
/ERROR
```

Depois:

```text
n
```

para percorrer os erros.

---

## Ver conteúdo compactado

```bash
zless arquivo.gz
```

Exemplo:

```bash
zless access.log.gz
```

---

## Opções úteis

| Opção | Descrição |
|--------|-----------|
| `-N` | Mostra número das linhas |
| `-S` | Não quebra linhas longas (permite rolagem horizontal) |
| `-X` | Mantém o conteúdo na tela ao sair |
| `-i` | Busca sem diferenciar maiúsculas/minúsculas (condicional) |
| `-I` | Busca sempre sem diferenciar maiúsculas/minúsculas |
| `+G` | Abre no final do arquivo |
| `+F` | Acompanha o arquivo como `tail -f` |

---

## Exemplos para administração de sistemas

Visualizar logs:

```bash
less /var/log/secure
```

Ver configuração do Nginx:

```bash
less /etc/nginx/nginx.conf
```

Examinar saída do `journalctl`:

```bash
journalctl -u nginx | less
```

Analisar um arquivo CSV grande:

```bash
less dados.csv
```

Ver saída de um comando longo:

```bash
find / -name "*.log" | less
```

---

## Dica para RHCE/EX294

Em provas e no dia a dia, uma combinação muito usada é:

```bash
journalctl -xe | less
```

ou

```bash
systemctl status httpd | less
```

Depois, use:

```text
/failed
```

ou

```text
/error
```

e navegue com `n` e `N`. Essa forma é muito eficiente para investigar problemas em serviços e logs.
