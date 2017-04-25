#!/bin/bash

# https://swsblog.stanford.edu/blog/creating-static-copy-website
# http://www.explainshell.com/explain?cmd=wget+-P+%2Fpath%2Fto%2Fdestination%2Fdirectory%2F+-mpck+--user-agent%3D%22%22+-e+robots%3Doff+--wait+1+-E+https%3A%2F%2Fwww.example.com%2F

# set -e making the commands if they were like &&
# set -x putting + before every line
set -ex

rm -rf ./static/*

wget \
  --no-host-directories \
  --directory-prefix=static \
  -mpck \
  --user-agent="" \
  -e robots=off \
  --wait 1 \
  -E http://127.0.0.1:3000/
