import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Button, Divider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveQrCode } from '../../apis/auth.js';

function QRForm() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [savedUrl, setSavedUrl] = useState('');

  const handleGenerateQr = () => {
    const url = "http://localhost:3000/user";
    setQrCodeData(url);
  };

  const handleSaveQr = async () => {
    const canvas = document.querySelector('canvas');
    const qrCodeDataURL = canvas.toDataURL('image/png');

    try {
      const response = await saveQrCode(qrCodeDataURL);
      setSavedUrl(response.url);
      alert('QR 코드가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('QR 코드 저장 중 오류 발생:', error);
      alert('QR 코드 저장에 실패했습니다.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">QR Code Generator</h1>
      <div>
        <Button variant="contained" color="primary" onClick={handleGenerateQr} style={{ marginBottom: '20px' }}>
          Generate QR Code
        </Button>
        {qrCodeData && (
          <div>
            <QRCode value={qrCodeData} />
            <Divider></Divider>
            <Button variant="contained" color="success" onClick={handleSaveQr} style={{ marginTop: '10px' }}>
              Save QR Code
            </Button>
          </div>
        )}
        {savedUrl && (
          <div className="mt-3">
            <p>QR 코드 URL: <a href={savedUrl} target="_blank" rel="noopener noreferrer">{savedUrl}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRForm;
