// ======================
// CLOCK + DATE
// ======================

function updateClock(){

const now = new Date()

const timeString = now.toLocaleTimeString()
const dateString = now.toDateString()

document.getElementById("clock").innerText = timeString
document.getElementById("date").innerText = dateString

updateGreeting()

}

setInterval(updateClock,1000)


// ======================
// GREETING
// ======================

function updateGreeting(){

const hour = new Date().getHours()

let greeting = ""

if(hour < 12){
greeting = "Good Morning"
}
else if(hour < 17){
greeting = "Good Afternoon"
}
else{
greeting = "Good Evening"
}

document.getElementById("greeting").textContent = greeting

}


// ======================
// TIMER (POMODORO)
// ======================

let timerSeconds = 1500
let timerInterval

function updateTimer(){

let minutes = Math.floor(timerSeconds / 60)
let seconds = timerSeconds % 60

document.getElementById("timer").innerText =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds

}

function startTimer(){

if(timerInterval) return

timerInterval = setInterval(()=>{

timerSeconds--

updateTimer()

if(timerSeconds <= 0){
clearInterval(timerInterval)
timerInterval = null
alert("Focus session finished!")
}

},1000)

}

function stopTimer(){
clearInterval(timerInterval)
timerInterval = null
}

function resetTimer(){

clearInterval(timerInterval)

timerSeconds = 1500
timerInterval = null

updateTimer()

}

updateTimer()


// ======================
// TODO LIST
// ======================

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function renderTasks(){

const list = document.getElementById("taskList")
list.innerHTML = ""

tasks.forEach((task,index)=>{

const li = document.createElement("li")

li.innerHTML = `
${task}
<button onclick="deleteTask(${index})">Delete</button>
`

list.appendChild(li)

})

}

function addTask(){

const input = document.getElementById("taskInput")
const task = input.value.trim()

if(task === "") return

// prevent duplicate task
if(tasks.includes(task)){
alert("Task already exists")
return
}

tasks.push(task)

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


// ======================
// QUICK LINKS
// ======================

let links = JSON.parse(localStorage.getItem("links")) || []

function renderLinks(){

const container = document.getElementById("linksContainer")
container.innerHTML = ""

links.forEach((link,index)=>{

const btn = document.createElement("button")
btn.textContent = link.name

btn.onclick = ()=> window.open(link.url,"_blank")

const remove = document.createElement("span")
remove.textContent = " ✖"
remove.style.marginLeft = "8px"
remove.style.cursor = "pointer"

remove.onclick = ()=>{

links.splice(index,1)
saveLinks()

}

btn.appendChild(remove)
container.appendChild(btn)

})

}

function addLink(){

const name = document.getElementById("linkName").value.trim()
const url = document.getElementById("linkURL").value.trim()

if(!name || !url){
alert("Please fill link name and URL")
return
}

links.push({name,url})

document.getElementById("linkName").value=""
document.getElementById("linkURL").value=""

saveLinks()

}

function saveLinks(){

localStorage.setItem("links",JSON.stringify(links))
renderLinks()

}

renderLinks()


// ======================
// QUICK OPEN (STATIC)
// ======================

function openSite(url){
window.open(url,"_blank")
}