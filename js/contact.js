/** this function toggles the overlay for add Contact */
function toggleAddContact(){
    document.getElementById('addNewContact').classList.toggle('dNone');
}

/** this function toggles the overlay for edit Contact */
function toggleEditContact(i){
    document.getElementById('editContact').classList.toggle('dNone');
    fillEditBox(i);
}

/** this function looks witch letters are on the first palce at the fitstname
 * and pushes it into the array letters if it is not allready present.
 * it sorts the array and calls the renderLetters function
  */
function getLetters(){
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let letter = user['firstName'].charAt(0);
        if (!letters.includes(letter)) {
            letters.push(letter);
        }
    }
    letters.sort();
    renderLetters();
}

/** this function validates the phonenumber */
function checkSaveEdit(i){
    let check = document.getElementById('editTel').value;
    if(isNaN(check)){
        document.getElementById('editTel').classList.add('wiggle');
        document.getElementById('notificationBubbleContact').classList.toggle('dNone');
        document.getElementById('notificationBubbleContact').innerHTML= /*html*/`
                <div class="bubbleMessage"><span>Phone number is not a number</span></div>
                `;
        setTimeout(() => {
            document.getElementById('editTel').classList.remove('wiggle');
            document.getElementById('notificationBubbleContact').classList.toggle('dNone');
        }, 4000);
    }else{
        saveEdit(i);
    }
}

/** this function gets all information to creat a new contact. it creats a user JSON object to save it */
function addContact(){
    let x='addNew';
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let tel = document.getElementById('contactTel').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let toValid = titleCase(firstName) + titleCase(lastName);
    let initials = toValid.replace(/[^A-Z]/g, '');
    let color = '#'+(Math.floor(Math.random()*16777215).toString(16));
    let user = {'firstName':titleCase(firstName),'lastName':titleCase(lastName),'email':email,'password':'','color':color,'phone':tel,'initial':initials};
    addUser(user,x);
    toggleAddContact();
    getLetters();
}

/** this function validates the phonenumber */
function checkSaveNew(){
    let check = document.getElementById('contactTel').value;
    if(isNaN(check)){
        document.getElementById('contactTel').classList.add('wiggle');
        document.getElementById('notificationBubbleContactNew').classList.toggle('dNone');
        document.getElementById('notificationBubbleContactNew').innerHTML= /*html*/`
                <div class="bubbleMessage"><span>Phone number is not a number</span></div>
                `;
        setTimeout(() => {
            document.getElementById('contactTel').classList.remove('wiggle');
            document.getElementById('notificationBubbleContactNew').classList.toggle('dNone');
        }, 4000);
    }else{
        addContact();
    }
}

/** this function checks if the user allready exist */
function checkExistingUser(){
    let mail = document.getElementById('signUpEmail').value;
    let user = users.find(u=> u.email == mail);
    if(user != undefined){
        document.getElementById('notificationBubbleSignup').classList.toggle('dNone');
        document.getElementById('notificationBubbleSignup').innerHTML= /*html*/`
        <div class="bubbleMessage"><span>The email already exists</span></div>
        `;        
        setTimeout(() => {
            document.getElementById('notificationBubbleSignup').classList.toggle('dNone');
        }, 3000);

    }else{
        addSignUpUser();
    }
}

/** this function gets all information to creat a new user. it creats a user JSON object to save it */
function addSignUpUser(){
    let x='signup';
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPW').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let toValid = titleCase(firstName) + titleCase(lastName);
    let initials = toValid.replace(/[^A-Z]/g, '');
    let color = '#'+(Math.floor(Math.random()*16777215).toString(16));
    let user = {'firstName':titleCase(firstName),'lastName':titleCase(lastName),'email':email,'password':password,'color':color,'phone':'','initial':initials};
    addUser(user,x);
}

/** this function capitalize the first letter of a given string */
function titleCase(string){
    if(string.length != 0){
       return string[0].toUpperCase() + string.slice(1).toLowerCase(); 
    }else{
        return '';
    }
}

/** this function renders a detail view for the contact on position i */
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
    switchInMobile();
}

/** this function switches between the contact list and the detail view below 850px view width */
function switchInMobile(){
    document.getElementById('contactContent').classList.toggle('shrinkMobile');
    document.getElementById('contactContent').classList.toggle('growMobile');
    document.getElementById('contactContentRight').classList.toggle('shrinkMobile');
    document.getElementById('contactContentRight').classList.toggle('growMobile');
}

/** this function removes the activ class from all the contacts */
function wipeActivContact(){
    for (let i = 0; i < users.length; i++) {
        document.getElementById(`contactBox${i}`).classList.remove('activ');
    }
}

/** this function clears all the input felds for add contact and signup */
function wipeInput(x){
    if(x == 'addNew'){
        document.getElementById('contactName').value='';
        document.getElementById('contactEmail').value='';
        document.getElementById('contactTel').value=''; 
    }else if(x == 'signup'){
        document.getElementById('signUpName').value='';
        document.getElementById('signUpEmail').value='';
        document.getElementById('signUpPW').value='';
        window.location.href='index.html?succsess=user';
    }
}

/** this function saves the users JSON to the backend after aa new user is added */
async function addUser(user,x) {
    users.push(user);
    await backend.setItem('users', JSON.stringify(users));
     wipeInput(x);
}

/** this function draws lines and letters between the contacts in alphabetical order */
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

/** this function renders all users into the contact section  */
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

/** this function renders the edit box for the contacts */
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

/** this function saves the edited user informations  */
async function saveEdit(i){
    let user = users[i];
    let name = document.getElementById('editName').value;
    let email = document.getElementById('editEmail').value;
    let tel = document.getElementById('editTel').value;
    let firstName = name.split(' ').slice(0, -1).join(' ');
    let lastName = name.split(' ').slice(-1).join(' ');
    let toValid = titleCase(firstName) + titleCase(lastName);
    let initials = toValid.replace(/[^A-Z]/g, '');
    user = {'firstName':titleCase(firstName),'lastName':titleCase(lastName),'email':email,'password':user['password'],'color':user['color'],'phone':tel,'initial':initials};
    users[i]=user;
    await backend.setItem('users', JSON.stringify(users));
    document.getElementById('editContact').classList.toggle('dNone');
    renderContact(i);
    renderLetters();
}

