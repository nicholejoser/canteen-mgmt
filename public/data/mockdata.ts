export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  image: string;
  description: string;
  soldToday: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'balance';
  timestamp: string;
  orderType: 'dine-in' | 'takeout';
}

export interface DailySales {
  day: string;
  sales: number;
  orders: number;
}

export const menuItems: MenuItem[] = [
  { id: 1, name: 'Classic Burger', category: 'Main Course', price: 8.99, available: true, image: '🍔', description: 'Juicy beef patty with fresh vegetables', soldToday: 45 },
  { id: 2, name: 'Caesar Salad', category: 'Salads', price: 6.50, available: true, image: '🥗', description: 'Crispy romaine with parmesan and croutons', soldToday: 30 },
  { id: 3, name: 'Margherita Pizza', category: 'Main Course', price: 10.99, available: true, image: '🍕', description: 'Fresh mozzarella, tomato, and basil', soldToday: 38 },
  { id: 4, name: 'Chicken Wrap', category: 'Main Course', price: 7.50, available: false, image: '🌯', description: 'Grilled chicken with fresh veggies', soldToday: 22 },
  { id: 5, name: 'Fruit Smoothie', category: 'Beverages', price: 4.99, available: true, image: '🥤', description: 'Mixed berry and banana blend', soldToday: 55 },
  { id: 6, name: 'French Fries', category: 'Sides', price: 3.50, available: true, image: '🍟', description: 'Golden crispy seasoned fries', soldToday: 60 },
  { id: 7, name: 'Iced Coffee', category: 'Beverages', price: 3.99, available: true, image: '☕', description: 'Cold brew with cream', soldToday: 70 },
  { id: 8, name: 'Chocolate Cake', category: 'Desserts', price: 5.50, available: true, image: '🍰', description: 'Rich chocolate layer cake', soldToday: 25 },
  { id: 9, name: 'Pasta Carbonara', category: 'Main Course', price: 9.99, available: true, image: '🍝', description: 'Creamy pasta with bacon', soldToday: 28 },
  { id: 10, name: 'Fresh Juice', category: 'Beverages', price: 3.50, available: true, image: '🧃', description: 'Freshly squeezed orange juice', soldToday: 42 },
];

export const orders: Order[] = [
  { id: 'ORD-001', customerName: 'Mike Davis', items: [{ name: 'Classic Burger', quantity: 1, price: 8.99 }, { name: 'French Fries', quantity: 1, price: 3.50 }], total: 12.49, status: 'completed', paymentMethod: 'balance', timestamp: '2024-03-15 08:30', orderType: 'dine-in' },
  { id: 'ORD-002', customerName: 'Emily Brown', items: [{ name: 'Caesar Salad', quantity: 1, price: 6.50 }, { name: 'Iced Coffee', quantity: 1, price: 3.99 }], total: 10.49, status: 'ready', paymentMethod: 'card', timestamp: '2024-03-15 09:15', orderType: 'takeout' },
  { id: 'ORD-003', customerName: 'James Taylor', items: [{ name: 'Margherita Pizza', quantity: 2, price: 21.98 }], total: 21.98, status: 'preparing', paymentMethod: 'cash', timestamp: '2024-03-15 10:00', orderType: 'dine-in' },
  { id: 'ORD-004', customerName: 'Jennifer Lee', items: [{ name: 'Fruit Smoothie', quantity: 1, price: 4.99 }, { name: 'Chocolate Cake', quantity: 1, price: 5.50 }], total: 10.49, status: 'pending', paymentMethod: 'balance', timestamp: '2024-03-15 10:30', orderType: 'takeout' },
  { id: 'ORD-005', customerName: 'David Wilson', items: [{ name: 'Pasta Carbonara', quantity: 1, price: 9.99 }, { name: 'Fresh Juice', quantity: 2, price: 7.00 }], total: 16.99, status: 'completed', paymentMethod: 'card', timestamp: '2024-03-15 11:00', orderType: 'dine-in' },
  { id: 'ORD-006', customerName: 'Maria Garcia', items: [{ name: 'Chicken Wrap', quantity: 1, price: 7.50 }, { name: 'Iced Coffee', quantity: 1, price: 3.99 }], total: 11.49, status: 'cancelled', paymentMethod: 'cash', timestamp: '2024-03-15 11:30', orderType: 'takeout' },
  { id: 'ORD-007', customerName: 'Mike Davis', items: [{ name: 'Classic Burger', quantity: 2, price: 17.98 }, { name: 'French Fries', quantity: 2, price: 7.00 }, { name: 'Fruit Smoothie', quantity: 2, price: 9.98 }], total: 34.96, status: 'completed', paymentMethod: 'balance', timestamp: '2024-03-15 12:00', orderType: 'dine-in' },
  { id: 'ORD-008', customerName: 'Jennifer Lee', items: [{ name: 'Caesar Salad', quantity: 1, price: 6.50 }], total: 6.50, status: 'ready', paymentMethod: 'card', timestamp: '2024-03-15 12:30', orderType: 'takeout' },
];

export const weeklySales: DailySales[] = [
  { day: 'Mon', sales: 1250, orders: 85 },
  { day: 'Tue', sales: 1480, orders: 92 },
  { day: 'Wed', sales: 1320, orders: 78 },
  { day: 'Thu', sales: 1590, orders: 105 },
  { day: 'Fri', sales: 1850, orders: 125 },
  { day: 'Sat', sales: 980, orders: 55 },
  { day: 'Sun', sales: 750, orders: 42 },
];
