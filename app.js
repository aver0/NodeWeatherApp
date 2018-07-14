const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({ // Set the options for our app
    address: { // This is the first option i.e. address 
      demand: true, // We want to enfore this argument
      alias: 'a', // Setting the alias. Call it by using 'node app.js --a'
      describe: 'Address to get the weather from', // A description of the command
      string: true // Makes sure the vale of the address is a string
    }
  })
  .help() // Adds the help flag
  .alias('help', 'h') // Set an alias for the help argument
  .argv; // Takes the entire configuration, runs it through the arugments and stores the result in the argv variable 

console.log(`Retrieving information for address: '${argv.address}'`);

 geocode.geocodeAddress(argv.address, (errorMessage, results) => {
   if(errorMessage) {
     console.log(errorMessage);
   } else {
     console.log(results.Address);
      weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
      }
      });
    }
  });


