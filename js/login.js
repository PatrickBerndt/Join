const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let resetUserMail = params.resetPassword; 
  let succsess = params.succsess;

async function logIn(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if ((user['email'] == loginEmail ) && (user['password'] == loginPassword )){
            checkRememberMe();
            await backend.setItem('currentUser', JSON.stringify({'currentUser':i}));
            window.location.href='summary.html';
        }
    }
}

/** this function toggles the logout popup bubble */
function toggleLogout(){
    document.getElementById('logout').classList.toggle('dNone');
}

/** this function toggles a notification bubble */
function notificationBubble(){
    if(succsess != null){
        setTimeout(function(){
            document.getElementById('notificationBubble').classList.remove('dNone');
            if(succsess == 'mail'){
                document.getElementById('notificationBubble').innerHTML= /*html*/`
                <div class="bubbleMessage"><img src="assets/icon/emailSend.png"><span>An E-Mail has been sent to you</span></div>
                `;
            }else if(succsess == 'user'){
                document.getElementById('notificationBubble').innerHTML= /*html*/`
                <div class="bubbleMessage"><span>User successfully created</span></div>
                `;
            }else if(succsess == 'password'){
                document.getElementById('notificationBubble').innerHTML= /*html*/`
                <div class="bubbleMessage"><span>You reset your password</span></div>
                `;
            }
            }, 1000);
    }
    
}

/** this function logs the current user out and calls the login page */
async function logout(){
    await backend.setItem('currentUser', JSON.stringify({'currentUser':''}));
    window.location.href='index.html';
    document.getElementById('initialHeader').classList.add('dNone');
    document.getElementById('logout').classList.add('dNone');
}

function checkRememberMe(){
    if((document.getElementById('rememberMe').checked) == true){
        localStorage.setItem('user',loginEmail);
        localStorage.setItem('PW',loginPassword);
        localStorage.setItem('remember',true);
    }
    else{
        localStorage.setItem('user','');
        localStorage.setItem('PW','');
        localStorage.setItem('remember',false);
    }
}

async function guestUser(){
    await backend.setItem('currentUser', JSON.stringify({'currentUser':''}));
    window.location.href='summary.html';
    document.getElementById('initialHeader').classList.add('dNone');
}
 
function remember(){
    if(localStorage.getItem('remember')){
        document.getElementById('loginEmail').value = localStorage.getItem('user');
        document.getElementById('loginPassword').value = localStorage.getItem('PW');
    }else{
        document.getElementById('rememberMe').checked = false;
    }
}

function renderHeadInitials(){
    let activUser = currentUser['currentUser'];
    if(activUser !== ''){
        let user = users[activUser];
        document.getElementById('initialHeader').classList.remove('dNone');
        document.getElementById('initialHeader').innerHTML = `${user['initial']}`;
        document.getElementById('initialHeader').style.backgroundColor = user['color']; 
    }
}


async function resetUserPassword(){
    let pw1 = document.getElementById('reset1Password').value;
    let pw2 = document.getElementById('reset2Password').value;
    if(pw1 ==pw2){
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if(resetUserMail == user['email']){
                user = {'firstName':user['firstName'],'lastName':user['lastName'],'email':user['email'],'password':pw1,'color':user['color'],'phone':user['phone'],'initial':user['initial']};
                users[i]=user;
                await backend.setItem('users', JSON.stringify(users));
                window.location.href='index.html?succsess=password';
            }
        }
    }
}