import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import _ from 'lodash';
import './App.css';

const reviewData = require('./shared/reviews.json');

export const AppState = React.createContext();

class Main extends Component {
  state = {
    reviewData: reviewData,
    reviews: [],
    responses: {},
    pages: 0,
    currentPage: 0,
    perPage: 12,
  }
  
  constructor() {
    super();
    this.state.reviews = this.paginateReviews();
    this.state.responses = JSON.parse(window.localStorage.getItem('responses')) || {};
  }

  paginateReviews = (perPage = null, reviews=null) => {
    perPage = perPage || this.state.perPage;
    const reviewsCopy = Object.assign([], reviews || this.state.reviewData);
    const paginatedReviews = [];

    while(reviewsCopy.length) {
      paginatedReviews.push(reviewsCopy.splice(0, perPage))
    }
    return paginatedReviews;
  };

  setPaginatedReviews = (perPage) => {
    const paginatedReviews = this.paginateReviews(perPage);
    this.setState({ reviews: paginatedReviews, perPage: perPage || this.state.perPage });
  }

  saveResponse = (response, review) => {
    const responses = this.state.responses;
    responses[review.id] = response;
    this.setState({ responses });
    this.cacheResponse();
  }

  setPage = (e, pageNum) => {
    this.setState({ currentPage: pageNum });
  }

  setPerPage = (e) => {
    this.setPage(null, 0);
    this.setPaginatedReviews(e.target.value);

  }

  cacheResponse = () => {
    window.localStorage.setItem('responses', JSON.stringify(this.state.responses));
  }

  orderBy = (e) => {
    const parameter = e.target.value;
    let sortedArr = [];
    if(parameter === 'place') {
      sortedArr = _.orderBy(this.state.reviewData, ['place'], ['asc']);

    } else if(parameter.split('_')[0] === 'publish') {
      const mappedDate = this.state.reviewData.map((review) => Object.assign({}, review, { published_at:  new Date(review.published_at).getTime() }));
      const order = parameter.split('_')[1];
      sortedArr = _.orderBy(mappedDate, ['published_at'], [ order ]);

    } else {
      const order = parameter.split('_')[1];
      sortedArr = _.orderBy(this.state.reviewData, ['rating'], [ order ]);

    }
    
    this.setState({ reviewData: sortedArr, reviews: this.paginateReviews(null, sortedArr) })
  }

  render () {
    return (
      <AppState.Provider value={{
        state: this.state,
        saveResponse: this.saveResponse,
        setPage: this.setPage,
        setPerPage: this.setPerPage,
        orderBy: this.orderBy
      }}>
        <Container maxWidth="lg">
          {this.props.children}
        </Container>
      </AppState.Provider>
    );
  }
}

export default Main;
