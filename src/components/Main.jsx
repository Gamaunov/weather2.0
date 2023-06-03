import { useState } from 'react'

import WeatherToday from './WeatherToday'
import WeatherSeveralDays from './WeatherSeveralDays'

const Main = () => {
  const [showFiveD, setShowFiveD] = useState(false)

  return (
    <main>
      <WeatherToday setShowFiveD={setShowFiveD} />
      {showFiveD && <WeatherSeveralDays />}
    </main>
  )
}

export default Main
