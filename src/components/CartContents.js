
import React, {useState, useEffect} from 'react';
import { useGlobalContext } from '../context/Context';
import { useNavigate } from "react-router-dom";
 import axios from "axios";    


const CartContents = ({children}) => {
const {cart, deleted, setDeleted} = useGlobalContext()
    const [singleProductId, setSingleProductId] = useState([])

     const navigate = useNavigate();
    

     
const handleSubmit =  e => {
    e.preventDefault();
    setDeleted(true)
    const productId = e.target.id;
    console.log(productId)
    let request = {method: 'POST',
            url: "http://localhost:8001/delete-cart",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
               productId: productId }}
              
            axios(request)
        .catch(err => console.log(err))};

     useEffect(() => {
            if (deleted) {
              navigate('/cart')
              setDeleted(false)
            }
        }, [cart])

        

return (

 <>
 
  <div className='cart'>
    <div className='your-cart'>
     <h2> Your Cart</h2>
    </div>
 {cart.map((item => {
   const {id, cartItem, title, price, imageUrl} = item;
  return (
  <div className="cart-item">
    <div className="cart-item-left">
    <h2>{title}</h2>
     <h4>Quantity: {cartItem.quantity}</h4>
     <button id={id} onClick={handleSubmit} className="default-button">Delete from cart</button>
     </div> 
     
      <div className="cart-item-right">
      <img src={imageUrl}/>
      </div> </div>
  )
 }))}

 </div>

 </>
  );
};

export default CartContents;
