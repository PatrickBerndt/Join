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
let results =[];
let addFromContact ='';

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
async function pageInit(c){
    
    if(c == 'contact'){
        await getLetters();
        renderLetters();
    }else if(c == 'board'){
        updateHTML(tasks);
        renderFullscreenEdit();
    }else if(c == 'summary'){
        if(animate == 'play'){greetAnimation()};
        greetUser();
    }else if(c == 'addTask'){
        checkAddFromContact();
    }
    if(document.getElementById('dueDate') != undefined){
        dateRestrict();
    }
    if(document.getElementById('initialHeader') != undefined){
         renderHeadInitials();
    }
        notificationBubble()
}

/** this funcion restricts the date so you can´t pick dates in the past */
function dateRestrict(){
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    let maxDate = year + '-' + month + '-' + day;    
    document.getElementById('dueDate').setAttribute('min', maxDate);
}

