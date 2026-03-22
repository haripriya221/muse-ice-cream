# Mini Ice Creams Order Management System

## Overview
This is a complete order management system for mini ice creams with QR code ordering, WhatsApp integration (simulated), and payment processing.

## Features

### Customer Flow
1. **Size Selection** - Choose from Small, Medium, or Large sizes
   - Small (₹50): Up to 5 flavors
   - Medium (₹70): Up to 7 flavors
   - Large (₹100): Up to 10 flavors

2. **Flavor Selection** - Select ice cream flavors with visual cards
   - 13 flavors available with images
   - Real-time validation based on size selected
   - Visual feedback for selected flavors

3. **Order Confirmation** - Review and place order
   - Order summary
   - WhatsApp integration (simulated)
   - QR code payment (simulated)
   - Order number/token generation

### Admin Features
- **Admin Dashboard** (`/admin`)
  - View all orders in real-time
  - Order statistics (total orders, revenue, today's orders)
  - Order details with token numbers
  - Auto-refresh every 5 seconds
  - Clear all orders functionality

## Available Flavors
1. Choco Chip
2. Chocolate Brownie
3. Butterscotch
4. Vanilla
5. Black Currant
6. Belgian Chocolate
7. Pistachio
8. Guava Chilli
9. Strawberry
10. Hazelnut Mudslide
11. Alphonso Mango
12. American Mudcake
13. Rich Dry Fruits

## Routes
- `/` - Home page (Size selection)
- `/flavors` - Flavor selection page
- `/confirm` - Order confirmation and payment
- `/admin` - Admin dashboard

## How It Works

### Order Process
1. Customer scans QR code → Opens homepage
2. Selects size (Small/Medium/Large)
3. Selects flavors (limited by size choice)
4. Reviews order
5. Order sent to WhatsApp (simulated)
6. QR code payment displayed (simulated)
7. Payment confirmation
8. Customer receives order number/token
9. Admin receives order in dashboard

### Data Storage
- Orders stored in browser's localStorage
- Persists between sessions
- Can be cleared from Admin Dashboard

### Mock Integrations
- **WhatsApp**: Simulated with console logging and UI feedback
- **Payment Gateway**: Mock QR code display with manual confirmation
- **Order Detection**: Automatic via button click (in production, would integrate with actual payment gateway)

## Technical Details
- Built with React + TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Sonner for toast notifications
- Lucide React for icons
- Unsplash for ice cream images

## Future Enhancements
- Real WhatsApp Business API integration
- Actual payment gateway (Razorpay, Stripe, etc.)
- Real-time order status updates
- Printer integration for receipts
- Analytics dashboard
- Customer order history
- Loyalty program
