import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { verifyPayment } from "../../Services/bookingApiCalls";
import { message } from "antd";
import { verifyPayment } from "../../Services/showApiCalls";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");

  const verify = async () => {
    try {
      const response = await verifyPayment({
        sessionId,
      });

      if (response?.success) {
        message.success("Booking Confirmed! Check your tickets.");
        navigate("/");
      } else {
        message.error(response?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (sessionId) {
      verify();
    }
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center mt-20">
      <h2>Verifying your payment...</h2>
    </div>
  );
};

export default PaymentSuccess;
