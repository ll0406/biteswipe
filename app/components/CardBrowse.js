import React from 'react';

export const CardBrowseContainer = props => {
  return (
    <div>
      {
        (props.list.length === 0) && (
          props.list.forEach( restaurant => (
            <SummaryCard restaurant={restaurant} />
          ))
        ) 
      }
    </div>
  )
}
