function updateClock(){

let now = new Date()

let time = now.toLocaleTimeString()
let date = now.toDateString()

document.getElementById("clock").innerText = time
document.getElementById("date").innerText = date

}

setInterval(updateClock,1000)

function greeting(){

let hour = new Date().getHours()

let text = ""

if(hour < 12){
text = "Good Morning"
}
else if(hour < 18){
text = "Good Afternoon"
}
else{
text = "Good Evening"
}

document.getElementById("greeting").innerText = text

}

greeting()

let time = 1500
let timer

function updateTimer(){

let minutes = Math.floor(time / 60)
let seconds = time % 60

document.getElementById("timer").innerText =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds

}

function startTimer(){

timer = setInterval(function(){

time--

updateTimer()

if(time <= 0){
clearInterval(timer)
alert("Focus session finished!")
}

},1000)

}

function stopTimer(){
clearInterval(timer)
}

function resetTimer(){

clearInterval(timer)

time = 1500

updateTimer()

}

updateTimer()

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks))

}

function renderTasks(){

let list = document.getElementById("taskList")
list.innerHTML=""

tasks.forEach((task,index)=>{

let li = document.createElement("li")

li.innerHTML = task + " <button onclick='deleteTask("+index+")'>Delete</button>"

list.appendChild(li)

})

}

function addTask(){

let input = document.getElementById("taskInput")

tasks.push(input.value)

input.value=""

saveTasks()
renderTasks()

}

function deleteTask(index){

tasks.splice(index,1)

saveTasks()
renderTasks()

}

renderTasks()

function openSite(url){

window.open(url,"_blank")

}