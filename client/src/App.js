import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// var request = require("request");

class App extends Component {
  state = {
    response: '',
    currentObjects: ''
  };

  // getDate = () => {
  //   var options = { method: 'GET',
  //    url: 'https://services1.arcgis.com/CPYspmTk3abe6d7i/arcgis/rest/services/Car_Parks_Wellington/FeatureServer/0/query',
  //    qs: { where: '1=1', outFields: '*', outSR: '4326', f: 'json' },
  //    headers:
  //     {  'content-type': 'application/json' },
  //    body:
  //     { },
  //    json: true };
  //
  //   return request(options, function (error, response, body) {
  //    if (error) throw new Error(error);
  //
  //
  //    console.log(body);
  //    return body;
  //   });
  // }

  getData = async() =>{
      const https = require('https');
      let data = '';
      https.get('https://services1.arcgis.com/CPYspmTk3abe6d7i/arcgis/rest/services/Car_Parks_Wellington/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json', (resp) => {


      resp.on('data', (chunk)=>{
        data += chunk;
      });

      resp.on('end', () =>{

        console.log(JSON.parse(data));
        this.setState({response: JSON.parse(data)});

      });

    }).on("error", (err)=>{
      console.log("Error: " + err.message);
    });

    // return JSON.parse(data);
  }

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express} ))
    //   .catch(err => console.log(err));

    // console.log(this.getData());
    this.getData();
    // this.getData()
    //   .then(res => this.setState({response: res}))
    //   .then(res => console.log(JSON.stringify(res)))
    //   .catch(err => console.log(err));
  }

  // callApi = async () => {
  //   const response = await fetch('https://opendata.arcgis.com/datasets/a1ec0e82e8c2471b97607bd7e08622b5_0.geojson');
  //
  //   const body  = await response.json();
  //
  //   if (response.status !== 200 ) throw Error(body.message);
  //
  //   return body;
  // };

  printData() {
    // console.log(this.state.response);
    // var obj = JSON.parse(this.state.response);

    var carParkArray = {
    coordinate:[]
};
    if (this.state.response) {
      for(var i=0; i<50;i++){
        console.log(this.state.response.features[i].geometry.x);
        console.log(this.state.response.features[i].geometry.y);

        carParkArray.coordinate.push({
            "x" : this.state.response.features[i].geometry.x,
            "y"  : this.state.response.features[i].geometry.y
        });

      }
    }

    console.log(carParkArray);




    // var long = obj.fields[0].name;
    // console.log(long);
    // return long;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.printData()}
        </p>
      </div>
    );
  }
}

export default App;
