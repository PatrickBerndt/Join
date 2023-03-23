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

/** this function checks if there is somthing to check for */
async function sonethingToCheck(edit){
     if(edit != undefined){
       if(document.getElementById(`isChecked${0}`) != null){
       await isChecked(); 
        }else{
            assignToList = tasks[edit]['assingTo'];
        } 
    }else{
        await isChecked();
    }
}

/** this function reads the values out of the add taks form and save it to the backend */
async function addTask(edit){
    if(taskPriority.length != 0){
        
        await sonethingToCheck(edit);
        let title = document.getElementById('enterTitleInput').value;
        let dueDate = document.getElementById('dueDate').value;
        let category = categorys[selectedCategorys];
        
            
      
        let description = document.getElementById('description').value;
        if(edit != undefined){
            pos = tasks[edit]['position'];
            if(category == undefined){
                   category = tasks[edit]['category']; 
            }
        }else{
        pos = 'toDo';
        }
        if(category == undefined){
           showAlert('category'); 
        }else{
            let task = {'title':title,'assingTo':assignToList,'dueDate':dueDate,'category':category,'prio':taskPriority,'description':description,'subtask':subTasks,'position':pos,};
            saveAddTask(edit,task);   
        }
    }else{
        showAlert('prio');
    }
}

/** this function point for 2 seconds at the input what is missing */
function showAlert(pos){
    if(pos == 'prio'){
    document.getElementById('high').classList.add('wiggle');
    document.getElementById('mid').classList.add('wiggle');
    document.getElementById('low').classList.add('wiggle');
    setTimeout(() => {
        document.getElementById('high').classList.remove('wiggle');
        document.getElementById('mid').classList.remove('wiggle');
        document.getElementById('low').classList.remove('wiggle');
    }, 2000); }
    if(pos == 'category'){
        document.getElementById('addCategory').classList.add('wiggle');
        setTimeout(() => {
            document.getElementById('addCategory').classList.remove('wiggle'); 
        }, 2000);
        return false;
    }
}

/** this function saves the task to the backend */
async function saveAddTask(edit,task){
    if(edit != undefined){
        tasks[edit] = task;
    }else{
        tasks.push(task);    
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
    window.open("board.html", "_self")
}

/** this function reads the state of the checkboxes in the assign to section and returns to the addTask function */
function isChecked(){
    if(document.getElementById('isChecked0') != null){
        for (let d = 0; d < users.length; d++) {
            if(document.getElementById(`isChecked${d}`).checked){
                assignToList.push(d);
            }
        }
        return;   
    }
    
}

/** this function removes from all categories the highlight and highlights the one that is selectet and return the position in selectedCategotys */
function addCategory(i){
    for (let c = 0; c < categorys.length; c++) {
        document.getElementById(`cat${c}`).classList.remove('colorActiv');
    }
    document.getElementById(`cat${i}`).classList.add('colorActiv');
    selectedCategorys=i;
    document.getElementById('addCategoryText').innerHTML=/*html*/`
        ${categorys[i]['categoryTitle']} <div class="singleColor ${categorys[i]['categoryColor']}"></div>
    `;
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
function addSubToList(x){
    let subTask = document.getElementById('addSubToList').value;
    let subtaskPack = {'subTask':subTask, 'isChecked':false}
    subTasks.push(subtaskPack);
    document.getElementById('addSubToList').value = '';
    if(x == 'edit'){
        renderOverlaySubTask();
    }else{
        renderSubTask();  
    }
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