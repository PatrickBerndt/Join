const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let resetUserMail = params.resetPassword; 
  let succsess = params.succsess;
  let animate = params.animate;

/** this function gets an email and a password to search through the user JSON if the given combination is present */
async function logIn(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;
    let i=0;
    let user = users.find(u=> u.email == loginEmail && u.password == loginPassword);
    if(user != undefined){
        await checkRememberMe(loginEmail,loginPassword);
        while (user != users[i]) {
             i++;
         }
        await backend.setItem('currentUser', JSON.stringify({'currentUser':i}));
        window.location.href='summary.html?animate=play'; 
    }else{
        showAlertLogin();  
    }
}

/** this function highlights email and password if entered worng */
function showAlertLogin(){
    document.getElementById('loginEmail').classList.add('wiggle');
    document.getElementById('loginPassword').classList.add('wiggle');
    succsess = 'wrong';
    notificationBubble();
    setTimeout(() => {
        document.getElementById('loginEmail').classList.remove('wiggle');
        document.getElementById('loginPassword').classList.remove('wiggle');
       succsess = null ;
       document.getElementById('notificationBubble').classList.add('dNone');
    }, 4000);
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
            }else if(succsess == 'wrong'){
                document.getElementById('notificationBubble').innerHTML= /*html*/`
                <div class="bubbleMessage"><span>You entered the worng email / password</span></div>
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

/** this function remembers the userdata if wanted in the localstorage */
function checkRememberMe(loginEmail,loginPassword){
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

/** this function is the guest login  */
async function guestUser(){
    await backend.setItem('currentUser', JSON.stringify({'currentUser':''}));
    window.location.href='summary.html?animate=play';
    document.getElementById('initialHeader').classList.add('dNone');
}

/** this function checks if in a previous session remember me was checked */
function remember(){
    if(localStorage.getItem('remember')){
        document.getElementById('loginEmail').value = localStorage.getItem('user');
        document.getElementById('loginPassword').value = localStorage.getItem('PW');
    }else{
        document.getElementById('rememberMe').checked = false;
    }
}

/** this function renders the initials for the current and the guest user  */
function renderHeadInitials(){
    let activUser = currentUser['currentUser'];
    if(activUser !== ''){
        let user = users[activUser];
        document.getElementById('initialHeader').classList.remove('dNone');
        document.getElementById('initialHeader').innerHTML = `${user['initial']}`;
        document.getElementById('initialHeader').style.backgroundColor = user['color']; 
    }else{
        document.getElementById('initialHeader').classList.remove('dNone');
        document.getElementById('initialHeader').innerHTML = `GU`;
        document.getElementById('initialHeader').style.backgroundColor = '#919191'; 
    }
}

/** this function resets the password
 * it gets two passwords and checks if they are similar
 * then it saves the password to the user
 */
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