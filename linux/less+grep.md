# less & grep

## less

```
less arquivo           abre
less arquivo.gz        abre .gz direto
less a.log b.log       vários arquivos
cmd | less             lê a saída de um comando

-S                     sem quebra de linha
-N                     número das linhas
-n                     sem contagem de linhas (rápido em arquivo gigante)
-R                     mostra cores
-i                     busca ignora maiúsc. (se o padrão for minúsculo)
-I                     busca sempre ignora maiúsc.
-X                     não limpa a tela ao sair
-F                     sai direto se couber em uma tela
-K                     Ctrl+C sai do less
-M                     prompt detalhado (linha, %, arquivo)
-j N                   resultado da busca na linha N da tela

+G                     abre no fim
+F                     abre seguindo (tail -f)
+500                   abre na linha 500
+/texto  ou  -p texto  abre na 1ª ocorrência

export LESS='-SRni'    padrão no ~/.bashrc
```

```
↓ / j / Enter  desce 1 linha
↑ / k          sobe 1 linha
Space / f      página abaixo
b              página acima
d / u          meia página abaixo / acima
← →            rolar horizontal (-S)
g / G          início / fim
500g           linha 500
50%            metade do arquivo

/texto         busca para frente
?texto         busca para trás
n / N          próxima / anterior
/ERROR|WARN    um ou outro (regex)
/!texto        linha que NÃO contém
ESC u          tira destaque

&texto         filtra: só linhas com texto
&!texto        filtra: esconde linhas com texto
&              remove filtro

F              follow (tempo real)
ESC F          follow até aparecer a última busca
Ctrl+C         sai do follow

ma / 'a        marca / volta para marca
''             volta à posição anterior

-N -S -i       liga/desliga opção com o arquivo aberto
:n / :p        próximo / anterior arquivo
:e arquivo     abre outro arquivo
:d             tira arquivo da lista
=              posição, tamanho e %
s arquivo      salva em arquivo (quando veio de pipe)
|a comando     envia da marca "a" até aqui para um comando
!comando       executa comando do shell
r              redesenha a tela
v              abre no editor
h / q          ajuda / sair
```

Sem contador de ocorrências: usar `grep -c`.

## grep

```
-i             ignora maiúsc./minúsc.
-F             texto fixo, sem regex (mais rápido)
-E             regex estendida (ERROR|WARN)
-P             regex Perl (\d, \K)
-w             palavra inteira
-v             inverte (não contém)
-e A -e B      vários padrões
-f arq         padrões de um arquivo

-c             conta linhas
-n             número da linha
-o             só o trecho encontrado
-m N           para após N resultados
-q             silencioso (scripts)
--color=always mantém cor no less -R

-A N / -B N    N linhas depois / antes
-C N           N linhas antes e depois

-r             recursivo
-l / -L        arquivos que contêm / não contêm
--include=*.log  --exclude=*.gz
zgrep          busca em .gz
```

```bash
grep -c ERROR app.log                                   # linhas com ERROR
grep -o ERROR app.log | wc -l                           # total de ocorrências
grep -oE "\[(INFO|DEBUG|WARN|ERROR) *\]" app.log | sort | uniq -c   # por nível
grep -c ERROR /var/log/app/*.log | grep -v ":0$"        # por arquivo
grep -n -C 3 ERROR app.log | less -S                    # erros com contexto
grep ERROR app.log | grep payment                       # ERROR e payment
grep -oP "processed in \K\d+" app.log | sort -n | tail -5   # 5 maiores tempos
LC_ALL=C grep -F ERROR gigante.log                      # máxima velocidade
```
