# -*- coding: utf-8 -*-
import shutil
from pathlib import Path

src = Path(r"c:\Users\Леонид\Desktop\диплом\6 ПЗ.docx")
dst = Path(r"c:\trip-spark-90\_diplom_6pz.docx")
if not src.exists():
    raise SystemExit(f"not found: {src}")
shutil.copy(src, dst)
print("copied", dst)
