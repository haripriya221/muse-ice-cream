import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { order, generateOrderNumber, resetOrder } = useOrder();
  const [stage, setStage] = useState<'review' | 'payment' | 'complete'>('review');
  const UPI_ID = 'priya212002@okaxis';
  const UPI_NAME = 'Haripriya K';

  useEffect(() => {
    if (!order.size || order.flavors.length === 0) {
      navigate('/');
    }
  }, [order.size, order.flavors, navigate]);

  const handleProceedToPayment = () => {
    const orderRef = order.orderNumber ?? Date.now();
    const transactionNote = `Ice Cream Order ${orderRef}`;
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${order.price}&cu=INR&tn=${encodeURIComponent(transactionNote)}&tr=${orderRef}`;

    window.location.href = upiUrl;
    toast.success('Opening UPI apps...');
  };

  const handleNewOrder = () => {
    resetOrder();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 relative">

        {/* REVIEW PAGE */}
        {stage === 'review' && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl text-[#cc162b] mb-2">Order Summary</h1>
              <p className="text-gray-500">Review your order</p>
            </div>

            <Card className="p-6 max-w-xl mx-auto mb-6">
              <p><b>Size:</b> {order.size}</p>
              <p><b>Flavours:</b> {order.flavors.join(', ')}</p>
              <p><b>Total:</b> ₹{order.price}</p>
            </Card>

            <Button
              onClick={() => {
                generateOrderNumber();
                setStage('payment');
              }}
              className="w-full bg-[#cc162b] text-white py-4"
            >
              Proceed to Payment
            </Button>
          </>
        )}

        {/* PAYMENT PAGE */}
        {stage === 'payment' && (
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl text-[#cc162b] mb-4">Payment</h1>
            <p className="mb-4">Order #{order.orderNumber}</p>

            <Card className="p-6 mb-6">
              <p className="mb-4 text-lg">Scan QR to Pay</p>

              {/* ✅ REAL QR IMAGE */}
              <img src="/qr.png" alt="Payment QR" className="w-64 mx-auto mb-4" />

              <p className="text-xl text-[#cc162b]">₹{order.price}</p>
            </Card>

            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-[#cc162b] text-white py-4"
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* COMPLETE PAGE */}
        {stage === 'complete' && (
          <div className="max-w-xl mx-auto text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl text-[#cc162b] mb-2">Order Placed!</h1>

            <p className="text-lg mb-4">
              Token: <b>{order.orderNumber}</b>
            </p>

            <Card className="p-4 mb-6">
              <p>Size: {order.size}</p>
              <p>Flavours: {order.flavors.join(', ')}</p>
              <p>Paid: ₹{order.price}</p>
            </Card>

            <Button onClick={handleNewOrder} className="w-full bg-[#cc162b] text-white py-4">
              New Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}