function getGeocodeForCity() {
    let lat, lon;

    document.getElementById("error").style.display = "none";

    const cityInput = document.getElementById("city");

    const city = cityInput.value;

    // Clear any previous error messages and results
    const errorElement = document.getElementById("error");
    errorElement.textContent = "";

    const todayResultElement = document.getElementById("today");
    todayResultElement.style.display = "none";

    const tomorrowResultElement = document.getElementById("tomorrow");
    tomorrowResultElement.style.display = "none";

    // Check if city is provided
    if (!city) {
        document.getElementById("error").textContent = "Please enter city.";
        document.getElementById("error").style.display = "block";
        return;
    }

    const forwardApiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(city)}&format=json`;
    console.log("Forward Geocoding API URL:", forwardApiUrl);

    fetch(forwardApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error("No geocoding data found");
            }

            lat = data[0].lat;
            lon = data[0].lon;

            const reverseApiUrl = `https://geocode.maps.co/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
            console.log("Reverse Geocoding API URL:", reverseApiUrl);

            return fetch(reverseApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(reverseData => {
            console.log("Reverse Geocoding API response:", reverseData);

            const cityName = reverseData.address.city;

            const sunriseSunsetApiUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lon)}&date=today&formatted=0`;

            console.log("Sunrise Sunset API URL (Today):", sunriseSunsetApiUrl);

            return fetch(sunriseSunsetApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(todaySunriseSunsetData => {
            console.log("Sunrise Sunset API response (Today):", todaySunriseSunsetData);

            const todaySunrise = todaySunriseSunsetData.results.sunrise;
            const todaySunset = todaySunriseSunsetData.results.sunset;
            const todayDawn = todaySunriseSunsetData.results.dawn;
            const todayDusk = todaySunriseSunsetData.results.dusk;
            const todayDayLength = todaySunriseSunsetData.results.day_length;
            const todaySolarNoon = todaySunriseSunsetData.results.solar_noon;
            const todayTimeZone = todaySunriseSunsetData.results.timezone;

            console.log("Today's Sunrise:", todaySunrise, "Sunset:", todaySunset, "Dawn:", todayDawn, "Dusk:", todayDusk,
                "Day Length:", todayDayLength, "Solar Noon:", todaySolarNoon, "Time Zone:", todayTimeZone);

            const todaySunriseElement = document.getElementById("todaySunrise");
            const todaySunsetElement = document.getElementById("todaySunset");
            const todayDawnElement = document.getElementById("todayDawn");
            const todayDuskElement = document.getElementById("todayDusk");
            const todayDayLengthElement = document.getElementById("todayDayLength");
            const todaySolarNoonElement = document.getElementById("todaySolarNoon");
            const todayTimeZoneElement = document.getElementById("todayTimeZone");

            todaySunriseElement.textContent = `${todaySunrise}`;
            todaySunsetElement.textContent = `${todaySunset}`;
            todayDawnElement.textContent = `${todayDawn}`;
            todayDuskElement.textContent = `${todayDusk}`;
            todayDayLengthElement.textContent = `${todayDayLength}`;
            todaySolarNoonElement.textContent = `${todaySolarNoon}`;
            todayTimeZoneElement.textContent = `${todayTimeZone}`;

            const todayResultElement = document.getElementById("today");
            todayResultElement.style.display = "block";
        })
        .then(() => {
            const tomorrowSunriseSunsetApiUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lon)}&date=tomorrow&formatted=0`;

            console.log("Sunrise Sunset API URL (Tomorrow):", tomorrowSunriseSunsetApiUrl);

            return fetch(tomorrowSunriseSunsetApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(tomorrowSunriseSunsetData => {
            console.log("Sunrise Sunset API response (Tomorrow):", tomorrowSunriseSunsetData);

            const tomorrowSunrise = tomorrowSunriseSunsetData.results.sunrise;
            const tomorrowSunset = tomorrowSunriseSunsetData.results.sunset;
            const tomorrowDawn = tomorrowSunriseSunsetData.results.dawn;
            const tomorrowDusk = tomorrowSunriseSunsetData.results.dusk;
            const tomorrowDayLength = tomorrowSunriseSunsetData.results.day_length;
            const tomorrowSolarNoon = tomorrowSunriseSunsetData.results.solar_noon;
            const tomorrowTimeZone = tomorrowSunriseSunsetData.results.timezone;

            console.log("Tomorrow's Sunrise:", tomorrowSunrise, "Sunset:", tomorrowSunset, "Dawn:", tomorrowDawn, "Dusk:", tomorrowDusk,
                "Day Length:", tomorrowDayLength, "Solar Noon:", tomorrowSolarNoon, "Time Zone:", tomorrowTimeZone);

            const tomorrowSunriseElement = document.getElementById("tomorrowSunrise");
            const tomorrowSunsetElement = document.getElementById("tomorrowSunset");
            const tomorrowDawnElement = document.getElementById("tomorrowDawn");
            const tomorrowDuskElement = document.getElementById("tomorrowDusk");
            const tomorrowDayLengthElement = document.getElementById("tomorrowDayLength");
            const tomorrowSolarNoonElement = document.getElementById("tomorrowSolarNoon");
            const tomorrowTimeZoneElement = document.getElementById("tomorrowTimeZone");

            tomorrowSunriseElement.textContent = `${tomorrowSunrise}`;
            tomorrowSunsetElement.textContent = `${tomorrowSunset}`;
            tomorrowDawnElement.textContent = `${tomorrowDawn}`;
            tomorrowDuskElement.textContent = `${tomorrowDusk}`;
            tomorrowDayLengthElement.textContent = `${tomorrowDayLength}`;
            tomorrowSolarNoonElement.textContent = `${tomorrowSolarNoon}`;
            tomorrowTimeZoneElement.textContent = `${tomorrowTimeZone}`;

            const tomorrowResultElement = document.getElementById("tomorrow");
            tomorrowResultElement.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching data:", error);

            const errorElement = document.getElementById("error");
            errorElement.textContent = `Error: ${error.message}`;
            errorElement.style.display = "block";
        });
}

function useCurrentLocation() {
    document.getElementById("error").style.display = "none";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const reverseApiUrl = `https://geocode.maps.co/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
                console.log("Reverse Geocoding API URL:", reverseApiUrl);

                fetch(reverseApiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(reverseData => {
                        console.log("Reverse Geocoding API response:", reverseData);

                        const cityName = reverseData.address.city;

                        // Update the city input field with the detected city
                        document.getElementById("city").value = cityName;

                        // Call the function to get and display data for the detected city
                        getGeocodeForCity();
                    })
                    .catch(error => {
                        console.error("Error fetching reverse geocoding data:", error);

                        const errorElement = document.getElementById("error");
                        errorElement.textContent = `Error: ${error.message}`;
                        errorElement.style.display = "block";
                    });
            },
            error => {
                console.error("Error getting current location:", error);

                const errorElement = document.getElementById("error");
                errorElement.textContent = "Error getting current location. Please try again or enter a city manually.";
                errorElement.style.display = "block";
            }
        );
    } else {
        const errorElement = document.getElementById("error");
        errorElement.textContent = "Geolocation is not supported by your browser.";
        errorElement.style.display = "block";
    }
}

function getGeocodeForCoordinates(latitude, longitude) {
    const reverseApiUrl = `https://geocode.maps.co/reverse?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;

    console.log("Reverse Geocoding API URL:", reverseApiUrl);

    fetch(reverseApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(reverseData => {
            console.log("Reverse Geocoding API response:", reverseData);

            const cityName = reverseData.address.city || "City not found";
            /*
            console.log("City Name:", cityName);
            const cityElement = document.getElementById("cityName");
            cityElement.textContent = `City: ${cityName}`;
            */

            const sunriseSunsetApiUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(latitude)}&lng=${encodeURIComponent(longitude)}&date=today&formatted=0`;

            console.log("Sunrise Sunset API URL (Today):", sunriseSunsetApiUrl);

            return fetch(sunriseSunsetApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(todaySunriseSunsetData => {
            console.log("Sunrise Sunset API response (Today):", todaySunriseSunsetData);

            const todaySunrise = todaySunriseSunsetData.results.sunrise;
            const todaySunset = todaySunriseSunsetData.results.sunset;
            const todayDawn = todaySunriseSunsetData.results.dawn;
            const todayDusk = todaySunriseSunsetData.results.dusk;
            const todayDayLength = todaySunriseSunsetData.results.day_length;
            const todaySolarNoon = todaySunriseSunsetData.results.solar_noon;
            const todayTimeZone = todaySunriseSunsetData.results.timezone;

            console.log("Today's Sunrise:", todaySunrise, "Sunset:", todaySunset, "Dawn:", todayDawn, "Dusk:", todayDusk,
  "Day Length:", todayDayLength, "Solar Noon:", todaySolarNoon, "Time Zone:", todayTimeZone);


            const todaySunriseElement = document.getElementById("todaySunrise");
            const todaySunsetElement = document.getElementById("todaySunset");
            const todayDawnElement = document.getElementById("todayDawn");
            const todayDuskElement = document.getElementById("todayDusk");
            const todayDayLengthElement = document.getElementById("todayDayLength");
            const todaySolarNoonElement = document.getElementById("todaySolarNoon");
            const todayTimeZoneElement = document.getElementById("todayTimeZone");

            todaySunriseElement.textContent = `${todaySunrise}`;
            todaySunsetElement.textContent = `${todaySunset}`;
            todayDawnElement.textContent = `${todayDawn}`;
            todayDuskElement.textContent = `${todayDusk}`;
            todayDayLengthElement.textContent = `${todayDayLength}`;
            todaySolarNoonElement.textContent = `${todaySolarNoon}`;
            todayTimeZoneElement.textContent = `${todayTimeZone}`;

            const todayResultElement = document.getElementById("result");
            todayResultElement.style.display = "block";
        })
        .then(() => {
            const tomorrowSunriseSunsetApiUrl = `https://api.sunrisesunset.io/json?lat=${encodeURIComponent(latitude)}&lng=${encodeURIComponent(longitude)}&date=tomorrow&formatted=0`;

            console.log("Sunrise Sunset API URL (Tomorrow):", tomorrowSunriseSunsetApiUrl);

            return fetch(tomorrowSunriseSunsetApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(tomorrowSunriseSunsetData => {
            console.log("Sunrise Sunset API response (Tomorrow):", tomorrowSunriseSunsetData);

            const tomorrowSunrise = tomorrowSunriseSunsetData.results.sunrise;
            const tomorrowSunset = tomorrowSunriseSunsetData.results.sunset;
            const tomorrowDawn = tomorrowSunriseSunsetData.results.dawn;
            const tomorrowDusk = tomorrowSunriseSunsetData.results.dusk;
            const tomorrowDayLength = tomorrowSunriseSunsetData.results.day_length;
            const tomorrowSolarNoon = tomorrowSunriseSunsetData.results.solar_noon;
            const tomorrowTimeZone = tomorrowSunriseSunsetData.results.timezone;

            console.log("Tomorrow's Sunrise:", tomorrowSunrise, "Sunset:", tomorrowSunset, "Dawn:", tomorrowDawn, "Dusk:", tomorrowDusk,
  "Day Length:", tomorrowDayLength, "Solar Noon:", tomorrowSolarNoon, "Time Zone:", tomorrowTimeZone);


            const tomorrowSunriseElement = document.getElementById("tomorrowSunrise");
            const tomorrowSunsetElement = document.getElementById("tomorrowSunset");
            const tomorrowDawnElement = document.getElementById("tomorrowDawn");
            const tomorrowDuskElement = document.getElementById("tomorrowDusk");
            const tomorrowDayLengthElement = document.getElementById("tomorrowDayLength");
            const tomorrowSolarNoonElement = document.getElementById("tomorrowSolarNoon");
            const tomorrowTimeZoneElement = document.getElementById("tomorrowTimeZone");

            tomorrowSunriseElement.textContent = `${tomorrowSunrise}`;
            tomorrowSunsetElement.textContent = `${tomorrowSunset}`;
            tomorrowDawnElement.textContent = `${tomorrowDawn}`;
            tomorrowDuskElement.textContent = `${tomorrowDusk}`;
            tomorrowDayLengthElement.textContent = `${tomorrowDayLength}`;
            tomorrowSolarNoonElement.textContent = `${tomorrowSolarNoon}`;
            tomorrowTimeZoneElement.textContent = `${tomorrowTimeZone}`;

            const tomorrowResultElement = document.getElementById("result");
            tomorrowResultElement.style.display = "block";

            const resultElement = document.getElementById("result");
                resultElement.style.display = "flex";
                resultElement.style.flexWrap = "wrap";
        })
        .catch(error => {
            console.error("Error fetching data:", error);

            const errorElement = document.getElementById("error");
            errorElement.textContent = `Error fetching data: ${error.message}`;

            // Clear any previous results
            const resultElement = document.getElementById("result");
            resultElement.style.display = "none";
        });
}
