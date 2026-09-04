with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    content = f.read()

# Update mapped object to use p.internCount
old_map = """    certs: p.verificationCount + '개',
    intern: '없음',
    rank: i + 1,"""
new_map = """    certs: p.verificationCount + '개',
    intern: p.internCount > 0 ? p.internCount + '회' : '없음',
    rank: i + 1,"""
content = content.replace(old_map, new_map)

with open("src/pages/compare/CompareSpec2Page.tsx", "w") as f:
    f.write(content)
