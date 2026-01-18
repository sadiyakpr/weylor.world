import './Breadcrums.css'
import arrow_icon from '../../Assets/arrow_icon.svg'

const Breadcrums = ({ product }) => {
  // Guard: product not loaded yet
  if (!product || !product.category || !product.name) {
    return null
  }

  return (
    <nav className="breadcrum" aria-label="breadcrumb">
      <span>Home</span>
      <img src={arrow_icon} alt="" />

      <span>Shop</span>
      <img src={arrow_icon} alt="" />

      <span>{product.category}</span>
      <img src={arrow_icon} alt="" />

      <span>{product.name}</span>
    </nav>
  )
}

export default Breadcrums