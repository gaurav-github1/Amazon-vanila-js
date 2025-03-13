# JavaScript Amazon Project

This is a frontend implementation of an Amazon-like e-commerce website built with vanilla JavaScript. The project focuses on providing a responsive user interface with features similar to Amazon's product browsing, cart management, and checkout functionality.

## 🚀 Features

### Product Browsing
- **Product Grid Display**: Browse a grid of product cards with images, names, ratings, and prices
- **Search Functionality**: 
  - Real-time search as you type
  - Search by product name, type, or keywords
  - Clear search results with a single click
  - URL-based search persistence

### Shopping Cart
- **Add to Cart**: Add products to your cart with quantity selection
- **Cart Quantity Indicator**: See the total number of items in your cart
- **Visual Feedback**: "Added" confirmation message when adding products
- **Persistent Cart**: Cart data is stored locally and persists between sessions

### Checkout Process
- **Cart Summary**: Review all items in your cart before checkout
- **Item Quantity Management**: Update quantities or remove items
- **Order Total Calculation**: See itemized price breakdowns
- **Delivery Options**: Choose from different delivery methods
- **Order Placement**: Complete your purchase and receive an order ID

### Order Tracking
- **Order History**: View all your previous orders
- **Order Details**: See complete order information including items, quantities, and delivery status

## 📂 Project Structure

```
javascript-amazon-project/
├── data/                  # Data models and storage
├── images/                # Product and UI images
├── scripts/               # JavaScript files
│   ├── checkout/          # Checkout-related scripts
│   ├── shared/            # Shared utilities
│   ├── utils/             # Utility functions
│   ├── amazon.js          # Product listing page functionality
│   ├── checkout.js        # Checkout page functionality
│   └── orders.js          # Order tracking page functionality
├── styles/                # CSS files
│   ├── shared/            # Shared styles
│   └── pages/             # Page-specific styles
├── tests/                 # Testing files
├── amazon.html            # Product listing page
├── checkout.html          # Checkout page
├── index.html             # Entry point
├── orders.html            # Order tracking page
└── tracking.html          # Order status page
```

## 🔍 How to Access Features

### Product Page (amazon.html)
- **Browse Products**: View all products on the main page
- **Search**: Use the search bar at the top to find products
- **Add to Cart**: Click the "Add to Cart" button on any product card
- **Select Quantity**: Choose quantity from the dropdown before adding to cart

### Shopping Cart & Checkout (checkout.html)
- **Access Cart**: Click on the Cart icon in the top-right corner
- **Update Quantities**: Change quantities using the dropdown menus
- **Remove Items**: Delete items from your cart
- **Choose Delivery**: Select your preferred delivery option
- **Place Order**: Click "Place Order" to complete your purchase

### Order Tracking (orders.html)
- **View Orders**: Click "Returns & Orders" in the top navigation
- **Order Details**: View complete information about each order
- **Track Status**: See the current status of your deliveries

## 💻 How to Run

1. Simply open the `index.html` file in a web browser
2. Navigate between pages using the navigation links
3. No server setup required - this is a client-side only application!

## 🧪 Testing

This project includes Jasmine test suites to ensure functionality works as expected. You can run the tests by:

1. Opening the `/test-jasmine/index.html` file in a browser
2. Review the test results on the page

## 🔧 Technical Details

- **Pure JavaScript**: No frameworks or libraries used
- **Modular Design**: Organized code with separation of concerns
- **Local Storage**: Cart and order data persisted in browser local storage
- **Responsive Design**: Works on desktop and mobile devices
- **ES6+ Features**: Modern JavaScript syntax and features

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Future Improvements

- User authentication and profiles
- Payment method integration
- Product filtering by categories
- Product reviews and ratings
- Wishlists and save for later functionality

---

Enjoy shopping in this Amazon-inspired e-commerce project! 