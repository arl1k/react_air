import React, { Component } from 'react';
import logo from './airbnblogo.svg';
import './App.css';
import CityChoice from './components/CityChoice';
import PropertiesList from './components/propertiesrow';
import logic from './logic';
import DetailsModal from './components/detailsmodal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      properties: [],
      reviews: [],
      showModal: false,
      propertyName: "",
      propertyBathrooms: "",
      propertyBedrooms: "",
      propertyBeds: "",
      propertyStarRating: "",
      propertyMainPicture: "",
      propertyOwnerName: "",
      propertyPrice: 0,
      propertyCurrency: "",
      propertyNumberOfGuests: 0,
      propertyNumOfReviews: 0,
      propertyId: '',
      cityChoiceButtonDisabled: false,
      reviewButtonDisabled: false,
      stopLoadReviews: false
    }
    this.LoadProperties = this.LoadProperties.bind(this);
    this.SetProperties = this.SetProperties.bind(this);
    this.PropertyClickHandler = this.PropertyClickHandler.bind(this);
    this.ShowReviews = this.ShowReviews.bind(this);
    this.LoadAllReviews = this.LoadAllReviews.bind(this);
  }

  PropertyClickHandler(event) {
    let property = this.state.properties.find(function (property) {
      return property.listing.id == event.currentTarget.getAttribute('data-propid')
    })
    this.setState({
      showModal: true,
      propertyId: property.listing.id,
      propertyName: property.listing.name,
      propertyBathrooms: property.listing.bathrooms,
      propertyBedrooms: property.listing.bedrooms,
      propertyBeds: property.listing.beds,
      propertyStarRating: property.listing.star_rating,
      propertyMainPicture: property.listing.picture_url,
      propertyOwnerName: property.listing.user.first_name,
      propertyPrice: property.pricing_quote.localized_nightly_price,
      propertyCurrency: property.pricing_quote.localized_currency,
      propertyNumberOfGuests: property.pricing_quote.guests,
      propertyNumOfReviews: property.listing.reviews_count,
      reviews: [],
      reviewButtonDisabled: false
    });
  }

  SetProperties(json) {
    return new Promise((resolve, reject) => {
      if (json.length > 0) {
        let allProps = this.state.properties.concat(json);
        // Airbnb return properties with same Id, remove from list 
        allProps = allProps.filter((prop, index, propertiesArr) => {
          return propertiesArr.map(mapObj => mapObj.listing.id).indexOf(prop.listing.id) == index;
        });
        this.setState({ properties: allProps }, resolve);
      }
    })
  }

  LoadProperties(cityName, offset = 0) {

    if (offset === 0) { //first call clear properties
      this.setState({ properties: [] })
    }
    this.setState({ cityChoiceButtonDisabled: true })

    var jsonFromAirBnb = [];

    return logic.LoadProperties(cityName, offset)
      .then(json => {
        if (json) {
          jsonFromAirBnb = json;
          this.SetProperties(json)
            .then(() => {
              if (jsonFromAirBnb.length < 50 || offset >= 200) { //limit responce 200 enough
                this.setState({ cityChoiceButtonDisabled: false })
                return true;
              }
              else {
                return this.LoadProperties(cityName, offset + 50)
              }
            })
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  ShowReviews(event) {
    if (this.state.reviews.length > 0) { //hide loaded reviews
      return new Promise((resolve, reject) => {
        this.setState({ reviews: [], reviewButtonDisabled: false }, resolve)
      })
        .then(() => {
          return true;
        })
    }
    else {
      let id = event.currentTarget.getAttribute('data-propid');
      return new Promise((resolve, reject) => {
        this.setState({ reviews: [], reviewButtonDisabled: true }, resolve)
      })
        .then(() => {
          this.LoadAllReviews(id)
        })
    }
  }

  LoadAllReviews(propId, offset = 0) {
    return logic.LoadReviews(propId, offset)
      .then(json => {
        this.setState({ reviews: this.state.reviews.concat(json) })
        if (json) {
          if (json.length < 10 || this.state.stopLoadReviews) {
            return true;
          }
          else {
            return this.LoadAllReviews(propId, offset + 10)
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  render() {
    let closeModal = () => this.setState({ showModal: false, stopLoadReviews: true, reviewButtonDisabled: false });

    return (
      <div id="maincontainer" >
        <div className="logo">
          <img src={logo} className="logoImg" alt=""></img>
        </div>
        <h1> Wellcome to Airbnb helper </h1>
        <hr />
        <CityChoice search={this.LoadProperties} cityChoiceButtonDisabled={this.state.cityChoiceButtonDisabled} />
        <hr />
        <PropertiesList items={this.state.properties} onclickFunction={this.PropertyClickHandler} />
        <DetailsModal
          show={this.state.showModal}
          onHide={closeModal}
          propertyId={this.state.propertyId}
          propertyName={this.state.propertyName}
          propertyBathrooms={this.state.propertyBathrooms}
          propertyBedrooms={this.state.propertyBedrooms}
          propertyBeds={this.state.propertyBeds}
          propertyStarRating={this.state.propertyStarRating}
          propertyMainPicture={this.state.propertyMainPicture}
          propertyOwnerName={this.state.propertyOwnerName}
          propertyPrice={this.state.propertyPrice}
          propertyCurrency={this.state.propertyCurrency}
          propertyNumberOfGuests={this.state.propertyNumberOfGuests}
          propertyNumOfReviews={this.state.propertyNumOfReviews}
          ShowReviews={this.ShowReviews}
          reviewsList={this.state.reviews}
          reviewButtonDisabled={this.state.reviewButtonDisabled}
        />
      </div>
    )
  }
}

export default App;