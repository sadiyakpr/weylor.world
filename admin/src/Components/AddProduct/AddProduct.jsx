import React, { useState, useEffect } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', type: '' })

  const [productDetails, setProductDetails] = useState({
    name: '',
    category: 'women',
    new_price: '',
    old_price: '',
  })

  /* ---------- IMAGE PREVIEW ---------- */
  useEffect(() => {
    if (!image) {
      setPreview(null)
      return
    }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  /* ---------- HANDLERS ---------- */
  const imageHandler = (e) => setImage(e.target.files[0])

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  /* ---------- TOAST ---------- */
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: '' }), 3000)
  }

  /* ---------- SUBMIT ---------- */
  const Add_Product = async () => {
    if (!productDetails.name || !image) {
      showToast('Please fill all required fields', 'error')
      return
    }

    setLoading(true)

    try {
      /* Upload image */
      const formData = new FormData()
      formData.append('product', image)

      const uploadRes = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      const uploadData = await uploadRes.json()
      if (!uploadData.success) throw new Error('Image upload failed')

      /* Create product */
      const product = {
        ...productDetails,
        image: uploadData.image_url,
      }

      const productRes = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      const productData = await productRes.json()
      if (!productData.success) throw new Error('Product creation failed')

      showToast('Product added successfully!')

      /* Reset form */
      setProductDetails({
        name: '',
        category: 'women',
        new_price: '',
        old_price: '',
      })
      setImage(null)
      setPreview(null)
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-product">
      <h2 className="addproduct-title">Add New Product</h2>

      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}

      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      <div className="addproduct-itemfield upload-box">
        <label htmlFor="file-input">
          <img
            src={preview || upload_area}
            alt="Upload"
            className="addproduct-thumbnail-img"
          />
          <span>Upload product image</span>
        </label>
        <input
          onChange={imageHandler}
          type="file"
          accept="image/*"
          id="file-input"
          hidden
        />
      </div>

      <button
        onClick={Add_Product}
        className="addproduct-btn"
        disabled={loading}
      >
        {loading ? 'ADDING...' : 'ADD PRODUCT'}
      </button>
    </div>
  )
}

export default AddProduct
