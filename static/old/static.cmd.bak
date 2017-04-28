@ECHO OFF

::bash.exe -c "./static.sh"

:: Links:
:: https://wordpress.org/plugins/remove-query-strings-from-static-resources/

rmdir .\static /s /q
mkdir .\static

wget ^
  --mirror ^
  --adjust-extension ^
  --page-requisites ^
  --convert-links ^
  --span-hosts ^
  --domains=127.0.0.1 ^

  --execute robots=off ^
  --continue ^
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0" ^
  --html-extension ^
  --no-host-directories ^
  --no-cookies ^
  --no-cache ^

  --content-disposition ^

  --restrict-file-names=nocontrol ^
  --header="accept-encoding: gzip" ^
  --header="Accept-Charset: utf-8" ^

  --directory-prefix=static ^
  127.0.0.1/public_html/lantosistvan/

:: Website specific pre-config
mv -v ./static/public_html/lantosistvan/wp-content/themes/matte/css/cursors/blank.cur.html ./static/public_html/lantosistvan/wp-content/themes/matte/css/cursors/blank.cur
mv -v ./static/public_html/lantosistvan/wp-content/themes/matte/css/cursors/blank_google_chrome.cur.html ./static/public_html/lantosistvan/wp-content/themes/matte/css/cursors/blank_google_chrome.cur

:: https://archive.keyboardplaying.org/2012/12/02/minify-html-using-sed/

::bash.exe -c "find ./static -name *.html"
:: sed '/^\(\s*\)\/\//d' ./static/public_html/lantosistvan/index.html

:: Remove all single-line comments
::bash.exe -c "find ./static -name *.html -exec sed -i '/^\(\s*\)\/\//d' {} \;"
:: Remove heading and trailing spaces
::bash.exe -c "find ./static -name *.html -exec sed -i 's/^[ \t]*//g; s/[ \t]*$//g;' {} \;"
:: Remove newlines
::bash.exe -c "find ./static -name *.html -exec sed -i ':a;N;$!ba;s/\n/ /g' {} \;"

:: http://stackoverflow.com/questions/12376368/minify-html-files-in-text-html-templates,
::bash.exe -c "find ./static -name *.html -exec sed -i 's/^[ \t]*//g; :a;N;$!ba;s/\n//g;' {} \;"
::bash.exe -c "find ./static -name *.html -exec sed -i ':a;N;$!ba;s/>\s*</></g' {} \;"
::bash.exe -c "echo '     This is a test' | sed -e 's/^[ \t]*//'"

:: https://www.cyberciti.biz/tips/delete-leading-spaces-from-front-of-each-word.html
:: Remove all leading and trailing whitespace from end of each line
::bash.exe -c "find ./static -name *.html -exec sed -i 's/^[ \t]*//;s/[ \t]*$//' {} \;"

::C:\msys64\usr\bin\find.exe ./static -name *.html

:: Remove all leading and trailing whitespace from end of each line
::bash.exe -c "find ./static -name *.html -exec sed -i 's/^[ \t]*//;s/[ \t]*$//' {} \;"
:: Remove all single-line comments
::bash.exe -c "find ./static -name *.html -exec sed -i '/^\(\s*\)\/\//d' {} \;"
:: Remove newlines
::bash.exe -c "find ./static -name *.html -exec sed -i ':a;N;$!ba;s/\n/ /g' {} \;"
::bash.exe -c "find ./static -name *.html -exec sed -i ':a;N;$!ba;s/\n/ /g' {} \;"

:: https://www.gnu.org/software/sed/manual/sed.html
:: https://www.gnu.org/software/sed/manual/sed.html#ERE-syntax

:: cat index.html | sed 's/class/classsssss/' - > output.html
:: cat index.html | sed --regexp-extended 's/class/classsssss/' - > output.html


:: WORKS:
:: http://stackoverflow.com/a/5413132/1442219

:: Remove every leading and trailing whitespace from each line
:: https://regex101.com/r/pbtkTc/3
:: cat index.html | sed --regexp-extended 's/^(\s*)//im' - > output.html

