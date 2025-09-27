import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL

// Get current user (needs token cookie)
export async function getMe() {
    const res = await axios.get(`${API_BASE}/user/me`, { withCredentials: true })
    return res.data
}

// Get all incidents
export async function getIncidents() {
    const res = await axios.get(`${API_BASE}/incident`, { withCredentials: true })
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
