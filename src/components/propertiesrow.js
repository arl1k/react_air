import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';

const PropertiesList = ({items, onclickFunction}) => {

    let property = items.map((property, index) => {
        return (
          <Col sm={4} md={3}  key={property.listing.id} className='propContainer' data-propid={property.listing.id} >
            <ListGroupItem data-propid={property.listing.id} onClick={onclickFunction}>
            <div className="mainPictureContainer">
                <img className="mainPicture" alt="" src={property.listing.picture_url}></img>
            </div>
            <div className="nameContainer">
                <span> <b>{property.listing.name}</b></span><br/> 
                <span> <b>In : {property.listing.neighborhood}</b></span>
            </div>
            </ListGroupItem>
          </Col>
        )
      });
    
    return (
        <ListGroup>
          {property}
        </ListGroup>
      )
}


export default PropertiesList;