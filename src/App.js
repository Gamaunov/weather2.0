import { useEffect } from 'react'

import Search from './components/Search'
import Main from './components/Main'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather, fetchWeatherFiveD } from './redux/weather/asyncActions'
import { SUCCEEDED } from './redux/constants'

function App() {
  const dispatch = useDispatch()

  const location = useSelector((state) => state.location.location)
  const current = useSelector((state) => state.weather.current)
  const fiveDays = useSelector((state) => state.weather.fiveDays)
  const status = useSelector((state) => state.weather.status)

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  const getWeather = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    dispatch(
      fetchWeather({
        latitude,
        longitude,
      })
    )
    dispatch(
      fetchWeatherFiveD({
        latitude,
        longitude,
      })
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="weather">
      {status === SUCCEEDED ? (
        <>
          <Search geo={''} />
          <Main />
        </>
      ) : (
        <section className="geolocation-denied">
          <Search geo={location} />
        </section>
      )}
    </div>
  )
}

export default App
