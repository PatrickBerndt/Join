/** this function toggle the assign to dropdown menu on the add task page */
function toggleAssign(i){
    document.getElementById('assignToContent').classList.toggle('dNone');
    document.getElementById('assignToImg').classList.toggle('flip');
    listAssignTo();
    if(i != undefined){
         assignToIsChecked(i);
    }
}

/** this function toggle the categoty dropdown menu on the add task page */
function toggleCategory(i){
    document.getElementById('addCategoryContent').classList.toggle('dNone');
    document.getElementById('addCategoryImg').classList.toggle('flip');
    listCategory();
    if(i != undefined){
    categorieIsChecked(i);
    }
}

/** this function reads the values out of the add taks form and save it to the backend */
async function addTask(){
    await isChecked();
    let title = document.getElementById('enterTitleInput').value;
    let dueDate = document.getElementById('dueDate').value;
    let category = categorys[selectedCategorys];
    let description = document.getElementById('description').value;
    let task = {'title':title,'assingTo':assignToList,'dueDate':dueDate,'category':category,'prio':taskPriority,'description':description,'subtask':subTasks,'position':'toDo',};
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    window.open("board.html", "_self")
}

/** this function reads the state of the checkboxes in the assign to section and returns to the addTask function */
function isChecked(){
    for (let d = 0; d < users.length; d++) {
        if(document.getElementById(`isChecked${d}`).checked){
            assignToList.push(d);
        }
    }
    return;
}

/** this function removes from all categories the highlight and highlights the one that is selectet and return the position in selectedCategotys */
function addCategory(i){
    for (let c = 0; c < categorys.length; c++) {
        document.getElementById(`cat${c}`).classList.remove('colorActiv');
    }
    document.getElementById(`cat${i}`).classList.add('colorActiv');
    selectedCategorys=i;
}

/** this function is the input to creat a new category */
function callNewCategory(){
    document.getElementById('addCategoryContent').innerHTML ='';
    document.getElementById('addCategoryContent').innerHTML = /*html*/`
        <div class="listNewCategory"><input id="newCatInput" class="newCatInput" placeholder="Enter new category" > <img onclick="listCategory()" src="assets/icon/blue-cross.png">|<img onclick="addNewCategory()" src="assets/icon/blue-check.png"></div>
        <div id="colorPallet" class="colorPallet"> 
        </div>
        `;
        renderCategoryColors();
}

/** this function creata the collors for a new category to choose from */
function renderCategoryColors(){
    document.getElementById('colorPallet').innerHTML ='';
    for (let i = 0; i < colors.length; i++) {
        document.getElementById('colorPallet').innerHTML +=/*html*/`
            <div id="color${i}" class="singleColor ${colors[i]} " onclick="pickActivColor(${i})"></div>
        `;
    }
}

/** this function is for picking a color for a new category */
function pickActivColor(i){
    for (let c = 0; c < colors.length; c++) {
        document.getElementById(`color${c}`).classList.remove('colorActiv');
    }
    document.getElementById(`color${i}`).classList.add('colorActiv');
    activColor = i;
}

/** this function creats a new category with title and color  */
async function addNewCategory(){
    let categoryTitle = document.getElementById('newCatInput').value;
    let categoryColor = colors[activColor];
    category = {'categoryTitle':categoryTitle,'categoryColor':categoryColor};
    categorys.push(category);
    await backend.setItem('categorys', JSON.stringify(categorys));
    listCategory();
}

/** this function lists all contacts to choose from to assigning to a task */
function listAssignTo(){
    document.getElementById('assignToContent').innerHTML ='';
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById('assignToContent').innerHTML += /*html*/`
        <div class="listAssign"><div>${user['firstName']+' '+user['lastName']}</div><input type="checkbox" name="" id="isChecked${i}"></div>
        `;
    }
}

/** this function lists all categiries to choose from , the first entry is allways "New category" */
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

/** this function is getting the prio form the pushed button and sets the highlight accordingly */
function  setPrio(prio){
    document.getElementById('high').classList.remove('activ');
    document.getElementById('mid').classList.remove('activ');
    document.getElementById('low').classList.remove('activ');
     taskPriority = prio;
    if(prio == 'high'){
        document.getElementById('high').classList.add('activ');
    }else if(prio == 'mid'){
        document.getElementById('mid').classList.add('activ');
    }else if(prio == 'low'){
        document.getElementById('low').classList.add('activ');
    }
}

/** this function saves a new subtask to the subtask list */
function addSubToList(){
    let subTask = document.getElementById('addSubToList').value;
    let subtaskPack = {'subTask':subTask, 'isChecked':false}
    subTasks.push(subtaskPack);
    document.getElementById('addSubToList').value = '';
    renderSubTask();
}

/** this function is rendering the subtasklist into the add task form */
function renderSubTask(){
    document.getElementById('addedSubtask').innerHTML='';
    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        document.getElementById('addedSubtask').innerHTML +=/*html*/`
        <ul>${subTask['subTask']}</ul>
        `;
    }
}