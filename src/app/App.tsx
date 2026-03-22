import { RouterProvider } from 'react-router';
import { router } from './routes';
import { OrderProvider } from './context/OrderContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <OrderProvider>
      <RouterProvider router={router} />
      <Toaster />
    </OrderProvider>
  );
}