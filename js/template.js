function contactTemplateShort(i,email,firstName,lastName,initials,color){
    return /*html*/`
    <div class="contactBox" id="contactBox${i}" onclick="renderContact(${i})" >
    <div class="avatar" style="background-color:${color};">${initials}</div>
    <div class="contact">
        <h4>${firstName + ' ' + lastName}</h4>
        <a href="#">${email}</a>
    </div>
    </div>`;
}

function contactTemplateLong(i,tel,email,firstName,lastName,initials,color){
    return /*html*/`
    <div class="contactHeadBox">
            <div class="avatarBoxFull" style="background-color: ${color};" onclick="addTask()">${initials}</div>
            <div class="contactFullHead">
                <h2>${firstName + ' ' + lastName}</h2>
                <p><img src="assets/icon/addButton.png">Add Task</p>
            </div>
        </div>
        <div class="contactInfo">
            <h3>Contact Information</h3>
            <p onclick="toggleEditContact(${i})"><img src="assets/icon/editBlue.png">Edit Contact</p>
        </div>
        <div class="infoContent">
            <h4>E-Mail</h4>
            <a href="mailto:${email}">${email}</a>
            <h4>Phone</h4>
            <span>(+49) ${tel}</span>
        </div>
    `;
}

function editBoxTemplate(i,tel,firstName,lastName,email,initial,color){
    return /*html*/`
    <div class="newContactBox" id="editContentBox" onclick="event.stopPropagation()" >
        <div class="newContactHead">
            <img onclick="toggleEditContact()" class="closeTag" src="assets/icon/closeWhite.png">
            <img src="assets/icon/logoSmallWhite.png">
            <h3>Edit contact</h3>
        </div>
        <form onsubmit="saveEdit(${i});return false;" class="addNewInputBox">
            <div class="avatarBoxFull" style="background-color: ${color}; margin-top: 30px; margin-right:0;" id="avatarBox">
                ${initial}
            </div>
            <input id="editName" value="${firstName + ' ' + lastName}" type="text" placeholder="Name" required  style="background-image:  url(assets/icon/name.png); background-repeat: no-repeat; background-position: center right 14px;">
            <input id="editEmail" value="${email}" type="email" placeholder="E-Mail" required style="background-image:  url(assets/icon/email.png); background-repeat: no-repeat; background-position: center right 14px;">
            <input id="editTel" value="${tel}" type="tel" placeholder="Phone" required style="background-image:  url(assets/icon/phone.png); background-repeat: no-repeat; background-position: center right 14px;">
            <button class="btn" type="submit">Save</button>
        </form>
    </div>
    `;
}

function generateAssainTos(i,assignTo){
    document.getElementById(`boardCardInitials${i}`).innerHTML ='';
    for (let t = 0; t < assignTo.length; t++) {
        const position = assignTo[t];
        document.getElementById(`boardCardInitials${i}`).innerHTML +=`<div class="boardCardAvatar" style="background-color: ${users[position]['color']};">${users[position]['initial']}</div>`;
    }
}

function generateAssainTosOverlay(i,assignTo){
    document.getElementById(`overlayCardInitials`).innerHTML ='';
    for (let t = 0; t < assignTo.length; t++) {
        const position = assignTo[t];
        document.getElementById(`overlayCardInitials`).innerHTML +=/*html*/`
        <div class="overlayCardInitials">
        <div class="overlayCardAvatar" style="background-color: ${users[position]['color']};">${users[position]['initial']}</div>
        <div class="overlayCardName">${users[position]['firstName']+' '+users[position]['lastName']}</div>        
        </div>
        `;
    }
}

function generateTask(i,title,description,category,prio){
    let prioPic ='';
    if(prio=='high'){prioPic='assets/icon/prioUrgent.png'}else if(prio=='mid'){prioPic='assets/icon/prioMedium.png'}else{prioPic='assets/icon/prioLow.png'}
    return /*html*/`
    <div class="boardCard" id="${i}" draggable="true" ondragstart="drag(event)" ondrop="event.stopPropagation()" onclick="toggleOverlay(${i})">
        <div class="boardCardCategory ${category['categoryColor']}">${category['categoryTitle']}</div>
        <div class="boardCardTitle"><h5>${title}</h5></div>
        <div class="boardCardDiscription">${description}</div>
        <div id="progress${i}" class="progress dNone"></div>
        <div class="boardCardInitialArea">
          <div id="boardCardInitials${i}" class="boardCardInitials"></div>
          <div class="boardCardPrio"><img src='${prioPic}'></div>
        </div>
      </div>
      `;
}

function generateProgressbar(subLength,subAreChecked,subWidth){
    return /*html*/`
    <div id="subtaskProgress"><div id="subtaskBar" style="width:${subWidth}% !important;"></div></div><div class="progressText">${subAreChecked}/${subLength} Done</div> 
    `;
}

function renderNumbersSummary(inToDo,inInProgress,inAwaitingFeedback,inDone,areUrgent){
    document.getElementById('tasksOnBoard').innerHTML =`${tasks.length}`;
    document.getElementById('summaryTodo').innerHTML =`${inToDo}`;
    document.getElementById('tasksInProgress').innerHTML =`${inInProgress}`;
    document.getElementById('tasksInFeedback').innerHTML =`${inAwaitingFeedback}`;
    document.getElementById('tasksDone').innerHTML =`${inDone}`;
    document.getElementById('tasksUrgent').innerHTML =`${areUrgent}`;
}

function generateFullscreenView(title,description,category,dueDate,prioType,prio,prioPic,){
    return /*html*/`
    <div class="innerContentBoxOverlay">
        <img class="overlayCardClose" src="assets/icon/clear.png" onclick="toggleOverlay()">
        <img class="overlayCardEdit" src="assets/icon/editButton.png" onclick="toggleOverlaySwitch()">
        <div class="overlayCardCategory ${category['categoryColor']}">${category['categoryTitle']}</div>
        <div class="overlayCardTitle"><h5>${title}</h5></div>
        <div class="overlayCardDiscription">${description}</div>
        <div class="overlayCardDueDate"> <div><b>Due date:</b></div> <div>${dueDate}</div> </div>
        <div class="overlayPrio"><div><b>Priority:</b></div><div class="overlayCardPrio ${prio}"> <div>${prioType}</div> <img src='${prioPic}'></div></div>
        <div id="overlaySubtasks" class="overlaySubtasks"></div>
        <div><b>Assigned To:</b></div>
        <div id="overlayCardInitials" class="overlayCardInitialArea">
        </div>
    </div>
    `;
}