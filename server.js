const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const https = require('https');

app.get('/carpark/coordinates', (req, res) => {
  let data = '';
  var carParkArray = {
    geometry:[]
  };

  https.get('https://services1.arcgis.com/CPYspmTk3abe6d7i/arcgis/rest/services/Car_Parks_Wellington/FeatureServer/0/query?where=1%3D1&outFields=*&orderByFields=system_id DESC&outSR=4326&f=json', (resp) => {
  resp.on('data', (chunk)=>{
    data += chunk;
  });

  resp.on('end', () =>{
    if(data){
      var body = JSON.parse(data);
      for(var i=0; i<1000;i++){
        carParkArray.geometry.push({
            "x" : body.features[i].geometry.x,
            "y"  : body.features[i].geometry.y
        });
      }

    res.send({ express: carParkArray.geometry });
  }

  });

}).on("error", (err)=>{
  console.log("Error: " + err.message);
});

});


app.listen(port, () => console.log(`Listening on port ${port}`));
