export const ReceiveformatBarcode = (value,date) => {
    if (!/^\d+$/.test(value)) {
      console.error('Invalid barcode value - must be numeric');
      return <span>REC0000</span>;
    }
    const formatted = String(value).padStart(4, '0');
    let timeDigits = "";
    if (!date) {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      timeDigits = hh + mm;
    } else {
      // Remove non-digit characters from the provided date string and take the first 4 digits.
      timeDigits = date.replace(/[^0-9]/g, '').slice(0, 4);
    }
    return "REC-"+value+"-"+timeDigits;
  };
  
export const StorageformatBarcode = (value,date) => {
    if (!/^\d+$/.test(value)) {
      console.error('Invalid barcode value - must be numeric');
      return <span>STR0000</span>;
    }
    const formatted = String(value).padStart(4, '0');
    let timeDigits = "";
    if (!date) {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      timeDigits = hh + mm;
    } else {
      // Remove non-digit characters from the provided date string and take the first 4 digits.
      timeDigits = date.replace(/[^0-9]/g, '').slice(0, 4);
    }
  
    return "STR-"+value+"-"+timeDigits;
  };
  