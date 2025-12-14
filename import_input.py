from pathlib import Path
import shutil

source_dir = Path(__file__).parent.parent / "AdventOfCodeInput"
dest_dir = Path(__file__).parent

if not (source_dir).exists():
    raise NotADirectoryError(source_dir)

for txt_file in source_dir.rglob("*.txt"):
    relative = txt_file.relative_to(source_dir)
    target = dest_dir / relative
    
    # ensure destination directories exist
    target.parent.mkdir(parents=True, exist_ok=True)

    shutil.copy(txt_file, target)
