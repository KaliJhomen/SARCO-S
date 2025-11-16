/*
  Precios y cálculos relacionados
*/
const calculateFinalPrice = (precio, descuento) => {
  const price = parseFloat(precio) || 0;
  const discount = parseFloat(descuento) || 0;
  return price * (1 - discount / 100);
};
/*
const calculateMonthlyPayment = (precio, meses) => {
  const mesesNum = parseInt(meses) || 1;
  if (mesesNum === 0) return parseFloat(precio) || 0;
  return (parseFloat(precio) || 0) / mesesNum;
};
*/
const calculateTotalStock = (colores) => {
  return colores?.reduce((sum, c) => sum + (parseInt(c.stock) || 0), 0) || 0;
};

module.exports = {
    calculateFinalPrice,
    /*
    calculateMonthlyPayment,
    */
    calculateTotalStock,
};