const search = async (event) => {
    event.preventDefault();
    
    const cityName = document.getElementById('cname').value;
    const output = document.getElementById('output');
    const spinner = document.getElementById('spinner');
    // const logo = document.getElementById('logo');
    const sun = document.getElementById('sun');
    const main = document.getElementById('main');

    console.log(`Searching for city: ${cityName}`);

    if (!cityName) {
        alert('Please enter your City name');
        return;
    }

    try {
        spinner.style.display = 'block';
        const apiKey = '95cb327d84db1e268b6b5b8c73902023';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching weather data:', errorData);

            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API key.');
            } else if (response.status === 429) {
                throw new Error('API request limit exceeded. Please try again later.');
            } else {
                throw new Error(errorData.message || 'City not found');
            }
        }

        const data = await response.json();
        console.log('Weather data:', data);

        const {
            name: city,
            sys: { country: countryName },
            main: { temp, feels_like: feelTemp, humidity, pressure },
            weather: [{ description, main: mainStatus }],
            wind: { speed: windSpeed }
        } = data;

        const temperature = (temp - 273.15).toFixed(1);
        const feelLike = (feelTemp - 273.15).toFixed(1);
        const status = description.toUpperCase();
        const dt = new Date();

        const backgrounds = {
            Clouds: 'https://cdn.pixabay.com/photo/2017/05/20/20/22/clouds-2329680_1280.jpg',
            Haze: 'https://cdn.pixabay.com/photo/2018/11/09/09/27/dawn-3804124_1280.jpg',
            Clear: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            Rain: 'https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_1280.jpg',
            Default: 'https://cdn.pixabay.com/photo/2018/02/27/23/03/autumn-3186876_1280.jpg'
        };

        const logos = {
            Clouds: './gallery/cloud3logo.png',
            Haze: './gallery/hazelogo.png',
            Clear: './gallery/sun.png',
            Rain: './gallery/rainicon.png',
            Default: './gallery/sun.png'
        };

        main.style.backgroundImage = `url(${backgrounds[mainStatus] || backgrounds.Default})`;
        main.style.backgroundSize = '100% 100%';
        
        logo.style.visibility = 'visible';
        sun.style.display = 'none';

        output.innerHTML = `
            <h2>${city}</h2>
            <h6>${countryName}</h6>
            <h1>${temperature}&deg;C</h1>
            <p>Feels like: ${feelLike}&deg;C</p>
            <h4>${status}</h4>
            <div id="details" class="rounded p-4 mt-1" style="background:white;color:darkblue;">
                <h6>Humidity: ${humidity}%</h6>
                <h6>Wind: ${windSpeed} Kmph</h6>
                <h6>Pressure: ${pressure} hPa</h6>
                <h6>${dt}</h6>
            </div>
        `;
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        spinner.style.display = 'none';
        document.getElementById('cname').value = '';
    }
};