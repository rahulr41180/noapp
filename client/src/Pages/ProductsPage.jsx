
import { Header } from "../Components/Header"


import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
require("../Css/ProductPage.css")

export const ProductsPage = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Use Effect For Paginate Data
    useEffect(() => {
        getAllProduct();
    }, [currentPage, itemsPerPage])

    // Fetching Paginate Data
    const getAllProduct = async () => {
        try {
            const product = await axios.get(`/api/product/all-products/${currentPage}/${itemsPerPage}`);
            // console.log('product:', product)
            if (product?.data?.status) {
                setProducts(product.data.products);
                setIsLoading(false);
            } else {
                toast.error(product.data.message);
            }
        } catch (error) {
            
            console.log(error.message);
        }
    }

    // Function to calculate total pages
    useEffect(() => {
        getAllProductLength();
    }, []);

    // Getting All Product Count
    const getAllProductLength = async () => {
        try {
            const productLength = await axios.get("/api/product/all-product-count");
            // console.log('productLength:', productLength);
            if(productLength?.data?.status) {
                setTotalPages(Math.ceil(productLength?.data.productLength/ itemsPerPage));
            }
        } catch(error) {
            console.log(error.message);
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <Header />
            <div className="container">
                <h4>Paginate Data</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Brand</th>

                            <th>Discount Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((element, index) => {
                            return (
                                <tr>
                                    <th>{element.name}</th>
                                    <th>{element.desc}</th>
                                    <th>{element.price}</th>
                                    <th>{element.category}</th>
                                    <th>{element.type}</th>
                                    <th>{element.brand}</th>
                                    <th>{element.discount_price}</th>
                                    <th>{element.rating}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <button disabled = {currentPage === 1}
                    
                    onClick={() => {
                        handlePageChange(currentPage - 1);
                    }}>Previous</button>
                    <span>Page : {currentPage} of {totalPages}</span>
                    <button disabled = {currentPage === totalPages}
                    
                    onClick={() => {
                        handlePageChange(currentPage + 1);
                    }}>Next</button>
                </div>
            </div>
            <Toaster />

        </>
    )

}