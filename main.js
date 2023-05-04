// add the task into table
let add  = document.getElementById("add")
let task = document.getElementById("task")
let output = document.getElementById("output")
let data  ;
if(localStorage.task != null){
    data = JSON.parse(localStorage.task)
}
else{
    data = []
}
add.onclick = function(){
    console.log(task.value)
    newData = {
        title:task.value,
        icon:`<i class="fa-solid fa-check"></i>`,
        delIcon:`<i class="fa-solid fa-delete-left"></i>`
    }
    data.push(newData)
    // save to local storage
    localStorage.setItem("task",JSON.stringify(data))
    // focus on input after add
    task.focus()
    showTasks()
    delAfterAdd()
    disabledDeleteAllBtn()
}
// show tasks
function showTasks(){
    let table = `
          <tr>
            <th>num</th>
            <th>task</th>
            <th>done</th>
            <th>delete</th>
          </tr>
    `
    for(let i =0; i<data.length; i++){
        table += `
          <tr class ="row">
            <td>${i+1}</td>
            <td>${data[i].title.toLowerCase()}</td>
            <td onclick = "checkDone(${i})" class = "checkDone" id = "checkDone"><i class="fa-regular fa-square "></i></td>
            <td onclick = "deleteOne(${i})"   id ="delOne"><i class="fa-solid fa-delete-left"></i></td>
          </tr>
        `
}
output.innerHTML = table
}
showTasks()
// delete one task and show permission
let permission = document.getElementById("permission")
let ok = document.getElementById("ok")
let cancel = document.getElementById("cancel")
permission.style.display = "none"
function deleteOne(i){
    permission.style.display = "block"
    ok.onclick = function okfunc(){
        data.splice(i,1)
        localStorage.task= JSON.stringify (data)
        permission.style.display = "block"
        showTasks()
        disabledDeleteAllBtn()
        permission.style.display = "none"
    }
    cancel.onclick = function cancelfunc(){
        permission.style.display = "none"
        showTasks
    }
}
// delete task value after add it
function delAfterAdd(){
    task.value = ''
}
// delete all task
let deleteAll = document.getElementById("deleteAll")
deleteAll.onclick = function(){
    permission.style.display = "block"
    ok.onclick = function okfunc(){
        data = []
        localStorage.task= JSON.stringify (data)
        permission.style.display = "block"
        showTasks()
        disabledDeleteAllBtn()
        permission.style.display = "none"
    }
    cancel.onclick = function cancelfunc(){
        permission.style.display = "none"
        showTasks
    }
    localStorage.task= JSON.stringify (data)
    showTasks()
    disabledDeleteAllBtn()
}
// disabled delete all btn if no task
function disabledDeleteAllBtn(){
    if(data.length == 0){
        deleteAll.style.display = "none"
    }
    else{
        deleteAll.style.display = "block"
    }
}
disabledDeleteAllBtn()
// check the task that i have done
let lineThrough  = true;
function checkDone(i){
    console.log("check done")
    if( lineThrough){
        console.log("lineThrough")
        document.getElementsByClassName("row")[i].style.textDecoration ="line-through" ;
        document.getElementsByClassName("row")[i].style.textDecorationColor ="green" ;
        document.getElementsByClassName("checkDone")[i].innerHTML = ` <i class="fa-regular fa-square-check"></i>`
        lineThrough = false
    }
    else{
        document.getElementsByClassName("row")[i].style.textDecoration ="none" 
        document.getElementsByClassName("checkDone")[i].innerHTML = ` <i class="fa-regular fa-square"></i>`
        lineThrough = true
    }
}
// disabled add btn if no value enter
add.disabled = true
console.log("disabled")
task.oninput = function(){
    if(task.value == ""){
        add.disabled = true
    }
    else{
        add.disabled = false
    }
}