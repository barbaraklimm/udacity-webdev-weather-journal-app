// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",de&appid=3a95ff813c4afd26b4a75e370abe5614&units=metric";


// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", displayAction);


// Function called by event listener
function displayAction() {
	const zip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;
	getData(baseURL, zip, apiKey)
		.then(function (data) {
			// POST data by calling async post function
			console.log("Add data from api: ", data);
			postData("/add", {
				date: newDate,
				temperature: data.main.temp,
				userResponse: feelings
			});
		})
		// GET data by calling async get function
		.then(() => updateUI());
}


// Fetch Data from API
const getData = async (baseURL, zip, apiKey) => {
		const url = baseURL + zip + apiKey;
		const request = await fetch(url);
		try {
			const data = await request.json();
			if (data.message) {
				alert(data.message);
			} else {
				return data;
			}
		} catch (error) {
			console.log("error", error);
		}
};


// Async POST function
// Function to POST data
const postData = async (url = "", data = {}) => {
	console.log("POST weather data: ", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		return newData;
		console.log("post response: ", newData);
	} catch (error) {
		console.log("error", error);
	}
};


// Async GET function
// Function to update UI
const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const data = await request.json();
		console.log("updateUI: ", data);
		document.getElementById("date").innerHTML = `Date: ${data.date}`;
		document.getElementById("temp").innerHTML = `Temperature: ${data.temperature} °C`;
		document.getElementById("content").innerHTML = `Feelings: ${data.userResponse}`;
	} catch (error) {
		console.log("error", error);
	}
};
