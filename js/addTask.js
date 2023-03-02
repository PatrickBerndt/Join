let subTasks = [];
let assignToList =[];
let categorys=[];
let colors =['lightblue', 'lightred', 'lightgreen', 'lightorange', 'lightpurple', 'lightgray'];
let taskPriority =[];

function toggleAssign(){
    document.getElementById('assignToContent').classList.toggle('dNone');
    listAssignTo();
}
function toggleCategory(){
    document.getElementById('addCategoryContent').classList.toggle('dNone');
    listCategory();
}




function addTask(){
    let title = document.getElementById('enterTitleInput').value;
    let assingTo = document.getElementById('contactEmail').value;
    let dueDate = document.getElementById('dueDate').value;
    let category = document.getElementById('contactTel').value;
    let description = document.getElementById('description').value;
    let subtask = document.getElementById('contactTel').value;
    let task = {'title':title,'assingTo':assingTo,'dueDate':dueDate,'date':date,'category':category,'prio':taskPriority,'description':description,'subtask':subtask,'position':position,};
}

function addCategory(){

}

function callNewCategory(){
    document.getElementById('addCategoryContent').innerHTML ='';
    document.getElementById('addCategoryContent').innerHTML = /*html*/`
        <div class="listNewCategory"><input class="newCatInput" placeholder="Enter new category" > <img onclick="listCategory()" src="assets/icon/blue-cross.png">|<img onclick="addNewCategory()" src="assets/icon/blue-check.png"></div>
        <div id="colorPallet" class="colorPallet"> 
            
        </div>
        `;
        renderCategoryColors();
}

function renderCategoryColors(){
    document.getElementById('colorPallet').innerHTML ='';
    for (let i = 0; i < colors.length; i++) {
        document.getElementById('colorPallet').innerHTML +=/*html*/`
            <div id="color${i}" class="singleColor ${colors[i]}"></div>
        `;
        
    }
}

function addNewCategory(){

}

function listAssignTo(){
    document.getElementById('assignToContent').innerHTML ='';
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById('assignToContent').innerHTML += /*html*/`
        <div class="listAssign"><div>${user['firstName']+' '+user['lastName']}</div><input type="checkbox" name="" id=""></div>
        `;
    }
}

function listCategory(){
    document.getElementById('addCategoryContent').innerHTML ='';
    document.getElementById('addCategoryContent').innerHTML = /*html*/`
        <div class="listAssign"><div class="newCat" onclick="callNewCategory()"> New category </div></div>`;
    for (let i = 0; i < categorys.length; i++) {
        const category = categorys[i];
        document.getElementById('addCategoryContent').innerHTML += /*html*/`
        <div class="listAssign"><div>${category['category']}</div><div>${category['color']}</div></div>
        `;
    }
}

function setPrio(prio){
    taskPriority = prio;
    setIsActiv();
}

function  setIsActiv(){
    if(taskPriority == 'high'){
        document.getElementById('high').classList.add('activ')
        document.getElementById('mid').classList.remove('activ')
        document.getElementById('low').classList.remove('activ')
    }
    if(taskPriority == 'mid'){
        document.getElementById('mid').classList.add('activ')
        document.getElementById('low').classList.remove('activ')
        document.getElementById('high').classList.remove('activ')
    }
    if(taskPriority == 'low'){
        document.getElementById('low').classList.add('activ')
        document.getElementById('mid').classList.remove('activ')
        document.getElementById('high').classList.remove('activ')
    }
}