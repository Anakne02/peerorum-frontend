with open("src/pages/mypage/SpecEditPage.tsx", "r") as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if "api" in line.lower() or "axios" in line.lower() or "fetch" in line.lower() or "upload" in line.lower():
        print(f"{i}: {line.strip()}")
