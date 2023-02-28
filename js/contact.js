let letters = [];

function toggleAddContact(){
    document.getElementById('addNewContact').classList.toggle('dNone');
}

function toggleEditContact(i){
    document.getElementById('editContact').classList.toggle('dNone');
    fillEditBox(i);
}

function getLetters(){
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let letter = user['firstName'].charAt(0);
        if (!letters.includes(letter)) {
            letters.push(letter);
        }
    }
    letters.sort();
}

function addContact(){
    let x='addNew';
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let tel = document.getElementById('contactTel').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let initials = name.replace(/[^A-Z]/g, '');
    let color = '#'+(Math.floor(Math.random()*16777215).toString(16));
    let user = {'firstName':firstName,'lastName':lastName,'email':email,'password':'','color':color,'phone':tel,'initial':initials};
    addUser(user,x);
    toggleAddContact();
    getLetters();
}

function addSignUpUser(){
    let x='signup';
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPW').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let initials = name.replace(/[^A-Z]/g, '');
    let color = '#'+(Math.floor(Math.random()*16777215).toString(16));
    let user = {'firstName':firstName,'lastName':lastName,'email':email,'password':password,'color':color,'phone':'','initial':initials};
    addUser(user,x);
}

function renderContact(i){
    wipeActivContact()
    const user = users[i];
    let email = user['email'];
    let firstName = user['firstName'];
    let lastName = user['lastName'];
    let initials =  user['initial'];
    let color = user['color'];
    let tel = user['phone']
    document.getElementById(`contactContentRight`).innerHTML = contactTemplateLong(i,tel,email,firstName,lastName,initials,color) ;
    document.getElementById(`contactBox${i}`).classList.add('activ')
}

function wipeActivContact(){
    for (let i = 0; i < users.length; i++) {
        document.getElementById(`contactBox${i}`).classList.remove('activ');
    }
}

function wipeInput(x){
    if(x == 'addNew'){
        document.getElementById('contactName').value='';
        document.getElementById('contactEmail').value='';
        document.getElementById('contactTel').value=''; 
    }else if(x == 'signup'){
        document.getElementById('signUpName').value='';
        document.getElementById('signUpEmail').value='';
        document.getElementById('signUpPW').value='';
        window.location.href='index.html';
    }
}


async function addUser(user,x) {
    users.push(user);
    await backend.setItem('users', JSON.stringify(users));
     wipeInput(x);
}

function renderLetters() {
    let letterbox = document.getElementById('contactContent');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `
        <div class="indexBox" id="indexBox-${letter}">
            <div class="letterBox">
                <h3>${letter}</h3>
            </div>
        </div>`;
    }
    updateContact();
}

function updateContact(){
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let email = user['email'];
        let firstName = user['firstName'];
        let lastName = user['lastName'];
        let initials =  user['initial'];
        let color = user['color'];
        let letter = user['firstName'].charAt(0);
        document.getElementById(`indexBox-${letter}`).innerHTML += contactTemplateShort(i,email,firstName,lastName,initials,color) ;
    }
}

function fillEditBox(i){
    const user = users[i];
        let email = user['email'];
        let firstName = user['firstName'];
        let lastName = user['lastName'];
        let tel = user['phone'];
        let initial = user['initial'];
        let color = user['color'];
        document.getElementById('editContact').innerHTML = editBoxTemplate(i,tel,firstName,lastName,email,initial,color);
}

async function saveEdit(i){
    let user = users[i];
    let name = document.getElementById('editName').value;
    let email = document.getElementById('editEmail').value;
    let tel = document.getElementById('editTel').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let initials = name.replace(/[^A-Z]/g, '');
    user = {'firstName':firstName,'lastName':lastName,'email':email,'password':user['password'],'color':user['color'],'phone':tel,'initial':initials};
    users[i]=user;
    await backend.setItem('users', JSON.stringify(users));
    document.getElementById('editContact').classList.toggle('dNone');
    renderContact(i);
}

