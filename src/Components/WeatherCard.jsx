import { dateTimeTo12HourTime } from "../helper"

const HourlyForecastCell = ({ forecast }) => 
  <div className="mr-auto mb-0 flex shadow-xl justify-between items-center min-w-full flex-wrap">
  <p className="text-lg dark:text-white">{dateTimeTo12HourTime(forecast.time)}</p>
  <p className="text-lg dark:text-white">
    {forecast.temp_c}&deg;C
    <span className="block my-1"><small>{forecast.condition.text} <img src={`https:${forecast.condition?.icon}`} /></small></span>
  </p>
</div>

export default function WeatherCard({ data }) {
  const { forecast, location, current } = data
  const today = forecast.forecastday[0]

  return (
    <div className="mx-auto p-4 h-screen flex justify-center">
      <div className="flex flex-wrap min-w-full">
        <div className="w-full px-2">
          <div className="text-white relative break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-white dark:bg-gray-600">
            <div className="px-6 py-6 relative">
              <div className="flex mb-4 justify-between items-center">
                <div>
                  <h5 className="mb-0 font-medium text-xl">{location.name}, {location.country}</h5>
                  <h6 className="mb-0">{today.date}</h6><small>{today.day.condition?.text} <img src={`https:${today.day.condition?.icon}`} /></small>
                </div>
                {!!current && <div className="text-right">
                  <h3 className="font-bold text-4xl mb-0"><span>{current.temp_c}&deg;C</span></h3>
                </div>}
              </div>
              <div className="block sm:flex justify-between items-center flex-wrap">
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2  items-center"><span>Temp min</span><small className="px-2 inline-block">{today.day?.mintemp_c}&nbsp;&deg;C</small></div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 items-center"><span>Temp max</span><small className="px-2 inline-block">{today.day?.maxtemp_c}&nbsp;&deg; C</small></div>
                </div>
              </div>
            </div>
            <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><small>Forecast</small></span></div>
            <div className="px-6 py-6 relative">
              <div className="text-center items-center flex flex-col">
                {today.hour.map((hr) => <HourlyForecastCell forecast={hr} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}