export const discount = (price, percent) => {
    const discountedPrice = price - (price / 100 * percent);
    return discountedPrice.toFixed(2);
  }
  