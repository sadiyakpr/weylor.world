import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInfo = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:4000/allproducts')
      const data = await res.json()

      if (data.success && Array.isArray(data.data)) {
        setAllProducts(data.data)
      } else {
        setAllProducts([])
      }
    } catch (error) {
      console.error('Fetch products failed:', error)
      setAllProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const removeProduct = async (id) => {
    if (!id) return

    try {
      const res = await fetch(
        `http://localhost:4000/deleteproduct/${id}`,
        { method: 'DELETE' }
      )

      const data = await res.json()

      if (data.success) {
        setAllProducts(prev => prev.filter(p => p._id !== id))
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <div className="list-product">
      <h1 className="list-title">All Products</h1>

      <div className="listproduct-header">
        <span>Product</span>
        <span>Title</span>
        <span>Old Price</span>
        <span>New Price</span>
        <span>Category</span>
        <span>Remove</span>
      </div>

      <div className="listproduct-allproducts">
        {loading && <p className="empty-state">Loading products...</p>}

        {!loading && allproducts.length === 0 && (
          <p className="empty-state">No products added yet.</p>
        )}

        {allproducts.map((product) => (
          <div key={product._id} className="listproduct-row">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />

            <p className="title">{product.name}</p>
            <p className="old">₹{product.old_price}</p>
            <p className="new">₹{product.new_price}</p>
            <p className="category">{product.category}</p>

            <img
              src={cross_icon}
              alt="Remove product"
              className="remove-icon"
              onClick={() => removeProduct(product._id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
