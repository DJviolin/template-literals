#!/bin/bash

# Notes:
# http://stackoverflow.com/a/9612232/1442219

set -e

echo -e "\n\
//////////////////////////////////// \n\
Static HTML generator for Wordpress \n\
//////////////////////////////////// \n"

<<COMMENT1
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
  --directory-prefix=static \
  --quiet \
  127.0.0.1/public_html/lantosistvan/
COMMENT1

#FILE=`find ./static -name '*.html' -type f -print0`
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)

#cat ${FILE} > output2.html
#echo "${FILE}"
#cat ${FILE} > "${FILE}.bak"

#echo "${FILE}" | xargs cat
#echo "${FILE}" | xargs cat > "${FILE}.bak"

#sed 's/class/classsssss/' < ${FILE}

#echo "${FILE}"

#touch "${FILE}.bak"
#cat "${FILE}" > "${FILE}.bak"
#cat "${FILE}" > "${FILE}.bak"

FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0) # "Maybe" fix whitespace issue

find ./static -name '*.html' -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        #cat "$line" > "$line.bak"
    done
