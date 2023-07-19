import axios from 'axios'
import { API_URL } from './API'

export const axiosServer = axios.create({
  baseURL: API_URL.MOVIES,
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + process.env.TOKEN
  }
})

export const axiosClient = axios.create({
  baseURL: API_URL.MOVIES,
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN
  }
})
