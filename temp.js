export const COLLEGES: College[]
const allDeps = COLLEGES.flatMap(c => c.departments);
console.log(JSON.stringify(allDeps));