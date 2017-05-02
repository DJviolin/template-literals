#!/bin/bash

# find . -name '*.png' -exec file {} \; | sed 's/\(.*png\): .* \([0-9]* x [0-9]*\).*/\2 \1/' | awk 'int($1) > 500 {print}'
# find . -name '*.jpg' -exec file {} \; | sed -E 's/(.*jpg): .* ([0-9]*)x([0-9]*).*/\1\t\2\t\3/'

# \(.*jpg\)\:.*[0-9]*\x[0-9]*\,
# ([0-9]*x[0-9]*)

find ./static \( -iname \*.jpg -o -iname \*.jpeg \) -type f -print0 |
    while IFS= read -r -d $'\0' line; do
        file "$line" | sed 's/\(.*jpg\): .* \([0-9]* x [0-9]*\).*/\2 \1/'
    done
