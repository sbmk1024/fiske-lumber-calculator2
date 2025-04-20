// Main App Component
const App = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <LumberCalculator />
    </div>
  );
};

// Lumber Calculator Component
const LumberCalculator = () => {
  const [woodType, setWoodType] = React.useState('hemlock');
  const [selectedSize, setSelectedSize] = React.useState('1×4');
  const [selectedLength, setSelectedLength] = React.useState(8);
  const [quantity, setQuantity] = React.useState(1);
  const [customSaw, setCustomSaw] = React.useState(false);
  const [boardFeet, setBoardFeet] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState('calculator');
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [orderHistory, setOrderHistory] = React.useState([]);
  const [currentOrderId, setCurrentOrderId] = React.useState(null);
  const [orderNote, setOrderNote] = React.useState('');
  const invoiceRef = React.useRef(null);

  // Load saved orders from localStorage on component mount
  React.useEffect(() => {
    const savedOrders = localStorage.getItem('fiskeOrderHistory');
    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading saved orders:', error);
      }
    }
  }, []);
  
  const hemlockData = [
    { size: '1×4', width: 1, height: 4, length8: 2.15, length10: 2.65, length12: 3.20, length14: 3.70, length16: 4.25 },
    { size: '1×6', width: 1, height: 6, length8: 3.20, length10: 4.00, length12: 4.80, length14: 5.60, length16: 6.40 },
    { size: '1×8', width: 1, height: 8, length8: 4.25, length10: 5.35, length12: 6.40, length14: 7.45, length16: 8.55 },
    { size: '1×10', width: 1, height: 10, length8: 6.00, length10: 7.50, length12: 9.00, length14: 10.50, length16: 12.00 },
    { size: '2×4', width: 2, height: 4, length8: 4.25, length10: 5.35, length12: 6.40, length14: 7.45, length16: 8.55 },
    { size: '2×6', width: 2, height: 6, length8: 6.40, length10: 8.00, length12: 9.60, length14: 11.20, length16: 12.80 },
    { size: '2×8', width: 2, height: 8, length8: 8.55, length10: 10.65, length12: 12.80, length14: 14.95, length16: 17.00 },
    { size: '2×10', width: 2, height: 10, length8: 12.00, length10: 15.00, length12: 18.00, length14: 21.00, length16: 24.00 },
    { size: '2×12', width: 2, height: 12, length8: 14.40, length10: 18.00, length12: 21.60, length14: 25.20, length16: 28.80 },
    { size: '4×4', width: 4, height: 4, length8: 8.55, length10: 10.65, length12: 12.80, length14: 14.95, length16: 17.00 },
    { size: '4×6', width: 4, height: 6, length8: 12.80, length10: 16.00, length12: 19.20, length14: 22.40, length16: 25.60 },
    { size: '6×6', width: 6, height: 6, length8: 19.20, length10: 24.00, length12: 28.80, length14: 33.60, length16: 38.40 },
    { size: '8×8', width: 8, height: 8, length8: 34.15, length10: 42.65, length12: 51.20, length14: 59.75, length16: 68.25 },
  ];
  
  const pineData = [
    { size: '1×2', width: 1, height: 2, length8: 1.00, length10: 1.35, length12: 1.60, length14: 1.90, length16: 2.15 },
    { size: '1×3', width: 1, height: 3, length8: 1.60, length10: 2.00, length12: 2.40, length14: 2.80, length16: 3.20 },
    { size: '1×4', width: 1, height: 4, length8: 2.15, length10: 2.65, length12: 3.20, length14: 3.70, length16: 4.25 },
    { size: '1×6', width: 1, height: 6, length8: 3.20, length10: 4.00, length12: 4.80, length14: 5.60, length16: 6.40 },
    { size: '1×8', width: 1, height: 8, length8: 4.25, length10: 5.35, length12: 6.40, length14: 7.45, length16: 8.55 },
    { size: '1×10', width: 1, height: 10, length8: 6.65, length10: 8.35, length12: 10.00, length14: 11.65, length16: 13.35 },
    { size: '1×12', width: 1, height: 12, length8: 8.00, length10: 10.00, length12: 12.00, length14: 14.00, length16: 16.00 },
    { size: '2×4', width: 2, height: 4, length8: 4.25, length10: 5.35, length12: 6.40, length14: 7.45, length16: 8.55 },
    { size: '2×6', width: 2, height: 6, length8: 6.40, length10: 8.00, length12: 9.60, length14: 11.20, length16: 12.80 },
    { size: '2×8', width: 2, height: 8, length8: 8.55, length10: 10.65, length12: 12.80, length14: 14.95, length16: 17.00 },
    { size: '2×10', width: 2, height: 10, length8: 13.25, length10: 16.65, length12: 20.00, length14: 23.35, length16: 26.65 },
    { size: '2×12', width: 2, height: 12, length8: 16.00, length10: 20.00, length12: 24.00, length14: 28.00, length16: 32.00 },
    { size: '4×4', width: 4, height: 4, length8: 8.55, length10: 10.65, length12: 12.80, length14: 14.95, length16: 17.00 },
    { size: '4×6', width: 4, height: 6, length8: 12.80, length10: 16.00, length12: 19.20, length14: 22.40, length16: 25.60 },
    { size: '6×6', width: 6, height: 6, length8: 19.20, length10: 24.00, length12: 28.80, length14: 33.60, length16: 38.40 },
    { size: '8×8', width: 8, height: 8, length8: 34.15, length10: 42.65, length12: 51.20, length14: 59.75, length16: 68.25 },
  ];
  
  const availableSizes = woodType === 'hemlock' ? 
    hemlockData.map(item => item.size) : 
    pineData.map(item => item.size);
  
  const availableLengths = [8, 10, 12, 14, 16];
  
  // Calculate board feet
  const calculateBoardFeet = (width, height, length, qty) => {
    // Board feet = (thickness in inches × width in inches × length in feet) ÷ 12 × quantity
    return (width * height * length) / 12 * qty;
  };
  
  // Calculate price based on selection
  const calculatePrice = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const selectedBoard = data.find(board => board.size === selectedSize);
    
    if (!selectedBoard) return 0;
    
    // Get price for selected length
    let unitPrice = 0;
    switch(selectedLength) {
      case 8: unitPrice = selectedBoard.length8; break;
      case 10: unitPrice = selectedBoard.length10; break;
      case 12: unitPrice = selectedBoard.length12; break;
      case 14: unitPrice = selectedBoard.length14; break;
      case 16: unitPrice = selectedBoard.length16; break;
      default: unitPrice = 0;
    }
    
    // Calculate board feet
    const boardFt = calculateBoardFeet(
      selectedBoard.width, 
      selectedBoard.height, 
      selectedLength, 
      quantity
    );
    
    // Calculate total price
    let total = unitPrice * quantity;
    
    // Add custom sawing fee if selected
    if (customSaw) {
      total += boardFt * 0.40;
    }
    
    setBoardFeet(boardFt);
    return total;
  };
  
  // Update price when selections change
  React.useEffect(() => {
    const price = calculatePrice();
    setTotalPrice(price);
  }, [woodType, selectedSize, selectedLength, quantity, customSaw]);
  
  // Add item to cart
  const addToCart = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const selectedBoard = data.find(board => board.size === selectedSize);
    
    if (!selectedBoard) return;
    
    // Calculate board feet
    const boardFt = calculateBoardFeet(
      selectedBoard.width, 
      selectedBoard.height, 
      selectedLength, 
      quantity
    );
    
    // Calculate base price for the item
    let unitPrice = 0;
    switch(selectedLength) {
      case 8: unitPrice = selectedBoard.length8; break;
      case 10: unitPrice = selectedBoard.length10; break;
      case 12: unitPrice = selectedBoard.length12; break;
      case 14: unitPrice = selectedBoard.length14; break;
      case 16: unitPrice = selectedBoard.length16; break;
      default: unitPrice = 0;
    }
    
    // Calculate total item price
    let itemPrice = unitPrice * quantity;
    
    // Add custom sawing fee if selected
    if (customSaw) {
      itemPrice += boardFt * 0.40;
    }
    
    // Check if this item already exists in the cart
    const existingItemIndex = cart.findIndex(item => 
      item.woodType === woodType && 
      item.size === selectedSize && 
      item.length === selectedLength && 
      item.customSaw === customSaw
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      
      // Calculate new quantities
      const newQuantity = existingItem.quantity + quantity;
      const newBoardFeet = existingItem.boardFeet + boardFt;
      const newPrice = existingItem.price + itemPrice;
      
      // Update the item
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        boardFeet: newBoardFeet,
        price: newPrice
      };
      
      setCart(updatedCart);
      updateCartTotal(updatedCart);
    } else {
      // Add as new item
      const newItem = {
        id: Date.now(),
        woodType,
        size: selectedSize,
        length: selectedLength,
        quantity,
        customSaw,
        boardFeet: boardFt,
        price: itemPrice
      };
      
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      updateCartTotal(updatedCart);
    }
    
    // Show confirmation
    alert(`Added ${quantity} ${woodType} ${selectedSize} × ${selectedLength}' to cart`);
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };
  
  // Update cart total
  const updateCartTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setCartTotal(total);
  };
  
  // Start a new order
  const startNewOrder = () => {
    // Confirm if there are unsaved changes
    if (cart.length > 0) {
      if (!confirm('You have items in your cart. Are you sure you want to start a new order? Current items will be lost.')) {
        return;
      }
    }
    
    // Reset all form fields
    setCart([]);
    setCartTotal(0);
    setCustomerName('');
    setCustomerPhone('');
    setOrderNote('');
    setCurrentOrderId(null);
    setWoodType('hemlock');
    setSelectedSize('1×4');
    setSelectedLength(8);
    setQuantity(1);
    setCustomSaw(false);
    
    // Switch to calculator tab
    setActiveTab('calculator');
  };
  
  // Save order to history
  const saveOrder = () => {
    if (!customerName) {
      alert('Please enter a customer name');
      return;
    }
    
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    
    const orderId = currentOrderId || Date.now();
    const orderDate = new Date().toLocaleDateString();
    
    const newOrder = {
      id: orderId,
      date: orderDate,
      customer: {
        name: customerName,
        phone: customerPhone
      },
      items: [...cart],
      total: cartTotal,
      note: orderNote
    };
    
    // If editing an existing order, replace it
    if (currentOrderId) {
      const updatedHistory = orderHistory.map(order => 
        order.id === currentOrderId ? newOrder : order
      );
      setOrderHistory(updatedHistory);
      // Store updated history in localStorage
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    } else {
      // Otherwise add as new order
      const updatedHistory = [...orderHistory, newOrder];
      setOrderHistory(updatedHistory);
      // Store updated history in localStorage
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    }
    
    // Confirmation message
    alert('Order saved successfully!');
    
    // Reset form
    setCart([]);
    setCartTotal(0);
    setCustomerName('');
    setCustomerPhone('');
    setOrderNote('');
    setCurrentOrderId(null);
    
    // Switch to history tab
    setActiveTab('history');
  };
  
  // Load order from history for editing
  const loadOrder = (order) => {
    setCustomerName(order.customer.name);
    setCustomerPhone(order.customer.phone || '');
    setCart(order.items);
    setCartTotal(order.total);
    setOrderNote(order.note || '');
    setCurrentOrderId(order.id);
    setActiveTab('calculator');
  };
  
  // Delete order from history
  const deleteOrder = (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedHistory = orderHistory.filter(order => order.id !== id);
      setOrderHistory(updatedHistory);
      // Update localStorage after deletion
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    }
  };

  // Generate and download invoice
  const generateInvoice = (order) => {
    // Create a downloadable HTML file that looks like a receipt
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - Fiske Lumber</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: 8.5in 11in;
              margin: 0.5in;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              line-height: 1.4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #ddd;
            }
            .invoice-title {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .invoice-number {
              font-size: 14px;
              color: #555;
            }
            .company-details, .customer-details {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #444;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background-color: #f8f8f8;
              border-bottom: 2px solid #ddd;
              padding: 10px 8px;
              text-align: left;
              font-weight: bold;
            }
            td {
              border-bottom: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .item-description {
              width: 40%;
            }
            .text-right {
              text-align: right;
            }
            .total-section {
              margin-top: 20px;
              border-top: 2px solid #ddd;
              padding-top: 10px;
            }
            .total-row {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 5px;
            }
            .total-label {
              width: 150px;
              text-align: right;
              margin-right: 20px;
              font-weight: bold;
            }
            .total-value {
              width: 100px;
              text-align: right;
            }
            .grand-total {
              font-size: 16px;
              font-weight: bold;
            }
            .notes-section {
              margin-top: 30px;
              padding-top: 10px;
              border-top: 1px solid #eee;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #777;
              padding-top: 10px;
              border-top: 1px solid #eee;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .invoice-container {
                border: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-number">Invoice #: FISKE-${order.id.toString().slice(-6)}</div>
                <div>Date: ${order.date}</div>
              </div>
              <div>
                <div class="section-title">Fiske Lumber</div>
                <div>924 NY 43</div>
                <div>Stephentown, NY 12169</div>
                <div>Phone: (555) 123-4567</div>
              </div>
            </div>
            
            <div class="customer-details">
              <div class="section-title">Bill To:</div>
              <div>${order.customer.name}</div>
              ${order.customer.phone ? `<div>Phone: ${order.customer.phone}</div>` : ''}
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th class="item-description">Description</th>
                  <th>Quantity</th>
                  <th>Board Feet</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>
                      ${item.woodType.charAt(0).toUpperCase() + item.woodType.slice(1)} ${item.size} × ${item.length}'
                      ${item.customSaw ? ' (+ Custom Saw)' : ''}
                    </td>
                    <td>${item.quantity}</td>
                    <td>${item.boardFeet.toFixed(2)}</td>
                    <td>$${(item.price / item.quantity).toFixed(2)}</td>
                    <td class="text-right">$${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row">
                <div class="total-label">Subtotal:</div>
                <div class="total-value">$${order.total.toFixed(2)}</div>
              </div>
              <div class="total-row grand-total">
                <div class="total-label">TOTAL:</div>
                <div class="total-value">$${order.total.toFixed(2)}</div>
              </div>
            </div>
            
            ${order.note ? `
              <div class="notes-section">
                <div class="section-title">Notes:</div>
                <div>${order.note}</div>
              </div>
            ` : ''}
            
            <div class="footer">
              <p>Thank you for your business!</p>
              <p>Please make checks payable to Fiske Lumber</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Create a Blob from HTML content
    const blob = new Blob([invoiceHtml], {type: 'text/html'});
    
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `Fiske_Lumber_Invoice_${order.id.toString().slice(-6)}.html`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fiske Lumber Calculator</h1>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center"
          onClick={startNewOrder}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Order
        </button>
      </div>
      
      <div className="mb-6">
        <ul className="flex border-b">
          <li className="-mb-px">
            <button 
              className={`py-2 px-4 ${activeTab === 'calculator' ? 'bg-blue-600 text-white rounded-t' : 'text-blue-600'}`}
              onClick={() => setActiveTab('calculator')}
            >
              Calculator
            </button>
          </li>
          <li className="-mb-px">
            <button 
              className={`py-2 px-4 ${activeTab === 'history' ? 'bg-blue-600 text-white rounded-t' : 'text-blue-600'}`}
              onClick={() => setActiveTab('history')}
            >
              Order History
            </button>
          </li>
        </ul>
      </div>
      
      {activeTab === 'calculator' && (
        <>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Name*</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input 
                  type="tel" 
                  className="w-full border rounded p-2"
                  value={customerPhone}
                  onChange={(e) => {
                    // Remove all non-digit characters
                    const digits = e.target.value.replace(/\D/g, '');
                    
                    // Format as xxx-xxx-xxxx
                    let formattedPhone = '';
                    if (digits.length <= 3) {
                      formattedPhone = digits;
                    } else if (digits.length <= 6) {
                      formattedPhone = `${digits.slice(0, 3)}-${digits.slice(3)}`;
                    } else {
                      formattedPhone = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
                    }
                    
                    setCustomerPhone(formattedPhone);
                  }}
                  placeholder="xxx-xxx-xxxx"
                  maxLength={12}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">Board Selection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Wood Type</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      value="hemlock"
                      checked={woodType === 'hemlock'}
                      onChange={() => setWoodType('hemlock')}
                    />
                    <span className="ml-2">Hemlock Rough Cut</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      value="pine"
                      checked={woodType === 'pine'}
                      onChange={() => setWoodType('pine')}
                    />
                    <span className="ml-2">Pine Rough Cut</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Size</label>
                <select 
                  className="w-full border rounded p-2"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {availableSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Length</label>
                <select 
                  className="w-full border rounded p-2"
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(parseInt(e.target.value))}
                >
                  {availableLengths.map(length => (
                    <option key={length} value={length}>{length}'</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input 
                  type="number" 
                  className="w-full border rounded p-2"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    // Allow empty string for better typing experience
                    if (e.target.value === '') {
                      setQuantity('');
                    } else {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        setQuantity(value < 1 ? 1 : value);
                      }
                    }
                  }}
                  onBlur={() => {
                    // If field is empty or invalid when losing focus, reset to 1
                    if (quantity === '' || isNaN(quantity)) {
                      setQuantity(1);
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={customSaw}
                  onChange={() => setCustomSaw(!customSaw)}
                />
                <span className="ml-2">Custom Sawing ($0.40 per board foot)</span>
              </label>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded">
              <div>
                <p><span className="font-medium">Board Feet:</span> {boardFeet.toFixed(2)}</p>
                <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
              </div>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty</p>
            ) : (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2">Wood</th>
                        <th className="border border-gray-300 px-3 py-2">Size</th>
                        <th className="border border-gray-300 px-3 py-2">Length</th>
                        <th className="border border-gray-300 px-3 py-2">Qty</th>
                        <th className="border border-gray-300 px-3 py-2">Board Ft</th>
                        <th className="border border-gray-300 px-3 py-2">Custom Saw</th>
                        <th className="border border-gray-300 px-3 py-2">Price</th>
                        <th className="border border-gray-300 px-3 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={item.id}>
                          <td className="border border-gray-300 px-3 py-2 capitalize">{item.woodType}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.length}'</td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input 
                              type="number" 
                              className="w-16 border rounded p-1 text-center"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                // Allow empty string temporarily for better typing
                                if (e.target.value === '') {
                                  const updatedCart = [...cart];
                                  updatedCart[index] = {
                                    ...item,
                                    quantity: ''
                                  };
                                  setCart(updatedCart);
                                  return;
                                }
                                
                                const newQty = parseInt(e.target.value);
                                if (isNaN(newQty)) return;
                                
                                // Create a copy of the cart
                                const updatedCart = [...cart];
                                
                                // Get the item data
                                const data = item.woodType === 'hemlock' ? hemlockData : pineData;
                                const selectedBoard = data.find(board => board.size === item.size);
                                
                                // Calculate new board feet
                                const newBoardFeet = calculateBoardFeet(
                                  selectedBoard.width,
                                  selectedBoard.height,
                                  item.length,
                                  newQty || 0
                                );
                                
                                // Calculate base price for the item
                                let unitPrice = 0;
                                switch(item.length) {
                                  case 8: unitPrice = selectedBoard.length8; break;
                                  case 10: unitPrice = selectedBoard.length10; break;
                                  case 12: unitPrice = selectedBoard.length12; break;
                                  case 14: unitPrice = selectedBoard.length14; break;
                                  case 16: unitPrice = selectedBoard.length16; break;
                                  default: unitPrice = 0;
                                }
                                
                                // Calculate total price with custom sawing if selected
                                let newPrice = unitPrice * (newQty || 0);
                                if (item.customSaw) {
                                  newPrice += newBoardFeet * 0.40;
                                }
                                
                                // Update the item
                                updatedCart[index] = {
                                  ...item,
                                  quantity: newQty,
                                  boardFeet: newBoardFeet,
                                  price: newPrice
                                };
                                
                                // Update state
                                setCart(updatedCart);
                                updateCartTotal(updatedCart);
                              }}
                              onBlur={(e) => {
                                if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                                  // Reset to 1 if empty or invalid
                                  const updatedCart = [...cart];
                                  
                                  // Get the item data
                                  const data = item.woodType === 'hemlock' ? hemlockData : pineData;
                                  const selectedBoard = data.find(board => board.size === item.size);
                                  
                                  // Calculate board feet for quantity 1
                                  const newBoardFeet = calculateBoardFeet(
                                    selectedBoard.width,
                                    selectedBoard.height,
                                    item.length,
                                    1
                                  );
                                  
                                  // Calculate base price for the item
                                  let unitPrice = 0;
                                  switch(item.length) {
                                    case 8: unitPrice = selectedBoard.length8; break;
                                    case 10: unitPrice = selectedBoard.length10; break;
                                    case 12: unitPrice = selectedBoard.length12; break;
                                    case 14: unitPrice = selectedBoard.length14; break;
                                    case 16: unitPrice = selectedBoard.length16; break;
                                    default: unitPrice = 0;
                                  }
                                  
                                  // Calculate total price with custom sawing if selected
                                  let newPrice = unitPrice * 1;
                                  if (item.customSaw) {
                                    newPrice += newBoardFeet * 0.40;
                                  }
                                  
                                  updatedCart[index] = {
                                    ...item,
                                    quantity: 1,
                                    boardFeet: newBoardFeet,
                                    price: newPrice
                                  };
                                  
                                  setCart(updatedCart);
                                  updateCartTotal(updatedCart);
                                }
                              }}
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">{item.boardFeet.toFixed(2)}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.customSaw ? 'Yes' : 'No'}</td>
                          <td className="border border-gray-300 px-3 py-2">${item.price.toFixed(2)}</td>
                          <td className="border border-gray-300 px-3 py-2">
                            <button 
                              className="text-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-right">
                  <p className="text-xl font-bold">Cart Total: ${cartTotal.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <label className="block mb-1 font-medium">Order Notes</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows="3"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Special instructions or notes"
            ></textarea>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              className="bg-green-600 text-white px-6 py-2 rounded"
              onClick={saveOrder}
            >
              {currentOrderId ? 'Update Order' : 'Save Order'}
            </button>
          </div>
          
          <div className="text-sm bg-gray-100 p-4 rounded-lg mt-6">
            <h3 className="font-semibold mb-2">Fiske Lumber</h3>
            <p>924 NY 43</p>
            <p>Stephentown NY 12169</p>
            <p className="mt-2">Custom sawing: $0.40 per board foot</p>
            <p>Sawdust: $12.00 per cubic yard</p>
          </div>
        </>
      )}
      
      {activeTab === 'history' && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Order History</h2>
          
          {orderHistory.length === 0 ? (
            <p className="text-gray-500 italic">No saved orders</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2">Date</th>
                    <th className="border border-gray-300 px-3 py-2">Customer</th>
                    <th className="border border-gray-300 px-3 py-2">Items</th>
                    <th className="border border-gray-300 px-3 py-2">Total</th>
                    <th className="border border-gray-300 px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.id}>
                      <td className="border border-gray-300 px-3 py-2">{order.date}</td>
                      <td className="border border-gray-300 px-3 py-2">{order.customer.name}</td>
                      <td className="border border-gray-300 px-3 py-2">{order.items.length} items</td>
                      <td className="border border-gray-300 px-3 py-2">${order.total.toFixed(2)}</td>
                      <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                        <button 
                          className="text-blue-600 mr-2"
                          onClick={() => loadOrder(order)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-green-600 mr-2"
                          onClick={() => generateInvoice(order)}
                        >
                          Download Invoice
                        </button>
                        <button 
                          className="text-red-600"
                          onClick={() => deleteOrder(order.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Remove hidden invoice template as it's no longer needed */}
        </div>
      )}
    </div>
  );
};