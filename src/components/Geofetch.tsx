import { Component } from 'react'

type Props = {};
type State = {
    lat: number,
    lon: number,
    temp: number,
    humidity: number


}

class Geofetch extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
            temp: 0,
            humidity: 0
        }
    }

    componentDidMount() {
        this.getLocation()
        this.showWeather()
    }


    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            }
        )
    }

    showWeather() {
        const key = "8cf32879d13bc9acc9e3d9341dc5465c"

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${key}`)
            .then(
                res => res.json()
            )
            .then(
                json => {
                    this.setState({
                        temp: json.main.temp,
                        humidity: json.main.humidity
                    })
                }
            )

        .catch (
        Error => console.log(Error)
        )
    }

    render() {
        return (
            <div>
                <p>Your coordinates: {this.state.lat}, {this.state.lon}</p>

                <p>Current Temperature: {this.state.temp}</p>
                <p>Humidity Level: {this.state.humidity}</p>

            </div>
        )
    }
}

export default Geofetch
