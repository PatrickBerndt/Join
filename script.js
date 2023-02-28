let users = [];
let tasks = [];


function stopAmimation(){
    setTimeout(animation,550);
}

function animation(){
    document.getElementById('animation').classList.add('dNone')
}

async function init(c) {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    getLetters();
    if(c == 'contact'){
        initContacts()
    }
    renderHeadInitials()
}

function initContacts(){
  renderLetters();
}

