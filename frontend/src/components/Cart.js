import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      setCart(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Calculate the total price of items in the cart
  const calculateTotal = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  // Handle removing an item from the cart
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      fetchCart(); // Re-fetch the cart after item is removed
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Handle checking out
  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Add checkout logic here (e.g., navigating to checkout page, processing payment)
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;

