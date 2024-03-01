let weather = JSON.parse(window.localStorage.getItem("weather"))

page = document.querySelector("body").getAttribute("page")
months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let hourlyFunc = async (hourly, weather, sunrise, sunset, j, htmlToAdd) => {
    for (i = 0; i < hourly.length; i += 1) {
        e = hourly[i]
        let cloud = "none"
        let timeV = e.time
        timeV = new Date(timeV)
        let dateDisplay = `${months[timeV.getMonth()]} ${timeV.getDate()}, ${timeV.getFullYear()}`

        let time = `${(timeV.getHours() % 12) + 1}:00`

        if (timeV.getHours() / 12 >= 1) {
            time += " pm"
        } else {
            time += " am"
        }

        if (timeV.getHours() == 0) {
            sunrise = new Date(weather.data.timelines.daily[j].values.sunriseTime)
            sunset = new Date(weather.data.timelines.daily[j].values.sunsetTime)
            i += 1
            htmlToAdd.innerHTML += `<div style="height: 80px;" class="seperator">
                                                                    <div style="margin-top: 60px">${dateDisplay}</div>
                                                                </div>`
        }

        if (sunrise) {
            if (timeV.getHours() == sunrise.getHours()) {
                htmlToAdd += `<div style="height: 80px;" class="seperator">
                                                                        <div style="margin-top: 60px"><img src="./assets/sunrise.png" class="tempImg"><img> &thinsp;&thinsp;&thinsp;&thinsp;${sunrise.getHours()}:${sunrise.getMinutes()}</div>
                                                                    </div>`
            }
        }

        if (sunset) {
            if (timeV.getHours() == sunset.getHours()) {
                htmlToAdd += `<div style="height: 80px;" class="seperator">
                                                                        <div style="margin-top: 60px"><img src="./assets/sunset.png" class="tempImg"><img> &thinsp;&thinsp;&thinsp;&thinsp;${sunset.getHours()}:${sunset.getMinutes()}</div>
                                                                    </div>`
            }
        }

        let temp = e.values.temperatureApparent
        let id = crypto.randomUUID()
        id = "I" + id.replaceAll("-", "9")
        let sun = "0"
        if (timeV.getHours() > sunrise.getHours() && timeV.getHours() < sunset.getHours()) {
            sun = "0"
        } else if (timeV.getHours() < sunrise.getHours() || timeV.getHours() > sunset.getHours()) {
            sun = "1"
        }

        htmlToAdd += `<div class="card hourCard" data-bs-toggle="modal" data-bs-target="#${id}">
                                                                <div class="card-body text-center full">
                                                                    <table class="text-center full">
                                                                        <tr class="text-center full">
                                                                            <td><h4>${time}</h4></td>
                                                                            <td style="padding-left: 4%;"><img src="./assets/${e.values.weatherCode.toString() + sun}.png" class="tempImg"></td>
                                                                            <td style="padding-left: 8%;"><img src="./assets/tempreature.png" class="tempImg"> <span style="margin-left: -1%;">${temp}°C</span></td>
                                                                            <td style="padding-left: 8%;"><img src="./assets/wind.png" class="tempImg"> <span style="margin-left: -1%;">${e.values.windSpeed} m/s</span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>`

        htmlToAdd += `<div class="modal fade modal-centered" id="${id}" tabindex="-1" aria-hidden="true">
                                                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5">${date}, ${time}</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            Cloud Cover: ${e.values.cloudCover}% <br>
                                                                            Dew Point: ${e.values.dewPoint}°C <br>
                                                                            Freezing Rain Intensity: ${e.values.freezingRainIntensity} mm/hr <br>
                                                                            Humidity: ${e.values.humidity}% <br>
                                                                            Ice Accumulation: ${e.values.iceAccumulation} mm <br>
                                                                            Precipitation Prob: ${e.values.precipitationProbability}% <br>
                                                                            Pressure Level: ${e.values.pressureSurfaceLevel} hPa <br>
                                                                            Rain Accumulation: ${e.values.rainAccumulation} mm <br>
                                                                            Rain Intensity: ${e.values.rainIntensity} mm/hr <br>
                                                                            Sleet Accumulation: ${e.values.sleetAccumulation} mm <br>
                                                                            Sleet Intensity: ${e.values.sleetIntensity} mm/hr <br>
                                                                            Snow Accumulation: ${e.values.snowAccumulation} mm <br>
                                                                            Snow Depth: ${e.values.snowDepth} mm <br>
                                                                            Snow Intensity: ${e.values.snowIntensity} mm/hr <br>
                                                                            Temperature: ${e.values.temperature}°C <br>
                                                                            Temperature Apparent: ${e.values.temperatureApparent}°C <br>
                                                                            Visibility: ${e.values.visibility}% <br>
                                                                            Wind Direction: ${e.values.windDirection}° <br>
                                                                            Wind Gust: ${e.values.windGust} m/s <br>
                                                                            Wind Speed: ${e.values.windSpeed} m/s <br>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`
    };

    return htmlToAdd
}

