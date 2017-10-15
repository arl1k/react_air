import React from 'react';
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap/lib/';
import ReviewList from './reviewslist'

class DetailsModal extends React.Component {
    render() {

        let rating = this.props.propertyStarRating?this.props.propertyStarRating + "/5":"No rating yet.";
        let reviewsNum = `Rating based on ${this.props.propertyNumOfReviews} reviews.`

        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg"><b> {this.props.propertyName} {this.props.propertyStarRating}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Grid>
                    <Row className="show-grid">
                    <Col sm={6} md={3}>
                    <div className="modpicturecontainer">
                    <img className="modalImage" src={this.props.propertyMainPicture} alt=""></img> 
                    </div>
                    </Col>
                    <Col xs={12} md={8} >
                    <p>Number of bathrooms : {this.props.propertyBathrooms}</p>
                    <p>Number of bedrooms : {this.props.propertyBedrooms}</p>
                    <p>Number of beds : {this.props.propertyBeds}</p>
                    <p>Price for night : {this.props.propertyPrice} {this.props.propertyCurrency}</p>
                    <p>Owner of the Apartment : <u>{this.props.propertyOwnerName}</u></p>
                    </Col>
                    </Row>
                </Grid>
                </Modal.Body>
                <Modal.Body>
                <span><b>{rating}</b></span> <span>{reviewsNum}</span> 
                <Button onClick={this.props.ShowReviews} data-propid={this.props.propertyId} disabled={this.props.reviewButtonDisabled}> Show reviews </Button>
                <hr/>
                <ReviewList reviewsList={this.props.reviewsList} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DetailsModal;