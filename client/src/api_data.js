// API https://opendata.arcgis.com/datasets/a1ec0e82e8c2471b97607bd7e08622b5_0.geojson

const https = require('https');

getData() {
  https.get('https://opendata.arcgis.com/datasets/a1ec0e82e8c2471b97607bd7e08622b5_0.geojson', (resp) => {
    let data = '';

    resp.on('data', (chunk)=>{
      data += chunk;
    });

    resp.on('end', () =>{
      console.log(JSON.parse(data).explanation);
    });

  }).on("error", (err)=>{
    console.log("Error: " + err.message);
  });
}
