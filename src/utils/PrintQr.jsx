// PrintBarcode.jsx
import React from 'react';
import Barcode from 'react-barcode';

const PrintBarcode = React.forwardRef(({ value, label }, ref) => {
  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;")
  return (
    <div ref={ref} style={{ border: '1px solid red', padding: '10px' }}>
      <Barcode value={value} format="CODE128" height={30} />
      {label && <div>{label}</div>}
    </div>
  );
});

export default PrintBarcode;
