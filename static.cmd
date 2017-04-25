@ECHO OFF

wget -P ./static -mpck --user-agent="" -e robots=off --wait 1 -E http://127.0.0.1:3000/
