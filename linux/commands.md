# Comando `wc`

## Sintaxe

```bash
cat messages | wc -l
3156
```

# Comando `dd`

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