let minutelyFunc = async (minutely, sunrise, sunset, htmlToAdd) => {
    for (i = 0; i < minutely.length; i += 1) {
        e = minutely[i]

        let timeV = e.time
        timeV = new Date(timeV)

        let minute = timeV.getMinutes().toString()
        if (minute.length == 1) {
            minute = "0" + minute
        }
        let time = `${(timeV.getHours() % 12) + 1}:${minute}`

        if (timeV.getHours() / 12 >= 1) {
            time += " pm"
        } else {
            time += " am"
        }

        let id = crypto.randomUUID()
        id = "I" + id.replaceAll("-", "9")
        let sun = "0"
        if (timeV.getHours() > sunrise.getHours() && timeV.getHours() < sunset.getHours()) {
            sun = "0"
        } else if (timeV.getHours() < sunrise.getHours() || timeV.getHours() > sunset.getHours()) {
            sun = "1"
        }

        htmlToAdd += `<div class="card hourCard" data-bs-toggle="modal" data-bs-target="#${id}">
                                                                <div class="card-body text-center full">
                                                                    <table class="text-center full">
                                                                        <tr class="text-center full">
                                                                            <td><h4>${time}</h4></td>
                                                                            <td style="padding-left: 8%;"><img src="./assets/${e.values.weatherCode.toString() + sun}.png" class="tempImg"></td>
                                                                            <td style="padding-left: 8%;"><img src="./assets/tempreature.png" class="tempImg"> <span style="margin-left: -1%;">${e.values.temperatureApparent}°C</span></td>
                                                                            <td style="padding-left: 10%;"><img src="./assets/wind.png" class="tempImg"> <span style="margin-left: -1%;">${e.values.windSpeed} m/s</span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>`

        htmlToAdd += `<div class="modal fade modal-centered" id="${id}" tabindex="-1" aria-hidden="true">
                                                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5">${time}</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            Cloud Cover: ${e.values.cloudCover}% <br>
                                                                            Dew Point: ${e.values.dewPoint}°C <br>
                                                                            Freezing Rain Intensity: ${e.values.freezingRainIntensity} mm/hr <br>
                                                                            Humidity: ${e.values.humidity}% <br>
                                                                            Precipitation Prob: ${e.values.precipitationProbability}% <br>
                                                                            Pressure Level: ${e.values.pressureSurfaceLevel} hPa <br>
                                                                            Rain Intensity: ${e.values.rainIntensity} mm/hr <br>
                                                                            Snow Intensity: ${e.values.snowIntensity} mm/hr <br>
                                                                            Temperature: ${e.values.temperature}°C <br>
                                                                            Temperature Apparent: ${e.values.temperatureApparent}°C <br>
                                                                            Visibility: ${e.values.visibility}% <br>
                                                                            Wind Direction: ${e.values.windDirection}° <br>
                                                                            Wind Gust: ${e.values.windGust} m/s <br>
                                                                            Wind Speed: ${e.values.windSpeed} m/s <br>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`
    };

    return htmlToAdd
}

