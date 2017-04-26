#!/bin/bash

FILE=`find ./static -name '*.html' -type f -print`

#cat ${FILE} > output2.html
#echo "${FILE}"
cat ${FILE} > "${FILE}.bak"
