const fs        = require('fs');
const moment    = require('moment')

const startup = () => {
    //read the settings from the settings.JSON file
    var device_settings = fs.readFileSync(__dirname + '/settings.json', { encoding: 'utf8' });

    //if the settings.JSON file is empty reset the default settings
    if(device_settings === "{}"){
            device_settings = fs.readFileSync(__dirname + '/settings.default.json', { encoding: 'utf8' });
            fs.writeFile(__dirname + '/settings.json',device_settings,(err)=>{ if (err) throw err; });
        }

    // Print the device name to the console
    let {dev_name }  = JSON.parse(device_settings)
    console.log(`---------------------Raspberry PI Service has started------------------------`)
    console.log( moment().format('HH:mm:ss'))
    console.log(`Device Name: ${dev_name}`);
}

module.exports = {
    startup
}