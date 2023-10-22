
import { Header } from "../Components/Header"

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
require("../Css/ProductPage.css")

export const CSVFileUploadStatusPage = () => {

    const [csvFiles, setCSVFiles] = useState([]);


    // Use Effect For Data Fetching
    useEffect(() => {
        getAllCSVFiles();
    }, [])

    // Fetching Data
    const getAllCSVFiles = async () => {
        try {
            const product = await axios.get(`/api/csv/all-csv-files`);
            console.log('product:', product)
            if (product?.data?.status) {
                setCSVFiles(product?.data?.csvFiles)
            } else {
                toast.error(product.data.message);
            }
        } catch (error) {
            
            console.log(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className="container-1">
                <h4>CSV Files Upload Status</h4>
                <table className="table-1">
                    <thead>
                        <tr>
                            
                            <th>CSV File Status ---------- Upload Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {csvFiles.map((element, index) => {
                            console.log(element.uploadStatus)
                            return (

                                <tr key={index}>

                                    <td>{element.csvFileName + "----------" + element.uploadStatus}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </>
    )
}