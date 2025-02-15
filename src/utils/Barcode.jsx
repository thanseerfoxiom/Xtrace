export const ReceiveformatBarcode = (value) => {
    if (!/^\d+$/.test(value)) {
      console.error('Invalid barcode value - must be numeric');
      return <span>R000000</span>;
    }
    const formatted = String(value).padStart(6, '0');
    console.log(".................",formatted)
    return "R"+formatted;
  };
  