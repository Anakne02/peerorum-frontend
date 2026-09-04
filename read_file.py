with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if "map(" in line and "Student" not in line:
        pass
    if "map(" in line:
        print(f"{i}: {line.strip()}")
