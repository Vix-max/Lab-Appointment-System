import React from 'react';
import { Link } from 'react-router-dom';

function CardItem2(props) {
  return (
    <li className='cards__item' onClick={props.onClick}>
      <Link className='cards__item__link' to={props.path}>
        <figure className='cards__item__pic-wrap' data-category={props.label}>
          <img
            className='cards__item__img'
            alt='Travel Image'
            src={props.src}
          />
        </figure>
        <div className='cards__item__info'>
          <h5 className='cards__item__text'>{props.text}</h5>
          <p className='cards__item__text__p'>{props.para}</p>
        </div>
      </Link>
    </li>
  );
}

export default CardItem2;
