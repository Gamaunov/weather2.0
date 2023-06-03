import { createSlice } from '@reduxjs/toolkit'
import { FAILED, PENDING, SUCCEEDED } from '../constants'
import {
  fetchWeather,
  fetchWeatherByName,
  fetchWeatherByNameFiveD,
  fetchWeatherFiveD,
} from './asyncActions'

const initialState = {
  status: PENDING,
  current: {},
  fiveDays: [],
  date: '',
  warning: false,
}
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.status = PENDING
      state.current = {}
      state.warning = false
    })

    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.current = action.payload
      state.status = SUCCEEDED
    })

    builder.addCase(fetchWeather.rejected, (state) => {
      state.status = FAILED
      state.current = {}
      state.warning = true
    })
    //fetchWeatherFiveD
    builder.addCase(fetchWeatherFiveD.pending, (state) => {
      state.status = PENDING
      state.fiveDays = []
      state.date = ''
      state.warning = false
    })

    builder.addCase(fetchWeatherFiveD.fulfilled, (state, action) => {
      state.fiveDays = action.payload.list
      state.date = action.payload.list[0].dt_txt.slice(0, 10)
      state.status = SUCCEEDED
    })

    builder.addCase(fetchWeatherFiveD.rejected, (state) => {
      state.status = FAILED
      state.fiveDays = []
      state.date = ''
      state.warning = true
    })
    //fetchWeatherByName
    builder.addCase(fetchWeatherByName.pending, (state) => {
      state.status = PENDING
      state.current = {}
      state.warning = false
    })

    builder.addCase(fetchWeatherByName.fulfilled, (state, action) => {
      state.current = action.payload
      state.status = SUCCEEDED
    })

    builder.addCase(fetchWeatherByName.rejected, (state) => {
      state.status = FAILED
      state.current = {}
      state.warning = true
    })
    //fetchWeatherByNameFiveD
    builder.addCase(fetchWeatherByNameFiveD.pending, (state) => {
      state.status = PENDING
      state.date = ''
      state.fiveDays = []
      state.warning = false
    })

    builder.addCase(fetchWeatherByNameFiveD.fulfilled, (state, action) => {
      state.date = action.payload.list[0].dt_txt.slice(0, 10)
      state.fiveDays = action.payload.list
      state.status = SUCCEEDED
    })

    builder.addCase(fetchWeatherByNameFiveD.rejected, (state) => {
      state.status = FAILED
      state.date = ''
      state.fiveDays = []
      state.warning = true
    })
  },
})

export default weatherSlice.reducer
