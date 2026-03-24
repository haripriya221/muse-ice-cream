import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { order, generateOrderNumber } = useOrder();
  const UPI_ID = 'priya212002@okaxis';
  const UPI_NAME = 'Haripriya K';

  useEffect(() => {
    if (!order.size || order.flavors.length === 0) {
      navigate('/');
    }
  }, [order.size, order.flavors, navigate]);

  const handleProceedToPayment = () => {
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;

    window.location.href = upiUrl;
    toast.success('Opening UPI apps. Enter the shown order amount before paying.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 relative">
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
            handleProceedToPayment();
          }}
          className="w-full bg-[#cc162b] text-white py-4"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}