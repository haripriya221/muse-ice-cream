import { useNavigate } from 'react-router';
import { useOrder, Size } from '../context/OrderContext';
import { IceCream, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const SIZES = [
  { name: 'Small' as Size, price: 50, maxFlavors: 5 },
  { name: 'Medium' as Size, price: 70, maxFlavors: 7 },
  { name: 'Large' as Size, price: 100, maxFlavors: 10 },
];

export function SizeSelection() {
  const navigate = useNavigate();
  const { setSize } = useOrder();

  const handleSizeSelect = (size: Size) => {
    setSize(size);
    navigate('/flavors');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#cc162b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#cc162b]/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-16 relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#cc162b]/10 rounded-full blur-xl"></div>
              <div className="relative bg-white p-5 rounded-full shadow-lg">
                <IceCream className="w-14 h-14 text-[#cc162b]" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl mb-3 text-[#cc162b] tracking-tight" style={{ fontWeight: 600 }}>Muse</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Sparkles className="w-4 h-4" />
            <p className="text-lg">Choose Your Perfect Size</p>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {SIZES.map((size, index) => (
            <Card
              key={size.name}
              className="group relative p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#cc162b]/30 bg-white/80 backdrop-blur-sm overflow-hidden"
              onClick={() => handleSizeSelect(size.name)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#cc162b]/0 to-[#cc162b]/0 group-hover:from-[#cc162b]/5 group-hover:to-[#cc162b]/10 transition-all duration-500"></div>
              
              <div className="relative text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#cc162b] to-[#a01222] text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500" style={{ fontWeight: 600 }}>
                    {size.name[0]}
                  </div>
                </div>
                <h2 className="text-3xl mb-3 text-gray-800" style={{ fontWeight: 600 }}>{size.name}</h2>
                <div className="mb-6">
                  <span className="text-4xl text-[#cc162b]" style={{ fontWeight: 700 }}>₹{size.price}</span>
                </div>
                <div className="mb-8 py-4 px-6 bg-red-50/50 rounded-xl border border-[#cc162b]/10">
                  <p className="text-gray-600 text-sm mb-1">Maximum Flavors</p>
                  <p className="text-2xl text-[#cc162b]" style={{ fontWeight: 600 }}>{size.maxFlavors}</p>
                </div>
                <Button className="w-full bg-[#cc162b] hover:bg-[#a01222] transition-all duration-300 py-6 text-base shadow-md hover:shadow-xl group-hover:scale-105">
                  Select {size.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Admin Dashboard
          </Button>
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