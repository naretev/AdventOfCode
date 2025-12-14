from pathlib import Path
import shutil

source_dir = Path(__file__).parent
dest_dir = Path(__file__).parent.parent / "AdventOfCodeInput"

# ensure base destination exists
dest_dir.mkdir(parents=True, exist_ok=True)

valid_names = ("input.txt", "example.txt")

for txt_file in source_dir.rglob("*.txt"):
    if txt_file.name in valid_names:
        relative = txt_file.relative_to(source_dir)
        target = dest_dir / relative

        # create subdirectories if needed
        target.parent.mkdir(parents=True, exist_ok=True)

        shutil.copy(txt_file, target)
    else:
        print("Skipped file:", txt_file)
