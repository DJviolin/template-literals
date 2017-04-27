#!/bin/bash

# Why not Regex?
# http://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454

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

#lsb_release -a

<<COMMENT
#/usr/bin/find ./static -name '*.html' -type f -print0 |
/usr/bin/find . -maxdepth 1 -name '*.html' -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        #node ./minify.js -f "$line" -t html > "$line.bak"
        node ./minify.js "$line" html > "$line.bak"
        #node ./minify.js "$line" html
    done
COMMENT

<<COMMENT2
#/usr/bin/find ./static -name '*.html' -type f -print0 |
/usr/bin/find . -maxdepth 1 -name '*.html' -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        #node ./minify.js -f "$line" -t html > "$line.bak"
        node ./minify.js "$line" html > "$line.bak"
        #node ./minify.js "$line" html
    done
COMMENT2

<<COMMENT3
# http://ryanstutorials.net/bash-scripting-tutorial/bash-functions.php
print_something () {
    echo Hello $1
}
print_something Mars
print_something Jupiter
COMMENT3

loop () {
    #/usr/bin/find ./static -name "*.$1" -type f -print0 |
    /usr/bin/find ./static -name "*.$1" ! -name "*.min.$1" -type f -print0 |
    #/usr/bin/find . -maxdepth 1 -name "*.$1" -type f -print0 |
        while IFS= read -r -d $'\0' line; do
            echo "$line"
            node ./minify.js "$line" $1 $2 > "$line.bak"
        done
}

#loop html mysite
#loop css
loop js
