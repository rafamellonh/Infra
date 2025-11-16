#!/bin/sh

apt update
apt install cowsay figlet




clear

# Texto que vai aparecer (pode mudar)
MSG="${1:-Rock-N-Bits}"

# Título grande com figlet (opcional)
figlet "$MSG"

echo
echo "=============================="
echo

# Vaca padrão
cowsay "$MSG"

echo
echo "------ Tux --------"
echo

# Pinguim TUX
cowsay -f tux "$MSG"

echo
echo "------ Eyes -------"
echo

# “Eyes” (outro desenho)
cowsay -f eyes "$MSG"

echo
echo "Fim 😄"