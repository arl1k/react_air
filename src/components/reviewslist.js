import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';

const ReviewList = ({ reviewsList }) => {

    let property = reviewsList.map((review, index) => {

        return (
            <Col key={review.id} className='' >
                <ListGroupItem >
                    <div className="">
                        <span> Reviewed by : <b>{review.author.first_name}</b></span><br/>
                        <span> {review.comments}</span>
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

export default ReviewList;