:: Remove everything between CSS comments like /* and */
:: https://regex101.com/r/pbtkTc/7
:: http://stackoverflow.com/a/9329651/1442219
:: cat index.html | sed --regexp-extended 's/(\/\*.*).|\n*(.*\*\/){1}//im' - > output.html
:: cat index.html | sed --regexp-extended 's/(\/\*.*)[^*]*(\*\/){1}//im' - > output.html
:: cat index.html | sed --regexp-extended 's/\/\*[^*]*\*+([^/][^*]*\*+)*\///im' - > output.html
:: cat index.html | sed --regexp-extended 's/(\/\*)[^*]*\*+([^/][^*]*\*+)*(\/)//im' - > output.html
:: cat index.html | sed --regexp-extended 's/(\/\*)[^*]+([^/][^*]*\*+)*(\/)//im' - > output.html
:: cat index.html | sed --regexp-extended 's/(\/\*)[^*]+(\*\/)//im' - > output.html
::
:: cat output.html | sed -E 's/(\/\*)[\s\S]+?(\*\/)//igm' - > output2.html
:: cat output.html | sed -E 's/(\/\*)[\s\S]+?(\*\/)//p' - > output2.html















:: cat output.html | grep --extended-regexp 'class' -
:: cat index.html | sed --regexp-extended '/^(\s*)/!p' - > output2.html
::
:: find ./static -name '*.html' -type f -print
:: find ./static -name '*.html' -type f -print | grep --extended-regexp 'class' -
:: find ./static -name '*.html' -type f -print | cat -

:: http://stackoverflow.com/a/864386/1442219
:: cat `find ./static -name '*.html' -type f -print`
:: cat `find ./static -name '*.html' -type f`
:: cat `find ./static -name '*.html' -type f`

:: Classic approach
:: find ./static -name '*.html' -type f -print | xargs cat
:: find ./static -name '*.html' -type f -print | xargs cat | sed --regexp-extended 's/class/classsssss/' - > output2.html

:: find ./static -name '*.html' -type f -print | xargs cat | sed -E 's/class/classsssss/' < - > output2.html

:: http://stackoverflow.com/a/9612232/1442219
:: # using xargs*
:: find . -name \*.txt -print0 | xargs -0 process
:: # using xargs with arguments after each filename (implies one run per filename)
:: find . -name \*.txt -print0 | xargs -0 -I{} process {} argument

:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} cat {} -n
:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} sed {} -E 's/class/classsssss/' > output2.html
:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} cat {} -n > output2.html
:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} sed {} -E 's/class/classsssss/' > output2.html

:: https://www.cyberciti.biz/faq/linux-unix-bsd-xargs-construct-argument-lists-utility/
:: Find all .bak files in or below the current directory and delete them.
:: find . -name "*.bak" -type f -print | xargs /bin/rm -f

:: xargs user-agent
:: http://www.thegeekstuff.com/2013/12/xargs-examples/

:: find ./static -name '*.html' -type f -print
:: find ./static -name '*.html' -type f -print | xargs -t --delimiter=\; cat; echo -e "\n--separator--\n" > output2.html

:: WORKS
:: find ./static -name '*.html' -type f -print0 | xargs -0 cat
:: find ./static -name '*.html' -type f | xargs grep 'doctype'
:: find ./static -name '*.html' -type f -print0 | xargs -0 grep -E 'doctype'

:: FILE=$(find ./static -name '*.html' -type f -print); ${FILE} | xargs cat - | grep -E 'doctype'

:: WORKS:
:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} cat {} -
:: find ./static -name '*.html' -type f -print0 | xargs -0 -I{} cat {} - | grep -E 'doctype'
:: find ./static -name '*.html' -type f -print0 | xargs -0 cat | grep --extended-regexp 'doctype'
:: find ./static -name '*.html' -type f -print0 | xargs -0 cat | grep --extended-regexp --invert-match 'doctype'
:: find ./static -name '*.html' -type f -print0 | xargs -0 cat | grep --extended-regexp --invert-match 'doctype' > output2.html
:: find ./static -name '*.html' -type f -print0 | xargs -0 cat | grep --extended-regexp --invert-match 'doctype' | sponge
:: find ./static -name '*.html' -type f -print0 | xargs -0 grep --no-filename --extended-regexp --invert-match 'doctype' > output2.html
:: find ./static -name '*.html' -type f -print0 | xargs -0 grep --no-filename --extended-regexp --invert-match 'doctype' | sponge -
