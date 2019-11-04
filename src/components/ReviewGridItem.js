import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import { ReviewDetails } from '../elements/StyledElements';

import StarRating from './StarRating';

export default ({ review }) => {
  const excerpt = review.content.split(' ').splice(0, 10).join(' ') + ' ...';
  const formatedDate = moment(review.published_at).format('MMM DD, YYYY');
  return (
   <Card raised={true} style={{ display: 'grid', gridTemplateRows: '1fr' }}>
     <CardContent style={{ padding: 0}}>
       <div style={{padding: '12px'}}>
         <Link 
          to={{pathname:'/review/' + review.id, state: { review } }} 
          style={{ textDecoration: 'none', color: '#3f51b5' }}
        >
          <Typography color="primary" style={{fontSize: '20px', fontWeight: 'bold'}}>{review.place}</Typography>
         </Link>
        <StarRating rating={review.rating} />
       </div>
     </CardContent>
     <ReviewDetails>
        <Typography>{excerpt}</Typography>
        <Link 
          style={{ color: '#f7f700'}} 
          to={{pathname:'/review/' + review.id, state: { review } }}
        >
          <Typography>Read More</Typography>
        </Link>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Typography>{ review.author }</Typography>
          <Typography>{ formatedDate }</Typography>
        </div>
      </ReviewDetails>
   </Card>
  );
}