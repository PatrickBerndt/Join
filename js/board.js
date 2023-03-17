/** this function toggels the Fullscreen view for the tasks on the board */
function toggleOverlay(i){
    document.getElementById('overlay').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
    renderFullscreenView(i);
}

/** this function is for switching between the fullscreen view and the edit view  */
function toggleOverlaySwitch(i){
    document.getElementById('overlayEdit').classList.toggle('dNone');
    document.getElementById('overlay').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
    renderFullscreenEdit(i);
}

/** this finction closes the edit view */
function toggleOverlayEdit(){
    document.getElementById('overlayEdit').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
}

/** this function filters all tasks by a search value */
function filterTasks(){
    search = document.getElementById('searchBox').value;
    results = tasks.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if(results.length != 0){
        targetArray = results;
     }else{
         targetArray = tasks;
     }
    updateHTML(targetArray);
   
}

/** this function wipes at first the whole area to place the tasks on the board
 * then it reads the single varables from the tasks array to hand it over to
 * the generateTask and the generateAssainTos funtion to genetate the HTML  
 */
function updateHTML(targetArray){
    
    wipeDragArea();
    for (let i = 0; i < targetArray.length; i++) {
        const task = targetArray[i];
        let title = task['title'];
        let assignTo = task['assingTo'];
        let description = task['description'];
        let category = task['category'];
        let prio = task['prio']
        let pos = task['position']
        document.getElementById(pos).innerHTML += generateTask(i,title,description,category,prio);
        generateAssainTos(i,assignTo);
        renderProgressbar(i,task);
    }
}

/** this function renders a progressbar if any subtasks are present */
function renderProgressbar(i,task){
    if(task['subtask'].length != 0 ){
        let subLength = task['subtask'].length;
        let subAreChecked = 0;
        for (let i = 0; i < task['subtask'].length; i++) {
            const sub = task['subtask'][i];
            if(sub['isChecked']){
                subAreChecked++;
            }
        }
        let subWidth = (100/subLength)*subAreChecked;
        document.getElementById(`progress${i}`).classList.remove('dNone')
        document.getElementById(`progress${i}`).innerHTML=generateProgressbar(subLength,subAreChecked,subWidth);
    }
}

/** this function is checking if a subtask is checked and saves it */
async function subtaskIsChecked(i,s){
    let task = tasks[i];
    if(document.getElementById(`${i}${s}`).checked){
        tasks[i]['subtask'][s]['isChecked'] = true;        
    }else{
        tasks[i]['subtask'][s]['isChecked'] = false;   
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
    renderProgressbar(i,task)
}

/** this function is pushing the stored information from the JSON into the fullscreen edit view as values */
function renderFullscreenEdit(i){
    generateOverlyEditView(i);
    let task = tasks[i];
    document.getElementById('enterTitleInput').value = task['title'];
    let assignTo = task['assingTo'];
    document.getElementById('description').value = task['description'];
    let category = task['category'];
    document.getElementById('dueDate').value = task['dueDate'];
    let prio = task['prio'];
    setPrio(prio);
}

/** this function highlights the catrgory witch is saved */
function categorieIsChecked(i){
    let task = tasks[i];
    for (let c = 0; c < categorys.length; c++) {
        const category = categorys[c];
        if(category['categoryTitle'] == task['category']['categoryTitle']){
            document.getElementById(`cat${c}`).classList.add('colorActiv');
        }
    }
}

/** this function checks the assign to checkboxes witch are saved */
function assignToIsChecked(i){
    let task = tasks[i];
    for (let a = 0; a < task['assingTo'].length; a++) {
        const pos = task['assingTo'][a];
        document.getElementById(`isChecked${pos}`).checked = true;
    }
}

/** this function is rendering the detail view for the tasks on the board.
 * It reads the information form the JSON to hand it over to the generateFullscreenView function 
 * to generate the HTML code .
 * It also calls two more functions to generate the subtasks and the assaintos for the detail view
  */
async function renderFullscreenView(i){
        let task = tasks[i];
        let title = task['title'];
        let assignTo = task['assingTo'];
        let description = task['description'];
        let category = task['category'];
        let dueDate = task['dueDate'];
        let prio = task['prio'];
        let subTasks = task['subtask'];
        
        await getPrioType(prio);
        document.getElementById('overlayCard').innerHTML = generateFullscreenView(i,title,description,category,dueDate,prioType,prio,prioPic,);
        generateAssainTosOverlay(i,assignTo);
        generateSubtaskOverlay(i,subTasks);
       
}

/** this function are sets the text and the img source for the prio button on the detail view */
function getPrioType(prio){
    if(prio=='high'){
        prioPic='assets/icon/prioUrgent.png'; 
        prioType = 'Urgent';
    }else if(prio=='mid'){
            prioPic='./assets/icon/prioMedium.png'
            prioType = 'Medium';
    }else if(prio == 'low'){
        prioPic='assets/icon/prioLow.png'
        prioType = 'Low';
    }else{
        prioPic ='';
    }
    return 
}


/** this function generates the subtasks on the detail view */
function generateSubtaskOverlay(i,subTasks){
    document.getElementById('overlaySubtasks').innerHTML ='';
    for (let s = 0; s < subTasks.length; s++) {
        const subTask = subTasks[s];
        document.getElementById('overlaySubtasks').innerHTML +=/*html*/`
           <div class="singleSubTask"><input type="checkbox" id="${i}${s}" onclick="subtaskIsChecked(${i},${s})"><h5>${subTask['subTask']}</h5></div> 
        `;
    }
    setChecked(i,subTasks)
}

/** this function sets checkboxes to checked if so */
function setChecked(i,subTasks){
    for (let s = 0; s < subTasks.length; s++) {
        const subTask = subTasks[s];
        if(subTask['isChecked']){
            document.getElementById(`${i}${s}`).checked = true;
        }
    }
}

/** this function deletes all tasks form the board befor it creates new ones */
function wipeDragArea(){
    document.getElementById('toDo').innerHTML='';
    document.getElementById('inProgress').innerHTML='';
    document.getElementById('feedback').innerHTML='';
    document.getElementById('done').innerHTML='';
}

/** the next three functions are from w3schools and handle the drag and drop magic */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let position = ev.target.id;
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    savePosition(data,position);
}


/** this function saves the position the task is droped on to the task itself for later placement on the board */
async function savePosition(i,pos){
    tasks[i]['position'] = pos;
    await backend.setItem('tasks', JSON.stringify(tasks));
}

