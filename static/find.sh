#!/bin/bash

# Why not Regex?
# http://stackoverflow.com/a/1732454

# Notes:
# http://stackoverflow.com/a/9612232
# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

loop () {
    #/usr/bin/find . -maxdepth 1 -name "*.$1" -type f -print0 |
    /usr/bin/find ./static -name "*.$1" ! -name "*.min.$1" ! -name "*-min.$1" -type f -print0 |
        while IFS= read -r -d $'\0' line; do
            echo "$line"
            node ./minify.js "$line" $1 $2 > "$line.bak"
            #mv -v "$line.bak" "$line"
        done
}

#loop html mysite
loop css
#loop js
