#!/usr/bin/env python3

import os, re, subprocess
from commands import COMMANDS
from utils import check_if_dir_exists

def yellow_color(str):
    return f"\033[33m{str}\033[0m"

def red_color(str):
    return f"\033[31m{str}\033[0m"

while True:
  try:
    absolute_dir = os.getcwd()
    current_dir = absolute_dir.split('/')[-1]
    
    prompt = "-- " + yellow_color(current_dir) + " 🚀 "
    user_input = input(f"{prompt}")
    
    user_input_stripped = user_input.strip()
    user_inputs = user_input_stripped.split(" ")
    
    if len(user_inputs) == 0:
      continue
    
    command = user_inputs[0]
    args = user_inputs[1:]
    
    if len(args) == 0:
      # assume that the command might be a directory
      directory_exists = check_if_dir_exists(command)
      
      if directory_exists:
        os.chdir(command)
        continue
    
    if command in COMMANDS:
      try:
        result = COMMANDS[command](args)
        if result:
          for line in result.splitlines():
            print(f"   {line}")
      except Exception as e:
        print(red_color(f"   Error executing command: {e}"))
    else:
      os.system(user_input_stripped)
    
  except KeyboardInterrupt:
    print("You cannot leave sorry.")
    # break