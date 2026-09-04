with open("src/context/SpecContext.tsx", "r") as f:
    content = f.read()

old_str = """  const loadFromProfile = (profile: MyProfileData) => {
    const newEntries: SpecEntries = {
      gpa: profile.gpa ? [{ gpaAverage: String(profile.gpa) }] : [],
      language: [],"""

new_str = """  const loadFromProfile = (profile: MyProfileData) => {
    const languageEntries = [];
    if (profile.toeicScore) {
      languageEntries.push({ test: 'TOEIC', score: String(profile.toeicScore), _status: 'verified' });
    }
    if (profile.opicGrade) {
      languageEntries.push({ test: 'OPIc', score: profile.opicGrade, _status: 'verified' });
    }
    if (profile.toeicSpeakingGrade) {
      languageEntries.push({ test: 'TOEIC Speaking', score: profile.toeicSpeakingGrade, _status: 'verified' });
    }

    const newEntries: SpecEntries = {
      gpa: profile.gpa ? [{ 
        gpaAverage: String(profile.gpa),
        majorGpaAverage: profile.majorGpa ? String(profile.majorGpa) : undefined,
        convertedScore: profile.convertedScore ? String(profile.convertedScore) : undefined,
        _status: 'verified'
      }] : [],
      language: languageEntries as any,"""

content = content.replace(old_str, new_str)
with open("src/context/SpecContext.tsx", "w") as f:
    f.write(content)
