import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { IceCream, Sparkles } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';

type Combo = {
  name: string;
  subtitle?: string;
  flavors: string[];
  price: number;
};

const RECOMMENDED_COMBOS: Combo[] = [
  {
    name: '🍫 Choco Overload',
    subtitle: 'Best Seller',
    flavors: ['Chocolate Brownie', 'Belgian Chocolate', 'Hazelnut Mudslide', 'American Mudcake', 'Choco Chip'],
    price: 100,
  },
  {
    name: '🍓 Fruity Blast',
    subtitle: 'Refreshing',
    flavors: ['Strawberry', 'Alphonso Mango', 'Black Currant', 'Guava Chilli'],
    price: 70,
  },
  {
    name: '👑 Royal Treat',
    subtitle: 'Premium Feel',
    flavors: ['Pistachio', 'Rich Dry Fruits', 'Belgian Chocolate', 'American Mudcake'],
    price: 100,
  },
  {
    name: '🔥 Crazy Mix',
    subtitle: 'Signature Combo',
    flavors: ['Guava Chilli', 'Belgian Chocolate', 'Strawberry', 'Butterscotch', 'Hazelnut Mudslide'],
    price: 80,
  },
];

const MORE_COMBOS: Combo[] = [
  {
    name: '😋 Sweet & Safe',
    flavors: ['Vanilla', 'Butterscotch', 'Chocolate Brownie'],
    price: 60,
  },
  {
    name: '🌈 Colour Pop',
    flavors: ['Strawberry', 'Alphonso Mango', 'Black Currant', 'Pistachio'],
    price: 70,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { setPresetOrder } = useOrder();
  const [hasStarted, setHasStarted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const combosToShow = useMemo(
    () => (showMore ? [...RECOMMENDED_COMBOS, ...MORE_COMBOS] : RECOMMENDED_COMBOS),
    [showMore],
  );

  const handleComboSelect = (combo: Combo) => {
    setPresetOrder('Medium', combo.flavors);
    navigate('/spin', { state: { comboName: combo.name } });
    toast.success(`${combo.name} selected`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50/40 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#cc162b]/20 rounded-full blur-xl" />
              <div className="relative bg-white p-5 rounded-full shadow-lg border border-[#cc162b]/10">
                <IceCream className="w-14 h-14 text-[#cc162b]" />
              </div>
            </div>
          </div>

          <h1 className="font-muse text-6xl text-[#cc162b] tracking-tight mb-3" style={{ fontWeight: 600 }}>
            Muse
          </h1>
          <p className="text-gray-600 text-lg mb-8">Pick a combo or build your own perfect scoop.</p>

          <Button
            onClick={() => setHasStarted(true)}
            className="bg-gradient-to-r from-[#cc162b] to-[#a01222] hover:from-[#b31324] hover:to-[#8f0f1d] text-white px-14 py-10 text-3xl md:text-4xl rounded-2xl shadow-2xl border-2 border-white/50"
          >
            Start Your Scoop 🍦
          </Button>
        </section>

        {hasStarted && (
        <section className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#cc162b]" />
            <h2 className="text-3xl text-[#cc162b]" style={{ fontWeight: 700 }}>
              Combo Section
            </h2>
            <Sparkles className="w-5 h-5 text-[#cc162b]" />
          </div>
          <p className="text-center text-gray-500 mb-8">Recommended combos curated just for you.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {combosToShow.map((combo) => (
              <Card
                key={combo.name}
                onClick={() => handleComboSelect(combo)}
                className="p-6 h-full flex flex-col bg-white/95 border border-[#cc162b]/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl text-[#cc162b] mb-1" style={{ fontWeight: 700 }}>
                  {combo.name}
                </h3>
                {combo.subtitle && <p className="text-sm text-gray-500 mb-3">{combo.subtitle}</p>}
                <div className="text-sm text-gray-700 mb-4 flex-1">{combo.flavors.join(' • ')}</div>

                <div className="mt-auto pt-3 border-t border-[#cc162b]/10 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-lg text-[#cc162b]" style={{ fontWeight: 700 }}>
                    ₹{combo.price}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {!showMore && (
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => setShowMore(true)}
                className="border-[#cc162b]/30 text-[#cc162b] hover:bg-red-50"
              >
                Explore More Options
              </Button>
            </div>
          )}

          <div className="text-center pt-2">
            <Button
              onClick={() => navigate('/sizes')}
              className="bg-black hover:bg-gray-900 text-white px-10 py-6 text-lg rounded-xl shadow-lg"
            >
              Build Your Own 🍦
            </Button>
          </div>
        </section>
        )}
      </div>

      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100 bg-white/50">
        <p>
          Made with Love <span className="text-red-400">♥</span> By K Haripriya
        </p>
      </footer>
    </div>
  );
}
