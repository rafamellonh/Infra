 
  sudo mount -t cifs //192.168.40.52/github/infra /data/infra -o username=rafael,password=#Rafa78965#,vers=3.0


  1️⃣ Verificar novo tamanho:
lsblk

2️⃣ Expandir partição sda3
sudo growpart /dev/sda 3

3️⃣ Expandir PV
sudo pvresize /dev/sda3

4️⃣ Expandir o Logical Volume:
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv

5️⃣ Expandir o filesystem ext4:
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv

6️⃣ Confirmar:
df -h