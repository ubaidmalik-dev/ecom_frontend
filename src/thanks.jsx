import React from 'react';
import { CheckCircle } from 'lucide-react';
// import { Button } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed and will be shipped shortly.</p>

        {/* <Button variant="outline" className="w-full mt-4 py-2 rounded-xl">
          Continue Shopping
        </Button> */}
      </div>
    </div>
  );
};

export default OrderSuccess; 
