import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailPage = (props) => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        const currentProduct = props.products.find(item => item.id === Number(id))
        setProduct(currentProduct)
    })
    return (
        <div>
            <h3>{product?.name}</h3>
            <p>{product?.price}</p>
        </div>
    )
}

export default ProductDetailPage