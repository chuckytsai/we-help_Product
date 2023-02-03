function navBar() {

    // 登入會員系統 & 註冊會員系統
    var memberBoxLogin = document.createElement('div'); //建立登入視窗的div標籤
    var loginBox = document.createElement('form'); //建立登入視窗的form標籤
    var loginCloseBtn = document.createElement('img'); //建立關閉登入視窗的img標籤
    var loginh6A = document.createElement('h6'); //建立登入會員帳號的h6標籤
    var logEmail = document.createElement('input'); //建立logEmail的input標籤
    var logPassword = document.createElement('input'); //建立logPassword的input標籤
    var loginProcess = document.createElement('button'); //建立loginProcess的button標籤
    var loginh5 = document.createElement('h5'); //建立loginh5的h5標籤
    var errorLogin = document.createElement('span'); //建立errorLogin的span標籤
    var loginh6B = document.createElement('h6'); //建立點此註冊的h6標籤
    var logBtn = document.createElement('a'); //建立logBtn的a標籤

    var memberBoxRegister = document.createElement('div'); //建立註冊視窗的div標籤
    var registerBox = document.createElement('form'); //建立註冊視窗的form標籤
    var registerCloseBtn = document.createElement('img'); //建立關閉註冊視窗的img標籤
    var registerh6A = document.createElement('h6'); //建立註冊會員帳號的h6標籤
    var regName = document.createElement('input'); //建立regName的input標籤
    var regEmail = document.createElement('input'); //建立regPassword的input標籤
    var regPassword = document.createElement('input'); //建立regPassword的input標籤
    var regAgainPassword = document.createElement('input'); //建立regAgainPassword的input標籤
    var registerProcess = document.createElement('button'); //建立registerProcess的button標籤
    var registerh5 = document.createElement('h5'); //建立registerh5的h5標籤
    var errorRegister = document.createElement('span'); //建立errorRegister的span標籤
    var registerh6B = document.createElement('h6'); //建立點此註冊的h6標籤
    var regBtn = document.createElement('a'); //建立regBtn"的a標籤

    var memberError = document.createElement('div'); //建立memberError"的div標籤
    var memberErrorForm = document.createElement('form'); //建立memberError"的form標籤
    var memberErrorCloseBtn = document.createElement('img'); //建立memberError的img標籤
    var memberErrorBox = document.createElement('h6'); //建立memberErrorBox的h6標籤

    // 台北一日遊
    var nav = document.getElementsByTagName('nav')[0];
    var navTaipei = document.createElement('span'); //建立台北一日遊的span標籤
    var navTaipeiA = document.createElement('a'); //建立台北一日遊的a標籤
    var navButton = document.createElement('span'); //建立navButton的span標籤
    var navButton1 = document.createElement('span'); //建立navButton1的span標籤
    var navButton1A = document.createElement('a'); //建立navButton1的a標籤
    var navButton2 = document.createElement('span'); //建立navButton2的span標籤
    var navButton2A = document.createElement('a'); //建立navButton2的a標籤
    var navButton3 = document.createElement('span'); //建立navButton3的span標籤
    var navButton3A = document.createElement('a'); //建立navButton3的a標籤


    // 台北一日遊
    nav.append(navTaipei);
    navTaipei.append(navTaipeiA);
    navTaipeiA.append("台北一日遊");
    navTaipei.append(navButton);
    navButton.append(navButton1);
    navButton1.append(navButton1A);
    navButton1A.append("預定行程")
    navButton.append(navButton2);
    navButton2.append(navButton2A);
    navButton2A.append("登入/註冊");
    navButton.append(navButton3);
    navButton3.append(navButton3A);
    navButton3A.append("登出");

    // 登入會員系統 & 註冊會員系統
    document.getElementById('fristLogin').appendChild(memberBoxLogin);
    memberBoxLogin.append(loginBox);
    loginBox.appendChild(loginCloseBtn);
    loginBox.appendChild(loginh6A);
    loginh6A.append("登入會員帳號");
    loginBox.appendChild(logEmail);
    loginBox.appendChild(logPassword);
    loginBox.appendChild(loginProcess);
    loginProcess.append("登入帳戶");
    loginBox.appendChild(loginh5);
    loginh5.appendChild(errorLogin);
    loginBox.appendChild(loginh6B);
    loginh6B.appendChild(logBtn);
    logBtn.append("還沒有帳戶？點此註冊");

    document.getElementById('fristLogin').appendChild(memberBoxRegister);
    memberBoxRegister.append(registerBox);
    registerBox.appendChild(registerCloseBtn);
    registerBox.appendChild(registerh6A);
    registerh6A.append("註冊會員帳號");
    registerBox.appendChild(regName);
    registerBox.appendChild(regEmail);
    registerBox.appendChild(regPassword);
    registerBox.appendChild(regAgainPassword);
    registerBox.append(errorRegister);
    registerBox.append(registerProcess);
    registerProcess.append("註冊新帳戶");
    registerBox.appendChild(registerh5);
    registerh5.appendChild(errorRegister);
    registerBox.appendChild(registerh6B);
    registerh6B.appendChild(regBtn);
    regBtn.append("已經有帳戶了？點此登入");

    document.getElementById('fristLogin').appendChild(memberError);
    memberError.append(memberErrorForm);
    memberErrorForm.append(memberErrorCloseBtn);
    memberErrorForm.append(memberErrorBox);

    navTaipei.id = "navTaipei";
    navTaipeiA.href = "/";
    navButton.id = "navButton";
    navButton1.id = "navButton1";
    navButton1A.href = "javascript:void(0)";
    navButton2.id = "navButton2";
    navButton2A.href = "javascript:void(0)";
    navButton3.id = "navButton3";
    navButton3A.href = "javascript:void(0)";

    memberBoxLogin.id = "memberBoxLogin";
    memberBoxLogin.className = "memberBox";
    loginBox.id = "loginBox";
    loginBox.action = "/api/user";
    loginBox.method = "GET";
    loginCloseBtn.id = "loginCloseBtn";
    loginCloseBtn.src = "/OnedayTrip/img/close.png";
    logEmail.type = "text";
    logEmail.id = "logEmail";
    logEmail.name = "logEmail";
    logEmail.placeholder = "輸入電子信箱";
    logPassword.type = "password";
    logPassword.id = "logPassword";
    logPassword.name = "logPassword";
    logPassword.placeholder = "輸入密碼";
    loginProcess.setAttribute("onclick", "loginProcess()");
    loginProcess.className = "SRBtn";
    errorLogin.id = "errorLogin";
    logBtn.id = "logBtn";
    logBtn.href = "javascript:void(0)";

    memberBoxRegister.id = "memberBoxRegister";
    memberBoxRegister.className = "memberBox";
    registerBox.id = "registerBox";
    registerBox.action = "/api/user";
    registerBox.method = "POST";
    registerCloseBtn.id = "registerCloseBtn";
    registerCloseBtn.src = "/OnedayTrip/img/close.png";
    regName.type = "text";
    regName.id = "regName";
    regName.name = "regName";
    regName.placeholder = "輸入姓名";
    regEmail.type = "text";
    regEmail.id = "regEmail";
    regEmail.name = "regEmail";
    regEmail.placeholder = "輸入電子信箱";
    regPassword.type = "password";
    regPassword.id = "regPassword";
    regPassword.name = "regPassword";
    regPassword.placeholder = "輸入密碼";
    regAgainPassword.type = "password";
    regAgainPassword.id = "regAgainPassword";
    regAgainPassword.name = "regAgainPassword";
    regAgainPassword.placeholder = "再次確認密碼";
    registerProcess.setAttribute("onclick", "registerProcess()");
    registerProcess.className = "SRBtn";
    errorRegister.id = "errorRegister";
    regBtn.id = "regBtn";
    regBtn.href = "javascript:void(0)";

    memberError.id = "memberError";
    memberErrorCloseBtn.id = "memberErrorCloseBtn";
    memberErrorCloseBtn.src = "/OnedayTrip/img/close.png"
    memberErrorBox.id = "memberErrorBox";

    navButton1.onclick = () => {
        checkBookingProcess()
    }

    navButton2.onclick = function () {
        memberBoxLogin.style.display = "block";
        loginBox.style.display = "block";
        document.getElementById('fristLogin').scrollTop = "35%";
        return false;
    }

    navButton3.onclick = () => {
        deleteProcess()
    }

    memberBoxLogin.style.display = "none";
    memberBoxRegister.style.display = "none";
    memberError.style.display = "none";

    loginCloseBtn.onclick = function () {
        memberBoxLogin.style.display = "none";
    }

    registerCloseBtn.onclick = function () {
        memberBoxRegister.style.display = "none";
    }

    memberErrorCloseBtn.onclick = function () {
        memberError.style.display = "none";
    }

    logBtn.onclick = function () {
        memberBoxLogin.style.display = "none";
        memberBoxRegister.style.display = "block";
        loginBox.style.display = "none";
        registerBox.style.display = "block";
        document.getElementById("regName").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regAgainPassword").value = "";
        document.getElementById("errorLogin").innerHTML = "";
        return false;
    }

    regBtn.onclick = function () {
        memberBoxLogin.style.display = "block";
        memberBoxRegister.style.display = "none";
        loginBox.style.display = "block";
        registerBox.style.display = "none";
        document.getElementById("logEmail").value = "";
        document.getElementById("logPassword").value = "";
        document.getElementById("errorRegister").innerHTML = "";
        return false;
    }

    document.getElementById("loginBox").onclick = (r) => {
        r.preventDefault()
    }

    document.getElementById("registerBox").onclick = (e) => {
        e.preventDefault()
    }

    async function checkBookingProcess() {
        await fetch("/api/user", { method: "GET" })
            .then(response => {
                return response.json()
            })
            .then(res => {
                console.log(res)
                if (res.data == true) {
                    location = "/booking";
                } else {
                    memberBoxLogin.style.display = "block";
                }
            })
    }

}

