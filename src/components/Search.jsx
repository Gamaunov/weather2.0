import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsGeoAltFill } from 'react-icons/bs'
import cn from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  fetchWeatherByName,
  fetchWeatherByNameFiveD,
} from '../redux/weather/asyncActions'
import { FAILED } from '../redux/constants'
import { cutString } from '../utils/cutString'

const Search = ({ geo }) => {
  const dispatch = useDispatch()
  const location = useSelector((state) => state.location.location)
  const warning = useSelector((state) => state.weather.warning)
  const status = useSelector((state) => state.weather.status)

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

  const notify = () => {
    if (status === FAILED) {
      toast.error('Please check the spelling', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  useEffect(() => {
    notify()
  }, [status])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
    </>
  )
}

export default Search
