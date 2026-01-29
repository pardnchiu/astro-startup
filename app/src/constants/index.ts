import type { NavLink, Product } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 99.99,
    description: 'This is product 1',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 149.99,
    description: 'This is product 2',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 199.99,
    description: 'This is product 3',
  },
  {
    id: '4',
    name: 'Product 4',
    price: 249.99,
    description: 'This is product 4',
  },
];
