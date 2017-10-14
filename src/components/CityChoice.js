import React from 'react';
import { Button } from 'react-bootstrap/lib/';

const cityOptions = [
    {value : "Select an Option", id : 0},
    {value : "Paris, France", id : 1},
    {value : "London, UK", id : 2},
    {value : "New York, USA", id : 3},
    {value : "Tel Aviv, Israel", id : 4},
]

class CityChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectValue: ''
        }


        this.SearchProperties = this.SearchProperties.bind(this);
        this.SetChosenCity = this.SetChosenCity.bind(this)
    }

    SetChosenCity(event) {
        this.setState({ selectValue: event.target.options[event.target.selectedIndex].text });
    }

    SearchProperties(event) {
        if (this.state.selectValue) {
            this.props.search(this.state.selectValue);
        }
        else {
            alert("Please choose the city")
        }
    }

    render() {
        let buttonStr = this.props.cityChoiceButtonDisabled?"Results are loading" : "Do Search"
        return (
            <div id="choicecontainer">
                <label id="citySelectLabel">Select the city from the list : </label>
                <select className="cityselect" onChange={this.SetChosenCity} onClick={this.RemoveDefaultOption} style={{"padding" : "6px"}}>

                    {cityOptions.map(option => {
                        return <CityOption name={option.value} key={option.id} id={option.id} />
                    })}

                    }
                </select>
                <Button id="search" onClick={this.SearchProperties} style={{"marginLeft" : "10px"}} disabled={this.props.cityChoiceButtonDisabled}>{buttonStr}</Button>
            </div>
        )
    }
}

class CityOption extends React.Component {

    render() {
        return (
            <option className="cityoption" value={this.props.id} style={{"padding" : "6px"}}>{this.props.name}</option>
        )
    }
}

export default CityChoice;