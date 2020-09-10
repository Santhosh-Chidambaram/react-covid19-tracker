import React,{useEffect,useState} from 'react';
import './App.css';
import {Card, FormControl,MenuItem,Select} from '@material-ui/core'
import InfoBox from './components/InfoBox';
import Table from './components/Table'
import { sortData } from './utils/sortdata';
import LineGraph from './components/LineGraph';
import MapComponent from './components/Map';
import 'leaflet/dist/leaflet.css'
function App() {

  //https://disease.sh/v3/covid-19/countries Getting countreis End Point
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCenter,setMapCenter] = useState({
    lat:34.80746,lng:-40.4796
  })
  const [mapCountries,setMapCountries] = useState([])
  useEffect(() =>{
        const getCountryInfo = async () =>{
          await fetch('https://disease.sh/v3/covid-19/all')
          .then(response => response.json())
          .then(data =>{
            console.log(data)
            setCountryInfo(data)
          })
        }

        getCountryInfo()
  },[])


  useEffect(() =>{
      const getAllCountries = async () =>{

        await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data =>{
          const countries = data.map((country) =>{
            return{
              name:country.country,
              value:country.countryInfo.iso2

            }
          })

          setCountries(countries)
          setMapCountries(data)
          const sortedData = sortData(data)
          setTableData(sortedData)
        })
      }

      getAllCountries()

  },[])

  const handleCountryChange = async (event) =>{
      const countryCode = event.target.value;
      const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`
      
      await fetch(url)
      .then(response => response.json())
      .then(data =>{
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
        setMapZoom(4)
      })
      
      
  }

  return (
    <div className="app">
      <div className='app__left'>

      <div className='app__header'>
      <h1>Covid 19 Tracker</h1>
      <div className='form'>
      <FormControl >
          <Select variant="outlined" value={country} onChange={handleCountryChange}>
                <MenuItem value='worldwide'>Worldwide</MenuItem>
                {
                  countries.map(country =>{
                  return <MenuItem value={country.value}>{country.name}</MenuItem>
                  })
                }
          </Select>
        </FormControl>
      </div>
       

      </div>

      <div className="app__stats">
      <InfoBox title="Coronovirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
      <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
      <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

        
      </div>

       <MapComponent center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType="cases"/>           

      </div>


      <Card className='app__right'>
        <h3>Live Cases by country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
          <LineGraph />
      </Card>
       
    </div>
  );
}

export default App;
