import React from 'react';

export const IconBar = props => {

  let price = '';
  for (let i=0; i<props.restaurant.price_range; i++){
    price += '$';
  }

  return (
    <div>
      <img src="img/beer_ico.png" 
        width="50px" height="50px"/>
      <img src="img/delivery_ico.png" 
        width="50px" height="50px"/>
      <span className="price-range">{price}</span>
    </div>
  );
}