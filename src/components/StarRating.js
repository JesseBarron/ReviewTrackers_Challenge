import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';


export default ({ rating, size='default' }) => {
  const stars = [];

  for(let i = 0; i < rating; i++) {
    stars.push(<li key={i} style={{ color: '#ffdf00'}} > <StarIcon fontSize={size}/> </li>)
  }
  let i = 0
  while(stars.length < 5) {
    stars.push(<li key={'empty-'+i++}style={{ color: '#ffdf00' }} > <StarBorderIcon fontSize={size}/> </li>)
  }

 return(
     <ul style={{listStyle: 'none', display: 'flex'}}>
      {stars}
     </ul> 
  );
}