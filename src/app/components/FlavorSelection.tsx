import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { FLAVORS } from '../data/flavors';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

export function FlavorSelection() {
  const navigate = useNavigate();
  const { order, addFlavor, removeFlavor, canAddMoreFlavors } = useOrder();

  // ✅ Size → Max flavors config
  const getSizeConfig = () => {
    const configs = {
      Small: 5,
      Medium: 7,
      Large: 10,
    };
    return order.size ? configs[order.size] : 0;
  };

  const maxAllowed = getSizeConfig();

  useEffect(() => {
    if (!order.size) {
      navigate('/');
    }
  }, [order.size, navigate]);

  const handleFlavorToggle = (flavorName: string) => {
    if (order.flavors.includes(flavorName)) {
      removeFlavor(flavorName);
      toast.success(`${flavorName} removed`);
    } else {
      // 🔒 EXTRA SAFETY CHECK (even if UI is bypassed)
      if (order.flavors.length >= maxAllowed) {
        toast.error(`Maximum ${maxAllowed} flavors allowed for ${order.size} size`);
        return;
      }

      if (canAddMoreFlavors()) {
        addFlavor(flavorName);
        toast.success(`${flavorName} added!`);
      } else {
        toast.error(`Maximum ${maxAllowed} flavors allowed for ${order.size} size`);
      }
    }
  };

  const handleProceed = () => {
    if (order.flavors.length > 0) {
      navigate('/confirm');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 relative">
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#cc162b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 bg-[#cc162b]/5 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-red-50 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#cc162b]" />
              <h1 className="text-5xl text-[#cc162b]" style={{ fontWeight: 600 }}>
                Choose Your Flavors
              </h1>
              <Sparkles className="w-5 h-5 text-[#cc162b]" />
            </div>
            <p className="text-lg text-gray-500">
              {order.size} size • Select up to {maxAllowed} flavors
            </p>
          </div>
        </div>

        {/* Counter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="p-8 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                  Selected Flavors
                </p>
                <p className="text-4xl" style={{ fontWeight: 700 }}>
                  <span className="text-[#cc162b]">{order.flavors.length}</span>
                  <span className="text-gray-300 mx-2">/</span>
                  <span className="text-gray-400">{maxAllowed}</span>
                </p>
              </div>

              <div className="h-16 w-px bg-gray-200"></div>

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                  Total Price
                </p>
                <p className="text-4xl text-[#cc162b]" style={{ fontWeight: 700 }}>
                  ₹{order.price}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Flavor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">
          {FLAVORS.map((flavor, index) => {
            const isSelected = order.flavors.includes(flavor.name);
            const canSelect = isSelected || canAddMoreFlavors();

            return (
              <Card
                key={flavor.name}
                className={`group relative cursor-pointer transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'border-2 border-[#cc162b] shadow-xl scale-[1.02]'
                    : canSelect
                    ? 'border border-gray-200 hover:border-[#cc162b]/50 hover:shadow-lg hover:scale-[1.02]'
                    : 'border border-gray-200 opacity-40 cursor-not-allowed'
                }`}
                onClick={() => canSelect && handleFlavorToggle(flavor.name)}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                      isSelected
                        ? 'from-[#cc162b]/30 to-transparent'
                        : 'from-black/20 to-transparent opacity-0 group-hover:opacity-100'
                    }`}
                  ></div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-[#cc162b] rounded-full p-2 shadow-lg animate-in zoom-in duration-300">
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                <div className="p-4 text-center bg-white">
                  <p className="font-medium text-sm text-gray-700">
                    {flavor.name}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected List */}
        {order.flavors.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-6 bg-gradient-to-br from-red-50/50 to-white border border-[#cc162b]/10 shadow-md">
              <h3 className="text-lg mb-4 text-gray-700" style={{ fontWeight: 600 }}>
                Your Selection:
              </h3>
              <div className="flex flex-wrap gap-2">
                {order.flavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-5 py-2 bg-[#cc162b] text-white rounded-full text-sm shadow-md"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Proceed */}
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={handleProceed}
            disabled={order.flavors.length === 0}
            className="w-full bg-gradient-to-r from-[#cc162b] to-[#a01222] py-7 text-lg shadow-xl disabled:opacity-50"
          >
            Proceed to Order • {order.flavors.length} flavor{order.flavors.length !== 1 ? 's' : ''} selected
          </Button>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100 bg-white/50">
        <p>
          Made with Love <span className="text-red-400">♥</span> By K Haripriya
        </p>
      </footer>
    </div>
  );
}