import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();
faker.seed(99);

const Context = ({children}) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.number.int({ max: 7 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.number.int({ max: 5 }),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart:[],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
  });
  
  return <Cart.Provider value={{state, dispatch, productState, productDispatch}} >{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};

Context.propTypes = {
  children: PropTypes.node.isRequired
};
