#!/bin/bash

# find . -name '*.png' -exec file {} \; | sed 's/\(.*png\): .* \([0-9]* x [0-9]*\).*/\2 \1/' | awk 'int($1) > 500 {print}'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'

# \(.*jpg\)\:.*[0-9]*\x[0-9]*\,
# ([0-9]*x[0-9]*)

find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        result=$(file "$line" | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/' | awk '{print int($2*$3)}')
        if (( $result >= 100000 )); then
            echo "$result is bigger or equal than 100000 | $line"
        else
            echo "$result is less than 100000 | $line"
        fi
    done
