import { useNavigate } from 'react-router';
import { ArrowLeft, IceCream, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Order {
  orderNumber: string;
  size: string;
  flavors: string[];
  price: number;
  timestamp: string;
  status: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
    
    // Refresh orders every 5 seconds
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('iceOrders') || '[]');
    setOrders(storedOrders.reverse()); // Show newest first
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders?')) {
      localStorage.setItem('iceOrders', '[]');
      setOrders([]);
      toast.success('All orders cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#cc162b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#cc162b]/5 rounded-full blur-3xl"></div>
        
        <div className="mb-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-muse text-5xl mb-2 text-[#cc162b] tracking-tight" style={{ fontWeight: 600 }}>Muse</h1>
              <p className="text-lg text-gray-500">Admin Dashboard</p>
            </div>
            {orders.length > 0 && (
              <Button
                variant="outline"
                onClick={clearAllOrders}
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-colors"
              >
                Clear All Orders
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Total Orders</p>
                <p className="text-4xl text-gray-800" style={{ fontWeight: 700 }}>{orders.length}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cc162b]/10 to-[#cc162b]/5 flex items-center justify-center">
                <IceCream className="w-8 h-8 text-[#cc162b]" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Total Revenue</p>
                <p className="text-4xl text-green-600" style={{ fontWeight: 700 }}>
                  ₹{orders.reduce((sum, order) => sum + order.price, 0)}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Today's Orders</p>
                <p className="text-4xl text-gray-800" style={{ fontWeight: 700 }}>
                  {orders.filter(order => {
                    const orderDate = new Date(order.timestamp).toDateString();
                    const today = new Date().toDateString();
                    return orderDate === today;
                  }).length}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cc162b]/10 to-[#cc162b]/5 flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#cc162b]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-3xl text-gray-800" style={{ fontWeight: 600 }}>Recent Orders</h2>
          
          {orders.length === 0 ? (
            <Card className="p-16 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <IceCream className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 text-xl mb-2">No orders yet</p>
              <p className="text-gray-400 text-sm">Orders will appear here when customers place them</p>
            </Card>
          ) : (
            <div className="grid gap-5">
              {orders.map((order, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="bg-gradient-to-br from-[#cc162b] to-[#a01222] text-white px-6 py-3 rounded-2xl shadow-lg">
                          <p className="text-xs uppercase tracking-wide opacity-90">Token</p>
                          <p className="text-2xl tracking-wider" style={{ fontWeight: 700 }}>{order.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(order.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 min-w-[60px]">Size:</span>
                          <span className="px-4 py-1.5 bg-red-50 text-[#cc162b] rounded-full text-sm border border-[#cc162b]/20" style={{ fontWeight: 600 }}>
                            {order.size}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Flavors:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.flavors.map((flavor, i) => (
                              <span
                                key={i}
                                className="px-4 py-1.5 bg-gradient-to-r from-red-50 to-red-50/50 text-[#cc162b] rounded-full text-sm border border-[#cc162b]/10"
                              >
                                {flavor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right border-l border-gray-100 pl-8">
                      <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Amount</p>
                      <p className="text-4xl text-green-600 mb-3" style={{ fontWeight: 700 }}>₹{order.price}</p>
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm border border-green-200">
                        <CheckCircle className="w-4 h-4" />
                        Paid
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <p className="flex items-center justify-center gap-2">
          Made with Love <span className="text-red-400">♥</span> By K Haripriya
        </p>
      </footer>
    </div>
  );
}