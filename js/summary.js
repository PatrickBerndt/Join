function greetUser(){
    let activUser = currentUser['currentUser'];
    if(activUser !== ''){
        let user = users[activUser];
        document.getElementById('greet').innerHTML = getGeetingTime();
        document.getElementById('greetName').innerHTML = `${user['firstName']+' '+user['lastName']}`;
        document.getElementById('greet').innerHTML +=`,`;
    }else{
        document.getElementById('greet').innerHTML = getGeetingTime();
    }
    checkPosition();
}

function getGeetingTime(){
    let today = new Date()
    let currentHour = today.getHours()

    if (currentHour < 5) {
        return `Whoa, early bird`;
    } else if (currentHour < 12) {
        return `Good morning`;
    } else if (currentHour < 18) {
        return `Good afternoon`;
    } else if (currentHour < 22) {
        return `Good evening`;
    } else{
        return `Working late`;
    } 
}

function checkPosition(){
        let inToDo=0;
        let inInProgress=0;
        let inAwaitingFeedback=0;
        let inDone=0;
        let areUrgent=0;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task['position']=='toDo'){inToDo++}
        if(task['position']=='inProgress'){inInProgress++}
        if(task['position']=='feedback'){inAwaitingFeedback++}
        if(task['position']=='done'){inDone++}
        if(task['prio']=='high'){areUrgent++}
    }
    renderNumbersSummary(inToDo,inInProgress,inAwaitingFeedback,inDone,areUrgent);
    getDeadline();
}

function getDeadline(){
    let datesToSort = [];
    const d = new Date();
    let year = d.getFullYear();
    let month = ('0'+(d.getMonth()+1)).slice(-2);
    let day = ('0'+d.getDate()).slice(-2);
    let currentDate = (year+'-'+ month +`-`+ day)
    for (let d = 0; d < tasks.length; d++) {
        const task = tasks[d];
        datesToSort.push(task['dueDate']);
    }
    datesToSort.sort();
    while(datesToSort[0] < currentDate ){
        datesToSort = datesToSort.slice(1);
    }
    if(datesToSort != []){
       document.getElementById('upcomingDeadline').innerHTML =`${datesToSort[0]}`; 
    }else{
        document.getElementById('upcomingDeadline').innerHTML =`No`; 
    }
}
