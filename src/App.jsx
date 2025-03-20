import { useEffect, useState } from 'react'

import './App.css'

import clearsky from "./assets/whaether/clearsky.png";
import fewcloud from "./assets/whaether/fewcloud.png";
import scatter from "./assets/whaether/scatter.png";
import brokencloud from "./assets/whaether/brokencloud.png";
import showerrain from "./assets/whaether/showerrain.png";
import rain from "./assets/whaether/rain.png";
import thunder from "./assets/whaether/thunder.png";
import snow from "./assets/whaether/snow.png";
import mist from "./assets/whaether/mist.png";


function App() {

 
 
  const [icon,setIcon]=useState(clearsky );
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [text,setText]=useState("Chennai");

  const [country,setCountry]=useState("IN");

  const [lan,setLan]=useState(0);
  const [lon,setLon]=useState(0);

  const [humidity,setHumidity]=useState(0);
  const [speed,setspeed]=useState(0);


  
  function cityhandler(e){
    const value=e.target.value;
    setText(value);
  
  }

  const iconHadnler={
    "01d":clearsky,
    "02d":fewcloud,
    "03d":scatter,
    "04d":brokencloud,
    "09d":showerrain,
    "10d":rain,
    "11d":thunder,
    "13d":snow,
    "50d":mist,
    "01n":clearsky,
    "02n":fewcloud,
    "03n":scatter,
    "04n":brokencloud,
    "09n":showerrain,
    "10n":rain,
    "11n":thunder,
    "13n":snow,
    "50n":mist
  };
// console.log(iconHadnler["01d"]);

  async function getApi(){

    try{
    let apikey="17af60024780b99fd2513e1479c00c21";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    let res=await fetch(url);
    let data= await res.json();
    if (data.cod ==="404"){
      console.error("city not found");
      return;
    }
    setLan(data.coord.lat);
    setLon(data.coord.lon);
    setCountry(data.sys.country); 
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setCity(data.name);
    setspeed(data.wind.speed);
    const iconCode=data.weather[0].icon;

    console.log(iconCode)
    setIcon(iconHadnler[iconCode]);


    }
    catch(error){
      console.error(error)
    }
    finally{

    }

  }
  useEffect(()=>{
    getApi();
  }
  ,[]);

  const keyHandle=(e)=>{
    if(e.key=="Enter"){
      getApi();
    }
  }

  return (
    <>
    <div className=" card_cantainer">
      <div className='search'>  
          <input type="text" name='search' placeholder='Search city' onChange={cityhandler} onKeyDown={keyHandle} value={text} />
          <img className='' src="weather.png" onClick={()=>getApi()} alt="" />
      </div>
      <div className="details">
      <img src={icon} className='image' alt="" />
      <h2 className="temp">{temp}&deg; C</h2>
      <h3 className="city">{city}</h3>
      <h4 className='country'>{country}</h4>

      </div>
      <div className='loc'>
        <div className='lan'>
          <span >Latitude</span>
          <span >{lan}</span>
        </div>
        <div className='lon'>
          <span >Longitude</span>
      <span >{lon}</span>
        </div>
      </div>
      <div className='other'>
        <div className='humanity'>
        <img src="humidity.png" alt="" />
        <span >{humidity}%</span>
        <span >huminiy</span>
        
        </div>
        <div className='speed'>
          <img src="pngegg.png" alt="" />
        <span >{speed}km/h</span>
        <span >Windspeed</span>
       
        </div>
      </div>
    </div>  
    </>
  )
}

export default App
