import { createContext, useContext, useState, ReactNode } from 'react';

export type Size = 'Small' | 'Medium' | 'Large';

export interface Order {
  size: Size | null;
  flavors: string[];
  price: number;
  orderNumber: string | null;
}

interface OrderContextType {
  order: Order;
  setSize: (size: Size) => void;
  addFlavor: (flavor: string) => void;
  removeFlavor: (flavor: string) => void;
  clearFlavors: () => void;
  canAddMoreFlavors: () => boolean;
  generateOrderNumber: () => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const SIZE_CONFIG = {
  Small: { maxFlavors: 5, price: 50 },
  Medium: { maxFlavors: 7, price: 70 },
  Large: { maxFlavors: 10, price: 100 },
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order>({
    size: null,
    flavors: [],
    price: 0,
    orderNumber: null,
  });

  const setSize = (size: Size) => {
    setOrder({
      size,
      flavors: [],
      price: SIZE_CONFIG[size].price,
      orderNumber: null,
    });
  };

  const addFlavor = (flavor: string) => {
    if (!order.size) return;
    const maxFlavors = SIZE_CONFIG[order.size].maxFlavors;
    if (order.flavors.length < maxFlavors) {
      setOrder(prev => ({
        ...prev,
        flavors: [...prev.flavors, flavor],
      }));
    }
  };

  const removeFlavor = (flavor: string) => {
    setOrder(prev => ({
      ...prev,
      flavors: prev.flavors.filter(f => f !== flavor),
    }));
  };

  const clearFlavors = () => {
    setOrder(prev => ({
      ...prev,
      flavors: [],
    }));
  };

  const canAddMoreFlavors = () => {
    if (!order.size) return false;
    const maxFlavors = SIZE_CONFIG[order.size].maxFlavors;
    return order.flavors.length < maxFlavors;
  };

  const generateOrderNumber = () => {
    const orderNum = `ICE${Date.now().toString().slice(-6)}`;
    setOrder(prev => ({
      ...prev,
      orderNumber: orderNum,
    }));
  };

  const resetOrder = () => {
    setOrder({
      size: null,
      flavors: [],
      price: 0,
      orderNumber: null,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setSize,
        addFlavor,
        removeFlavor,
        clearFlavors,
        canAddMoreFlavors,
        generateOrderNumber,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
