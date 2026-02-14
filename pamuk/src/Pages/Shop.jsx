import React from 'react'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Testimonials from '../Components/Testimonials/Testimonials'
import Hero2 from '../Components/Hero2/Hero2'
const Shop = () => {
  return (
    <div>
      <Hero2/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <Testimonials/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
