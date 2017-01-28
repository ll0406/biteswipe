import React, { Component } from 'react';
import { IconBar } from './IconBar';
import { SwipeButtons } from './SwipeButtons';

export const SummaryCard = props => {
  // console.log(props.restaurant);

  return (
    <div className="card">
    <div className="card-content">
      <img src={props.restaurant.snippet_image_url}></img>
      <p><strong>{props.restaurant.name}</strong></p>
      {
        (props.restaurant.cuisines === '') 
        ? <small>No 'cuisine' data</small>
        : <p>{props.restaurant.cuisines.split(', ').join(' / ')}</p> 
      }
      <br />
      <IconBar restaurant={props.restaurant} />
      <p>Rating: {props.restaurant.user_rating.aggregate_rating}</p>
      <SwipeButtons />
    </div>
    </div>
  );
}