// ======使用者登入狀態=====
let memberBoxLogin = document.getElementById("memberBoxLogin");
let memberBoxRegister = document.getElementById("memberBoxRegister");
let loginBox = document.getElementById("loginBox");
let registerBox = document.getElementById("registerBox");
let bg = document.getElementById("bg");
let navButton2 = document.getElementById("navButton2");
let bgBtn = document.getElementById("bgBtn")
let logBtn = document.getElementById("logBtn")
let regBtn = document.getElementById("regBtn")
let loginCloseBtn = document.getElementById("loginCloseBtn")
let registerCloseBtn = document.getElementById("registerCloseBtn")

async function loginProcess() {
    await fetch("/api/user", {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("logEmail").value,
            password: document.getElementById("logPassword").value,
        })
    })

        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error == true) {
                document.getElementById("logEmail").value = "";
                document.getElementById("logPassword").value = "";
                document.getElementById("errorLogin").style.display = "block";
                document.getElementById("errorLogin").innerHTML = data.message
            } else {
                window.location = location;
            }
        })

        .catch(function (error) {
            document.getElementById("errorLogin").style.display = "block";
            document.getElementById("logEmail").value = "";
            document.getElementById("logPassword").value = "";
            document.getElementById("errorLogin").innerHTML = "無此帳號";
        });
}

