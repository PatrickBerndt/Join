/** This are all the varables thay are used globaly */
let users = [];
let tasks = [];
let categorys=[];
let currentUser='';
let letters = [];
let subTasks =[];
let assignToList =[];
let colors =['lightblue', 'lightred', 'lightgreen', 'lightorange', 'lightpurple', 'lightgray'];
let activColor ='';
let selectedCategorys ='';
let taskPriority =[];

/** This two functions are used to stop the start animation */
function stopAmimation(){
    setTimeout(animation,1000);
}

function animation(){
    document.getElementById('animation').classList.add('dNone')
}

/** in this function i load and split the JSON from the mini backend in the different parts for later use */
async function init(c) {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    subTaskIsChecked = JSON.parse(backend.getItem('subTaskIsChecked')) || [];

    pageInit(c);
}

/** this function is for initialize the under pages that no error is thown in the console if they are not in use */
function pageInit(c){
    getLetters();
    if(c == 'contact'){
        renderLetters();
    }else if(c == 'board'){
        updateHTML();
        renderFullscreenEdit();
    }else if(c == 'summary'){
        greetUser();
    }
    renderHeadInitials();
}

