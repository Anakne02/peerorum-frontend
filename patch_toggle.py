with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    content = f.read()

# Make pendingGrade nullable
content = content.replace("const [pendingGrade, setPendingGrade] = useState(DEFAULT_GRADE)", "const [pendingGrade, setPendingGrade] = useState<string | null>(DEFAULT_GRADE)")
content = content.replace("const [appliedGrade, setAppliedGrade] = useState(DEFAULT_GRADE)", "const [appliedGrade, setAppliedGrade] = useState<string | null>(DEFAULT_GRADE)")

# Update onClick for grade
content = content.replace("onClick={() => setPendingGrade(grade)}", "onClick={() => setPendingGrade(grade === pendingGrade ? null : grade)}")

# Update onClick for job
content = content.replace("onClick={() => setPendingJob(job)}", "onClick={() => setPendingJob(job === pendingJob ? null : job)}")

# Update search API call where appliedGrade is used
old_fetch = "const entranceYear = 2026 - parseInt(appliedGrade) + 1;"
new_fetch = "const entranceYear = appliedGrade ? 2026 - parseInt(appliedGrade) + 1 : undefined;"
content = content.replace(old_fetch, new_fetch)

with open("src/pages/compare/CompareSpec2Page.tsx", "w") as f:
    f.write(content)