async function registerProcess() {
    var strEmail = document.getElementById("regEmail").value;
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    var regPassword=document.getElementById("regPassword").value;
    var passwordRule = /[^a-zA-Z0-9]+/;
    
    if (strEmail.search(emailRule) != -1) { //信箱格式
        if(regPassword.length>7 && regPassword.length<13 && regPassword.search(passwordRule)){
        if (document.getElementById("regAgainPassword").value == document.getElementById("regPassword").value) {  //再次確認密碼
            await fetch("/api/user", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("regName").value,
                    email: document.getElementById("regEmail").value,
                    password: document.getElementById("regPassword").value,
                }),
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.error == true) {
                        document.getElementById("regName").value = "";
                        document.getElementById("regEmail").value = "";
                        document.getElementById("regPassword").value = "";
                        document.getElementById("regAgainPassword").value = "";
                        document.getElementById("errorRegister").innerHTML = data.message
                    } else {
                        document.getElementById("regName").value = "";
                        document.getElementById("regEmail").value = "";
                        document.getElementById("regPassword").value = "";
                        document.getElementById("regAgainPassword").value = "";
                        document.getElementById("errorRegister").innerHTML = data.message
                    }
                })
                .catch(function (error) {
                    document.getElementById("errorRegister").style.display = "block";
                    document.getElementById("regName").value = "";
                    document.getElementById("regEmail").value = "";
                    document.getElementById("regPassword").value = "";
                    document.getElementById("regAgainPassword").value = "";
                    document.getElementById("errorRegister").innerHTML = "伺服器內部錯誤";
                });
        }
        else {
            document.getElementById("regPassword").value = "";
            document.getElementById("regAgainPassword").value = "";
            document.getElementById("errorRegister").innerHTML = "請確認密碼格式(需要8~12位元)";
        }
    }else{
        document.getElementById("regPassword").value = "";
        document.getElementById("regAgainPassword").value = "";
        document.getElementById("errorRegister").innerHTML = "密碼格式錯誤，或是請勿空白";
    }}
    else {
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regAgainPassword").value = "";
        document.getElementById("errorRegister").innerHTML = "信箱格式錯誤，或是請勿空白";
    }
}

async function checkProcess() {
    await fetch("/api/user", { method: "GET" })
        .then(response => {
            return response.json()
        })
        .then(res => {
            if (res.data == true) {
                document.getElementById("navButton2").style.display = "none";
                document.getElementById("navButton3").style.display = "block";
            } else {
                document.getElementById("navButton2").style.display = "block";
                document.getElementById("navButton3").style.display = "none";
            }
        })
}

async function deleteProcess() {
    await fetch("/api/user", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    })

        .then(response => {
            return response.json()
        })
        .then(result => {
            if (result.ok == true) {
                window.location = location;
            }
        })
}


