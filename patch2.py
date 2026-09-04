with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    content = f.read()

import_statement = "import { COLLEGES } from '../../data/departments'\n"
if "import { COLLEGES }" not in content:
    content = content.replace("import { JOB_CATEGORIES } from '../../data/jobCategories'", "import { JOB_CATEGORIES } from '../../data/jobCategories'\n" + import_statement)

old_dropdown = """                <select
                  value={pendingMajor}
                  onChange={(e) => setPendingMajor(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2.5 text-[13px] text-ink-900 outline-none focus:border-blue-500"
                >
                  <option value="경영학부">경영학부</option>
                  <option value="컴퓨터공학과">컴퓨터공학과</option>
                  <option value="경영학과">경영학과</option>
                </select>"""

new_dropdown = """                <select
                  value={pendingMajor}
                  onChange={(e) => setPendingMajor(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2.5 text-[13px] text-ink-900 outline-none focus:border-blue-500"
                >
                  {COLLEGES.map((college) => (
                    <optgroup key={college.name} label={college.name}>
                      {college.departments.map((department) => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>"""

content = content.replace(old_dropdown, new_dropdown)

with open("src/pages/compare/CompareSpec2Page.tsx", "w") as f:
    f.write(content)
