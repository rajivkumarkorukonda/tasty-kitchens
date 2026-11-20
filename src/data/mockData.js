export const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

export const LOCATIONS = [
  'Madhapur, Hyderabad',
  'Jubilee Hills, Hyderabad',
  'Gachibowli, Hyderabad',
  'Banjara Hills, Hyderabad',
  'Indiranagar, Bengaluru',
];

export const OFFERS = [
  {
    id: 'off-1',
    badge: 'FLAT 20% OFF',
    title: 'Use code TASTY50',
    subtitle: 'Up to ₹120 off on orders above ₹249',
    gradient: 'from-orange-500 to-rose-600',
    code: 'TASTY50',
  },
  {
    id: 'off-2',
    badge: 'FREE DELIVERY',
    title: 'Use code FREEDEL',
    subtitle: 'Zero delivery charges on any order today',
    gradient: 'from-emerald-500 to-teal-700',
    code: 'FREEDEL',
  },
  {
    id: 'off-3',
    badge: 'EXPRESS 20 MIN',
    title: 'Superfast Biryanis & Bowls',
    subtitle: 'Hot meals delivered fresh from top-rated kitchens',
    gradient: 'from-indigo-600 to-violet-700',
    code: 'TASTY50',
  },
];

export const CATEGORIES = [
  { id: 'All', label: 'All', emoji: '🍽️' },
  { id: 'Biryani', label: 'Biryani', emoji: '🍛' },
  { id: 'Pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'South Indian', label: 'South Indian', emoji: '🥞' },
  { id: 'Burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'North Indian', label: 'North Indian', emoji: '🥘' },
  { id: 'Desserts', label: 'Desserts', emoji: '🍨' },
];

export const COUPONS = {
  TASTY50: {
    code: 'TASTY50',
    description: '20% off up to ₹120 on orders above ₹249',
    minOrder: 249,
    type: 'PERCENT',
    value: 20,
    maxDiscount: 120,
  },
  FREEDEL: {
    code: 'FREEDEL',
    description: 'Free delivery on your entire order',
    minOrder: 149,
    type: 'FREE_DELIVERY',
    value: 0,
    maxDiscount: 45,
  },
};

export const ORDER_STAGES = [
  {
    key: 'PLACED',
    label: 'Order Placed',
    desc: 'We have sent your order to the restaurant.',
    eta: 28,
  },
  {
    key: 'CONFIRMED',
    label: 'Restaurant Confirmed',
    desc: 'Kitchen accepted your order and queued it.',
    eta: 24,
  },
  {
    key: 'PREPARING',
    label: 'Preparing Your Food',
    desc: 'Chef is freshly cooking and packing your meal.',
    eta: 18,
  },
  {
    key: 'ASSIGNED',
    label: 'Delivery Partner Assigned',
    desc: 'Karthik Reddy is at the restaurant picking up your order.',
    eta: 12,
  },
  {
    key: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
    desc: 'Karthik is 1.4 km away and heading to your doorstep.',
    eta: 5,
  },
  {
    key: 'DELIVERED',
    label: 'Delivered',
    desc: 'Order delivered. Enjoy your meal!',
    eta: 0,
  },
];

export const RESTAURANTS = [
  {
    id: 'res-1',
    name: 'Nizam Royal Dum Biryani',
    cuisine: 'Hyderabadi, Biryani, Mughlai',
    categories: ['Biryani', 'North Indian'],
    rating: 4.6,
    reviewsCount: '12.4K',
    deliveryTime: 26,
    costForTwo: 550,
    location: 'Madhapur',
    pureVeg: false,
    offerText: '20% OFF UPTO ₹120',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-101',
        name: 'Hyderabadi Chicken Dum Biryani',
        price: 299,
        rating: 4.7,
        isVeg: false,
        bestseller: true,
        category: 'Biryani',
        desc: 'Slow-cooked saffron basmati rice layered with marinated chicken, served with mirchi ka salan & raita.',
        image:
          'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-102',
        name: 'Subz Zafrani Paneer Biryani',
        price: 259,
        rating: 4.5,
        isVeg: true,
        bestseller: true,
        category: 'Biryani',
        desc: 'Char-grilled malai paneer cubes layered with fragrant long-grain basmati and crispy fried onions.',
        image:
          'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-103',
        name: 'Chicken 65 Starter',
        price: 239,
        rating: 4.6,
        isVeg: false,
        bestseller: false,
        category: 'Starters',
        desc: 'Crispy curry-leaf tossed spicy chicken bites with green chilies.',
        image:
          'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-104',
        name: 'Double Ka Meetha',
        price: 129,
        rating: 4.8,
        isVeg: true,
        bestseller: false,
        category: 'Desserts',
        desc: 'Classic Hyderabadi saffron bread pudding topped with roasted pistachios.',
        image:
          'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-2',
    name: 'Udupi Heritage Tiffins',
    cuisine: 'South Indian, Breakfast, Filter Coffee',
    categories: ['South Indian'],
    rating: 4.7,
    reviewsCount: '9.1K',
    deliveryTime: 19,
    costForTwo: 250,
    location: 'Jubilee Hills',
    pureVeg: true,
    offerText: 'FREE DELIVERY',
    image:
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-201',
        name: 'Ghee Karam Masala Dosa',
        price: 135,
        rating: 4.8,
        isVeg: true,
        bestseller: true,
        category: 'Dosa',
        desc: 'Crispy golden dosa roasted in pure cow ghee with spicy Rayalaseema karam podi and potato masala.',
        image:
          'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-202',
        name: 'Steamed Podi Button Idli (8 pcs)',
        price: 110,
        rating: 4.6,
        isVeg: true,
        bestseller: true,
        category: 'Idli',
        desc: 'Soft melt-in-mouth mini idlis tossed in homemade gun powder and warm ghee.',
        image:
          'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-203',
        name: 'Madras Brass Filter Coffee',
        price: 65,
        rating: 4.9,
        isVeg: true,
        bestseller: false,
        category: 'Beverages',
        desc: 'Freshly brewed Chikmagalur decoction frothed with rich full-cream milk.',
        image:
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-3',
    name: 'Napoli Woodfire Pizzeria',
    cuisine: 'Italian, Sourdough Pizza, Pasta',
    categories: ['Pizza'],
    rating: 4.4,
    reviewsCount: '5.8K',
    deliveryTime: 31,
    costForTwo: 700,
    location: 'Gachibowli',
    pureVeg: false,
    offerText: 'FLAT ₹100 OFF',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-301',
        name: 'Margherita Burrata Sourdough',
        price: 389,
        rating: 4.6,
        isVeg: true,
        bestseller: true,
        category: 'Pizza',
        desc: '48-hour fermented crust, San Marzano tomato sauce, fresh basil, and creamy burrata.',
        image:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-302',
        name: 'Smoked Peri-Peri Chicken Pizza',
        price: 449,
        rating: 4.5,
        isVeg: false,
        bestseller: true,
        category: 'Pizza',
        desc: 'Wood-fired crust topped with fiery peri-peri chicken, jalapeños, caramelized onions, and mozzarella.',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-303',
        name: 'Truffle Garlic Breadsticks',
        price: 189,
        rating: 4.4,
        isVeg: true,
        bestseller: false,
        category: 'Sides',
        desc: 'Oven-baked rosemary breadsticks brushed with truffle garlic butter and cheesy dip.',
        image:
          'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-4',
    name: 'Smash & Stack Burger Co.',
    cuisine: 'American, Gourmet Burgers, Shakes',
    categories: ['Burgers', 'Desserts'],
    rating: 4.3,
    reviewsCount: '4.2K',
    deliveryTime: 24,
    costForTwo: 500,
    location: 'HITEC City',
    pureVeg: false,
    offerText: '20% OFF',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-401',
        name: 'Double Crispy Nashville Chicken Burger',
        price: 279,
        rating: 4.6,
        isVeg: false,
        bestseller: true,
        category: 'Burgers',
        desc: 'Buttermilk fried chicken glazed in spiced honey, pickles, and smoky slaw on a toasted brioche bun.',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-402',
        name: 'Truffle Mushroom & Cheese Smash',
        price: 249,
        rating: 4.4,
        isVeg: true,
        bestseller: true,
        category: 'Burgers',
        desc: 'Crispy herb-crusted mushroom patty with melted cheddar and caramelized onion jam.',
        image:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-403',
        name: 'Belgian Dark Chocolate Thickshake',
        price: 179,
        rating: 4.7,
        isVeg: true,
        bestseller: false,
        category: 'Desserts',
        desc: '70% Belgian cocoa blended with velvety vanilla bean gelato.',
        image:
          'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-5',
    name: 'Punjabi Tandoor Express',
    cuisine: 'North Indian, Tandoor, Curries',
    categories: ['North Indian'],
    rating: 4.5,
    reviewsCount: '7.6K',
    deliveryTime: 29,
    costForTwo: 600,
    location: 'Banjara Hills',
    pureVeg: true,
    offerText: 'ITEMS AT ₹179',
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-501',
        name: 'Smoky Dal Makhani & Garlic Naan Bowl',
        price: 269,
        rating: 4.7,
        isVeg: true,
        bestseller: true,
        category: 'Mains',
        desc: '24-hour slow-simmered black lentils finished with white butter, served with 2 buttery garlic naans.',
        image:
          'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-502',
        name: 'Paneer Tikka Lababdar',
        price: 289,
        rating: 4.5,
        isVeg: true,
        bestseller: true,
        category: 'Mains',
        desc: 'Charred cottage cheese simmered in rich tomato-cashew gravy with roasted kasuri methi.',
        image:
          'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-6',
    name: 'Velvet Scoop Creamery',
    cuisine: 'Desserts, Artisanal Gelato, Waffles',
    categories: ['Desserts'],
    rating: 4.8,
    reviewsCount: '6.3K',
    deliveryTime: 18,
    costForTwo: 350,
    location: 'Madhapur',
    pureVeg: true,
    offerText: 'FREE DELIVERY',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'm-601',
        name: 'Lotus Biscoff Warm Waffle',
        price: 219,
        rating: 4.9,
        isVeg: true,
        bestseller: true,
        category: 'Desserts',
        desc: 'Crisp Belgian waffle loaded with melted Biscoff spread, crushed biscuits, and vanilla scoop.',
        image:
          'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'm-602',
        name: 'Triple Fudge Brownie Sundae',
        price: 239,
        rating: 4.7,
        isVeg: true,
        bestseller: false,
        category: 'Desserts',
        desc: 'Gooey walnut brownie drenched in hot chocolate fudge and roasted almonds.',
        image:
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
];