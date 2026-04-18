// Main App Component
const App = () => {
  return (
    <div style={{minHeight: '100vh', background: '#f0f4f8', fontFamily: "'Segoe UI', Arial, sans-serif"}}>
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
  
  // 2026 Hemlock Rough Cut Price List
  const hemlockData = [
    { size: '1×4', width: 1, height: 4, length8: 2.37, length10: 2.92, length12: 3.52, length14: 4.07, length16: 4.68 },
    { size: '1×6', width: 1, height: 6, length8: 3.52, length10: 4.40, length12: 5.28, length14: 6.16, length16: 7.04 },
    { size: '1×8', width: 1, height: 8, length8: 4.68, length10: 5.89, length12: 7.04, length14: 8.20, length16: 9.41 },
    { size: '1×10', width: 1, height: 10, length8: 6.60, length10: 8.25, length12: 9.90, length14: 11.55, length16: 13.20 },
    { size: '2×4', width: 2, height: 4, length8: 4.68, length10: 5.89, length12: 7.04, length14: 8.20, length16: 9.41 },
    { size: '2×6', width: 2, height: 6, length8: 7.04, length10: 8.80, length12: 10.56, length14: 12.32, length16: 14.08 },
    { size: '2×8', width: 2, height: 8, length8: 9.41, length10: 11.72, length12: 14.08, length14: 16.45, length16: 18.70 },
    { size: '2×10', width: 2, height: 10, length8: 13.20, length10: 16.50, length12: 19.80, length14: 23.10, length16: 26.40 },
    { size: '2×12', width: 2, height: 12, length8: 15.84, length10: 19.80, length12: 23.76, length14: 27.72, length16: 31.68 },
    { size: '4×4', width: 4, height: 4, length8: 9.41, length10: 11.72, length12: 14.08, length14: 16.45, length16: 18.70 },
    { size: '4×6', width: 4, height: 6, length8: 14.08, length10: 17.60, length12: 21.12, length14: 24.64, length16: 28.16 },
    { size: '6×6', width: 6, height: 6, length8: 21.12, length10: 26.40, length12: 31.68, length14: 36.96, length16: 42.24 },
    { size: '8×8', width: 8, height: 8, length8: 37.57, length10: 46.92, length12: 56.32, length14: 65.73, length16: 75.08 },
  ];
  
  // 2026 Pine Rough Cut Price List
  const pineData = [
    { size: '1×2', width: 1, height: 2, length8: 1.10, length10: 1.49, length12: 1.76, length14: 2.09, length16: 2.37 },
    { size: '1×3', width: 1, height: 3, length8: 1.76, length10: 2.20, length12: 2.64, length14: 2.64, length16: 3.52 },
    { size: '1×4', width: 1, height: 4, length8: 2.37, length10: 2.92, length12: 3.52, length14: 4.07, length16: 4.68 },
    { size: '1×6', width: 1, height: 6, length8: 3.52, length10: 4.40, length12: 5.28, length14: 6.16, length16: 7.04 },
    { size: '1×8', width: 1, height: 8, length8: 4.68, length10: 5.89, length12: 7.04, length14: 8.20, length16: 9.41 },
    { size: '1×10', width: 1, height: 10, length8: 7.32, length10: 9.19, length12: 11.00, length14: 12.82, length16: 14.69 },
    { size: '1×12', width: 1, height: 12, length8: 8.80, length10: 11.00, length12: 13.20, length14: 15.40, length16: 17.60 },
    { size: '2×4', width: 2, height: 4, length8: 4.68, length10: 5.89, length12: 7.04, length14: 8.20, length16: 9.41 },
    { size: '2×6', width: 2, height: 6, length8: 7.04, length10: 8.80, length12: 10.56, length14: 12.32, length16: 14.08 },
    { size: '2×8', width: 2, height: 8, length8: 9.41, length10: 11.72, length12: 14.08, length14: 16.45, length16: 18.70 },
    { size: '2×10', width: 2, height: 10, length8: 14.69, length10: 18.32, length12: 22.00, length14: 25.69, length16: 29.32 },
    { size: '2×12', width: 2, height: 12, length8: 17.60, length10: 22.00, length12: 26.40, length14: 30.80, length16: 35.20 },
    { size: '4×4', width: 4, height: 4, length8: 9.41, length10: 11.72, length12: 14.08, length14: 16.45, length16: 18.70 },
    { size: '4×6', width: 4, height: 6, length8: 14.08, length10: 17.60, length12: 21.12, length14: 24.64, length16: 28.16 },
    { size: '6×6', width: 6, height: 6, length8: 21.12, length10: 26.40, length12: 31.68, length14: 36.96, length16: 42.24 },
    { size: '8×8', width: 8, height: 8, length8: 37.57, length10: 46.92, length12: 56.32, length14: 65.73, length16: 75.08 },
  ];
  
  const availableSizes = woodType === 'hemlock' ? 
    hemlockData.map(item => item.size) : 
    pineData.map(item => item.size);
  
  const availableLengths = [8, 10, 12, 14, 16];
  
  // Calculate board feet
  const calculateBoardFeet = (width, height, length, qty) => {
    return (width * height * length) / 12 * qty;
  };
  
  // Calculate price based on selection
  const calculatePrice = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const selectedBoard = data.find(board => board.size === selectedSize);
    
    if (!selectedBoard) return 0;
    
    let unitPrice = 0;
    switch(selectedLength) {
      case 8: unitPrice = selectedBoard.length8; break;
      case 10: unitPrice = selectedBoard.length10; break;
      case 12: unitPrice = selectedBoard.length12; break;
      case 14: unitPrice = selectedBoard.length14; break;
      case 16: unitPrice = selectedBoard.length16; break;
      default: unitPrice = 0;
    }
    
    const boardFt = calculateBoardFeet(selectedBoard.width, selectedBoard.height, selectedLength, quantity);
    let total = unitPrice * quantity;
    
    if (customSaw) {
      total += boardFt * 0.40;
    }
    
    setBoardFeet(boardFt);
    return total;
  };
  
  React.useEffect(() => {
    const price = calculatePrice();
    setTotalPrice(price);
  }, [woodType, selectedSize, selectedLength, quantity, customSaw]);
  
  const addToCart = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const selectedBoard = data.find(board => board.size === selectedSize);
    if (!selectedBoard) return;
    
    const boardFt = calculateBoardFeet(selectedBoard.width, selectedBoard.height, selectedLength, quantity);
    
    let unitPrice = 0;
    switch(selectedLength) {
      case 8: unitPrice = selectedBoard.length8; break;
      case 10: unitPrice = selectedBoard.length10; break;
      case 12: unitPrice = selectedBoard.length12; break;
      case 14: unitPrice = selectedBoard.length14; break;
      case 16: unitPrice = selectedBoard.length16; break;
      default: unitPrice = 0;
    }
    
    let itemPrice = unitPrice * quantity;
    if (customSaw) { itemPrice += boardFt * 0.40; }
    
    const existingItemIndex = cart.findIndex(item => 
      item.woodType === woodType && item.size === selectedSize && 
      item.length === selectedLength && item.customSaw === customSaw
    );
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        boardFeet: existingItem.boardFeet + boardFt,
        price: existingItem.price + itemPrice
      };
      setCart(updatedCart);
      updateCartTotal(updatedCart);
    } else {
      const newItem = {
        id: Date.now(), woodType, size: selectedSize, length: selectedLength,
        quantity, customSaw, boardFeet: boardFt, price: itemPrice
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      updateCartTotal(updatedCart);
    }
    
    alert(`Added ${quantity} ${woodType} ${selectedSize} × ${selectedLength}' to cart`);
  };
  
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };
  
  const updateCartTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setCartTotal(total);
  };
  
  const startNewOrder = () => {
    if (cart.length > 0) {
      if (!confirm('You have items in your cart. Start a new order? Current items will be lost.')) return;
    }
    setCart([]); setCartTotal(0); setCustomerName(''); setCustomerPhone('');
    setOrderNote(''); setCurrentOrderId(null); setWoodType('hemlock');
    setSelectedSize('1×4'); setSelectedLength(8); setQuantity(1); setCustomSaw(false);
    setActiveTab('calculator');
  };
  
  const saveOrder = () => {
    if (!customerName) { alert('Please enter a customer name'); return; }
    if (cart.length === 0) { alert('Cart is empty'); return; }
    
    const orderId = currentOrderId || Date.now();
    const orderDate = new Date().toLocaleDateString();
    const newOrder = {
      id: orderId, date: orderDate,
      customer: { name: customerName, phone: customerPhone },
      items: [...cart], total: cartTotal, note: orderNote
    };
    
    if (currentOrderId) {
      const updatedHistory = orderHistory.map(order => order.id === currentOrderId ? newOrder : order);
      setOrderHistory(updatedHistory);
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    } else {
      const updatedHistory = [...orderHistory, newOrder];
      setOrderHistory(updatedHistory);
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    }
    
    alert('Order saved successfully!');
    setCart([]); setCartTotal(0); setCustomerName(''); setCustomerPhone('');
    setOrderNote(''); setCurrentOrderId(null);
    setActiveTab('history');
  };
  
  const loadOrder = (order) => {
    setCustomerName(order.customer.name);
    setCustomerPhone(order.customer.phone || '');
    setCart(order.items);
    setCartTotal(order.total);
    setOrderNote(order.note || '');
    setCurrentOrderId(order.id);
    setActiveTab('calculator');
  };
  
  const deleteOrder = (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedHistory = orderHistory.filter(order => order.id !== id);
      setOrderHistory(updatedHistory);
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    }
  };

  const generateInvoice = (order) => {
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - Fiske Lumber</title>
          <meta charset="utf-8">
          <style>
            @page { size: 8.5in 11in; margin: 0.5in; }
            body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333; margin: 0; padding: 0; }
            .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #2d6a4f; }
            .invoice-title { font-size: 28px; font-weight: bold; color: #2d6a4f; margin-bottom: 5px; }
            .invoice-number { font-size: 14px; color: #555; }
            .company-name { font-size: 18px; font-weight: bold; color: #2d6a4f; margin-bottom: 4px; }
            .customer-details { margin-bottom: 20px; }
            .section-title { font-size: 13px; font-weight: bold; margin-bottom: 5px; color: #555; text-transform: uppercase; letter-spacing: 0.5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #2d6a4f; color: white; border-bottom: 2px solid #1b4332; padding: 10px 8px; text-align: left; font-weight: bold; }
            td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
            tr:nth-child(even) td { background-color: #f8fffe; }
            .item-description { width: 40%; }
            .text-right { text-align: right; }
            .total-section { margin-top: 20px; border-top: 2px solid #2d6a4f; padding-top: 10px; }
            .total-row { display: flex; justify-content: flex-end; margin-bottom: 5px; }
            .total-label { width: 150px; text-align: right; margin-right: 20px; font-weight: bold; }
            .total-value { width: 100px; text-align: right; }
            .grand-total { font-size: 16px; font-weight: bold; color: #2d6a4f; }
            .notes-section { margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; padding-top: 10px; border-top: 1px solid #eee; }
            @media print { body { margin: 0; padding: 0; } .invoice-container { border: none; padding: 0; } }
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
                <div class="company-name">Fiske Lumber</div>
                <div>924 NY 43</div>
                <div>Stephentown, NY 12169</div>
              </div>
            </div>
            <div class="customer-details">
              <div class="section-title">Bill To</div>
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
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.woodType.charAt(0).toUpperCase() + item.woodType.slice(1)} ${item.size} × ${item.length}'${item.customSaw ? ' (+ Custom Saw)' : ''}</td>
                    <td>${item.quantity}</td>
                    <td>${item.boardFeet.toFixed(2)}</td>
                    <td>$${(item.price / item.quantity).toFixed(2)}</td>
                    <td class="text-right">$${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total-section">
              <div class="total-row"><div class="total-label">Subtotal:</div><div class="total-value">$${order.total.toFixed(2)}</div></div>
              <div class="total-row grand-total"><div class="total-label">TOTAL:</div><div class="total-value">$${order.total.toFixed(2)}</div></div>
            </div>
            ${order.note ? `<div class="notes-section"><div class="section-title">Notes:</div><div>${order.note}</div></div>` : ''}
            <div class="footer"><p>Thank you for your business!</p><p>Please make checks payable to Fiske Lumber</p></div>
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([invoiceHtml], {type: 'text/html'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `Fiske_Lumber_Invoice_${order.id.toString().slice(-6)}.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // ── Styles ──────────────────────────────────────────────────────────────────
  const colors = {
    green: '#2d6a4f',
    greenLight: '#40916c',
    greenPale: '#d8f3dc',
    greenBorder: '#b7e4c7',
    white: '#ffffff',
    gray50: '#f8fafc',
    gray100: '#f1f5f9',
    gray200: '#e2e8f0',
    gray600: '#475569',
    gray800: '#1e293b',
    blue: '#1d4ed8',
    red: '#dc2626',
  };

  const cardStyle = {
    background: colors.white,
    borderRadius: '10px',
    border: `1px solid ${colors.gray200}`,
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    fontSize: '13px',
    color: colors.gray600,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  };

  const inputStyle = {
    width: '100%',
    border: `1px solid ${colors.gray200}`,
    borderRadius: '6px',
    padding: '9px 12px',
    fontSize: '15px',
    color: colors.gray800,
    background: colors.white,
    boxSizing: 'border-box',
    outline: 'none',
  };

  const btnPrimary = {
    background: colors.green,
    color: colors.white,
    border: 'none',
    borderRadius: '7px',
    padding: '10px 22px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
  };

  const btnSecondary = {
    background: colors.white,
    color: colors.green,
    border: `1.5px solid ${colors.green}`,
    borderRadius: '7px',
    padding: '8px 18px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <div style={{maxWidth: '860px', margin: '0 auto', padding: '0 0 40px 0'}}>

      {/* Header */}
      <div style={{background: colors.green, padding: '22px 28px', borderRadius: '0 0 14px 14px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(45,106,79,0.18)'}}>
        <div>
          <h1 style={{color: colors.white, margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.3px'}}>Fiske Lumber Calculator</h1>
          <p style={{color: colors.greenPale, margin: '3px 0 0', fontSize: '13px'}}>924 NY 43 · Stephentown, NY 12169</p>
        </div>
        <button style={{...btnPrimary, background: colors.greenLight, display: 'flex', alignItems: 'center', gap: '6px'}} onClick={startNewOrder}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Order
        </button>
      </div>

      <div style={{padding: '0 16px'}}>

        {/* Tabs */}
        <div style={{display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: `2px solid ${colors.gray200}`, paddingBottom: '0'}}>
          {['calculator', 'history'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '9px 22px',
                border: 'none',
                background: activeTab === tab ? colors.green : 'transparent',
                color: activeTab === tab ? colors.white : colors.green,
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '7px 7px 0 0',
                cursor: 'pointer',
                marginBottom: '-2px',
                borderBottom: activeTab === tab ? `2px solid ${colors.green}` : '2px solid transparent',
              }}
            >
              {tab === 'calculator' ? 'Calculator' : 'Order History'}
            </button>
          ))}
        </div>

        {activeTab === 'calculator' && (
          <>
            {/* Customer Info */}
            <div style={cardStyle}>
              <h2 style={{margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: colors.gray800}}>Customer Information</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input style={inputStyle} type="text" value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} type="tel" value={customerPhone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      let fmt = '';
                      if (digits.length <= 3) fmt = digits;
                      else if (digits.length <= 6) fmt = `${digits.slice(0,3)}-${digits.slice(3)}`;
                      else fmt = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6,10)}`;
                      setCustomerPhone(fmt);
                    }}
                    placeholder="xxx-xxx-xxxx" maxLength={12} />
                </div>
              </div>
            </div>

            {/* Board Selection */}
            <div style={cardStyle}>
              <h2 style={{margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: colors.gray800}}>Board Selection</h2>

              {/* Wood Type */}
              <div style={{marginBottom: '16px'}}>
                <label style={labelStyle}>Wood Type</label>
                <div style={{display: 'flex', gap: '12px'}}>
                  {[{val: 'hemlock', label: 'Hemlock Rough Cut'}, {val: 'pine', label: 'Pine Rough Cut'}].map(opt => (
                    <label key={opt.val} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                      background: woodType === opt.val ? colors.greenPale : colors.gray100,
                      border: `1.5px solid ${woodType === opt.val ? colors.green : colors.gray200}`,
                      borderRadius: '7px', padding: '9px 18px', fontWeight: '600', fontSize: '14px', color: woodType === opt.val ? colors.green : colors.gray600}}>
                      <input type="radio" value={opt.val} checked={woodType === opt.val}
                        onChange={() => { setWoodType(opt.val); setSelectedSize(opt.val === 'hemlock' ? '1×4' : '1×2'); }}
                        style={{accentColor: colors.green}} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label style={labelStyle}>Size</label>
                  <select style={inputStyle} value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    {availableSizes.map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Length</label>
                  <select style={inputStyle} value={selectedLength} onChange={(e) => setSelectedLength(parseInt(e.target.value))}>
                    {availableLengths.map(length => <option key={length} value={length}>{length}'</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Quantity</label>
                  <input style={inputStyle} type="number" min="1" value={quantity}
                    onChange={(e) => {
                      if (e.target.value === '') setQuantity('');
                      else { const v = parseInt(e.target.value); if (!isNaN(v)) setQuantity(v < 1 ? 1 : v); }
                    }}
                    onBlur={() => { if (quantity === '' || isNaN(quantity)) setQuantity(1); }} />
                </div>
              </div>

              {/* Custom Sawing */}
              <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '16px',
                background: customSaw ? colors.greenPale : colors.gray50,
                border: `1.5px solid ${customSaw ? colors.green : colors.gray200}`,
                borderRadius: '7px', padding: '10px 14px', width: 'fit-content'}}>
                <input type="checkbox" checked={customSaw} onChange={() => setCustomSaw(!customSaw)}
                  style={{accentColor: colors.green, width: '16px', height: '16px'}} />
                <span style={{fontWeight: '600', fontSize: '14px', color: customSaw ? colors.green : colors.gray600}}>
                  Custom Sawing — $0.40 per board foot
                </span>
              </label>

              {/* Price Summary */}
              <div style={{background: colors.gray50, border: `1px solid ${colors.greenBorder}`, borderRadius: '8px',
                padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <p style={{margin: '0 0 4px', fontSize: '13px', color: colors.gray600}}>
                    <strong>Board Feet:</strong> {boardFeet.toFixed(2)}
                  </p>
                  <p style={{margin: 0, fontSize: '22px', fontWeight: '700', color: colors.green}}>
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <button style={btnPrimary} onClick={addToCart}>Add to Cart</button>
              </div>
            </div>

            {/* Shopping Cart */}
            <div style={cardStyle}>
              <h2 style={{margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: colors.gray800}}>Shopping Cart</h2>
              {cart.length === 0 ? (
                <p style={{color: colors.gray600, fontStyle: 'italic', margin: 0}}>Your cart is empty</p>
              ) : (
                <div>
                  <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
                      <thead>
                        <tr style={{background: colors.green, color: colors.white}}>
                          {['Wood', 'Size', 'Length', 'Qty', 'Board Ft', 'Custom Saw', 'Price', ''].map(h => (
                            <th key={h} style={{padding: '9px 10px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap'}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, i) => (
                          <tr key={item.id} style={{background: i % 2 === 0 ? colors.white : colors.gray50}}>
                            <td style={{padding: '8px 10px', textTransform: 'capitalize'}}>{item.woodType}</td>
                            <td style={{padding: '8px 10px'}}>{item.size}</td>
                            <td style={{padding: '8px 10px'}}>{item.length}'</td>
                            <td style={{padding: '8px 10px'}}>
                              <input type="number" min="1" value={item.quantity} style={{...inputStyle, width: '60px', padding: '4px 8px', fontSize: '14px'}}
                                onChange={(e) => {
                                  const newQty = parseInt(e.target.value);
                                  if (!isNaN(newQty) && newQty > 0) {
                                    const data = item.woodType === 'hemlock' ? hemlockData : pineData;
                                    const board = data.find(b => b.size === item.size);
                                    if (!board) return;
                                    const newBoardFt = calculateBoardFeet(board.width, board.height, item.length, newQty);
                                    let unitPrice = 0;
                                    switch(item.length) {
                                      case 8: unitPrice = board.length8; break;
                                      case 10: unitPrice = board.length10; break;
                                      case 12: unitPrice = board.length12; break;
                                      case 14: unitPrice = board.length14; break;
                                      case 16: unitPrice = board.length16; break;
                                    }
                                    let newPrice = unitPrice * newQty;
                                    if (item.customSaw) newPrice += newBoardFt * 0.40;
                                    const updatedCart = cart.map(c => c.id === item.id ? {...c, quantity: newQty, boardFeet: newBoardFt, price: newPrice} : c);
                                    setCart(updatedCart);
                                    updateCartTotal(updatedCart);
                                  }
                                }} />
                            </td>
                            <td style={{padding: '8px 10px'}}>{item.boardFeet.toFixed(2)}</td>
                            <td style={{padding: '8px 10px'}}>{item.customSaw ? 'Yes' : 'No'}</td>
                            <td style={{padding: '8px 10px', fontWeight: '600'}}>${item.price.toFixed(2)}</td>
                            <td style={{padding: '8px 10px'}}>
                              <button style={{color: colors.red, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px'}}
                                onClick={() => removeFromCart(item.id)}>Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{marginTop: '12px', textAlign: 'right'}}>
                    <p style={{fontSize: '20px', fontWeight: '700', color: colors.green, margin: 0}}>
                      Cart Total: ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div style={cardStyle}>
              <label style={{...labelStyle, marginBottom: '8px'}}>Order Notes</label>
              <textarea style={{...inputStyle, resize: 'vertical', minHeight: '80px'}} rows="3"
                value={orderNote} onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Special instructions or notes" />
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '24px'}}>
              <button style={{...btnPrimary, fontSize: '16px', padding: '12px 32px'}} onClick={saveOrder}>
                {currentOrderId ? 'Update Order' : 'Save Order'}
              </button>
            </div>

            {/* Footer Info */}
            <div style={{background: colors.greenPale, border: `1px solid ${colors.greenBorder}`, borderRadius: '10px', padding: '16px 20px'}}>
              <p style={{margin: '0 0 4px', fontWeight: '700', color: colors.green, fontSize: '15px'}}>Fiske Lumber</p>
              <p style={{margin: '0 0 2px', color: colors.gray600, fontSize: '13px'}}>924 NY 43 · Stephentown, NY 12169</p>
              <p style={{margin: '8px 0 2px', color: colors.gray600, fontSize: '13px'}}>Custom sawing (Softwood &amp; Hardwood): $0.40 per board foot</p>
              <p style={{margin: '0', color: colors.gray600, fontSize: '13px'}}>Sawdust: $10.00 per cubic yard</p>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div style={cardStyle}>
            <h2 style={{margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: colors.gray800}}>Order History</h2>
            {orderHistory.length === 0 ? (
              <p style={{color: colors.gray600, fontStyle: 'italic'}}>No saved orders</p>
            ) : (
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
                  <thead>
                    <tr style={{background: colors.green, color: colors.white}}>
                      {['Date', 'Customer', 'Items', 'Total', 'Actions'].map(h => (
                        <th key={h} style={{padding: '9px 12px', textAlign: 'left', fontWeight: '600'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order, i) => (
                      <tr key={order.id} style={{background: i % 2 === 0 ? colors.white : colors.gray50}}>
                        <td style={{padding: '9px 12px'}}>{order.date}</td>
                        <td style={{padding: '9px 12px'}}>{order.customer.name}</td>
                        <td style={{padding: '9px 12px'}}>{order.items.length} items</td>
                        <td style={{padding: '9px 12px', fontWeight: '600', color: colors.green}}>${order.total.toFixed(2)}</td>
                        <td style={{padding: '9px 12px', whiteSpace: 'nowrap'}}>
                          <button style={{color: colors.blue, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '10px', fontSize: '13px'}}
                            onClick={() => loadOrder(order)}>Edit</button>
                          <button style={{color: colors.green, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '10px', fontSize: '13px'}}
                            onClick={() => generateInvoice(order)}>Invoice</button>
                          <button style={{color: colors.red, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px'}}
                            onClick={() => deleteOrder(order.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
