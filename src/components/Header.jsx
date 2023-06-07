import React from 'react';
import { Container, Navbar, FormControl, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import Logo from '../images/logo.svg';

const Header = () => {

  const {state: { cart }, dispatch, productDispatch} = CartState();
  
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80}}>
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{fontSize: '30px'}}>
            <img src={Logo} alt="Logo da Fenrir Store" style={{maxHeight: '3rem', filter: 'invert(100)', paddingRight: '10px'}}/>
            Fenrir Store
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500}}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: 'SORT_BY_SEARCH',
                payload: e.target.value
              });
            }}
          />
        </Navbar.Text>
        
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <span style={{padding: '10px'}}>{cart.length}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>

              {cart.length>0?(
                <>
                  {
                    cart.map((prod) => (
                      <span className="cartItem" key={prod.id}>
                        <img 
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.name}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>$ {prod.price.split('.')[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{cursor: 'pointer'}}
                          onClick={() => dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: prod,
                          })}
                        />
                      </span>
                    ))
                  }
                  <Link to="/cart">
                    <Button style={{ width: '95%', margin: '0 10px'}}>
                      Go to Cart
                    </Button>
                  </Link>

                </>
              ) : (
                <span style={{ padding: 10}}>Cart is Empty!</span>
              )}

              
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default Header;
