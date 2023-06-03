import { useSelector } from 'react-redux'

const WeatherSeveralDays = () => {
  const fiveDays = useSelector((state) => state.weather.fiveDays)
  
  const fiveDaysArr = [
    fiveDays[1],
    fiveDays[9],
    fiveDays[17],
    fiveDays[25],
    fiveDays[33],
  ]
  return (
    <section className="several-days">
      <h2 className="several-days__title">5 days</h2>
      <div className="several-days__days">
        {fiveDaysArr.map((item) => (
          <div className="several-days__day" key={item.dt_txt}>
            <h3>{item.dt_txt.slice(8, 10)}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="Icon Weather"
            />
            <p>{(item.main.temp_max - 273.15).toFixed()}°C</p>
            <p>{(item.main.temp_min - 273.15).toFixed()}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherSeveralDays
