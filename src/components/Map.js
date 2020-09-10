
import React from 'react'
import {Map,TileLayer,Circle,Popup} from 'react-leaflet';
import '../Map.css'
import { caseTypeColor } from '../utlis';
import numeral from 'numeral'
function MapComponent({center,zoom,casesType,countries}) {
    return (
        <div className='map'>
            <Map center={center} zoom={zoom}>
                <TileLayer 
                     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                {
                    countries.map(country => {
                        return(
                            <Circle
                            center={[country.countryInfo.lat,country.countryInfo.long]}
                            fillOpacity={0.4}
                            color={caseTypeColor[casesType].hex}
                            fillColor={caseTypeColor[casesType].hex}
                            radius={
                                Math.sqrt(country[casesType] * caseTypeColor[casesType].multiplier*100)
                            }
                            >
                               <Popup >
                                  <div>
                                      <div className="info__flag"  style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                                  <div className="info__name">{country.country}</div>
                                    <div className="info__cases">Cases :{numeral(country.cases).format("0,0")} </div>
                                    <div className="info__recovered">Recovered :{numeral(country.recovered).format("0,0")} </div>
                                    <div className="info__deaths">Deaths :{numeral(country.deaths).format("0,0")} </div>
                                  </div>
                               </Popup>     
                            </Circle>
                        )
                    })
                }

            </Map>
        </div> 
    )
}

export default MapComponent
