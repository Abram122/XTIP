import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL

// Get current user (needs token cookie)
export async function getMe() {
    const res = await axios.get(`${API_BASE}/user/me`, { withCredentials: true })
    return res.data
}
// Get current user Profile (needs token cookie)
export async function getProfile() {
    const res = await axios.get(`${API_BASE}/user/myprofile`, { withCredentials: true })
    return res.data
}
// Update User Profile (needs token cookie)
export async function updateProfile(payload: {
    fullName: string
    bio: string
    sector: string
}) {
    const res = await axios.patch(`${API_BASE}/user/updateprofile`, payload)
    return res.data
}

// Get news incidents
export async function getNews() {
    const res = await axios.get(`${API_BASE}/news`, { withCredentials: true })
    return res.data
}

// Create new incident
export async function createIncident(payload: {
    title: string
    description: string
    severity: string
}) {
    const res = await axios.post(`${API_BASE}/incident`, payload, {
        withCredentials: true,
    })
    return res.data
}

// Logout
export async function logout() {
    const res = await axios.post(`${API_BASE}/user/logout`, {}, { withCredentials: true })
    return res.data
}


// Scan URL
export async function scanUrl(url: string) {
    const res = await axios.post(
        `${API_BASE}/url/scan`,
        { url },
        { withCredentials: true }
    )
    return res.data
}

// Get Report
export async function getReport(id: string) {
    const res = await axios.get(`${API_BASE}/url/report/${id}`, {
        withCredentials: true,
    })
    return res.data
}

// IP Reputation
export async function getIpReputation(ip: string) {
    const res = await axios.post(`${API_BASE}/ip/ip-reputation`, { ip }, { withCredentials: true })
    return res.data
}

// Get incidents with filters
export async function getIncidents(filters?: { status?: string; name?: string; date?: string }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append("status", filters.status)
    if (filters?.name) params.append("name", filters.name)
    if (filters?.date) params.append("date", filters.date)

    const res = await axios.get(`${API_BASE}/incident`, {
        params,
        withCredentials: true,
    })
    return res.data
}

// Update incident 
export async function updateIncident(id: string, body: any) {
    const res = await axios.put(`${API_BASE}/incident/${id}`, body, { withCredentials: true })
    return res.data
}

// Add note to incident
export async function addIncidentNote(id: string, note: string) {
    const res = await axios.put(
        `${API_BASE}/incident/${id}`,
        { $push: { notes: note } },
        { withCredentials: true }
    )
    return res.data
}