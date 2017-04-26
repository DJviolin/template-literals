#!/bin/bash

# Notes:
# http://stackoverflow.com/a/9612232/1442219
# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

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

#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0) # "Maybe" fix whitespace issue

#find ./static -name '*.html' -type f -print0 |
find . -maxdepth 1 -name '*.html' -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        #cat "$line" > "$line.bak"
    done
