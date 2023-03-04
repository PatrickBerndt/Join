let users = [];
let tasks = [];
let categorys=[];

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
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    getLetters();
    if(c == 'contact'){
        initContacts()
    }else if(c == 'board'){
        updateHTML();
    }
    /*renderHeadInitials()*/
}

function initContacts(){
  renderLetters();
}

