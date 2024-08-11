// let weather = JSON.parse(window.localStorage.getItem("weather"))


// // I am making a weather app. The weather from 4pm to 4am is -15, -17, -17, -17, -19, -20, -21, -21, -22, -21, -21, -20. All data is in degrees Celsius. It is mostly cloudy, foggy, and snowy. Explain this in text with a list of the hourly temperature to the user of the weather app. Include how the user should dress for the day. Don't include text like "Here's how you can present the weather data in your app". This will be directly sent to the user.
// // AIzaSyDAJ1YgHZPFvz_OWjaSCXNpPhzNpPnYmz0



// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Access your API key (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyDAJ1YgHZPFvz_OWjaSCXNpPhzNpPnYmz0");

// async function getWeatherInfo() {
//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = "I am making a weather app. The weather from 4pm to 4am is -15, -17, -17, -17, -19, -20, -21, -21, -22, -21, -21, -20. All data is in degrees Celsius. It is mostly cloudy, foggy, and snowy. Explain this in text with a list of the hourly temperature to the user of the weather app. Include how the user should dress for the day. Do not include text like: Here is how you can present the weather data in your app. This will be directly sent to the user."


//     console.log(prompt)

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     const textL1 = text.replaceAll("**", "<b>")
//     const textL2 = textL1.replaceAll("*", "•")
//     console.log(text);
// }

// // run();

// let loadData = (weather) => {
//     getWeatherInfo();
// }

// const saltCredentials = "jf02heg9u64a{%m<83#@;Pxrjg17uyr#@&*%^Y";
// let crd;
// let url;
// let code = () => { const _0x513886 = _0x34da; (function (_0x2edff3, _0x533465) { const _0x5d7823 = _0x34da, _0x5278d5 = _0x2edff3(); while (!![]) { try { const _0x125ddc = -parseInt(_0x5d7823(0x143)) / 0x1 * (parseInt(_0x5d7823(0x147)) / 0x2) + -parseInt(_0x5d7823(0x149)) / 0x3 * (parseInt(_0x5d7823(0x14a)) / 0x4) + -parseInt(_0x5d7823(0x14f)) / 0x5 + -parseInt(_0x5d7823(0x148)) / 0x6 + -parseInt(_0x5d7823(0x14d)) / 0x7 * (-parseInt(_0x5d7823(0x14b)) / 0x8) + -parseInt(_0x5d7823(0x154)) / 0x9 * (-parseInt(_0x5d7823(0x14c)) / 0xa) + parseInt(_0x5d7823(0x145)) / 0xb; if (_0x125ddc === _0x533465) break; else _0x5278d5['push'](_0x5278d5['shift']()); } catch (_0x92a39e) { _0x5278d5['push'](_0x5278d5['shift']()); } } }(_0x4901, 0xe8d28), crd = _0x513886(0x146)); const dec = CryptoJS[_0x513886(0x152)][_0x513886(0x151)](crd, saltCredentials)[_0x513886(0x144)](CryptoJS['enc'][_0x513886(0x153)]), len = dec[_0x513886(0x150)](0x0) - 0x60, step = dec[_0x513886(0x150)](0x1) - 0x60; let i = 0x0, j = 0x2, d = []; function _0x34da(_0x460a8a, _0x2511e3) { const _0x490165 = _0x4901(); return _0x34da = function (_0x34da04, _0xff4cee) { _0x34da04 = _0x34da04 - 0x143; let _0x12bed5 = _0x490165[_0x34da04]; return _0x12bed5; }, _0x34da(_0x460a8a, _0x2511e3); } function _0x4901() { const _0x4718a4 = ['decrypt', 'AES', 'Utf8', '1659087tMnzXA', '482malTpT', 'toString', '32717278HPsetm', 'U2FsdGVkX196kLOzqC3IkxDixRK3GIopTpgETPBEcpFaZ7oBH48vaayLMLhfEyGOeb4O83k5EDZqOAcxJZLJuTsknv8seSRCJMqswJmY4m2EkHsX5RGzXy0AZYdXJqb4wqpVYBaIuk1U3N7hJUUjy5FFb24XBHvy96At1F9EmuKKjBkzlTzhQyb+dynxES8yCaMF/XGohNUjp2GEGlpMRZYBXZyzKEBa544FhXXLsexAG+BaVoTZFxbGpMLN/e6PSoFHpHfMeVkugzwfc2NzkA==', '502MmvuwU', '5144322wDcjOW', '327zzTmCG', '36448RwzATA', '8eNsypt', '70LFFtcm', '2543121xGoOxq', 'join', '8513925zxMGSl', 'charCodeAt']; _0x4901 = function () { return _0x4718a4; }; return _0x4901(); } while (i < len) { d[i++] = dec[j], j += step; } return JSON['parse'](d[_0x513886(0x14e)]('')); }
// url = `https://api.tomorrow.io/v4/weather/forecast?location=calgary&units=metric&apikey=${code()}`
// if (weather == null) {
//     let expiryDate = new Date()
//     expiryDate.setHours(23, 59, 59, 59)
//     axios.get(url)
//         .then(function (response) {
//             let weatherTemp = response.data
//             weather = {
//                 data: weatherTemp,
//                 expiry: expiryDate,
//             }

//             window.localStorage.setItem("weather", JSON.stringify(weather))
//             loadData(weather)
//         }).catch(function (error) {
//             console.error(error);
//         })
// } else if (new Date(weather.expiry) < new Date()) {
//     let expiryDate = new Date()
//     expiryDate.setHours(23, 59, 59, 59)
//     axios.get(url)
//         .then(function (response) {
//             let weatherTemp = response.data
//             weather = {
//                 data: weatherTemp,
//                 expiry: expiryDate,
//             }

//             window.localStorage.setItem("weather", JSON.stringify(weather))
//             loadData(weather)
//         }).catch(function (error) {
//             console.error(error);
//         })
// } else {
//     loadData(weather)
// }