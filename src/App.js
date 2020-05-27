import React, {Component} from 'react';
import Select from 'react-select';
import './App.css';
import axios from 'axios';

const url = 'http://34.87.158.65/v1/location/provinces'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      districts: [],
      selectedDistrict: "",
    }
    // bind
    this.printDistrict = this.printDistrict.bind(this);
    // this.handleOnClose = this.handleOnClose.bind(this);
  }

  componentDidMount() {
    this.getProvinces();
  }

  getProvinces = async () => {
    await axios
      .get(url)
      .then(res => {
        let temp = [];
        res.data.data.provinces.forEach(function(element){
          temp.push({label:element.name, value: element.id});
        });
        this.setState({
          provinces: temp,
        });
        console.log(this.state.provinces)
      })
      .catch(err => {
        alert(err)
      });
  }

  onChangeGetDistrict(e) {
    console.log("input=======>", e.value);
    axios
      .get(url + '/' + e.value + '/districts')
      .then(res => {
        let temp = [];
        res.data.data.districts.forEach(function(element){
          temp.push({label:element.name, value: element.id});
        });
        this.setState({
          districts: temp,
        });
        console.log(this.state.districts)
      })
      .catch(err => {
        alert(err)
      });
  }

  onChangeSetSelectedDistrict(e){
    this.setState({
      selectedDistrict: e.label,
    })
  }

  printDistrict(){
    if(this.state.selectedDistrict === ''){
      alert("Choose the provinces and district first please!")
    }
    alert(this.state.selectedDistrict)
  }

  render(){

    return(
      <div className="App">

      <div className="card">

        <div className="section">
          <Select
            className="opt"
            options={this.state.provinces}
            onChange={e => {
              this.onChangeGetDistrict(e, this);
            }}
            placeholder="Select Provinces"
          />
        </div>

        <div className="section">
          <Select
            className="opt"
            options={this.state.districts}
            onChange={e => {
              this.onChangeSetSelectedDistrict(e, this);
            }}
            placeholder="Select District"
          />
        </div>

        <div className="section">
          <button
            className="btn"
            onClick={this.printDistrict}
          >
            Click here!
          </button>
        </div>

      </div>

    </div>
    )
  }
}
