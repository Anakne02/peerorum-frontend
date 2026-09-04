with open("src/api/compare.ts", "r") as f:
    content = f.read()

content = content.replace(
    "params?: { university?: string, major?: string, minGpa?: number, maxGpa?: number }",
    "params?: { university?: string, major?: string, entranceYear?: number, desiredJob?: string, minGpa?: number, maxGpa?: number }"
)

with open("src/api/compare.ts", "w") as f:
    f.write(content)
