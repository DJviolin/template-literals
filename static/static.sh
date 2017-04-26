#!/bin/bash

# https://swsblog.stanford.edu/blog/creating-static-copy-website
# http://www.explainshell.com/explain?cmd=wget+-P+%2Fpath%2Fto%2Fdestination%2Fdirectory%2F+-mpck+--user-agent%3D%22%22+-e+robots%3Doff+--wait+1+-E+https%3A%2F%2Fwww.example.com%2F
# https://www.labnol.org/software/wget-command-examples/28750/

# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free

# https://wordpress.org/plugins/search.php?q=static
# https://wordpress.org/plugins/static-snapshot/
# https://wordpress.org/plugins/simply-static/
# https://wordpress.org/plugins/static-html-output-plugin/

# https://vaasa.hacklab.fi/2013/11/28/howto-make-a-static-copy-of-joomla-site-with-wget/

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

#mkdir -p ./static
#rm -rf ./static/*

  #--wait 1 \
  #--random-wait \
  #--user-agent="" \
  #--content-disposition \

#wget \
#  --mirror \
#  --adjust-extension \
#  --page-requisites \
#  --execute robots=off \
#  --convert-links \
#  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0" \
#  --no-host-directories \
#  --protocol-directories \
#  --directory-prefix=static \
#  --continue \
#  --html-extension \
#  --restrict-file-names=windows \
#  --wait 1 \
#  --random-wait \
#  --show-progress \
#  http://127.0.0.1/public_html/lantosistvan/

# wget --page-requisites --convert-links --adjust-extension --mirror --span-hosts --domains=blog.scraperwiki.com,scraperwiki.com --exclude-domains beta.scraperwiki.com,classic.scraperwiki.com,media.scraperwiki.com,mot.scraperwiki.com,newsreader.scraperwiki.com,premium.scraperwiki.com,status.scraperwiki.com,x.scraperwiki.com scraperwiki.com

# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free
# wget --directory-prefix=static --page-requisites --convert-links --adjust-extension --mirror --span-hosts --domains=127.0.0.1 127.0.0.1/public_html/lantosistvan/

#wget \
#  --directory-prefix=static \
#  --page-requisites \
#  --convert-links \
#  --adjust-extension \
#  --mirror \
#  --span-hosts \
#  --domains=127.0.0.1 \
#  127.0.0.1/public_html/lantosistvan/

# Minify HTML
# https://archive.keyboardplaying.org/2012/12/02/minify-html-using-sed/
# http://stackoverflow.com/questions/12376368/minify-html-files-in-text-html-templates
#find ./static -name *.html -exec sed -i '/^\(\s*\)\/\//d' {} \;
#find ./static -name *.html -exec sed -i 's/^[ \t]*//g; s/[ \t]*$//g;' {} \;
#find ./static -name *.html -exec sed -i ':a;N;$!ba;s/\n/ /g' {} \;

<<COMMENT
wget \
  --mirror \
  --adjust-extension \
  --page-requisites \
  --convert-links \
  --span-hosts \
  --domains=127.0.0.1 \
  \
  --execute robots=off \
  --continue \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0" \
  --html-extension \
  --directory-prefix=static \
  --no-host-directories \
  --no-cookies \
  --no-cache \
  \
  --content-disposition \
  \
  --restrict-file-names=nocontrol \
  --header="accept-encoding: gzip" \
  --header="Accept-Charset: utf-8" \
  \
  127.0.0.1/public_html/lantosistvan/
COMMENT

rm -rf ./static
mkdir ./static

wget \
  --mirror \
  --adjust-extension \
  --page-requisites \
  --convert-links \
  --span-hosts \
  --domains=127.0.0.1 \
  \
  --execute robots=off \
  --continue \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0" \
  --html-extension \
  --no-host-directories \
  --no-cookies \
  --no-cache \
  \
  --content-disposition \
  \
  --restrict-file-names=nocontrol \
  --header="accept-encoding: gzip" \
  --header="Accept-Charset: utf-8" \
  \
  --directory-prefix=./static \
  127.0.0.1/public_html/lantosistvan/
