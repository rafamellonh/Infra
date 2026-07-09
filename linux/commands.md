## Comando `wc`

## Sintaxe

```bash
cat messages | wc -l
3156
```

## Comando `dd`

 `dd` é um comando para copiar/converter dados **bit a bit** entre um dispositivo/arquivo de origem e um de destino.
 
## Sintaxe
 
```bash
dd if=<origem> of=<destino> bs=<tamanho_bloco> status=progress
```
 
- `if=` → arquivo/dispositivo de origem (*input file*)
- `of=` → arquivo/dispositivo de destino (*output file*)
- `bs=` → tamanho do bloco (ex: `4M`, `1M`, `512`)
- `status=progress` → mostra progresso da cópia

```
 sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress
```


## Comando `ln`

# Hard link
```
ln /etc/hosts /home/rafael/hosts_hardlink
```
# Symlink
```
ln -s /etc/hosts /home/rafael/hosts_symlink
```

# Verificar
```
ls -li /etc/hosts /home/rafael/hosts_hardlink /home/rafael/hosts_symlink
```

## Comando `tail`


​```bash
tail -f /var/log/syslog
tail -f /var/log/nginx/access.log
​```

Acompanha o log em tempo real, mostrando novas linhas assim que são escritas — ótimo para monitorar serviços e debugar em produção.

## Combinações úteis

​​```
tail -n 50 arquivo.log          # últimas 50 linhas
tail -f -n 100 arquivo.log      # começa mostrando as últimas 100, depois segue em tempo real
journalctl -f                   # equivalente do tail -f para logs do systemd
​```





