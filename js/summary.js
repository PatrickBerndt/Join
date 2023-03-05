function greetUser(){
    let activUser = currentUser['currentUser'];
    if(activUser !== ''){
        let user = users[activUser];
        document.getElementById('greet').innerHTML = getGeetingTime();
        document.getElementById('greetName').innerHTML = `, ${user['firstName']+' '+user['lastName']}`;

    }else{
        document.getElementById('greet').innerHTML = getGeetingTime();
    }
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