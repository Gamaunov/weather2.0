import { useState } from 'react'

import WeatherToday from './WeatherToday'
import WeatherSeveralDays from './WeatherSeveralDays'

const Main = () => {
  const [showFiveD, setShowFiveD] = useState(false)

  return (
    <main className="main">
      <WeatherToday setShowFiveD={setShowFiveD} showFiveD={showFiveD} />
      <div className="main__five">{showFiveD && <WeatherSeveralDays />}</div>
    </main>
  )
}

export default Main
