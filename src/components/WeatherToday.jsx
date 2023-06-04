import { LuThermometerSun } from 'react-icons/lu'
import { BsFillDropletFill } from 'react-icons/bs'
import { FaCloudSunRain } from 'react-icons/fa'
import { GiWindsock } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { setLocation } from '../redux/locationSlice'

const WeatherToday = ({ setShowFiveD, showFiveD }) => {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.weather.current)
  const [isActive, setActive] = useState('')

  const handleToggle = () => {
    !showFiveD ? setActive('weather-today__info-btn--hide') : setActive('')
    setShowFiveD(!showFiveD)
  }

  const addZero = (num) => {
    if (num < 10) return `0${num}`
    else return num
  }

  const cityTime = () => {
    let d = new Date(),
      utc = d.getTime() + d.getTimezoneOffset() * 60000,
      nd = new Date(utc + 1000 * current?.timezone),
      hours = addZero(nd.getHours()),
      minutes = addZero(nd.getMinutes())
    return `${hours} : ${minutes}`
  }

  useEffect(() => {
    dispatch(setLocation(current.name))
  }, [current])

  return (
    <section className="weather-today">
      <div className="weather-today__info">
        <span className="weather-today__info-data">
          <p className="weather-today__info-data--degree">
            {(current?.main?.temp - 273.15).toFixed()}&deg;
          </p>
          <p className="weather-today__info-data--day">
            Today <span>{cityTime()}</span>
          </p>
          <button
            onClick={handleToggle}
            className={cn('weather-today__info-btn', isActive)}
          >
            Five more days
          </button>
        </span>
        <img
          className="weather-today__info-icon"
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
          alt="weather icon"
        />
      </div>
      <div className="weather-today__details">
        <div className="weather-today__details-detail">
          <LuThermometerSun className="weather-today__details-icon" />
          <p className="weather-today__details-text">
            Temperature: {(current?.main.temp - 273.15).toFixed()}&deg;
          </p>
          <p>
            Feels like: {(current?.main.feels_like - 273.15).toFixed()}&deg;
          </p>
        </div>
        <div className="weather-today__details-detail">
          <BsFillDropletFill className="weather-today__details-icon" />
          <p className="weather-today__details-text">
            Pressure: {current?.main.pressure}
          </p>
        </div>
        <div className="weather-today__details-detail">
          <FaCloudSunRain className="weather-today__details-icon" />
          <p className="weather-today__details-text">
            Rainfall: {current?.weather[0].description}
          </p>
        </div>
        <div className="weather-today__details-detail">
          <GiWindsock className="weather-today__details-icon" />
          <p className="weather-today__details-text">
            Wind: {current?.wind.speed} m/s
          </p>
        </div>
      </div>
    </section>
  )
}

export default WeatherToday
