

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let resetUserMail = params.resetPassword; // "some_value"

function logIn(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if ((user['email'] == loginEmail ) && (user['password'] == loginPassword )){
            
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
            localStorage.setItem('currentUser',i)
            window.location.href='summary.html';
        }
    }
}
 
function unsetCurrentUser(){
    localStorage.setItem('currentUser','')
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
    let currentUser = localStorage.getItem('currentUser')
    if(currentUser != ''){
        let user = users[currentUser];
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
                window.location.href='index.html';
            }
        }
    }
}