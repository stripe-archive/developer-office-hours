#!/bin/bash

# Warning: this file is a very simple starting point for batching many of the same stripe calls together.
# This is not a complete solution, but rather an introductory sample for you to build upon.
# Your business logic needs and specific scenario will dictate how robust your solution will need to be.
# Pro tip: ALWAYS perform a "dry run" before you do anything live.
# https://en.wikipedia.org/wiki/Dry_run_(testing)

# first argument
id=$1

echo "processing $id"

# stripe cli command
result=`stripe ...`
# pull out any error code if Stripe responds with an error object
error=`echo $result | jq -r '. | if .error then .error.code else "" end'`

# error checking -> append error to a file
if [ -n "$error" ]
then
  echo "$id $error" >> failures.txt
fi

