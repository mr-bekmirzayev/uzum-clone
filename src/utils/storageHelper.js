export const parsePrice = (priceVal) => {
  if (priceVal === null || priceVal === undefined) return 0;
  if (typeof priceVal === "number") return isNaN(priceVal) ? 0 : priceVal;
  if (typeof priceVal === "string") {
    const cleaned = priceVal.replace(/[^\d]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const formatPrice = (priceVal) => {
  const num = parsePrice(priceVal);
  return num.toLocaleString();
};

export const getWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const toggleWishlistInStorage = (item) => {
  const current = getWishlistFromStorage();
  const exists = current.some((w) => w.id === item.id);
  let updated;
  if (exists) {
    updated = current.filter((w) => w.id !== item.id);
  } else {
    updated = [...current, item];
  }
  localStorage.setItem("wishList", JSON.stringify(updated));
  window.dispatchEvent(new Event("storage_wishlist_updated"));
  return updated;
};

export const getBasketFromStorage = () => {
  try {
    const saved = localStorage.getItem("mahsulot");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const withQty = {};
    parsed.forEach((item) => {
      if (item && item.id) {
        if (withQty[item.id]) {
          withQty[item.id].quantity += item.quantity || 1;
        } else {
          withQty[item.id] = { ...item, quantity: item.quantity || 1 };
        }
      }
    });
    return Object.values(withQty);
  } catch (e) {
    return [];
  }
};

export const addToBasketStorage = (item) => {
  const current = getBasketFromStorage();
  const exists = current.find((i) => i.id === item.id);
  let updated;
  if (exists) {
    updated = current.map((i) =>
      i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
    );
  } else {
    updated = [...current, { ...item, quantity: 1 }];
  }
  const flat = updated.flatMap((i) =>
    Array(i.quantity || 1).fill({ ...i, quantity: undefined })
  );
  localStorage.setItem("mahsulot", JSON.stringify(flat));
  window.dispatchEvent(new Event("storage_basket_updated"));
  return updated;
};
