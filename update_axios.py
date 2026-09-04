with open('src/api/axios.ts', 'r') as f:
    content = f.read()

# Replace hardcoded localhost refresh url to relative path that works via proxy or env var
content = content.replace(
    "'http://localhost:8080/api/auth/refresh'",
    "import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth/refresh` : '/api/auth/refresh'"
)

# Also fix the baseURL default
content = content.replace(
    "baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',",
    "baseURL: import.meta.env.VITE_API_BASE_URL || '/api',"
)

with open('src/api/axios.ts', 'w') as f:
    f.write(content)
