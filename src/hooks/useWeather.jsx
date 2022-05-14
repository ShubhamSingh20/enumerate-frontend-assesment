import { useState } from "react"

const API_URL = "https://api.weatherapi.com/v1"
const API_HISTORY = "history.json"
const API_FORECAST = "forecast.json"
const API_KEY = "7dc79ae22c9441a6a4b151803221305"

const today = new Date().toISOString().split('T')[0]


export default function useWeather() {
  const [isFetching, setIsFetching] = useState(false)
  const [forcastData, setForCastData] = useState(null)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    city: null,
    date: today
  })

  function getForecast() {
    setError(null)
    setIsFetching(true)

    const urlParams = new URLSearchParams()

    urlParams.append('key', API_KEY)
    urlParams.append('q', form.city)
    urlParams.append('dt', form.date)

    const path = form.date == today ? API_FORECAST : API_HISTORY
    const finalUrl = `${API_URL}/${path}?${urlParams.toString()}`
    
    fetch(finalUrl)
      .then(async (res) => {
        const jsonResponse = await res.json()

        if(parseInt(res.status) >= 400) {
          setError(jsonResponse.error)
          setForCastData(null)
        }
        else{
          setForCastData(jsonResponse)
        }
      })
      .finally(() => setIsFetching(false))
  }

  return { form, setForm, forcastData, isFetching, getForecast, error}
}