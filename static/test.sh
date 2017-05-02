#!/bin/bash

# find . -name '*.png' -exec file {} \; | sed 's/\(.*png\): .* \([0-9]* x [0-9]*\).*/\2 \1/' | awk 'int($1) > 500 {print}'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\2\t\3/' | awk '{print int($1+$2)}'

# $ pagespeed_optimize_image IMG_3039-1400px.jpg IMG_3039-1400px-google.jpg
# $ convert IMG_3039-1400px.jpg -sampling-factor 4:2:0 -strip -quality 70 -interlace JPEG -colorspace RGB IMG_3039-1400px-convert.jpg

# $ convert 20140516-eskuvo-barbi-balazs-0001-1400px.jpg -sampling-factor 4:2:0 -strip -quality 70 -interlace JPEG -colorspace RGB 20140516-eskuvo-barbi-balazs-0001-1400px-convert.jpg
# jpegtran -outfile "20140516-eskuvo-barbi-balazs-0001-1400px-convert-jpegtran.jpg" -optimise -progressive -copy none "20140516-eskuvo-barbi-balazs-0001-1400px-convert.jpg"

# $ find ./static -iname "*eskuvo-joci-petra-010*" -type f -print

find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        result=$(file "$line" | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\2\t\3/' | awk '{print int($1+$2)}');
        if (( $result >= 1667 )); then
            # 1000 + 667 = 1667
            # 1100 + 733 = 1833
            #echo "$result is bigger or equal than 1667 | $line"
            echo "$line"
            cjpeg -quality 72 -progressive -dc-scan-opt 2 -smooth 5 "$line" > "$line.out.jpg"
            jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
            rm "$line.out.jpg"
        else
            #echo "$result is less than 1667 | $line"
            echo "$line"
            cjpeg -quality 85 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
            jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
            rm "$line.out.jpg"
        fi
    done
