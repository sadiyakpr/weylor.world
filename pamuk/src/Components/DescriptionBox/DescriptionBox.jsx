import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-nav">
        <button className="active">Description</button>
        <button>Reviews (3)</button>
      </div>

      <div className="descriptionbox-content">
        <p>
          Designed with comfort and simplicity in mind, this piece is crafted
          from soft, breathable fabric that feels gentle on the skin. Its
          minimal silhouette makes it easy to style for everyday wear while
          maintaining a refined, modern look.
        </p>

        <p>
          Thoughtfully made to last, each detail reflects our commitment to
          quality and mindful fashion. Pair it effortlessly with your daily
          essentials or elevate it with statement pieces.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox

