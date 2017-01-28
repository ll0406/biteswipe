import React from 'react';
import {SummaryCard} from './SummaryCard';

export const CardBrowse = props => {
  return (
    <div className="row">
      <div className="col s12">
        {
          (props.list.length > 0) && (
            props.list.map( (restaurant, i) => (
              <SummaryCard key={i} restaurant={restaurant.restaurant} />
            ))
          ) 
        }
      </div>  
    </div>
  )
}
