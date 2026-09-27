const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(path, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    return res.json()
  }

  async post(path, body, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify(body),
      ...options,
    })
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    return res.json()
  }

  async put(path, body, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify(body),
      ...options,
    })
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    return res.json()
  }
}

export const apiClient = new ApiClient(BASE_URL)
export default apiClient