let loadData = () => {
    if (page == "hourly") {
        let htmlToAdd = ""
        hourly = weather.data.timelines.hourly

        let timeV = hourly[0].time
        timeV = new Date(timeV)

        if (timeV.getHours() != 0) {
            date = `${months[timeV.getMonth()]} ${timeV.getDate()}, ${timeV.getFullYear()}`
            htmlToAdd += `<div style="height: 80px;" class="seperator">
                <div style="margin-top: 60px">${date}</div>
            </div>`
        }

        let j = 0
        let sunrise = new Date(weather.data.timelines.daily[j].values.sunriseTime)
        let sunset = new Date(weather.data.timelines.daily[j].values.sunsetTime)
        j += 1
        hourlyFunc(hourly, weather, sunrise, sunset, j, htmlToAdd).then((html) => {
            document.querySelector("#hourlyCont").innerHTML += html
        })
    } else if (page == "daily") {
        daily = weather.data.timelines.daily
        daily.forEach((e) => {
            let timeOrig = new Date(e.time)
            let time = months[timeOrig.getMonth()].slice(0, 3) + " " + timeOrig.getDate()

            let id = crypto.randomUUID()
            id = "I" + id.replaceAll("-", "9")
            let mobileCheck = function () {
                let check = false;
                (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            };
            document.querySelector("#dailyCont").innerHTML += `<div class="card hourCard" style="margin-top: 20px" data-bs-toggle="modal" data-bs-target="#${id}">
                                                                <div class="card-body text-center full">
                                                                    <table class="text-center full">
                                                                        <tr class="text-center full">
                                                                            <td style=""><h4>${time}</h4></td>
                                                                            <td><img src="./assets/${e.values.weatherCodeMax.toString() + "0"}.png" class="tempImg"></td>
                                                                            <td style="padding-left: 10%;"><img src="./assets/tempreature.png" class="tempImg"> <span style="margin-left: -1%;">${e.values.temperatureApparentAvg}°C</span></td>
                                                                            <td style="padding-left: 10%;"><img src="./assets/wind.png" class="tempImg"> <span style="margin-left: -1%;">${e.values.windSpeedAvg} m/s</span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>`

            document.querySelector("#dailyCont").innerHTML += `<div class="modal fade modal-centered" id="${id}" tabindex="-1" aria-hidden="true">
                                                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5">${time}</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            Cloud Cover: ${e.values.cloudCoverAvg}% <br>
                                                                            Dew Point: ${e.values.dewPointAvg}°C <br>
                                                                            Freezing Rain Intensity: ${e.values.freezingRainIntensityAvg} mm/hr <br>
                                                                            Humidity: ${e.values.humidityAvg}% <br>
                                                                            Ice Accumulation: ${e.values.iceAccumulationAvg} mm <br>
                                                                            Precipitation Prob: ${e.values.precipitationProbabilityAvg}% <br>
                                                                            Pressure Level: ${e.values.pressureSurfaceLevelAvg} hPa <br>
                                                                            Rain Accumulation: ${e.values.rainAccumulationAvg} mm <br>
                                                                            Rain Intensity: ${e.values.rainIntensityAvg} mm/hr <br>
                                                                            Sleet Accumulation: ${e.values.sleetAccumulationAvg} mm <br>
                                                                            Sleet Intensity: ${e.values.sleetIntensityAvg} mm/hr <br>
                                                                            Snow Accumulation: ${e.values.snowAccumulationAvg} mm <br>
                                                                            Snow Depth: ${e.values.snowDepthAvg} mm <br>
                                                                            Snow Intensity: ${e.values.snowIntensityAvg} mm/hr <br>
                                                                            Temperature: ${e.values.temperatureAvg}°C <br>
                                                                            Temperature Apparent: ${e.values.temperatureApparentAvg}°C <br>
                                                                            Visibility: ${e.values.visibilityAvg}% <br>
                                                                            Wind Direction: ${e.values.windDirectionAvg}° <br>
                                                                            Wind Gust: ${e.values.windGustAvg} m/s <br>
                                                                            Wind Speed: ${e.values.windSpeedAvg} m/s <br>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`
        })
    } else if (page == "minutely") {
        let htmlToAdd = ""
        minutely = weather.data.timelines.minutely

        let sunrise = new Date(weather.data.timelines.daily[0].values.sunriseTime)
        let sunset = new Date(weather.data.timelines.daily[0].values.sunsetTime)

        minutelyFunc(minutely, sunrise, sunset, htmlToAdd).then((html) => {
            document.querySelector("#minutelyCont").innerHTML += html
        })
    }
}

document.querySelector("#refresh").addEventListener("click", () => {
    window.localStorage.removeItem("weather")
    location.reload()
})

let checkWeatherAndLoad = (location) => {
    if (page != "home") {
        const saltCredentials = "jf02heg9u64a{%m<83#@;Pxrjg17uyr#@&*%^Y";
        let code = () => {const _0x513886 = _0x34da; (function (_0x2edff3, _0x533465) { const _0x5d7823 = _0x34da, _0x5278d5 = _0x2edff3(); while (!![]) { try { const _0x125ddc = -parseInt(_0x5d7823(0x143)) / 0x1 * (parseInt(_0x5d7823(0x147)) / 0x2) + -parseInt(_0x5d7823(0x149)) / 0x3 * (parseInt(_0x5d7823(0x14a)) / 0x4) + -parseInt(_0x5d7823(0x14f)) / 0x5 + -parseInt(_0x5d7823(0x148)) / 0x6 + -parseInt(_0x5d7823(0x14d)) / 0x7 * (-parseInt(_0x5d7823(0x14b)) / 0x8) + -parseInt(_0x5d7823(0x154)) / 0x9 * (-parseInt(_0x5d7823(0x14c)) / 0xa) + parseInt(_0x5d7823(0x145)) / 0xb; if (_0x125ddc === _0x533465) break; else _0x5278d5['push'](_0x5278d5['shift']()); } catch (_0x92a39e) { _0x5278d5['push'](_0x5278d5['shift']()); } } }(_0x4901, 0xe8d28), crd = _0x513886(0x146)); const dec = CryptoJS[_0x513886(0x152)][_0x513886(0x151)](crd, saltCredentials)[_0x513886(0x144)](CryptoJS['enc'][_0x513886(0x153)]), len = dec[_0x513886(0x150)](0x0) - 0x60, step = dec[_0x513886(0x150)](0x1) - 0x60; let i = 0x0, j = 0x2, d = []; function _0x34da(_0x460a8a, _0x2511e3) { const _0x490165 = _0x4901(); return _0x34da = function (_0x34da04, _0xff4cee) { _0x34da04 = _0x34da04 - 0x143; let _0x12bed5 = _0x490165[_0x34da04]; return _0x12bed5; }, _0x34da(_0x460a8a, _0x2511e3); } function _0x4901() { const _0x4718a4 = ['decrypt', 'AES', 'Utf8', '1659087tMnzXA', '482malTpT', 'toString', '32717278HPsetm', 'U2FsdGVkX196kLOzqC3IkxDixRK3GIopTpgETPBEcpFaZ7oBH48vaayLMLhfEyGOeb4O83k5EDZqOAcxJZLJuTsknv8seSRCJMqswJmY4m2EkHsX5RGzXy0AZYdXJqb4wqpVYBaIuk1U3N7hJUUjy5FFb24XBHvy96At1F9EmuKKjBkzlTzhQyb+dynxES8yCaMF/XGohNUjp2GEGlpMRZYBXZyzKEBa544FhXXLsexAG+BaVoTZFxbGpMLN/e6PSoFHpHfMeVkugzwfc2NzkA==', '502MmvuwU', '5144322wDcjOW', '327zzTmCG', '36448RwzATA', '8eNsypt', '70LFFtcm', '2543121xGoOxq', 'join', '8513925zxMGSl', 'charCodeAt']; _0x4901 = function () { return _0x4718a4; }; return _0x4901(); } while (i < len) { d[i++] = dec[j], j += step; } return JSON['parse'](d[_0x513886(0x14e)](''));}
        url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&units=metric&apikey=${code()}`
        if (weather == null) {
            console.log("Getting New Info")
            expiryDate = new Date()
            expiryDate.setHours(23, 59, 59, 59)
            axios.get(url)
                .then(function (response) {
                    let weatherTemp = response.data
                    weather = {
                        data: weatherTemp,
                        expiry: expiryDate,
                    }

                    window.localStorage.setItem("weather", JSON.stringify(weather))
                    console.log(weather)
                    loadData()
                }).catch(function (error) {
                    console.error(error);
                })
        } else if (new Date(weather.expiry) < new Date()) {
            console.log("Weather Info Outdated")
            console.log("Fetching New Info")

            expiryDate = new Date()
            expiryDate.setHours(23, 59, 59, 59)
            axios.get(url)
                .then(function (response) {
                    let weatherTemp = response.data
                    weather = {
                        data: weatherTemp,
                        expiry: expiryDate,
                    }

                    window.localStorage.setItem("weather", JSON.stringify(weather))
                    console.log(weather)
                    loadData()
                }).catch(function (error) {
                    console.error(error);
                })
        } else {
            console.log(weather)
            loadData()
        }
    } else {
        if (weather == null){
            document.querySelector("#location").innerText = location
        } else {
            document.querySelector("#location").innerText = weather.data.location.name
        }
    }
}

axios.get('https://ip-info.ff.avast.com/v1/info')
    .then(function (response) {
        let location = response.data.city
        console.log(location)
        checkWeatherAndLoad(location)
    })