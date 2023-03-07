function toggleOverlay(i){
    document.getElementById('overlay').classList.toggle('dNone');
    document.getElementById('overlayCard').innerHTML='';
    renderFullscreenView(i);

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

        document.getElementById('overlayCard').innerHTML +=/*html*/`
            <img class="overlayCardClose" src="assets/icon/clear.png" onclick="toggleOverlay()">
            <img class="overlayCardEdit" src="assets/icon/editButton.png" onclick="toggleOverlay()">
            <div class="overlayCardCategory ${category['categoryColor']}">${category['categoryTitle']}</div>
            <div class="overlayCardTitle"><h5>${title}</h5></div>
            <div class="overlayCardDiscription">${description}</div>
            <div class="overlayCardDueDate"> <div><b>Due date:</b></div> <div>${dueDate}</div> </div>
            <div class="overlayPrio"><div><b>Priority:</b></div><div class="overlayCardPrio ${prio}"> <div>${prioType}</div> <img src='${prioPic}'></div></div>
            <div id="overlaySubtasks" class="overlaySubtasks"></div>
            <div><b>Assigned To:</b></div>
            <div id="overlayCardInitials" class="overlayCardInitialArea">
            </div>
        `;
        document.getElementById('overlaySubtasks').innerHTML ='';
        for (let s = 0; s < subTasks.length; s++) {
            const subTask = subTasks[s];
            document.getElementById('overlaySubtasks').innerHTML +=/*html*/`
               <div class="singleSubTask"><input type="checkbox" id="${i}${s}"><h5>${subTask}</h5></div> 
            `;
        }
        generateAssainTosOverlay(i,assignTo)
        
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

