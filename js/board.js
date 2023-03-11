function toggleOverlay(i){
    document.getElementById('overlay').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
    renderFullscreenView(i);
}

function toggleOverlaySwitch(i){
    document.getElementById('overlayEdit').classList.toggle('dNone');
    document.getElementById('overlay').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
}
function toggleOverlayEdit(i){
    document.getElementById('overlayEdit').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
}
function updateHTML(){
    wipeDragArea();

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let title = task['title'];
        let assignTo = task['assingTo'];
        let description = task['description'];
        let category = task['category'];
        let prio = task['prio']
        let pos = task['position']
        document.getElementById(pos).innerHTML += generateTask(i,title,description,category,prio);
        generateAssainTos(i,assignTo);
    }
}

function renderFullscreenEdit(){
    let i =0;
    let task = tasks[i];
    document.getElementById('enterTitleInput').value = task['title'];
    let assignTo = task['assingTo'];
    document.getElementById('description').value = task['description'];
    let category = task['category'];
    document.getElementById('dueDate').value = task['dueDate'];
    let prio = task['prio'];
    let subTasks = task['subtask'];
    
}

function renderFullscreenView(i){
        let task = tasks[i];
        let title = task['title'];
        let assignTo = task['assingTo'];
        let description = task['description'];
        let category = task['category'];
        let dueDate = task['dueDate'];
        let prio = task['prio'];
        let subTasks = task['subtask'];
        let prioPic ='';
        getPrioType(prio);
        document.getElementById('overlayCard').innerHTML = generateFullscreenView(title,description,category,dueDate,prioType,prio,prioPic,);
        generateAssainTosOverlay(i,assignTo);
        generateSubtaskOverlay(i,subTasks);
}

function getPrioType(prio){
    if(prio=='high'){
        prioPic='assets/icon/prioUrgent.png'; 
        prioType = 'Urgent';
    }else if(prio=='mid'){
            prioPic='assets/icon/prioMedium.png'
            prioType = 'Medium';
    }else{
        prioPic='assets/icon/prioLow.png'
        prioType = 'Low';
    }
    return 
}

function generateSubtaskOverlay(i,subTasks){
    document.getElementById('overlaySubtasks').innerHTML ='';
    for (let s = 0; s < subTasks.length; s++) {
        const subTask = subTasks[s];
        document.getElementById('overlaySubtasks').innerHTML +=/*html*/`
           <div class="singleSubTask"><input type="checkbox" id="${i}${s}"><h5>${subTask}</h5></div> 
        `;
    }
}

function wipeDragArea(){
    document.getElementById('toDo').innerHTML='';
    document.getElementById('inProgress').innerHTML='';
    document.getElementById('feedback').innerHTML='';
    document.getElementById('done').innerHTML='';
}

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

async function save(){
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function savePosition(i,pos){
    tasks[i]['position'] = pos;
    save();
}

