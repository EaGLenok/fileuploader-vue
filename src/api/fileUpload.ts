import axios from 'axios'
import type { AxiosInstance } from 'axios'

const baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5025'

const instance: AxiosInstance = axios.create({ baseURL })

export function uploadFile(formData: FormData) {
    return instance.post('/api/FileUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
