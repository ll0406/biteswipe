import React, { Component } from 'react';
import { IconBar } from './IconBar';
import { SwipeButtons } from './SwipeButtons';

export const SummaryCard = props => {
  // console.log(props.restaurant);

  return (
    <div className="card swipe-card">
      <div className="card-image">
        <img src="http://www.fillmurray.com/284/196" />
        <span className="card-title">{props.restaurant.name}</span>
      </div>
      <div className="card-content">
        {
          (props.restaurant.cuisines === '') 
          ? <small>No 'cuisine' data</small>
          : <p>{props.restaurant.cuisines.split(', ').join(' / ')}</p> 
        }
        <br />
        <IconBar restaurant={props.restaurant} />
        <p>Rating: <small>No rating</small></p>
        <SwipeButtons />
      </div>
    </div>
  );
}


