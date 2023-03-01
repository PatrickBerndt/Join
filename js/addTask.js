let subTasks = [];
let assignToList =[];

function toggleAssign(){
    document.getElementById('assignToContent').classList.toggle('dNone');
    listAssignTo();
}




function addTask(){
    let title = document.getElementById('enterTitleInput').value;
    let assingTo = document.getElementById('contactEmail').value;
    let dueDate = document.getElementById('dueDate').value;
    let category = document.getElementById('contactTel').value;
    let prio = document.getElementById('contactTel').value;
    let description = document.getElementById('description').value;
    let subtask = document.getElementById('contactTel').value;
    let task = {'title':title,'assingTo':assingTo,'dueDate':dueDate,'date':date,'category':category,'prio':prio,'description':description,'subtask':subtask,'position':position,};
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