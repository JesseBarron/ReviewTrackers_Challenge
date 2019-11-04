import React from 'react';
import styled from 'styled-components';
import { Paper, TablePagination, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { AppState } from '../main';

import { ReviewGridItem } from '../components';

const ReviewGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 32px;
  grid-gap: 12px;
  @media(max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TopOptions = styled.tr`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end
`

export default () => {
  return (
    <AppState.Consumer>
      {
        ({ state, setPage, setPerPage, orderBy }) => {
          const { reviews, currentPage, perPage, reviewData } = state;
          return (
            <>
              <h1 style={{marginTop: '5%'}}> Reviews </h1>
              <Paper style={{ marginBottom: '4%' }}>
              <table style={{ width: '100%' }}>
                  <tbody>
                  <TopOptions >
                    <TablePagination 
                      style={{display: 'flex', justifyContent: 'center'}}
                      labelDisplayedRows={({from, to, count}) => `Reviews ${from} - ${to} out of ${count}`}
                      rowsPerPage={perPage} 
                      page={currentPage} 
                      count={reviewData.length} 
                      rowsPerPageOptions={[6, 12, 18, reviewData.length]}
                      onChangeRowsPerPage={setPerPage}
                      onChangePage={setPage}
                    />
                    <td>
                    <FormControl style={{ width: '10em', marginLeft: '20%' }}>
                      <InputLabel id="orderby" > Order by </InputLabel>
                      <Select onChange={orderBy} defaultValue="">
                        <MenuItem value={'place'}>Place</MenuItem>
                        <MenuItem value={'publish_desc'}>Published Recent</MenuItem>
                        <MenuItem value={'publish_asc'}>Publish Oldest</MenuItem>
                        <MenuItem value={'rating_desc'}>Rating Highest</MenuItem>
                        <MenuItem value={'rating_asc'}>Rating Low</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  </TopOptions>
                  </tbody>
                </table>
                
                <ReviewGridContainer>
                {
                  reviews[currentPage].map(review => (
                    <ReviewGridItem key={review.id} review={ review } />
                  ))
                }
                </ReviewGridContainer>
                <table style={{ width: '100%' }}>
                  <tbody>
                  <tr>
                    <TablePagination 
                      style={{display: 'flex', justifyContent: 'center'}}
                      labelDisplayedRows={({from, to, count}) => `Reviews ${from} - ${to} out of ${count}`}
                      rowsPerPage={perPage} 
                      page={currentPage} 
                      count={reviewData.length} 
                      rowsPerPageOptions={[6, 12, 18, 24]}
                      onChangeRowsPerPage={setPerPage}
                      onChangePage={setPage}
                    />
                  </tr>
                  </tbody>
                </table>
              </Paper>
            </>
          );
        }
      }
    </AppState.Consumer>
  )
}

