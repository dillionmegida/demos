import os
  
def check_if_dir_exists(path: str) -> bool:
    return os.path.isdir(path)