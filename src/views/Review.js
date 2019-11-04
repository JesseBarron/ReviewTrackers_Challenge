import React from 'react';
import { Paper, Card, CardContent, Typography, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import { Link } from 'react-router-dom';

import StarRating from '../components/StarRating'
import { ReviewDetails } from '../elements/StyledElements';
import ResponseForm  from '../components/ResponseForm';
import { AppState } from '../main';

export default ({ history }) => {
  const review = history.location.state.review;

  return (
    <AppState.Consumer>
      {
        ({ state }) => {
          const formatedDate = moment(review.published_at).format('MMM DD, YYYY');
          const response = state.responses[review.id];
          return (
            <Paper style={{marginTop: '8%'}}>
              <Link to="/" style={{color: 'black'}}><ArrowBackIcon style={{ fontSize: '3em' }}/></Link>
              <Card raised={true}>
                <CardContent style={{ display: 'flex' }}>
                  <Typography variant='h2'> { review.place } </Typography>
                  <StarRating rating={review.rating} size="large"/>
                  {
                    !response &&
                    <div style={{marginLeft: '8%'}}>
                      <ResponseForm review={review} response={response}/>
                    </div>
                  }
                </CardContent>

                <ReviewDetails>
                  <div style={{padding: '20px'}}>
                    <Typography> " {review.content} " </Typography>
                    <Typography style={{marginLeft: '52%'}}> 
                      <span style={{fontStyle: 'italic'}}>- {review.author}</span>, {formatedDate} </Typography>
                  </div>
                </ReviewDetails>
              </Card>

              {
                response  && 
                <Paper style={{marginTop: '8%'}}>
                  <Card raised={true}>
                    <CardContent style={{padding: '24px'}}>
                      <Typography variant="h6"> Response </Typography>
                      <Divider/>

                      <Typography style={{ marginTop: '12px', marginLeft: '14px' }}> {response} </Typography>
                      <div style={{ float: 'right' }}>
                        <ResponseForm review={review} response={response} label="Edit"/>
                      </div>
                    </CardContent>
                  </Card>
                </Paper>
              }
            </Paper>
          );
        }
      }
    </AppState.Consumer>
  )
}
