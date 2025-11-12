import os
from typing import List
import platform

def echo(args: List[str]) -> str:
    """
    Echo the provided arguments back to the console.
    Usage: echo [text...]
    """
    return ' '.join(args) if args else ''

def list_directory(args: List[str] = None) -> str:
    """
    List directory contents.
    Usage: ls [directory]
    """
    path = args[0] if args else '.'
    try:
        return '\n'.join(os.listdir(path))
    except FileNotFoundError:
        return f"Directory not found: {path}"
    except NotADirectoryError:
        return f"Not a directory: {path}"


def make_directory(args: List[str]) -> str:
    """
    Create a new directory.
    Usage: mkdir [directory_name]
    """
    if not args:
        return "Error: Please specify a directory name"
    
    try:
        os.makedirs(args[0], exist_ok=True)
        return f"Created directory: {args[0]}"
    except OSError as e:
        return f"Error creating directory: {e}"


def change_directory(args: List[str]) -> str:
    """
    Change the current working directory.
    Usage: cd [directory]
    """
    if not args:
        return ""  # No args means go to home directory (handled in main.py)
    
    # try:
    os.chdir(args[0])
    return ""
    # except FileNotFoundError:
    #     return f"Directory not found: {args[0]}"
    # except NotADirectoryError:
    #     return f"Not a directory: {args[0]}"


def get_system_info() -> str:
    """
    Get system information.
    Usage: sysinfo
    """
    info = [
        f"System: {platform.system()}",
        f"Node: {platform.node()}",
        f"Release: {platform.release()}",
        f"Version: {platform.version()}",
        f"Machine: {platform.machine()}",
        f"Processor: {platform.processor()}",
        f"Python: {platform.python_version()}",
    ]
    return '\n'.join(info)


def help_command() -> str:
    """
    Show help information for available commands.
    Usage: help
    """
    commands = {
        'echo': 'Echo the provided arguments back to the console',
        'ls': 'List directory contents',
        'mkdir': 'Create a new directory',
        'cd': 'Change the current working directory',
        'sysinfo': 'Display system information',
        'help': 'Show this help message',
        'exit/quit': 'Exit the shell'
    }
    
    help_text = ["Available commands:"]
    for cmd, desc in commands.items():
        help_text.append(f"  {cmd:<10} - {desc}")
    
    return '\n'.join(help_text)

COMMANDS = {
    'echo': echo,
    'ls': list_directory,
    'mkdir': make_directory,
    'cd': change_directory,
    'sysinfo': lambda _: get_system_info(),
    'help': lambda _: help_command(),
}