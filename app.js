// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: darkMode ? '#1a1f2e' : '#f0f4f8',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      transition: 'background 0.2s'
    }
  }, /*#__PURE__*/React.createElement(LumberCalculator, {
    darkMode: darkMode,
    setDarkMode: setDarkMode
  }));
};

// ── Toast Notification Component ────────────────────────────────────────────
const Toast = ({
  message,
  type,
  onDone
}) => {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, []);
  const bg = type === 'success' ? '#2d6a4f' : type === 'error' ? '#dc2626' : '#1d4ed8';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      background: bg,
      color: '#fff',
      borderRadius: '10px',
      padding: '13px 22px',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideUp 0.25s ease',
      maxWidth: '320px'
    }
  }, /*#__PURE__*/React.createElement("span", null, type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'), /*#__PURE__*/React.createElement("span", null, message));
};

// ── Confirm Dialog Component ─────────────────────────────────────────────────
const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
  colors
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    background: colors.white,
    borderRadius: '12px',
    padding: '28px 32px',
    maxWidth: '380px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
  }
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: '0 0 22px',
    fontSize: '15px',
    color: colors.gray800,
    lineHeight: '1.5'
  }
}, message), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  }
}, /*#__PURE__*/React.createElement("button", {
  onClick: onCancel,
  style: {
    background: colors.gray100,
    color: colors.gray600,
    border: 'none',
    borderRadius: '7px',
    padding: '9px 20px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer'
  }
}, "Cancel"), /*#__PURE__*/React.createElement("button", {
  onClick: onConfirm,
  style: {
    background: colors.red,
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    padding: '9px 20px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer'
  }
}, "Confirm"))));

// ── Board Foot Tooltip ────────────────────────────────────────────────────────
const BfTooltip = ({
  colors
}) => {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block',
      marginLeft: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      background: colors.greenPale,
      border: `1px solid ${colors.greenBorder}`,
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '11px',
      fontWeight: '700',
      color: colors.green,
      cursor: 'pointer',
      lineHeight: '16px',
      padding: 0,
      verticalAlign: 'middle'
    }
  }, "?"), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '26px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: colors.gray800,
      color: '#fff',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      lineHeight: '1.6',
      width: '220px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("strong", null, "What is a board foot?"), /*#__PURE__*/React.createElement("br", null), "1 board foot = 1\" thick \xD7 12\" wide \xD7 12\" long.", /*#__PURE__*/React.createElement("br", null), "Formula: (T \xD7 W \xD7 L) \xF7 12", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "e.g. a 2\xD76 at 8' = 8 board feet"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: `6px solid ${colors.gray800}`
    }
  })));
};

