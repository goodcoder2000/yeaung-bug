import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';



function POSPage() {    
    // zay ya use
    const [products, setProducts] = useState([]);
    const [ mycart, setMycart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toastOption = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const fetchProducts = () => {
        fetch('http://localhost:5000/products')
        .then((res) => res.json())
        .then(data =>{
            setProducts(data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProductToCart = (product) => {
        setMycart([...mycart,product])
        toast(`Added ${product.name}  to cart`, toastOption)
    }

    const removeProduct = (product) => {
        setMycart(mycart.filter((item) => item.id !== product.id))
        console.log("remove", product)
    }

    const handleSale = () => {
        for(let i=0; i< mycart.length; i++){
            fetch("http://localhost:5000/sales",{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(mycart[i])
            })
            .then(() => console.log("pay success"))
            .catch(err => console.log(err))
        }
    }

    let totalsum = mycart.map((item) => item.price)


    return (
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    <Link to="/additem" className='btn bg-primary text-white mb-3'>Add Item</Link>
                    <Link to="/payed" className='btn bg-primary text-white mb-3' style={{marginLeft: 20}}>Payed Item</Link>
                    
                    {isLoading ? 'Loading' : <div className="row">

                        {products.map((product, index) =>
                            <div key={index} className="col-lg-4 mb-4">
                                <div className="pos-item px-3 text-center border" onClick={() => addProductToCart(product)}>
                                    <p>{product.name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.name} />
                                    <p>$ {product.price}</p>
                                </div>
                            </div>
                        )}

                    </div>}

                </div>
                <div className="col-lg-4">
                    
                    <div className="table-responsive bg-dark">
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>QTY</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>

                            <tbody>
                                {mycart.map((cartProduct, key) =>
                                    <tr key={key}>
                                        <td >{cartProduct.id}</td>
                                        <td >{cartProduct.name}</td>
                                        <td>{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>{cartProduct.totalAmount}</td>
                                        <td>
                                            <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                        </td>
                                    </tr>)
                                    }
                            </tbody>
                        </table>
                        { mycart.length === 0? null: <h2 className='px-2 text-white'>Total Amount : {totalsum.reduce((partialSum, a) => partialSum + a, 0)} $</h2>}
                        
                    </div>


                    <div className="mt-3">
                        { mycart.length === 0? null: <button className='btn btn-primary' onClick={ handleSale }>Pay Now</button>}
                    </div>
                        {console.log("mycart here", mycart)}
                        {console.log("total price", totalsum)}

                </div>
            </div>
        </MainLayout>
    )
}

export default POSPage