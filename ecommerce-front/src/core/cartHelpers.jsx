// Add item to cart with optional size variant
export const addItem = (item = {}, selectedSize = null, next = f => f) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        const newItem = {
            ...item,
            count: 1,
            selectedSize: selectedSize || null
        };

        cart.push(newItem);

        // Deduplicate by unique key: productId + selectedSize
        cart = Array.from(
            new Set(cart.map(p => `${p._id}-${p.selectedSize || ''}`))
        ).map(uniqueKey => {
            return cart.find(p => `${p._id}-${p.selectedSize || ''}` === uniqueKey);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

// Update quantity of specific cart item
export const updateItem = (productId, count, selectedSize = null) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.forEach((product, i) => {
            if (product._id === productId && product.selectedSize === selectedSize) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

// Remove item from cart by product ID and size (if present)
export const removeItem = (productId, selectedSize = null) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart = cart.filter(product => {
            return !(product._id === productId && product.selectedSize === selectedSize);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

// Clear entire cart
export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};
