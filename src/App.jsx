import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard';



function App() {
  const [coords, setCoords] = useState()
  const [weather,setWeather] = useState()
  const [temperature,setTemperature] = useState()
  const [isLoading, setIsLoading]= useState(true)
  const [icon, setIcon] = useState('')

  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')

  const handleSearch = () => setValue(search)


  useEffect( () => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect( () => {
    if(coords){
      //(api del profe) const APIKey = 'd993d119ca66d0a611399e0a7acadf4a'
      const APIKey = 'e162520dfbffcc1a4d59a02777bfc04f'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`
      
      axios.get(url)
        .then(res => {
          setWeather(res.data)
      
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp -273.15) * 9/5 + 32).toFixed(1)
          }
          setTemperature(obj)
          setIcon(res.data.weather[0].main)
        })
        .catch(() => setWeather(false))
        .finally(() => setIsLoading(false))
    }
  },[coords, value])

  return (
    <div className="App">
      {
      isLoading ? 
        <span className="loader"></span>
      :
      <>
      <article className='card'>
        <h1 className='card__title'>Weather App</h1>
        <div className='search__box'>
        <input onChange={(e) => setSearch(e.target.value)} className='search__box-input' type='text' placeholder='Try other city..'/>
        <button onClick={handleSearch} className='search__box-button'><i className='bx bx-search'></i></button>
        </div>
        {
        (weather) 
        ?
        <>
        <WeatherCard
        temperature={temperature}
        weather={weather}
        icon={icon}
        />
        </>
        : 
        <div className='notfound'>
      <h1>{"City not found"}</h1>
      <img className='notfound__img' src="not-found.png" alt="notfound"/>
        </div>
        }
      </article> 
      </>
      }
    </div>
  )
}

export default App