// ── Lumber Calculator Component ──────────────────────────────────────────────
const LumberCalculator = ({
  darkMode,
  setDarkMode
}) => {
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
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [orderHistory, setOrderHistory] = React.useState([]);
  const [currentOrderId, setCurrentOrderId] = React.useState(null);
  const [orderNote, setOrderNote] = React.useState('');
  const [historySearch, setHistorySearch] = React.useState('');
  const [cartFlash, setCartFlash] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});
  // Sawdust add-on state
  const [sawdustQty, setSawdustQty] = React.useState(0);

  // Load saved orders from localStorage on component mount
  React.useEffect(() => {
    const savedOrders = localStorage.getItem('fiskeOrderHistory');
    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error loading saved orders:', e);
      }
    }
  }, []);
  const showToast = (message, type = 'success') => {
    setToast({
      message,
      type,
      key: Date.now()
    });
  };
  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({
      message,
      onConfirm
    });
  };

  // ── Price Data ──────────────────────────────────────────────────────────────
  const hemlockData = [{
    size: '1×4',
    width: 1,
    height: 4,
    length8: 2.37,
    length10: 2.92,
    length12: 3.52,
    length14: 4.07,
    length16: 4.68
  }, {
    size: '1×6',
    width: 1,
    height: 6,
    length8: 3.52,
    length10: 4.40,
    length12: 5.28,
    length14: 6.16,
    length16: 7.04
  }, {
    size: '1×8',
    width: 1,
    height: 8,
    length8: 4.68,
    length10: 5.89,
    length12: 7.04,
    length14: 8.20,
    length16: 9.41
  }, {
    size: '1×10',
    width: 1,
    height: 10,
    length8: 6.60,
    length10: 8.25,
    length12: 9.90,
    length14: 11.55,
    length16: 13.20
  }, {
    size: '2×4',
    width: 2,
    height: 4,
    length8: 4.68,
    length10: 5.89,
    length12: 7.04,
    length14: 8.20,
    length16: 9.41
  }, {
    size: '2×6',
    width: 2,
    height: 6,
    length8: 7.04,
    length10: 8.80,
    length12: 10.56,
    length14: 12.32,
    length16: 14.08
  }, {
    size: '2×8',
    width: 2,
    height: 8,
    length8: 9.41,
    length10: 11.72,
    length12: 14.08,
    length14: 16.45,
    length16: 18.70
  }, {
    size: '2×10',
    width: 2,
    height: 10,
    length8: 13.20,
    length10: 16.50,
    length12: 19.80,
    length14: 23.10,
    length16: 26.40
  }, {
    size: '2×12',
    width: 2,
    height: 12,
    length8: 15.84,
    length10: 19.80,
    length12: 23.76,
    length14: 27.72,
    length16: 31.68
  }, {
    size: '4×4',
    width: 4,
    height: 4,
    length8: 9.41,
    length10: 11.72,
    length12: 14.08,
    length14: 16.45,
    length16: 18.70
  }, {
    size: '4×6',
    width: 4,
    height: 6,
    length8: 14.08,
    length10: 17.60,
    length12: 21.12,
    length14: 24.64,
    length16: 28.16
  }, {
    size: '6×6',
    width: 6,
    height: 6,
    length8: 21.12,
    length10: 26.40,
    length12: 31.68,
    length14: 36.96,
    length16: 42.24
  }, {
    size: '8×8',
    width: 8,
    height: 8,
    length8: 37.57,
    length10: 46.92,
    length12: 56.32,
    length14: 65.73,
    length16: 75.08
  }];
  const pineData = [{
    size: '1×2',
    width: 1,
    height: 2,
    length8: 1.10,
    length10: 1.49,
    length12: 1.76,
    length14: 2.09,
    length16: 2.37
  }, {
    size: '1×3',
    width: 1,
    height: 3,
    length8: 1.76,
    length10: 2.20,
    length12: 2.64,
    length14: 2.64,
    length16: 3.52
  }, {
    size: '1×4',
    width: 1,
    height: 4,
    length8: 2.37,
    length10: 2.92,
    length12: 3.52,
    length14: 4.07,
    length16: 4.68
  }, {
    size: '1×6',
    width: 1,
    height: 6,
    length8: 3.52,
    length10: 4.40,
    length12: 5.28,
    length14: 6.16,
    length16: 7.04
  }, {
    size: '1×8',
    width: 1,
    height: 8,
    length8: 4.68,
    length10: 5.89,
    length12: 7.04,
    length14: 8.20,
    length16: 9.41
  }, {
    size: '1×10',
    width: 1,
    height: 10,
    length8: 7.32,
    length10: 9.19,
    length12: 11.00,
    length14: 12.82,
    length16: 14.69
  }, {
    size: '1×12',
    width: 1,
    height: 12,
    length8: 8.80,
    length10: 11.00,
    length12: 13.20,
    length14: 15.40,
    length16: 17.60
  }, {
    size: '2×4',
    width: 2,
    height: 4,
    length8: 4.68,
    length10: 5.89,
    length12: 7.04,
    length14: 8.20,
    length16: 9.41
  }, {
    size: '2×6',
    width: 2,
    height: 6,
    length8: 7.04,
    length10: 8.80,
    length12: 10.56,
    length14: 12.32,
    length16: 14.08
  }, {
    size: '2×8',
    width: 2,
    height: 8,
    length8: 9.41,
    length10: 11.72,
    length12: 14.08,
    length14: 16.45,
    length16: 18.70
  }, {
    size: '2×10',
    width: 2,
    height: 10,
    length8: 14.69,
    length10: 18.32,
    length12: 22.00,
    length14: 25.69,
    length16: 29.32
  }, {
    size: '2×12',
    width: 2,
    height: 12,
    length8: 17.60,
    length10: 22.00,
    length12: 26.40,
    length14: 30.80,
    length16: 35.20
  }, {
    size: '4×4',
    width: 4,
    height: 4,
    length8: 9.41,
    length10: 11.72,
    length12: 14.08,
    length14: 16.45,
    length16: 18.70
  }, {
    size: '4×6',
    width: 4,
    height: 6,
    length8: 14.08,
    length10: 17.60,
    length12: 21.12,
    length14: 24.64,
    length16: 28.16
  }, {
    size: '6×6',
    width: 6,
    height: 6,
    length8: 21.12,
    length10: 26.40,
    length12: 31.68,
    length14: 36.96,
    length16: 42.24
  }, {
    size: '8×8',
    width: 8,
    height: 8,
    length8: 37.57,
    length10: 46.92,
    length12: 56.32,
    length14: 65.73,
    length16: 75.08
  }];
  const availableSizes = woodType === 'hemlock' ? hemlockData.map(i => i.size) : pineData.map(i => i.size);
  const availableLengths = [8, 10, 12, 14, 16];
  const getUnitPrice = (board, length) => {
    switch (length) {
      case 8:
        return board.length8;
      case 10:
        return board.length10;
      case 12:
        return board.length12;
      case 14:
        return board.length14;
      case 16:
        return board.length16;
      default:
        return 0;
    }
  };
  const calculateBoardFeet = (width, height, length, qty) => width * height * length / 12 * qty;
  const calculatePrice = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const board = data.find(b => b.size === selectedSize);
    if (!board) return 0;
    const boardFt = calculateBoardFeet(board.width, board.height, selectedLength, quantity);
    let total = getUnitPrice(board, selectedLength) * quantity;
    if (customSaw) total += boardFt * 0.40;
    setBoardFeet(boardFt);
    return total;
  };
  React.useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [woodType, selectedSize, selectedLength, quantity, customSaw]);

  // ── Cart Operations ─────────────────────────────────────────────────────────
  const addToCart = () => {
    const data = woodType === 'hemlock' ? hemlockData : pineData;
    const board = data.find(b => b.size === selectedSize);
    if (!board) return;
    const boardFt = calculateBoardFeet(board.width, board.height, selectedLength, quantity);
    let itemPrice = getUnitPrice(board, selectedLength) * quantity;
    if (customSaw) itemPrice += boardFt * 0.40;
    const existingIdx = cart.findIndex(item => item.woodType === woodType && item.size === selectedSize && item.length === selectedLength && item.customSaw === customSaw);
    let updatedCart;
    if (existingIdx !== -1) {
      updatedCart = cart.map((item, i) => i !== existingIdx ? item : {
        ...item,
        quantity: item.quantity + quantity,
        boardFeet: item.boardFeet + boardFt,
        price: item.price + itemPrice
      });
    } else {
      updatedCart = [...cart, {
        id: Date.now(),
        woodType,
        size: selectedSize,
        length: selectedLength,
        quantity,
        customSaw,
        boardFeet: boardFt,
        price: itemPrice
      }];
    }
    setCart(updatedCart);
    updateCartTotal(updatedCart);

    // Flash animation on cart header
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 600);
    showToast(`Added ${quantity} × ${woodType} ${selectedSize} (${selectedLength}') to cart`);
  };
  const removeFromCart = id => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };
  const clearCart = () => {
    showConfirm('Clear all items from the cart?', () => {
      setCart([]);
      setCartTotal(0);
      setConfirmDialog(null);
      showToast('Cart cleared', 'info');
    });
  };
  const updateCartTotal = items => setCartTotal(items.reduce((s, i) => s + i.price, 0));

  // Sawdust total
  const sawdustTotal = sawdustQty * 10.00;
  const grandTotal = cartTotal + sawdustTotal;

  // ── Order Operations ────────────────────────────────────────────────────────
  const startNewOrder = () => {
    if (cart.length > 0 || sawdustQty > 0) {
      showConfirm('You have items in your cart. Start a new order? Current items will be lost.', () => {
        resetOrder();
        setConfirmDialog(null);
      });
    } else {
      resetOrder();
    }
  };
  const resetOrder = () => {
    setCart([]);
    setCartTotal(0);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setOrderNote('');
    setCurrentOrderId(null);
    setWoodType('hemlock');
    setSelectedSize('1×4');
    setSelectedLength(8);
    setQuantity(1);
    setCustomSaw(false);
    setSawdustQty(0);
    setFormErrors({});
    setActiveTab('calculator');
  };
  const saveOrder = () => {
    const errors = {};
    if (!customerName.trim()) errors.name = 'Customer name is required';
    if (cart.length === 0 && sawdustQty === 0) errors.cart = 'Add at least one item to the cart';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    const orderId = currentOrderId || Date.now();
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      customer: {
        name: customerName.trim(),
        phone: customerPhone,
        email: customerEmail
      },
      items: [...cart],
      sawdust: sawdustQty,
      total: grandTotal,
      note: orderNote
    };
    const updatedHistory = currentOrderId ? orderHistory.map(o => o.id === currentOrderId ? newOrder : o) : [...orderHistory, newOrder];
    setOrderHistory(updatedHistory);
    localStorage.setItem('fiskeOrderHistory', JSON.stringify(updatedHistory));
    showToast('Order saved successfully!');
    resetOrder();
    setActiveTab('history');
  };
  const loadOrder = order => {
    setCustomerName(order.customer.name);
    setCustomerPhone(order.customer.phone || '');
    setCustomerEmail(order.customer.email || '');
    setCart(order.items);
    setCartTotal(order.items.reduce((s, i) => s + i.price, 0));
    setSawdustQty(order.sawdust || 0);
    setOrderNote(order.note || '');
    setCurrentOrderId(order.id);
    setFormErrors({});
    setActiveTab('calculator');
  };
  const deleteOrder = id => {
    showConfirm('Are you sure you want to delete this order?', () => {
      const updated = orderHistory.filter(o => o.id !== id);
      setOrderHistory(updated);
      localStorage.setItem('fiskeOrderHistory', JSON.stringify(updated));
      setConfirmDialog(null);
      showToast('Order deleted', 'info');
    });
  };

  // ── Export CSV ──────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [['Date', 'Customer', 'Phone', 'Email', 'Items', 'Sawdust (yd³)', 'Total', 'Notes']];
    orderHistory.forEach(o => {
      rows.push([o.date, o.customer.name, o.customer.phone || '', o.customer.email || '', o.items.map(i => `${i.quantity}x ${i.woodType} ${i.size} ${i.length}'${i.customSaw ? '+saw' : ''}`).join('; '), o.sawdust || 0, o.total.toFixed(2), o.note || '']);
    });
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Fiske_Lumber_Orders.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('CSV exported');
  };

  // ── Invoice ─────────────────────────────────────────────────────────────────
  const generateInvoice = order => {
    const sawdustLine = order.sawdust && order.sawdust > 0 ? `<tr><td>${order.items.length + 1}</td><td>Sawdust</td><td>${order.sawdust} yd³</td><td>—</td><td>$10.00/yd³</td><td class="text-right">$${(order.sawdust * 10).toFixed(2)}</td></tr>` : '';
    const invoiceHtml = `<!DOCTYPE html><html><head><title>Invoice - Fiske Lumber</title><meta charset="utf-8">
    <style>
      @page{size:8.5in 11in;margin:0.5in}
      body{font-family:Arial,sans-serif;font-size:12px;line-height:1.4;color:#333;margin:0;padding:0}
      .ic{max-width:800px;margin:0 auto;padding:20px;border:1px solid #eee}
      .ih{display:flex;justify-content:space-between;margin-bottom:30px;padding-bottom:20px;border-bottom:2px solid #2d6a4f}
      .it{font-size:28px;font-weight:bold;color:#2d6a4f;margin-bottom:5px}
      .cn{font-size:18px;font-weight:bold;color:#2d6a4f;margin-bottom:4px}
      .st{font-size:13px;font-weight:bold;margin-bottom:5px;color:#555;text-transform:uppercase;letter-spacing:.5px}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th{background:#2d6a4f;color:#fff;padding:10px 8px;text-align:left;font-weight:bold}
      td{border-bottom:1px solid #ddd;padding:8px;text-align:left}
      tr:nth-child(even) td{background:#f8fffe}
      .text-right{text-align:right}
      .ts{margin-top:20px;border-top:2px solid #2d6a4f;padding-top:10px}
      .tr{display:flex;justify-content:flex-end;margin-bottom:5px}
      .tl{width:150px;text-align:right;margin-right:20px;font-weight:bold}
      .tv{width:100px;text-align:right}
      .gt{font-size:16px;font-weight:bold;color:#2d6a4f}
      .ns{margin-top:30px;padding-top:10px;border-top:1px solid #eee}
      .ft{margin-top:50px;text-align:center;font-size:12px;color:#777;padding-top:10px;border-top:1px solid #eee}
      @media print{body{margin:0;padding:0}.ic{border:none;padding:0}button{display:none}}
    </style></head><body>
    <div class="ic">
      <div class="ih">
        <div><div class="it">INVOICE</div><div>Invoice #: FISKE-${order.id.toString().slice(-6)}</div><div>Date: ${order.date}</div></div>
        <div><div class="cn">Fiske Lumber</div><div>924 NY 43</div><div>Stephentown, NY 12169</div></div>
      </div>
      <div style="margin-bottom:20px"><div class="st">Bill To</div>
        <div>${order.customer.name}</div>
        ${order.customer.phone ? `<div>Phone: ${order.customer.phone}</div>` : ''}
        ${order.customer.email ? `<div>Email: ${order.customer.email}</div>` : ''}
      </div>
      <table><thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Board Ft</th><th>Unit Price</th><th class="text-right">Amount</th></tr></thead>
      <tbody>
        ${order.items.map((item, idx) => `<tr>
          <td>${idx + 1}</td>
          <td>${item.woodType.charAt(0).toUpperCase() + item.woodType.slice(1)} ${item.size} × ${item.length}'${item.customSaw ? ' (+ Custom Saw)' : ''}</td>
          <td>${item.quantity}</td>
          <td>${item.boardFeet.toFixed(2)}</td>
          <td>$${(item.price / item.quantity).toFixed(2)}</td>
          <td class="text-right">$${item.price.toFixed(2)}</td>
        </tr>`).join('')}
        ${sawdustLine}
      </tbody></table>
      <div class="ts">
        <div class="tr"><div class="tl">Subtotal:</div><div class="tv">$${order.total.toFixed(2)}</div></div>
        <div class="tr gt"><div class="tl">TOTAL:</div><div class="tv">$${order.total.toFixed(2)}</div></div>
      </div>
      ${order.note ? `<div class="ns"><div class="st">Notes:</div><div>${order.note}</div></div>` : ''}
      <div class="ft"><p>Thank you for your business!</p><p>Please make checks payable to Fiske Lumber</p></div>
    </div>
    <div style="text-align:center;margin-top:20px"><button onclick="window.print()" style="background:#2d6a4f;color:#fff;border:none;padding:10px 28px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer">Print / Save as PDF</button></div>
    </body></html>`;
    const win = window.open('', '_blank');
    win.document.write(invoiceHtml);
    win.document.close();
  };

  // ── Styles ───────────────────────────────────────────────────────────────────
  const colors = {
    green: '#2d6a4f',
    greenLight: '#40916c',
    greenPale: '#d8f3dc',
    greenBorder: '#b7e4c7',
    white: darkMode ? '#1e2535' : '#ffffff',
    surface: darkMode ? '#252d3d' : '#ffffff',
    bg: darkMode ? '#1a1f2e' : '#f0f4f8',
    gray50: darkMode ? '#2a3347' : '#f8fafc',
    gray100: darkMode ? '#2e3a50' : '#f1f5f9',
    gray200: darkMode ? '#3a4a65' : '#e2e8f0',
    gray600: darkMode ? '#94a3b8' : '#475569',
    gray800: darkMode ? '#e2e8f0' : '#1e293b',
    blue: '#1d4ed8',
    red: '#dc2626'
  };
  const cardStyle = {
    background: colors.surface,
    borderRadius: '10px',
    border: `1px solid ${colors.gray200}`,
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
  };
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    fontSize: '13px',
    color: colors.gray600,
    textTransform: 'uppercase',
    letterSpacing: '0.4px'
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
    outline: 'none'
  };
  const inputErrorStyle = {
    ...inputStyle,
    border: '1.5px solid #dc2626'
  };
  const btnPrimary = {
    background: colors.green,
    color: '#ffffff',
    border: 'none',
    borderRadius: '7px',
    padding: '10px 22px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer'
  };
  const btnSecondary = {
    background: colors.surface,
    color: colors.green,
    border: `1.5px solid ${colors.green}`,
    borderRadius: '7px',
    padding: '8px 18px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer'
  };
  const btnDanger = {
    background: 'none',
    color: colors.red,
    border: `1px solid ${colors.red}`,
    borderRadius: '6px',
    padding: '5px 12px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer'
  };
  const filteredHistory = orderHistory.filter(o => !historySearch || o.customer.name.toLowerCase().includes(historySearch.toLowerCase()) || o.date.includes(historySearch));
  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0) + (sawdustQty > 0 ? 1 : 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '860px',
      margin: '0 auto',
      padding: '0 0 40px 0'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cartFlash { 0%,100% { background:#2d6a4f; } 50% { background:#40916c; } }
        @media (max-width: 600px) {
          .grid-3col { grid-template-columns: 1fr 1fr !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .header-flex { flex-direction: column; gap: 12px; align-items: flex-start !important; }
          .hide-mobile { display: none !important; }
          .cart-table td, .cart-table th { padding: 6px 7px !important; font-size: 13px !important; }
        }
      `), toast && /*#__PURE__*/React.createElement(Toast, {
    key: toast.key,
    message: toast.message,
    type: toast.type,
    onDone: () => setToast(null)
  }), confirmDialog && /*#__PURE__*/React.createElement(ConfirmDialog, {
    message: confirmDialog.message,
    onConfirm: confirmDialog.onConfirm,
    onCancel: () => setConfirmDialog(null),
    colors: colors
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-flex",
    style: {
      background: colors.green,
      padding: '22px 28px',
      borderRadius: '0 0 14px 14px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(45,106,79,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "38",
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "20",
    fill: "rgba(255,255,255,0.12)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "20,5 32,28 8,28",
    fill: "#d8f3dc"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "20,12 30,30 10,30",
    fill: "#b7e4c7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "28",
    width: "6",
    height: "7",
    rx: "1",
    fill: "#d8f3dc"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      color: '#ffffff',
      margin: 0,
      fontSize: '22px',
      fontWeight: '700',
      letterSpacing: '0.3px'
    }
  }, "Fiske Lumber"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: colors.greenPale,
      margin: '2px 0 0',
      fontSize: '12px'
    }
  }, "924 NY 43 \xB7 Stephentown, NY 12169"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(!darkMode),
    title: darkMode ? 'Light mode' : 'Dark mode',
    style: {
      background: 'rgba(255,255,255,0.15)',
      border: 'none',
      borderRadius: '7px',
      padding: '8px 12px',
      cursor: 'pointer',
      color: '#fff',
      fontSize: '16px'
    }
  }, darkMode ? '☀️' : '🌙'), /*#__PURE__*/React.createElement("button", {
    style: {
      ...btnPrimary,
      background: colors.greenLight,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    onClick: startNewOrder
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
    clipRule: "evenodd"
  })), "New Order"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4px',
      marginBottom: '20px',
      borderBottom: `2px solid ${colors.gray200}`
    }
  }, [{
    key: 'calculator',
    label: 'Calculator',
    badge: cartItemCount > 0 ? cartItemCount : null
  }, {
    key: 'history',
    label: 'Order History',
    badge: orderHistory.length > 0 ? orderHistory.length : null
  }, {
    key: 'prices',
    label: 'Price List',
    badge: null
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.key,
    onClick: () => setActiveTab(tab.key),
    style: {
      padding: '9px 18px',
      border: 'none',
      background: activeTab === tab.key ? colors.green : 'transparent',
      color: activeTab === tab.key ? '#ffffff' : colors.green,
      fontWeight: '600',
      fontSize: '14px',
      borderRadius: '7px 7px 0 0',
      cursor: 'pointer',
      marginBottom: '-2px',
      borderBottom: activeTab === tab.key ? `2px solid ${colors.green}` : '2px solid transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, tab.label, tab.badge !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      background: activeTab === tab.key ? 'rgba(255,255,255,0.3)' : colors.green,
      color: '#fff',
      borderRadius: '10px',
      padding: '1px 7px',
      fontSize: '11px',
      fontWeight: '700',
      minWidth: '18px',
      textAlign: 'center',
      animation: tab.key === 'calculator' && cartFlash ? 'cartFlash 0.6s ease' : 'none'
    }
  }, tab.badge)))), activeTab === 'calculator' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 16px',
      fontSize: '16px',
      fontWeight: '700',
      color: colors.gray800
    }
  }, "Customer Information"), /*#__PURE__*/React.createElement("div", {
    className: "grid-3col",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Name *"), /*#__PURE__*/React.createElement("input", {
    style: formErrors.name ? inputErrorStyle : inputStyle,
    type: "text",
    value: customerName,
    onChange: e => {
      setCustomerName(e.target.value);
      if (formErrors.name) setFormErrors(f => ({
        ...f,
        name: null
      }));
    },
    placeholder: "Customer name"
  }), formErrors.name && /*#__PURE__*/React.createElement("p", {
    style: {
      color: colors.red,
      fontSize: '12px',
      margin: '4px 0 0'
    }
  }, formErrors.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    type: "tel",
    value: customerPhone,
    onChange: e => {
      const d = e.target.value.replace(/\D/g, '');
      let fmt = d.length <= 3 ? d : d.length <= 6 ? `${d.slice(0, 3)}-${d.slice(3)}` : `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 10)}`;
      setCustomerPhone(fmt);
    },
    placeholder: "xxx-xxx-xxxx",
    maxLength: 12
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    type: "email",
    value: customerEmail,
    onChange: e => setCustomerEmail(e.target.value),
    placeholder: "customer@email.com"
  })))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 16px',
      fontSize: '16px',
      fontWeight: '700',
      color: colors.gray800
    }
  }, "Board Selection"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Wood Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }
  }, [{
    val: 'hemlock',
    label: 'Hemlock Rough Cut'
  }, {
    val: 'pine',
    label: 'Pine Rough Cut'
  }].map(opt => /*#__PURE__*/React.createElement("label", {
    key: opt.val,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      background: woodType === opt.val ? colors.greenPale : colors.gray100,
      border: `1.5px solid ${woodType === opt.val ? colors.green : colors.gray200}`,
      borderRadius: '7px',
      padding: '9px 18px',
      fontWeight: '600',
      fontSize: '14px',
      color: woodType === opt.val ? colors.green : colors.gray600
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    value: opt.val,
    checked: woodType === opt.val,
    onChange: () => {
      setWoodType(opt.val);
      setSelectedSize(opt.val === 'hemlock' ? '1×4' : '1×2');
    },
    style: {
      accentColor: colors.green
    }
  }), opt.label)))), /*#__PURE__*/React.createElement("div", {
    className: "grid-3col",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Size"), /*#__PURE__*/React.createElement("select", {
    style: inputStyle,
    value: selectedSize,
    onChange: e => setSelectedSize(e.target.value)
  }, availableSizes.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Length"), /*#__PURE__*/React.createElement("select", {
    style: inputStyle,
    value: selectedLength,
    onChange: e => setSelectedLength(parseInt(e.target.value))
  }, availableLengths.map(l => /*#__PURE__*/React.createElement("option", {
    key: l,
    value: l
  }, l, "'")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, "Quantity"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    type: "number",
    min: "1",
    value: quantity,
    onChange: e => {
      if (e.target.value === '') setQuantity('');else {
        const v = parseInt(e.target.value);
        if (!isNaN(v)) setQuantity(v < 1 ? 1 : v);
      }
    },
    onBlur: () => {
      if (quantity === '' || isNaN(quantity)) setQuantity(1);
    }
  }))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      marginBottom: '16px',
      background: customSaw ? colors.greenPale : colors.gray50,
      border: `1.5px solid ${customSaw ? colors.green : colors.gray200}`,
      borderRadius: '7px',
      padding: '10px 14px',
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: customSaw,
    onChange: () => setCustomSaw(!customSaw),
    style: {
      accentColor: colors.green,
      width: '16px',
      height: '16px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: '600',
      fontSize: '14px',
      color: customSaw ? colors.green : colors.gray600
    }
  }, "Custom Sawing \u2014 $0.40 per board foot")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: colors.gray50,
      border: `1px solid ${colors.greenBorder}`,
      borderRadius: '8px',
      padding: '14px 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 4px',
      fontSize: '13px',
      color: colors.gray600
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Board Feet:"), " ", boardFeet.toFixed(2), /*#__PURE__*/React.createElement(BfTooltip, {
    colors: colors
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '22px',
      fontWeight: '700',
      color: colors.green
    }
  }, "Total: $", totalPrice.toFixed(2))), /*#__PURE__*/React.createElement("button", {
    style: btnPrimary,
    onClick: addToCart
  }, "Add to Cart"))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 4px',
      fontSize: '16px',
      fontWeight: '700',
      color: colors.gray800
    }
  }, "Sawdust Add-On"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 14px',
      fontSize: '13px',
      color: colors.gray600
    }
  }, "$10.00 per cubic yard"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSawdustQty(q => Math.max(0, q - 1)),
    style: {
      width: '34px',
      height: '34px',
      borderRadius: '7px',
      border: `1px solid ${colors.gray200}`,
      background: colors.gray100,
      color: colors.gray800,
      fontSize: '18px',
      cursor: 'pointer',
      fontWeight: '700'
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px',
      fontWeight: '700',
      color: colors.gray800,
      minWidth: '28px',
      textAlign: 'center'
    }
  }, sawdustQty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSawdustQty(q => q + 1),
    style: {
      width: '34px',
      height: '34px',
      borderRadius: '7px',
      border: `1px solid ${colors.green}`,
      background: colors.greenPale,
      color: colors.green,
      fontSize: '18px',
      cursor: 'pointer',
      fontWeight: '700'
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: colors.gray600
    }
  }, "cubic yard", sawdustQty !== 1 ? 's' : '')), sawdustQty > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: colors.green
    }
  }, "= $", sawdustTotal.toFixed(2)))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      flexWrap: 'wrap',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '700',
      color: colors.gray800
    }
  }, "Shopping Cart", cartItemCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: '8px',
      background: colors.green,
      color: '#fff',
      borderRadius: '10px',
      padding: '2px 9px',
      fontSize: '12px',
      fontWeight: '700',
      animation: cartFlash ? 'cartFlash 0.6s ease' : 'none'
    }
  }, cartItemCount)), cart.length > 0 && /*#__PURE__*/React.createElement("button", {
    style: btnDanger,
    onClick: clearCart
  }, "Clear Cart")), cart.length === 0 && sawdustQty === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: colors.gray600,
      fontStyle: 'italic',
      margin: 0
    }
  }, "Your cart is empty") : /*#__PURE__*/React.createElement("div", null, formErrors.cart && /*#__PURE__*/React.createElement("p", {
    style: {
      color: colors.red,
      fontSize: '13px',
      margin: '0 0 10px'
    }
  }, formErrors.cart), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "cart-table",
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: colors.green,
      color: '#ffffff'
    }
  }, ['Wood', 'Size', 'Length', 'Qty', 'Board Ft', 'Custom Saw', 'Price', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '9px 10px',
      textAlign: 'left',
      fontWeight: '600',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, cart.map((item, i) => /*#__PURE__*/React.createElement("tr", {
    key: item.id,
    style: {
      background: i % 2 === 0 ? colors.surface : colors.gray50
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      textTransform: 'capitalize',
      color: colors.gray800
    }
  }, item.woodType), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray800
    }
  }, item.size), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray800
    }
  }, item.length, "'"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    value: item.quantity,
    style: {
      ...inputStyle,
      width: '60px',
      padding: '4px 8px',
      fontSize: '14px'
    },
    onChange: e => {
      const newQty = parseInt(e.target.value);
      if (!isNaN(newQty) && newQty > 0) {
        const data = item.woodType === 'hemlock' ? hemlockData : pineData;
        const board = data.find(b => b.size === item.size);
        if (!board) return;
        const newBf = calculateBoardFeet(board.width, board.height, item.length, newQty);
        let newPrice = getUnitPrice(board, item.length) * newQty;
        if (item.customSaw) newPrice += newBf * 0.40;
        const updated = cart.map(c => c.id === item.id ? {
          ...c,
          quantity: newQty,
          boardFeet: newBf,
          price: newPrice
        } : c);
        setCart(updated);
        updateCartTotal(updated);
      }
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray800
    }
  }, item.boardFeet.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray800
    }
  }, item.customSaw ? '✓' : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      fontWeight: '600',
      color: colors.green
    }
  }, "$", item.price.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      color: colors.red,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px'
    },
    onClick: () => removeFromCart(item.id)
  }, "\u2715")))), sawdustQty > 0 && /*#__PURE__*/React.createElement("tr", {
    style: {
      background: cart.length % 2 === 0 ? colors.surface : colors.gray50
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "3",
    style: {
      padding: '8px 10px',
      color: colors.gray800,
      fontStyle: 'italic'
    }
  }, "Sawdust"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray800
    }
  }, sawdustQty, " yd\xB3"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray600
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      color: colors.gray600
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px',
      fontWeight: '600',
      color: colors.green
    }
  }, "$", sawdustTotal.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      color: colors.red,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px'
    },
    onClick: () => setSawdustQty(0)
  }, "\u2715")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      textAlign: 'right'
    }
  }, sawdustQty > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: colors.gray600,
      margin: '0 0 4px'
    }
  }, "Lumber: $", cartTotal.toFixed(2), " + Sawdust: $", sawdustTotal.toFixed(2)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '22px',
      fontWeight: '700',
      color: colors.green,
      margin: 0
    }
  }, "Order Total: $", grandTotal.toFixed(2))))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      ...labelStyle,
      marginBottom: '8px'
    }
  }, "Order Notes"), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...inputStyle,
      resize: 'vertical',
      minHeight: '80px'
    },
    rows: "3",
    value: orderNote,
    onChange: e => setOrderNote(e.target.value),
    placeholder: "Special instructions or notes"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...btnPrimary,
      fontSize: '16px',
      padding: '12px 32px'
    },
    onClick: saveOrder
  }, currentOrderId ? 'Update Order' : 'Save Order')), /*#__PURE__*/React.createElement("div", {
    style: {
      background: colors.greenPale,
      border: `1px solid ${colors.greenBorder}`,
      borderRadius: '10px',
      padding: '16px 20px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 4px',
      fontWeight: '700',
      color: colors.green,
      fontSize: '15px'
    }
  }, "Fiske Lumber"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2px',
      color: colors.gray600,
      fontSize: '13px'
    }
  }, "924 NY 43 \xB7 Stephentown, NY 12169"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 2px',
      color: colors.gray600,
      fontSize: '13px'
    }
  }, "Custom sawing (Softwood & Hardwood): $0.40 per board foot"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0',
      color: colors.gray600,
      fontSize: '13px'
    }
  }, "Sawdust: $10.00 per cubic yard"))), activeTab === 'history' && /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      flexWrap: 'wrap',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '700',
      color: colors.gray800
    }
  }, "Order History"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...inputStyle,
      width: '200px',
      padding: '7px 12px',
      fontSize: '14px'
    },
    type: "text",
    placeholder: "Search by name or date\u2026",
    value: historySearch,
    onChange: e => setHistorySearch(e.target.value)
  }), orderHistory.length > 0 && /*#__PURE__*/React.createElement("button", {
    style: btnSecondary,
    onClick: exportCSV
  }, "Export CSV"))), filteredHistory.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: colors.gray600,
      fontStyle: 'italic'
    }
  }, orderHistory.length === 0 ? 'No saved orders yet.' : 'No orders match your search.') : /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: colors.green,
      color: '#ffffff'
    }
  }, ['Date', 'Customer', 'Items', 'Total', 'Actions'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '9px 12px',
      textAlign: 'left',
      fontWeight: '600'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filteredHistory.map((order, i) => /*#__PURE__*/React.createElement("tr", {
    key: order.id,
    style: {
      background: i % 2 === 0 ? colors.surface : colors.gray50
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      color: colors.gray800
    }
  }, order.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      color: colors.gray800
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600'
    }
  }, order.customer.name), order.customer.phone && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: colors.gray600
    }
  }, order.customer.phone), order.customer.email && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: colors.gray600
    }
  }, order.customer.email)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      color: colors.gray800
    }
  }, order.items.length, " item", order.items.length !== 1 ? 's' : '', order.sawdust > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: colors.gray600,
      display: 'block'
    }
  }, order.sawdust, " yd\xB3 sawdust")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      fontWeight: '600',
      color: colors.green
    }
  }, "$", order.total.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      color: colors.blue,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      marginRight: '10px',
      fontSize: '13px'
    },
    onClick: () => loadOrder(order)
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    style: {
      color: colors.green,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      marginRight: '10px',
      fontSize: '13px'
    },
    onClick: () => generateInvoice(order)
  }, "Invoice"), /*#__PURE__*/React.createElement("button", {
    style: {
      color: colors.red,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px'
    },
    onClick: () => deleteOrder(order.id)
  }, "Delete")))))))), activeTab === 'prices' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }
  }, [{
    label: 'Hemlock Rough Cut — 2026 Prices',
    data: hemlockData,
    color: '#1b4332'
  }, {
    label: 'Pine Rough Cut — 2026 Prices',
    data: pineData,
    color: '#1d4ed8'
  }].map(({
    label,
    data,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      ...cardStyle,
      flex: '1',
      minWidth: '280px',
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 14px',
      fontSize: '15px',
      fontWeight: '700',
      color
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: color,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '7px 10px',
      textAlign: 'left',
      fontWeight: '600'
    }
  }, "Size"), [8, 10, 12, 14, 16].map(l => /*#__PURE__*/React.createElement("th", {
    key: l,
    style: {
      padding: '7px 10px',
      textAlign: 'right',
      fontWeight: '600'
    }
  }, l, "'")))), /*#__PURE__*/React.createElement("tbody", null, data.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.size,
    style: {
      background: i % 2 === 0 ? colors.surface : colors.gray50
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      fontWeight: '600',
      color: colors.gray800
    }
  }, row.size), [row.length8, row.length10, row.length12, row.length14, row.length16].map((p, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      padding: '6px 10px',
      textAlign: 'right',
      color: colors.gray800
    }
  }, "$", p.toFixed(2)))))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: '12px',
      color: colors.gray600
    }
  }, "Prices per piece. Custom sawing adds $0.40/board foot.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      background: colors.greenPale,
      border: `1px solid ${colors.greenBorder}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 4px',
      fontWeight: '700',
      color: colors.green,
      fontSize: '14px'
    }
  }, "Additional Services"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2px',
      color: colors.gray600,
      fontSize: '13px'
    }
  }, "Custom sawing (Softwood & Hardwood): $0.40 per board foot"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0',
      color: colors.gray600,
      fontSize: '13px'
    }
  }, "Sawdust: $10.00 per cubic yard")))));
};
