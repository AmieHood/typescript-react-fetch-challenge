import React, { Component } from 'react'
import { getPositionOfLineAndCharacter } from 'typescript'

type WeatherState = {
    lat: number,
    lon: number,
    temp: number, 
    tempMax: number,
    tempMin: number
}

class Locate extends Component<{}, WeatherState> {
    constructor(props: {}){
        super(props)
        this.state = { 
            lat: 0,
            lon: 0,
            temp: 0, 
            tempMax: 0,
            tempMin: 0
        }
        this.returnWeather = this.returnWeather.bind(this)
        this.getLocation = this.getLocation.bind(this)
    }

    


    async returnWeather() : Promise<void>{
        let lat = this.state.lat
        let lon = this.state.lon
        let apiKey = '44f658ecdd6d9bcedddf97d114d8dd9c'

        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            let json = await res.json()
            console.log(json);
            
            console.log(Math.round(json.main.temp))
            
            this.setState({ 
                temp: json.main.temp, 
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min
            })
        } catch (err) {
            console.log(err);
        }

    }

    getLocation(): void{
        navigator.geolocation.getCurrentPosition(position => {
            console.log("Latitude is", position.coords.latitude);
            console.log("Longitude is", position.coords.longitude);
            
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
            
        })
    } 

        
        componentDidMount() {
            // "geolocation" in navigator ?
            // console.log("available") :
            // console.log("not available")            
            this.getLocation()
        }

    render(){
        return(
            <>
            <button onClick={this.returnWeather}>Get the Weather in your area</button>
            <h1>Temperature: {this.state.temp}</h1>
            <h1>High: {this.state.tempMax}</h1>
            <h1>Low: {this.state.tempMin}</h1>
            </>
        )
    }
}



export default Locate