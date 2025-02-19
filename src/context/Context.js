import axios from 'axios'
import React, {useState, useCallback, useContext, useEffect} from 'react'
import reducer from './reducer'

const AppContext = React.createContext();

const AppProvider = ({children}) => {

        const [loading, isLoading] = useState(false)
        // sets up state for Loading component
        const [searchTerm, setSearchTerm] = useState('')
        const [products, setProducts] = useState([])
        const [show, setShow] = useState(false);

        const [cart, setCart] = useState([])

        const [deleted, setDeleted] = useState(false)
        const [redirect, setRedirect] = useState(false)
 

   const cartUrl =
    'http://localhost:8001/cart'

         
   const getCart = async () => {
        isLoading(true)
        const data = await axios.get(cartUrl);
        const newCart = data.data
            setCart(newCart)
        isLoading(false)
        return cart       
          .catch(error => {
        console.log(error);
        })}

           useEffect(()=> {
            getCart()
        }, [redirect]) 

         useEffect(()=> {
            getCart()
        }, [deleted]) 

    

          const url =
    'http://localhost:8001/products'
  
        const getProducts =async () => {
        isLoading(true)
        try {
        const data = await axios.get(url);
        const newProducts = data.data
        setProducts(newProducts)
        isLoading(false)

        }  catch(error) {
        console.log(error);
        } }

           useEffect(()=> {
            getProducts()
        }, [])
    

let filtered  = products.map((item) => { 
            const {title} = item;
            return {...item, title: title.toLowerCase()}})
            .filter((product)=> {
    return product.title.includes(searchTerm.toLowerCase())  
})

console.log(filtered)

// really bad workaround for an issue i was having. in order to make product search case-insensitive, i  mapped products array (state) to a new array, and converted the title property to lowercase.this new array is then filtered - a check is done against the searchTerm (what is typed in the search box) which is also converted to lowercase. the title of each product is then converted to uppercase later on rendering. 
 

    return<>
    <AppContext.Provider value={{
        loading,
        searchTerm,
        products,
        setSearchTerm,
        getProducts,
        filtered,
        show,
        setShow,
        cart,
        setCart,
        getCart,
        redirect,
        setRedirect,
        getCart,
        deleted, 
        setDeleted
        // handleClick

    }}> {children}
    </AppContext.Provider>
    </>
}

export const useGlobalContext = () => {
return useContext(AppContext)
}

export {AppContext, AppProvider}