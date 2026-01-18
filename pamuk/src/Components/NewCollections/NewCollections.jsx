import './NewCollections.css'
import Item from '../Item/Item'
import React, { useEffect, useState } from 'react'

/**
 * SEO-Optimized New Collections Section – WEYLOR
 * Focus: semantic HTML, crawlable content, accessibility, UX states
 */

const NewCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch new collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/newcollections`
        )

        const result = await response.json()

        if (!result.success) {
          throw new Error('Failed to fetch collections')
        }

        setCollections(result.data)
      } catch (err) {
        console.error(err)
        setError('Unable to load new collections at the moment.')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  return (
    <section
      className="new-collections"
      aria-labelledby="new-collections-heading"
    >
      {/* Section Heading */}
      <header className="new-collections-header">
        <h2 id="new-collections-heading">
          New Sustainable Fashion Collections
        </h2>
        <p className="new-collections-subtitle">
          Discover the latest arrivals from WEYLOR — premium sustainable clothing
          designed with comfort, durability, and timeless style.
        </p>
      </header>

      {/* Loading State (SEO-safe) */}
      {loading && (
        <p className="new-collections-loading" role="status">
          Loading new collections…
        </p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="new-collections-error" role="alert">
          {error}
        </p>
      )}

      {/* Product Grid */}
      {!loading && !error && collections.length > 0 && (
        <div
          className="new-collections-item"
          role="list"
        >
          {collections.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && collections.length === 0 && (
        <p className="new-collections-empty">
          No new collections available right now. Please check back soon.
        </p>
      )}
    </section>
  )
}

export default NewCollections