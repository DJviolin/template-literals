#!/bin/bash

# https://swsblog.stanford.edu/blog/creating-static-copy-website
# http://www.explainshell.com/explain?cmd=wget+-P+%2Fpath%2Fto%2Fdestination%2Fdirectory%2F+-mpck+--user-agent%3D%22%22+-e+robots%3Doff+--wait+1+-E+https%3A%2F%2Fwww.example.com%2F
# https://www.labnol.org/software/wget-command-examples/28750/

# https://wordpress.org/plugins/search.php?q=static

# set -e making the commands if they were like &&
# set -x putting + before every line
set -ex

rm -rf ./static/*
mkdir -p ./static

wget \
  --no-host-directories \
  --protocol-directories \
  --directory-prefix=static \
  --mirror \
  --page-requisites \
  --continue \
  --convert-links \
  --user-agent="" \
  --execute robots=off \
  --wait 1 \
  --adjust-extension \
   http://127.0.0.1:3000/

# Minify HTML
# https://archive.keyboardplaying.org/2012/12/02/minify-html-using-sed/
# http://stackoverflow.com/questions/12376368/minify-html-files-in-text-html-templates
#find ./static -name *.html -exec sed -i '/^\(\s*\)\/\//d' {} \;
#find ./static -name *.html -exec sed -i 's/^[ \t]*//g; s/[ \t]*$//g;' {} \;
#find ./static -name *.html -exec sed -i ':a;N;$!ba;s/\n/ /g' {} \;
