import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'

export default function Payed() {

    const [ data, setData] = useState(null)

    const gettingData = () =>{
        fetch("http://localhost:5000/sales")
        .then((res) => res.json())
        .then(data =>{
            setData(data)
        })
    }
    useEffect(() =>{
        gettingData()
    }, [])

  return (
    <MainLayout>
        <h2>Payed</h2>
        <div className="table-responsive bg-dark">
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.map((cartProduct, key) =>
                                    <tr key={key}>
                                        <td >{cartProduct.id}</td>
                                        <td>
                                        <img width="140" src={cartProduct.image} className="img-fluid" alt={cartProduct.name} />
                                        </td>
                                        <td >{cartProduct.name}</td>
                                        <td>{cartProduct.price}</td>
                                      <td>{cartProduct.quantity}</td>
                                        <td>{cartProduct.totalAmount}</td>
                                     
                                    </tr>)
                                    }
                            </tbody>
                        </table>
                        
                    </div>
    </MainLayout>
  )
}
