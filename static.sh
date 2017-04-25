#!/bin/bash

# set -e making the commands if they were like &&
# set -x putting + before every line
set -ex

rm -rf ./static/*

wget --no-host-directories --directory-prefix=static -mpck --user-agent="" -e robots=off --wait 1 -E http://127.0.0.1:3000/
