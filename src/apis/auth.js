//BackEnd와 통신을 하는 부분!!
import api from "./api";

<<<<<<< Updated upstream
// 회원가입
export const join = (LoginId, password, UserName, Email) => {return api.post("/join",
=======

// 로그인
// export const login = (loginId, password) => api.post(`/login?username=${loginId}&password=${password}`, );
export const login = (loginId, password) =>{ return  api.post('http://61.81.99.104:8081/login', {
    "loginId":loginId,
    "password":password
})
    .then(response => {
        // 응답 상태 코드
        const statusCode = response.status;
        console.log('Response Status Code:', statusCode);

        // 서버가 보낸 데이터
        const responseData=  response.data;
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

// 사용자 정보
export const info = () => {return api.get("/users/info")}
// .then(response => {
//     const statusCode = response.status;

//     const responseData = response.data;

//     return { statusCode, responseData };
// })
// .catch(error => {
//     // 오류가 발생한 경우
//     console.error('Error during login request:', error);

//     // Promise로 오류 반환
//     throw error;
//   });
// };

// 회원가입

export const join = (LoginId, password, UserName, Email) => {return api.post("http://61.81.99.104:8081/join",
>>>>>>> Stashed changes
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
export const login = async (loginId, password) =>{ try {
    const response = await api.post('/login', {
        "loginId": loginId,
        "password": password
    });
    // 응답 상태 코드
    const statusCode = response.status;
    console.log('Response Status Code:', statusCode);
    if(statusCode == 200){localStorage.setItem("test_ID",response.data)}
    // 서버가 보낸 데이터
    console.log("asdasd@@@@ {}",response.data);
    const responseData = response.data;
    console.log('Server Response Data:', responseData);
    return { statusCode, responseData };
} catch (error) {
    // 오류가 발생한 경우
    console.error('Error during login request:', error);

    // Promise로 오류 반환
    throw error;
}
}

// 사용자 정보
 export const info = () => {return api.get("/info")
// .then(response => {
//     const statusCode = response.status;
//     const responseData = response.data;
//     console.log(statusCode, responseData);
//     return { statusCode, responseData };
// })
// .catch(error => {
//     // 오류가 발생한 경우
//     console.error('Error during login request:', error);
//     // Promise로 오류 반환
//     throw error;
//   });
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

export const delFloor = (buildingId, floorNum) => {console.log("매개변수:",buildingId,floorNum);
    const url = `/file/${buildingId}/${floorNum}`;
    return api.delete(url)
};


export const delBuild = (buildingId) => {console.log("매개변수:",buildingId);
    const url = `/file/${buildingId}`;
    console.log(url);
    return api.delete(url)
};


// 회원정보 수정
export const update = (data) => api.put("/users", data)


// 회원탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)


export const logout = () => api.post("/logout")

export const session = () => api.get("/users/session")

export const list = () => api.get("/file/list")