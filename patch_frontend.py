with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    content = f.read()

old_tr_class = 'className="cursor-pointer border-b border-gray-50 last:border-none hover:bg-gray-50/70"'
new_tr_class = 'className={`cursor-pointer border-b border-gray-50 last:border-none hover:bg-gray-50/70 ${student.isMe ? \'bg-blue-50/50\' : \'\'}`}'

if old_tr_class in content:
    content = content.replace(old_tr_class, new_tr_class)

old_name = '<p className="text-[13px] font-semibold text-ink-900">{student.anonId}</p>'
new_name = """<p className="text-[13px] font-semibold text-ink-900">
                            {student.anonId}
                            {student.isMe && <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-800">내 스펙</span>}
                          </p>"""

if old_name in content:
    content = content.replace(old_name, new_name)

with open("src/pages/compare/CompareSpec2Page.tsx", "w") as f:
    f.write(content)
