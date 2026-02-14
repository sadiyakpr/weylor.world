import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../Assets/product_cart.svg'
import list_product_icon from '../../Assets/product_list_icon.svg'


const Sidebar = () => {
  return (
    <div className="sidebar">
  <Link to="/addproduct" className="sidebar-link">
    <div className="sidebar-item">
      <img src={add_product_icon} alt="" />
      <p>Add product</p>
    </div>
  </Link>

  <Link to="/listproduct" className="sidebar-link">
    <div className="sidebar-item">
      <img src={list_product_icon} alt="" />
      <p>Product list</p>
    </div>
  </Link>
</div>

  )
}

export default Sidebar
