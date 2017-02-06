import React from 'react';

export const ListItem = props => {
	return (
		<div style={{
            backgroundColor: props.color,
            textDecoration:  props.dead,
            fontFamily: 'IM Fell English SC, serif'
          	}}>
			<li>{props.primaryText}
	          <div className='avatar'> 
	          <img src='http://vignette1.wikia.nocookie.net/thesimsmedieval/images/3/3f/Margery-face.jpg/revision/latest?cb=20110630213058' />
	          </div>
            </li>
		</div>
	)
}

export default ListItem;