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
        #echo "$line"
        #cat "$line" > "$line.bak"
        #grep --extended-regexp --invert-match '\/\*[\s\S]+?\*\/' "$line" > "$line.bak"
        #grep --perl-regexp --ignore-case '/\*[\s\S]+?\*/' "$line" > "$line.bak"

        # https://askubuntu.com/questions/551338/how-do-i-grep-for-multiple-patterns-on-multiple-lines
        #grep --perl-regexp '/\*[\s\S]+?\*/' "$line" > "$line.bak"
        #grep --perl-regexp '\/\*((?!\*\/).|\n)+\*\/' "$line" > "$line.bak"

        # http://www.pcre.org/original/doc/html/pcregrep.html
        # http://linuxcommand.org/man_pages/pcregrep1.html
        #pcregrep --ignore-case --multiline '/\*[\s\S]+?\*/' "$line" > "$line.bak"
        #pcregrep --ignore-case --multiline '\/\*((?!\*\/).|\n)+\*\/' "$line" > "$line.bak"
        # https://regex101.com/r/LDKPdL/1
        pcregrep --ignore-case --multiline --invert-match '\/\*((?!\*\/).|\n)+\*\/' "$line" > "$line.bak"
    done
