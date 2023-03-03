let subTasks =[];
let assignToList =[];
let colors =['lightblue', 'lightred', 'lightgreen', 'lightorange', 'lightpurple', 'lightgray'];
let activColor ='';
let selectedCategorys ='';
let taskPriority =[];

function toggleAssign(){
    document.getElementById('assignToContent').classList.toggle('dNone');
    document.getElementById('assignToImg').classList.toggle('flip');
    listAssignTo();
}
function toggleCategory(){
    document.getElementById('addCategoryContent').classList.toggle('dNone');
    document.getElementById('addCategoryImg').classList.toggle('flip');
    listCategory();
}




async function addTask(){
    await isChecked();
    let title = document.getElementById('enterTitleInput').value;
    let dueDate = document.getElementById('dueDate').value;
    let category = categorys[selectedCategorys];
    let description = document.getElementById('description').value;
    let date = new Date;
    let task = {'title':title,'assingTo':assignToList,'dueDate':dueDate,'date':date,'category':category,'prio':taskPriority,'description':description,'subtask':subTasks,'position':'',};
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    window.open("board.html", "_self")
}

function isChecked(){
    for (let d = 0; d < users.length; d++) {
        if(document.getElementById(`isChecked${d}`).checked){
            assignToList.push(d);
        }
    }
    return;
}

function addCategory(i){
    for (let c = 0; c < categorys.length; c++) {
        document.getElementById(`cat${c}`).classList.remove('colorActiv');
    }
    document.getElementById(`cat${i}`).classList.add('colorActiv');
    selectedCategorys=i;
}

function callNewCategory(){
    document.getElementById('addCategoryContent').innerHTML ='';
    document.getElementById('addCategoryContent').innerHTML = /*html*/`
        <div class="listNewCategory"><input id="newCatInput" class="newCatInput" placeholder="Enter new category" > <img onclick="listCategory()" src="assets/icon/blue-cross.png">|<img onclick="addNewCategory()" src="assets/icon/blue-check.png"></div>
        <div id="colorPallet" class="colorPallet"> 
        </div>
        `;
        renderCategoryColors();
}

function renderCategoryColors(){
    document.getElementById('colorPallet').innerHTML ='';
    for (let i = 0; i < colors.length; i++) {
        document.getElementById('colorPallet').innerHTML +=/*html*/`
            <div id="color${i}" class="singleColor ${colors[i]} " onclick="pickActivColor(${i})"></div>
        `;
    }
}

function pickActivColor(i){
    for (let c = 0; c < colors.length; c++) {
        document.getElementById(`color${c}`).classList.remove('colorActiv');
    }
    document.getElementById(`color${i}`).classList.add('colorActiv');
    activColor = i;
}

async function addNewCategory(){
    let categoryTitle = document.getElementById('newCatInput').value;
    let categoryColor = colors[activColor];
    category = {'categoryTitle':categoryTitle,'categoryColor':categoryColor};
    categorys.push(category);
    await backend.setItem('categorys', JSON.stringify(categorys));
    listCategory();
}

function listAssignTo(){
    document.getElementById('assignToContent').innerHTML ='';
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById('assignToContent').innerHTML += /*html*/`
        <div class="listAssign"><div>${user['firstName']+' '+user['lastName']}</div><input type="checkbox" name="" id="isChecked${i}"></div>
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
        <div id="cat${i}" onclick="addCategory(${i})" class="listAssign"><div>${category['categoryTitle']}</div><div class="singleColor ${category['categoryColor']}"></div></div>
        `;
    }
}

function setPrio(prio){
    taskPriority = prio;
    setIsActiv();
}

function  setIsActiv(){
    document.getElementById('high').classList.remove('activ')
    document.getElementById('mid').classList.remove('activ')
    document.getElementById('low').classList.remove('activ')
    if(taskPriority == 'high'){
        document.getElementById('high').classList.add('activ')
    }else if(taskPriority == 'mid'){
        document.getElementById('mid').classList.add('activ')
    }else if(taskPriority == 'low'){
        document.getElementById('low').classList.add('activ')
    }
}

function addSubToList(){
    let subTask = document.getElementById('addSubToList').value;
    subTasks.push(subTask);
    document.getElementById('addSubToList').value = '';
    renderSubTask();
}

function renderSubTask(){
    document.getElementById('addedSubtask').innerHTML='';
    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        document.getElementById('addedSubtask').innerHTML +=/*html*/`
        <ul>${subTask}</ul>
        `;
    }
}