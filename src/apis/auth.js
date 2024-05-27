//BackEnd와 통신을 하는 부분!!
import api from "./api";

// 회원가입
export const join = (LoginId, password, UserName, Email) => {return api.post("/admin/join",
    {
        "loginId":LoginId,
        "password":password,
        "userName":UserName,
        "email":Email,
    })
    .then(response => {
        // 응답 상태 코드
        const statusCode = response.status;
        console.log('Response Status Code:', statusCode);

        // 서버가 보낸 데이터
        const responseData = response.data;
        console.log('Server Response Data:', responseData);

        // Promise로 응답 상태 코드와 데이터 반환
        return { statusCode, responseData };
    })
    .catch(error => {
        // 오류가 발생한 경우
        console.error('Error during login request:', error);

        // Promise로 오류 반환
        throw error;
    });
}

// 로그인
// export const login = (loginId, password) => api.post(`/login?username=${loginId}&password=${password}`, );
export const login = async (loginId, password) =>{ 
    try {
    const response = await api.post('/admin/login', {
        "loginId": loginId,
        "password": password
    });
    // 응답 상태 코드
    const statusCode = response.status;
    console.log('Response Status Code:', statusCode);
    if(statusCode == 200){localStorage.setItem("test_ID",response.data)}
    const responseData = response.data;
    console.log('Server Response Data:', responseData);
    return { statusCode, responseData };
    }
    catch (error) {
    // 오류가 발생한 경우
    console.error('Error during login request:', error);

    // Promise로 오류 반환
    throw error;
    }
}

// 사용자 정보
export const info = () => {return api.get("/info")
.then(response => {
    
    const statusCode = response.status;
    const responseData = response.data;
    console.log("Complete API response:", response);
    console.log(`Status code: ${statusCode}, Response data:`, responseData);
    return { statusCode, responseData };
})
.catch(error => {
    // 오류가 발생한 경우
    console.error('Error during login request:', error);
    // Promise로 오류 반환
    throw error;
  });
};

//api.post(`/login?username=${loginId}&password=${password}`, )
// return api.get(`/users/id?userName=${userName}&email=${email}`)
export const id = (userName, email)=> {return api.get('/users/id',
    {
        params: {
            userName: userName,
            email: email,
        }
    });
}

export const pw = (userName,userId ,email)=> {return api.get('/users/pw',
    {
        params: {
            userName: userName,
            loginId : userId,
            email: email,
        }
    })
};

// export const AI = () => {return api.post('/users/ai')}

export const ProductsByUserId = () => {return api.post("/user/kioskpage",
    {
        "loginId" : 2222,
    })
    .then(response => {
            // 응답으로 받은 데이터를 반환
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });

};

export const saveQrCode = (qrCodeData) => {
    return api.post("/save-qrcode", { qrCodeData })
      .then(response => {
        console.log('QR Code saved:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error saving QR code:', error);
        throw error;
      });
  };

//region ProductsByUserId 요청 코드

// export const ProductsByUserId = (userId) => {return api.post(`/user=${userId}`)

//     .then(response => {
//             // 응답으로 받은 데이터를 반환
//             return response.data;
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//             throw error;
//         });

// };

//endregion



// 회원정보 수정



export const update = (data) => api.put("/users", data)


// 회원탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)


export const logout = () => api.post("/admin/logout")

export const session = () => api.get("/users/session")

export const list = () => api.get("/file/list")