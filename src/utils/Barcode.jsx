export const ReceiveformatBarcode = (value) => {
    if (!/^\d+$/.test(value)) {
      console.error('Invalid barcode value - must be numeric');
      return <span>REC0000</span>;
    }
    const formatted = String(value).padStart(4, '0');
    console.log(".................",formatted)
    return "REC-"+value+"-1546";
  };
  
export const StorageformatBarcode = (value) => {
    if (!/^\d+$/.test(value)) {
      console.error('Invalid barcode value - must be numeric');
      return <span>STR0000</span>;
    }
    const formatted = String(value).padStart(4, '0');
    console.log(".................",formatted)
    return "STR-"+value+"-1546";
  };
  