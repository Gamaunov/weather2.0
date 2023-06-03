import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (params) => {
    const { latitude, longitude } = params
    const { data } = await axios.get(
      `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
    return data
  }
)

export const fetchWeatherFiveD = createAsyncThunk(
  'weather/fetchWeatherFiveD',
  async (params) => {
    const { latitude, longitude } = params
    const { data } = await axios.get(
      `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
    return data
  }
)

export const fetchWeatherByName = createAsyncThunk(
  'weather/fetchWeatherByName',
  async (params) => {
    const { value } = params
    const { data } = await axios.get(
      `${BASE_URL}/weather?q=${value}&appid=${API_KEY}`
    )
    return data
  }
)

export const fetchWeatherByNameFiveD = createAsyncThunk(
  'weather/fetchWeatherByNameFiveD',
  async (params) => {
    const { value } = params
    const { data } = await axios.get(
      `${BASE_URL}/forecast?q=${value}&appid=${API_KEY}`
    )
    return data
  }
)
