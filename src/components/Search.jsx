import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsGeoAltFill } from 'react-icons/bs'
import {
  fetchWeatherByName,
  fetchWeatherByNameFiveD,
} from '../redux/weather/asyncActions'
import { cutString } from '../utils/cutString'
import cn from 'classnames'

const Search = ({ geo }) => {
  const dispatch = useDispatch()
  const location = useSelector((state) => state.location.location)
  const warning = useSelector((state) => state.weather.warning)

  const [value, setValue] = useState(geo)
  const inputRef = useRef(null)

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const getWeatherByName = (e) => {
    e.preventDefault()
    dispatch(
      fetchWeatherByName({
        value,
      })
    )
    dispatch(
      fetchWeatherByNameFiveD({
        value,
      })
    )
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const cutGeo = () => {
    return location.length > 15 ? cutString(location, 12) : location
  }

  return (
    <header className="search">
      <div className="search__geo">
        <BsGeoAltFill className="search__geo-svg" />
        <p>{cutGeo()}</p>
      </div>
      <form className="search__form" onSubmit={getWeatherByName}>
        <input
          placeholder="It's always sunny in the world "
          className={cn(
            'search__form-input',
            warning && 'search__form-input--warning'
          )}
          type="search"
          value={value}
          onChange={handleInput}
          ref={inputRef}
        />
        <button
          className="search__form-btn"
          type="submit"
          disabled={value === '' ? true : false}
        >
          Search
        </button>
      </form>
    </header>
  )
}

export default Search
