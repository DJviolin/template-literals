#!/bin/bash

# Image optimisation
# https://graphicdesign.stackexchange.com/questions/3429/the-most-advanced-jpeg-image-compression-on-mac
# https://blarg.co.uk/blog/comparison-of-jpeg-lossless-compression-tools
# https://blog.cloudflare.com/experimenting-with-mozjpeg-2-0/
# https://blog.cloudflare.com/go-at-cloudflare/
# https://blog.cloudflare.com/what-weve-been-doing-with-go/

# mozjpeg
# https://imageoptim.com/mozjpeg
# https://github.com/mozilla/mozjpeg
# https://joshaas.wordpress.com/2014/12/30/mozjpeg-3-0-released/
# https://mozjpeg.codelove.de/binaries.html
# $ cjpeg -quality 80 foo.bmp > bar.jpg

# jpegtran
# $ jpegtran -outfile out.jpg -optimise -progressive -copy none in.jpg

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

#find . -maxdepth 1 -name "*.$1" -type f -print0 |
find ./static -name "*.$1" ! -name "*.min.$1" ! -name "*-min.$1" -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        node ./minify.js "$line" $1 $2 > "$line.bak"
        mv -v "$line.bak" "$line"
    done
