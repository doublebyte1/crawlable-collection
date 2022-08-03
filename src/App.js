import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 const location=
   "http://localhost:9000/crawlable_catalogue/masked_rec/web/index.html";

//const location= window.location.href;
const url = location.split("web/index.html")[0];
let ignore = false;

function App() {
  const [data, setData] = useState({ links: [] });

  //console.log(window.location.href);

  useEffect(() => {


    async function fetchData() {
      const result = await axios( url + "collection.json");
      if (!ignore) {
        console.log(result.data);
        setData(result.data);
      }
    }

    fetchData();
    return () => { ignore = true; }
  });

  function getBgColor(val){

    console.log(ignore);

    if (val < 0.25){
        return "bg-success";
      } else if (val < 0.5){
        return "bg-danger";
      } else if (val < 0.75){
        return "bg-info";
      } else return "bg-dark";

  }

  return (
      <div className="container">
        {/* <div className= "jumbotron bg-dark text-white"> */}
        <div className={`jumbotron ${getBgColor(Math.random())} text-white`}>
          <h1>{data.title}</h1>      
          <p>{data.description}.</p>
        </div>
 

        <div className="row">

        {data.links.map((item,index) => (

        item.type === 'application/geo+json' && item.rel ==='alternate' ?          
        <div className="col-sm-6" key={index}>
          <div className="card">
            <div className="card-body">

              <h5 className="card-title">{item.title}</h5>
              <a href={url + item.href}  className="btn btn-primary">View Record</a>
            </div>
          </div>
        </div>
        : 
        <div className="col-sm-6" key={index}>
          <div className="card">
            <div className="card-body">

              <h5 className="card-title">{item.title}</h5>
              <a href={item.href}  className="btn btn-primary">View Data</a>
            </div>
          </div>
        </div>
      ))
      }

        </div>

      <br></br>
        <footer className="mt-auto">
          <a href="https://byteroad.net">&copy; ByteRoad 2022</a>
        </footer>

      </div> 




      
  );
}


export default App;
