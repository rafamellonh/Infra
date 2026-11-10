# Setup do ambiente de estudo CKA

Configuração do terminal, do vim e do kubectl para os labs de revisão do curso **Descomplicando Kubernetes**.

- Os passos **1 a 3** rodam **uma vez só** por máquina. Eles conferem antes de gravar, então rodar de novo não duplica nada.
- O passo **4** é o mesmo bloco do início da prova: **digitar a cada sessão** de terminal, de propósito, para treinar.

---

## 1. Backup

```bash
cp ~/.bashrc ~/.bashrc.bak
[ -f ~/.vimrc ] && cp ~/.vimrc ~/.vimrc.bak
```

Para desfazer: `cp ~/.bashrc.bak ~/.bashrc` e `cp ~/.vimrc.bak ~/.vimrc`.

---

## 2. Cores do terminal (`~/.bashrc`)

```bash
grep -q '38;5;221' ~/.bashrc || cat >> ~/.bashrc <<'EOF'
export LS_COLORS="$LS_COLORS:di=1;38;5;39:ln=1;38;5;51:ex=1;38;5;82:*.yaml=38;5;221:*.yml=38;5;221:*.json=38;5;221"
PS1='\[\e[1;38;5;82m\]\u@\h\[\e[0m\]:\[\e[1;38;5;39m\]\w\[\e[0m\]\$ '
EOF
source ~/.bashrc
```

| Elemento | Código | Cor |
|---|---|---|
| `usuario@host` | `1;38;5;82` | verde-limão, negrito |
| diretório no prompt | `1;38;5;39` | azul-celeste, negrito |
| diretórios no `ls` | `1;38;5;39` | azul-celeste, negrito |
| links simbólicos | `1;38;5;51` | ciano, negrito |
| executáveis | `1;38;5;82` | verde-limão, negrito |
| `*.yaml`, `*.yml`, `*.json` | `38;5;221` | amarelo-ouro |

> O `'EOF'` entre aspas impede o bash de expandir `$LS_COLORS` e os `\` na hora de gravar.
> O novo `PS1` substitui o do Ubuntu, então o título da aba do terminal deixa de mostrar `usuario@host:pasta`.

---

## 3. Vim (`~/.vimrc`)

```bash
[ -f ~/.vimrc ] || printf 'unlet! skip_defaults_vim\nsource $VIMRUNTIME/defaults.vim\n' > ~/.vimrc
sed -i '/cursorline/d;/set list/d;/listchars/d' ~/.vimrc
grep -q 'FileType yaml' ~/.vimrc || cat >> ~/.vimrc <<'EOF'
syntax on
set number
autocmd FileType yaml setlocal tabstop=2 shiftwidth=2 expandtab
EOF
```

O que cada parte faz:

- **`defaults.vim`**: quando o `~/.vimrc` é criado do zero, o vim deixa de carregar o `defaults.vim` (busca incremental, `showcmd`, indentação por tipo de arquivo). As duas primeiras linhas trazem ele de volta.
- **`sed`**: remove `cursorline` (a linha sublinhada embaixo do cursor) e `set list`/`listchars` (os pontinhos nos espaços), caso tenham sobrado de configurações antigas.
- **`autocmd FileType yaml`**: 2 espaços e `expandtab` **só em YAML**. Global, isso quebraria Makefiles (que exigem TAB de verdade) e mudaria a indentação de scripts.

Opcional, se selecionar texto com o mouse pelo SSH parar de funcionar (o `defaults.vim` liga o mouse no vim):

```bash
echo 'set mouse=' >> ~/.vimrc
```

Alternativa sem mexer no arquivo: segurar **Shift** enquanto seleciona.

Se a linha sublinhada aparecer mesmo assim, dentro do vim:

```vim
:verbose set cursorline?
```

A resposta mostra qual arquivo está ligando a opção.

---

## 4. Bloco da prova (digitar a cada sessão)

```bash
alias k=kubectl
source <(kubectl completion bash)
complete -o default -F __start_kubectl k
export do="--dry-run=client -o yaml"
export now="--force --grace-period=0"
```

| Linha | Para quê |
|---|---|
| `alias k=kubectl` | `k` vira atalho de `kubectl` |
| `source <(kubectl completion bash)` | liga o autocomplete (Tab) do kubectl |
| `complete -o default -F __start_kubectl k` | estende o autocomplete para o `k` |
| `export do=...` | `$do` gera YAML sem aplicar: `k run web --image=nginx:1.27 $do > web.yaml` |
| `export now=...` | `$now` apaga na hora: `k delete po web $now` |

> Fica fora do `.bashrc` de propósito: digitar no começo de cada sessão é o mesmo treino do começo da prova.

---

## 5. Namespace do lab

```bash
k delete ns review --ignore-not-found
k create ns review
k config set-context --current --namespace=review
```

---

## 6. Conferência

```bash
k get po        # "No resources found in review namespace."
echo $do        # --dry-run=client -o yaml
vim teste.yaml  # Tab insere 2 espaços, sem linha sublinhada
```

---

## Observação sobre o kind

No kind, os nodes são containers Docker. O IP de um pod só é acessível **de dentro do cluster**, então para testar use um pod temporário:

```bash
k run tmp --rm -it --image=busybox:1.36 --restart=Never -- wget -qO- <IP-DO-POD>
```
