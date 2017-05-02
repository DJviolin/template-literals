#!/bin/bash

# Notes:
# http://stackoverflow.com/a/9612232
# http://www.stevenmaude.co.uk/posts/archiving-a-wordpress-site-with-wget-and-hosting-for-free
# Why not Regex?
# http://stackoverflow.com/a/1732454

# Wordpress: Remove Query Strings From Static Resources
# https://wordpress.org/plugins/remove-query-strings-from-static-resources/

# Wordpress: Relative URLs
# https://wordpress.org/plugins/relative-url/
# https://wordpress.org/plugins/make-paths-relative/

# dig djviolin.github.io +noall +answer

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
        --directory-prefix=static \
        $1
}
# http://stackoverflow.com/a/24409738/1442219
if download "127.0.0.1/public_html/lantosistvan/"; then
    exit 0
fi

# Rename *.cur.html to *.cur
# https://askubuntu.com/a/35994/421797
find ./static -type f -name "*.cur.html" -exec sh -c 'mv -v "$1" "${1%.cur.html}.cur"' - {} \;

<<COMMENT
# Download XML sitemap
wget \
    --mirror \
    --no-host-directories \
    --no-verbose \
    --directory-prefix=static/public_html/lantosistvan \
    "127.0.0.1/public_html/lantosistvan/sitemap_index.xml"
# To check wget's exit code is really 0
if [ $? -ne 0 ]; then # Check wget's exit code is really 0 (not equal to zero)
    echo "Non-Zero exit code"
else
    echo "Exit code 0"
fi
# Set the URLs in the xml sitemap
find ./static -type f -name "*.xml" -exec sed -i 's/http:\/\/127\.0\.0\.1\/public_html\/lantosistvan/http:\/\/lantosistvan\.com/g;' {} \;
COMMENT

#find ./static -name *.html -exec sed -i 's/http:/https:/g;' {} \;
#find ./static -type f -print -name *.html -name *.css -name *.js -exec sed -i 's/http:/https:/g;' {} \;
find ./static -type f -print \( -name \*.html -o -name \*.css -o -name \*.js \) -exec sed -i 's/http:/https:/g; s/http%253A/https%253A/g;' {} \;

#find ./static -type f -print -name *.html -exec sed -i 's/(<script).*(?=src)/<script async/g;' {} \;
# (<script).*(?=src)
#find ./static -type f -print -name *.html -exec sed -i 's/(<script).*(?=src)/<script async type=\"text\/javascript\" /g;' {} \;
#find . -maxdepth 1 -type f -print -name *.html -exec sed 's/(<script).*(?=src)/<script async type=\"text\/javascript\" /g;' {} \; > index.bak.html
#find . -maxdepth 1 -name *.html -type f -print -exec sed -e 's/(<script).*(?=src)/<script async type=\"text\/javascript\" /g;' {} \; > index.bak.html
#find . -maxdepth 1 -name "index.html" -type f -print0 | xargs --null sed 's/(<script).*(?=src)/<script async /g;' > index.bak.html
# (<script type=\'text\/javascript\' ).*(?=src)
#find . -maxdepth 1 -name "index.html" -type f -print0 | xargs --null sed "s/(<script type=\'text\/javascript\' ).*(?=src)/<script async type=\'text\/javascript\' /g;" > index.bak.html

loop () {
    #find . -maxdepth 1 -name "*.$1" -type f -print0 |
    find ./static -name "*.$1" ! -name "*.min.$1" ! -name "*-min.$1" -type f -print0 |
        while IFS= read -r -d $'\0' line; do
            echo "$line"
            node ./minify.js "$line" $1 $2 > "$line.bak"
            mv -v "$line.bak" "$line"
        done
}

loop html lantosistvan
loop css
loop js

# Google image optimization guide
# https://developers.google.com/speed/pagespeed/
# https://developers.google.com/speed/docs/insights/OptimizeImages
# https://www.imagemagick.org/script/convert.php
# $ convert IMG_3039-1400px.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB IMG_3039-1400px_converted.jpg
# $ jpegtran -outfile "IMG_3039-1400px_converted2.jpg" -optimise -progressive -copy none "IMG_3039-1400px_converted.jpg"
# https://testmysite.thinkwithgoogle.com/

# cjpeg -quality 75 -progressive -dc-scan-opt 2 IMG_3039-1400px.jpg > IMG_3039-1400px-20170501-out01.jpg
# jpegtran -outfile IMG_3039-1400px-20170501-out02.jpg -optimise -progressive -copy none IMG_3039-1400px-20170501-out01.jpg

<<COMMENT2
find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -size -128k -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        cjpeg -quality 80 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
        jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
        rm "$line.out.jpg"
    done

# https://github.com/mozilla/mozjpeg/blob/master/usage.txt
#find . -maxdepth 1 \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png \)  -type f -print0 |
#find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -size +128k -print0 |
    while IFS= read -r -d $'\0' line; do
        echo "$line"
        cjpeg -quality 75 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
        jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
        rm "$line.out.jpg"
    done
COMMENT2
