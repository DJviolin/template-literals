#!/bin/bash

set -e

#FILE=`find ./static -name '*.html' -type f -print0`
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)
#FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0)

#cat ${FILE} > output2.html
#echo "${FILE}"
#cat ${FILE} > "${FILE}.bak"

#echo "${FILE}" | xargs cat
#echo "${FILE}" | xargs cat > "${FILE}.bak"

#sed 's/class/classsssss/' < ${FILE}

#echo "${FILE}"

#touch "${FILE}.bak"
#cat "${FILE}" > "${FILE}.bak"
#cat "${FILE}" > "${FILE}.bak"

# Not recommended, will break on whitespace
FILE=$(find ./static -name '*.html' -type f -print0 | xargs -0) # "Maybe" fix whitespace issue
for i in ${FILE}; do
  echo "$i"
done
