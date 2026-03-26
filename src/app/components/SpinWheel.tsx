import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useOrder } from '../context/OrderContext';

type WheelSlot = {
  label: string;
  detail?: string;
  bgClass: string;
  highlight?: boolean;
  weight: number;
};

const WHEEL_SLOTS: WheelSlot[] = [
  { label: '🍫 Free Topping', bgClass: 'bg-amber-200', weight: 12 },
  { label: '😋 Extra Scoop', bgClass: 'bg-pink-200', weight: 14 },
  { label: '💸 ₹10 OFF', bgClass: 'bg-yellow-200', weight: 14 },
  { label: '🎯 Try New Flavour', bgClass: 'bg-lime-200', weight: 12 },
  { label: '😏 Mystery Upgrade', bgClass: 'bg-fuchsia-200', weight: 12 },
  { label: '👑 FREE SIZE UPGRADE', bgClass: 'bg-red-300', highlight: true, weight: 18 },
  { label: '😢 Better Luck Next Time', detail: 'No luck 😭 But still yummy!', bgClass: 'bg-gray-200', weight: 8 },
  { label: '🎉 Spin Again', bgClass: 'bg-orange-200', weight: 10 },
];

type SpinLocationState = {
  comboName?: string;
};

function pickWeightedIndex(slots: WheelSlot[]) {
  const total = slots.reduce((sum, slot) => sum + slot.weight, 0);
  let random = Math.random() * total;

  for (let i = 0; i < slots.length; i += 1) {
    random -= slots[i].weight;
    if (random <= 0) return i;
  }

  return slots.length - 1;
}

function pickBiasedIndex() {
  // 7 out of 10 outcomes are intentionally set to these two slots.
  const r = Math.random();
  if (r < 0.7) {
    return Math.random() < 0.5 ? 3 : 6; // Try New Flavour or Better Luck Next Time
  }

  const otherIndexes = [0, 1, 2, 4, 5, 7];
  const randomIndex = Math.floor(Math.random() * otherIndexes.length);
  return otherIndexes[randomIndex];
}

export function SpinWheel() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as SpinLocationState | null) ?? null;
  const { order, generateOrderNumber } = useOrder();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const comboLabel = useMemo(() => locationState?.comboName ?? 'Selected Combo', [locationState]);

  if (!order.size || order.flavors.length === 0) {
    navigate('/');
    return null;
  }

  const selectedReward = selectedIndex !== null ? WHEEL_SLOTS[selectedIndex] : null;
  const canSpinAgain = selectedReward?.label === '🎉 Spin Again';
  const canSpin = selectedIndex === null || canSpinAgain;

  const handleSpin = () => {
    if (isSpinning || !canSpin) return;

    const finalIndex = pickBiasedIndex();
    setIsSpinning(true);
    setSelectedIndex(null);

    const spinInterval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WHEEL_SLOTS.length);
    }, 100);

    window.setTimeout(() => {
      window.clearInterval(spinInterval);
      setActiveIndex(finalIndex);
      setSelectedIndex(finalIndex);
      setIsSpinning(false);
    }, 2200);
  };

  const handleProceedToPayment = () => {
    generateOrderNumber();
    navigate('/confirm', { state: { skipReview: true, reward: selectedReward?.label ?? null } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50/30 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl text-[#cc162b] mb-2" style={{ fontWeight: 700 }}>
            Combo Confirmed
          </h1>
          <p className="text-gray-600 mb-2">{comboLabel}</p>
          <p className="text-gray-500">Spin the wheel for a surprise reward before payment.</p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 md:p-8 border border-[#cc162b]/10 shadow-lg bg-white/90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHEEL_SLOTS.map((slot, index) => {
              const isSelected = selectedIndex === index;
              const isActive = isSpinning ? activeIndex === index : isSelected;
              return (
                <div
                  key={slot.label}
                  className={`${slot.bgClass} rounded-xl p-4 border transition-all duration-300 ${
                    slot.highlight ? 'border-red-500 ring-2 ring-red-300 shadow-[0_0_20px_rgba(239,68,68,0.45)]' : 'border-white/80'
                  } ${isActive ? 'scale-[1.03] ring-2 ring-[#cc162b] shadow-md' : ''}`}
                >
                  <p className="text-sm text-gray-800" style={{ fontWeight: 700 }}>
                    {slot.label}
                  </p>
                  {slot.detail && <p className="text-xs text-gray-600 mt-1">{slot.detail}</p>}
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3">
            <Button
              onClick={handleSpin}
              disabled={isSpinning || !canSpin}
              className="bg-[#cc162b] hover:bg-[#a01222] text-white py-6 text-lg"
            >
              {isSpinning ? 'Spinning...' : canSpin ? 'Spin The Wheel' : 'Spin Used'}
            </Button>

            <Button
              onClick={handleProceedToPayment}
              disabled={selectedIndex === null || isSpinning}
              className="bg-black hover:bg-gray-900 text-white py-6 text-lg disabled:opacity-50"
            >
              Continue to Payment
            </Button>
          </div>

          {selectedReward && (
            <div className="mt-6 text-center p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-gray-500 mb-1">You won</p>
              <p className="text-lg text-[#cc162b]" style={{ fontWeight: 700 }}>
                {selectedReward.label}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
