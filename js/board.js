
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
        generateAssainTos(assignTo);
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

function generateAssainTos(assignTo){
    document.getElementById('boardCardInitials').innerHTML ='';
    for (let t = 0; t < assignTo.length; t++) {
        const position = assignTo[t];
        document.getElementById('boardCardInitials').innerHTML +=`<div class="boardCardAvatar" style="background-color: ${users[position]['color']};">${users[position]['initial']}</div>`;
    }

}
function generateTask(i,title,description,category,prio){
    let prioPic ='';
    if(prio=='hight'){prioPic='assets/icon/prioUrgent.png'}else if(prio=='mid'){prioPic='assets/icon/prioMedium.png'}else{prioPic='assets/icon/prioLow.png'}

    return /*html*/`
    <div class="boardCard" id="${i}" draggable="true" ondragstart="drag(event)">
        <div class="boardCardCategory ${category['categoryColor']}">${category['categoryTitle']}</div>
        <div class="boardCardTitle"><h5>${title}</h5></div>
        <div class="boardCardDiscription">${description}</div>
        <div class="boardCardInitialArea">
          <div id="boardCardInitials" class="boardCardInitials"></div>
          <div class="boardCardPrio"><img src='${prioPic}'></div>
        </div>
      </div>
      `;
}
