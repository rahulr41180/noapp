
import { Header } from "../Components/Header";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const CSVFileUploadPage = () => {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    // Handling Input Value
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // Form Function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('csvFile', file)
        try {
            const res = await axios.post("/api/product/details-upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log('res:', res)
            if(res.data.status) {
                toast.success(res.data.message);
                setFile(null);
                navigate("/get-all-products");
            } else {
                toast.error(res.data.message);
                setFile(null);
            }
        } catch(error) {
            toast.error("Something went wrong! Please try again leter")
        }
        
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <input type="file" name="" accept=".csv" id="" onChange={handleChange} />
                <button type="submit">Upload File</button>
            </form>
            <Toaster />
        </>
    )

}