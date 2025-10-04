import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();  // Waxaa saxay in la isticmaalay searchParams halkii SetSearchParams
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    // Samee verifyPayment function gudaha useEffect
    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(url + "/api/order/verify", { success, orderId });
                if (response.data.success) {
                    navigate("/myorders");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
                navigate("/");
            }
        };
        verifyPayment();  // Wac function-ka verifyPayment markii component-ka la furo
    }, [url, success, orderId, navigate]);  // Ku dar dependencies saxda ah

  return (
    <div>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default Verify;
