let users = [];
let tasks = [];
let categorys=[];
let currentUser='';

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
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    getLetters();
    if(c == 'contact'){
        renderLetters();
    }else if(c == 'board'){
        updateHTML();
        renderFullscreenView()
    }else if(c == 'summary'){
        greetUser();
    }
    renderHeadInitials();
}


