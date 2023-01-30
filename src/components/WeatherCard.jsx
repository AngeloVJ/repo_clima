import React, { useState } from 'react'
import Icons from './Icon'

const WeatherCard = ({weather, temperature,icon}) => {

  const [isCelsius, SetIsCelsius] = useState(true)
  const handleClick = () => SetIsCelsius(!isCelsius)

  return(
    <article>
        <h2 className='card__subtitle'>{weather?.name}, {weather?.sys.country}</h2>
        <div className='card__body'>
            <div className='card__img-container'>
          <img className='icon' src={Icons(icon)} alt="icon-weather" />
            </div>
            <section className='card__info'>
            <h3 className='card__info-title'>"{weather?.weather[0].description}"</h3>
            <ul className='card__info-body'>
                <li className='card__info-item'><span className='card__info-label'>Wind:</span> {weather?.wind.speed}m/s</li>
                <li className='card__info-item'><span className='card__info-label'>Clouds:</span>{weather?.clouds.all}%</li>
                <li className='card__info-item'><span className='card__info-label'>Pressure:</span>{weather?.main.pressure}hPa</li>
            </ul>
             </section>
        </div>  
    
        <footer className='card__footer'>
            <h2 className='card__temperature'>{isCelsius ? temperature?.celsius + '°C'
                                                     :temperature?.farenheit + '°F'}</h2>
            <button className='card__btn' onClick={handleClick}>Change to °{isCelsius ?'F':'C'}</button>
        </footer>
    </article>
  ) 
}

export default WeatherCard
