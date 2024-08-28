import React from 'react'
import AddToCart from '../AddToCart';


const ProductCard = () => {
  return (
    <div className='p-5 my-5 bg-sky-200 text-white text-xl hover:bg-sky-100'>
        <AddToCart />
    </div>
  )
}

export default ProductCard