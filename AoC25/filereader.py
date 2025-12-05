from pathlib import Path

def _getFilename():
    filename = ""
    while True:
        file_type = input("input.txt/example.txt (i/e):")
        if file_type == "i" or file_type == "e":
            filename = "input.txt" if file_type == "i" else "example.txt"
            break
        print("invalid input")
    
    return filename

def _read_lines(file) -> list[str]:
    filename = _getFilename()
    p = Path(file).with_name(filename)
    with p.open() as f:
        return [line.rstrip("\n") for line in f]


def _read_text(file) -> str:
    filename = _getFilename()
    p = Path(file).with_name(filename)
    with p.open() as f:
        return f.read()

def read_file(type, file):
    if type != "lines" and type != "text":
        return
    
    if type == "lines":
        return _read_lines(file)
    else:
        return _read_text(file)
