import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function Qr() {
  const [text, setText] = useState('');

  return (
    <section>
      <h2>QR Generator</h2>
      <QRCodeCanvas value={text || ' '} size={128} />
      <input
        type="text"
        placeholder="Enter text to encode"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Generate QR Code</button>
    </section>
  );
}

export default Qr;
