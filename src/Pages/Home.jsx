import useWeather from "../hooks/useWeather";
import WeatherCard from "../Components/WeatherCard";
import Spinner from "../Components/Spinner"
import {DangerAlert} from "../Components/Alerts"
import { formattedDate } from "../helper";

const CURRENT_DATE = formattedDate()
const MIN_DATE = formattedDate((new Date()).setDate((new Date()).getDate() - 5)) // Free version of API only supports past 5 days

export default function Home() {
  const { form, error, setForm, getForecast, isFetching, forcastData } = useWeather()

  const handleSubmit = (e) => {
    e.preventDefault()
    getForecast()
  }

  return (
    <>
    <div>
      {!!error && <DangerAlert message={error.message} />}
    </div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-14">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Weather Forecast</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="lg:w-2/3 mx-auto h-14 px-4 m-1  placeholder-gray-400 bg-transparent border-2 min-h-10 lg:h-12"
              type="search" name="query"
              placeholder="Type Any City e.g Mumbai"
              required="required"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.currentTarget.value })}
            />
            <button type="button" onClick={handleSubmit} className="text-white ml-1 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            {!!forcastData && <div>
              <label>Select Date From past 5 days: </label>
              <input
                className="ml-1 lg:w-1/3 mx-auto h-14 px-4 m-1 border-2 min-h-10 lg:h-12"
                type="date"
                max={CURRENT_DATE}
                min={MIN_DATE}
                value={form.date}
                required="required"
                onChange={(e) => setForm({ ...form, date: e.currentTarget.value })}
              />
            </div>}
          </form>
        </div>

        <div className="lg:w-2/4 w-full mx-auto overflow-auto">
          {!!isFetching ? <Spinner /> : !!forcastData && <WeatherCard data={forcastData} />}
        </div>
      </div>
    </section>
    </>
  )
}
