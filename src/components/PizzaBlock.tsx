import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, addItem, cartItems } from '../redux/slices/cartSlice';

const namedTypes = ['тонкое', 'традиционное'];

interface IPizzablockProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

const PizzaBlock: React.FC<IPizzablockProps> = ({ id, title, price, imageUrl, types, sizes }) => {
  const [activeSize, setActiveSize] = useState(0);
  const [type, setType] = useState(0);
  const typeNames = ['тонкое', 'традиционное'];
  const dispatch = useDispatch();
  type ICartItem = {
    count: number;
  };

  const cartItem: ICartItem | undefined = useSelector(cartItems(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const onCLickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[type],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {namedTypes.map((v, i) => (
              <li onClick={() => setType(i)} className={type === i ? 'active' : ''}>
                {v}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={onCLickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
