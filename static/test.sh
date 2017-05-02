#!/bin/bash

# find . -name '*.png' -exec file {} \; | sed 's/\(.*png\): .* \([0-9]* x [0-9]*\).*/\2 \1/' | awk 'int($1) > 500 {print}'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\2\t\3/' | awk '{print int($1+$2)}'

find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        result=$(file "$line" | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\2\t\3/' | awk '{print int($1+$2)}');
        if (( $result >= 1667 )); then
            # 1000 + 667 = 1667
            # 1100 + 733 = 1833
            #echo "$result is bigger or equal than 1667 | $line"
            echo "$line"
            cjpeg -quality 70 -progressive -dc-scan-opt 2 "$line" > "$line.out.jpg"
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
