#!/bin/bash

# Notes:
# http://stackoverflow.com/a/9612232/1442219
# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

echo -e "\n\
//////////////////////////////////// \n\
Static HTML generator for Wordpress \n\
//////////////////////////////////// \n"

rm -rf ./static
mkdir ./static

# https://www.gnu.org/software/wget/manual/html_node/Exit-Status.html
function download () {
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
    --no-verbose \
    --no-use-server-timestamps \
    --recursive \
    --quiet \
    --directory-prefix=static \
    127.0.0.1/public_html/lantosistvan/
}

# http://stackoverflow.com/a/24409738/1442219
if download; then
  exit 0
fi

# To access wget's exit code
if [ $? -ne 0 ]; then # not equel to zero
  echo "Non-Zero exit code"
else
  echo "Exit code 0"
fi

echo "Hello, World!"

# Rename *.cur.html to *.cur
# https://askubuntu.com/a/35994/421797
find ./static -type f -name "*.cur.html" -exec sh -c 'mv -v "$1" "${1%.cur.html}.cur"' - {} \;
