import React, { Component } from 'react';
import "./Weather.css";
import axios from "axios";
import CurrentDate from "./CurrentDate"
export default class Weather extends Component {
    state = { location: "", sys:"", icon: null, temp:null,}

    resetAll(){
        //console.log("here")
        this.setState({location: "", sys:"", icon: null, temp:null})
    }

    setLocation(e){
        // e.preventDefault();
        this.setState({location: e.target.value});
        // if( this.state.location == "" )
        //    this.resetAll();
    }

    sharon(){
        const apiRoot = "http://api.openweathermap.org/data/2.5/";
        const accessKey = 'd4f996892ccf763a96bd4ff8ae0c0687';
        try{
            axios
            .get(`${apiRoot}weather?q=${this.state.location}&units=metric&APPID=${accessKey}`)
            .then(res => {
              //  console.log(res.data)
              this.setState({temp:res.data.main.temp , icon: res.data.weather[0].icon, sys:res.data.sys.country })
              console.warn = () => {}
            })
               // .catch(errorr =>  this.setState({location : "Enter "}) )
            // .catch( 
            //     this.setState({location : "try again"})
            // )

        }
        catch(error){console.error(error)}
    }

     search = (e) => {         
        if (e.code == "Enter") 
            this.sharon()
      }

render() {
console.log(this.state.location.length)
    return (
        <div className="search-input">
            <input type="text" placeholder="Search by location..." onChange={e=>this.setLocation(e)} onKeyPress={e=>this.search(e)}  />
            {this.state.location !="" && this.state.temp !=null ? 
            <span className="serach-output">
                {this.state.location}, <span> {this.state.sys} </span> 
                <br></br><i><CurrentDate/> </i>
              
                <br></br> <span id="temp">{Math.floor(this.state.temp)}°C  </span>
                <br></br>
            <img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} />     
            </span>   
            :null}
        </div>
    );
 }
}

