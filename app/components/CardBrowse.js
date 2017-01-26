import React from 'react';

export const CardBrowse = props => {
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
