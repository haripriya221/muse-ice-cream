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

  useEffect(() => {
    if (!order.size || order.flavors.length === 0) {
      navigate('/');
    }
  }, [order.size, order.flavors, navigate]);

  const handlePaymentComplete = async () => {
    const newOrder = {
      orderNumber: order.orderNumber,
      size: order.size,
      flavors: order.flavors,
      price: order.price,
      timestamp: new Date().toISOString(),
      status: 'paid',
    };

    const orders = JSON.parse(localStorage.getItem('iceOrders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('iceOrders', JSON.stringify(orders));

    try {
      await fetch('https://script.google.com/macros/s/AKfycbx55ciNR6FRANg-106emd75jfbh38MweMUfzpSphQFo_2kskICZEBtlTqaT7QTQRNME/exec', {
        method: 'POST',
        body: JSON.stringify({
          orderId: order.orderNumber,
          size: order.size,
          flavours: order.flavors.join(', '),
          price: order.price,
        }),
      });
    } catch (error) {
      console.error('Error sending to sheet:', error);
    }

    toast.success('Payment confirmed! Order placed.');
    setStage('complete');
  };

  const handleNewOrder = () => {
    resetOrder();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 relative">
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

        {stage === 'payment' && (
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl text-[#cc162b] mb-4">Payment</h1>
            <p className="mb-4">Order #{order.orderNumber}</p>

            <Card className="p-6 mb-6">
              <p className="mb-4 text-lg">Scan QR to Pay</p>
              <img src="/qr.png" alt="Payment QR" className="w-64 mx-auto mb-4" />
              <p className="text-xl text-[#cc162b]">₹{order.price}</p>
              <p className="text-sm text-gray-500 mt-2">Use any UPI app like GPay, PhonePe, or Paytm to complete payment.</p>
            </Card>

            <Button
              onClick={handlePaymentComplete}
              className="w-full bg-[#cc162b] text-white py-4"
            >
              I Have Paid
            </Button>
          </div>
        )}

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