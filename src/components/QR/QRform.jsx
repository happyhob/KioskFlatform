// region 로그인 여부 적용 전
// import React, { useState, useContext } from 'react';
// import QRCode from 'qrcode.react';
// import { Button, Divider, Box, Typography } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { saveQrCode } from '../../apis/auth.js';
// import { LoginContext } from '../../Context/LoginContextProvider';
// import { alert } from "../../apis/alter"; // 수정된 import
// import { useNavigate } from "react-router-dom";

// function QrForm() {
//   const [qrCodeData, setQrCodeData] = useState('');
//   const [savedUrl, setSavedUrl] = useState('');
//   const { isLogin, userInfo } = useContext(LoginContext); 
//   const navigate = useNavigate();


//     // Redirects to the registration page if logged in, otherwise prompts login
//   const handleRegistration = () => {
//     if (!isLogin) {

//       alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
//       navigate("/login");
//       });
//       } else {
//       navigate("/registration");
//       }
//   };

//   const handleGenerateQr = () => {
//     //const url = "http://192.168.55.73:3000/user";
//     const url = "http://61.81.99.105:3000/user";
//     setQrCodeData(url);
//   };

//   const handleSaveQr = async () => {
//     const canvas = document.querySelector('canvas');
//     const qrCodeDataURL = canvas.toDataURL('image/png');

//     try {
//       const response = await saveQrCode(qrCodeDataURL);
//       setSavedUrl(response.url);
//       alert('QR 코드가 성공적으로 저장되었습니다.');
//     } catch (error) {
//       console.error('QR 코드 저장 중 오류 발생:', error);
//       alert('QR 코드 저장에 실패했습니다.');
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//       bgcolor="#f5f5f5"
//     >
//       <Box
//         bgcolor="white"
//         p={4}
//         borderRadius={2}
//         boxShadow={3}
//         textAlign="center"
//       >
//         <Typography variant="h4" gutterBottom>
//           QR Code 생성기
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={handleGenerateQr}
//           sx={{
//             background: 'linear-gradient(45deg, #333 30%, #555 90%)',
//             borderRadius: 3,
//             border: 0,
//             color: 'white',
//             height: 48,
//             padding: '0 30px',
//             boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
//             marginBottom: '20px'
//           }}
//         >
//           QR Code 생성
//         </Button>
//         {qrCodeData && (
//           <Box>
//             <QRCode value={qrCodeData} />
//             <Divider sx={{ marginY: 2 }} />
//             <Button
//               variant="contained"
//               onClick={handleSaveQr}
//               sx={{
//                 background: 'linear-gradient(45deg, #333 30%, #555 90%)',
//                 borderRadius: 3,
//                 border: 0,
//                 color: 'white',
//                 height: 48,
//                 padding: '0 30px',
//                 boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
//                 marginTop: '10px'
//               }}
//             >
//               QR Code 저장
//             </Button>
//           </Box>
//         )}
//         {savedUrl && (
//           <Box mt={3}>
//             <Typography>
//               QR 코드 URL: <a href={savedUrl} target="_blank" rel="noopener noreferrer">{savedUrl}</a>
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default QrForm;
// endregion

// region 로그인 여부 적용
import React, { useState, useContext, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Button, Divider, Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveQrCode } from '../../apis/auth.js';
import { LoginContext } from '../../Context/LoginContextProvider';
import { alert } from "../../apis/alert"; // 수정된 import
import { useNavigate } from "react-router-dom";

function QrForm() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [savedUrl, setSavedUrl] = useState('');
  const { isLogin } = useContext(LoginContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
        navigate("/login");
      });
    }
  }, [isLogin, navigate]);

  const handleGenerateQr = () => {
    //const url = "http://192.168.55.73:3000/user";
    const url = "http://61.81.99.105:3000/user";
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

  if (!isLogin) {
    return null; // 로그인하지 않은 경우 컴포넌트를 렌더링하지 않음
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          QR Code 생성기
        </Typography>
        <Button
          variant="contained"
          onClick={handleGenerateQr}
          sx={{
            background: 'linear-gradient(45deg, #333 30%, #555 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
            marginBottom: '20px'
          }}
        >
          QR Code 생성
        </Button>
        {qrCodeData && (
          <Box>
            <QRCode value={qrCodeData} />
            <Divider sx={{ marginY: 2 }} />
            <Button
              variant="contained"
              onClick={handleSaveQr}
              sx={{
                background: 'linear-gradient(45deg, #333 30%, #555 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
                marginTop: '10px'
              }}
            >
              QR Code 저장
            </Button>
          </Box>
        )}
        {savedUrl && (
          <Box mt={3}>
            <Typography>
              QR 코드 URL: <a href={savedUrl} target="_blank" rel="noopener noreferrer">{savedUrl}</a>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default QrForm;
// endregion
