const https = require("https");

// Replace with your own access token
const accessToken =
  "ya29.a0AcM612yuCuCSmknjac1u5-RN3jgxehU582LADww_cIg6D4RZUs-Z2uZqDMtIIxMWDF-PN3YmcI-WabGT8NX08MrB8rx91x0MuU-qHwsDEHPHGqVZ1zl1iq9L01J-1D9DIslCngWezqQ0B-BeBD5sP5vIuJkaEtM6WJ5GiYroaCgYKAUsSARASFQHGX2MiM_w6ld1cSi3QKyy2snX98A0175";

// Define the time range for the fitness data (example: last 7 days)
const startTimeMillis = new Date("2024-01-01").getTime(); // Replace with desired start date
const endTimeMillis = new Date().getTime(); // Current date

// Data source for step count in Google Fitness API
const dataSourceId =
  "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";

// Create the request body for the API
const requestBody = JSON.stringify({
  aggregateBy: [
    {
      dataSourceId: dataSourceId,
    },
  ],
  bucketByTime: { durationMillis: 86400000 }, // Group data by day (24 hours)
  startTimeMillis: startTimeMillis,
  endTimeMillis: endTimeMillis,
});

// Define the request options
const options = {
  hostname: "www.googleapis.com",
  path: "/fitness/v1/users/me/dataset:aggregate",
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Content-Length": requestBody.length,
  },
};

// Function to make the API request
const getFitnessData = () => {
  const req = https.request(options, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      try {
        const responseData = JSON.parse(data);
        console.log("Fitness Data:", responseData);
      } catch (error) {
        console.error("Error parsing response:", error.message);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write the request body
  req.write(requestBody);

  // End the request
  req.end();
};

// Call the function to fetch the fitness data
getFitnessData();
