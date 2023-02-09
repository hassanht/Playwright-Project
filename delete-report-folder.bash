#!/bin/bash
folder_name="allure-results"
folder_path="$HOME/$folder_name"

if [ -d "$folder_path" ]; then
  rm -rf "$folder_path"
  echo "The folder $folder_name has been deleted."
else
  echo "The folder $folder_name does not exist."
fi
