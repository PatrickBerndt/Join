
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

