#!/bin/bash

# find . -name '*.png' -exec file {} \; | sed 's/\(.*png\): .* \([0-9]* x [0-9]*\).*/\2 \1/' | awk 'int($1) > 500 {print}'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'

# \(.*jpg\)\:.*[0-9]*\x[0-9]*\,
# ([0-9]*x[0-9]*)

find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        result=$(file "$line" | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\2\t\3/' | awk '{print int($1*$2)}')
        if (( $result >= 667000 )); then
            #echo "$result is bigger or equal than 667000 | $line"
            echo "$line"
            cjpeg -quality 70 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
            jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
            rm "$line.out.jpg"
        else
            #echo "$result is less than 667000 | $line"
            echo "$line"
            cjpeg -quality 85 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
            jpegtran -outfile "$line" -optimise -progressive -copy none "$line.out.jpg"
            rm "$line.out.jpg"
        fi
    done
