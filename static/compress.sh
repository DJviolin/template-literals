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

# Image listing with GNU find
# $ https://unix.stackexchange.com/a/15309/120771

# set -e making the commands if they were like &&
# set -x putting + before every line
set -e

#find . -maxdepth 1 -name "*.jpg" -name "*.JPG" -name "*.jpeg" -name "*.JPEG" -type f -print0 |
find . -maxdepth 1 \( -iname \*.jpg -o -iname \*.png \)  -type f -print0 |
#find ./static -name "*.jpg" -name "*.JPG" -name "*.jpeg" -name "*.JPEG" -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        #jpegtran -outfile "$line-out" -optimise -progressive -copy none "$line"
        #mv -v "$line.bak" "$line"
    done
