server_url="https://mqsd-sudoku.herokuapp.com/"
function addTask(){
	let taskName=document.getElementById('data').value
	let pin=document.getElementById('pin').value
	let url=server_url+"add/"
	addMarkTaskToServer(url,taskName,pin)
}

function markTask(){
	let taskName=document.getElementById('data').value
	let url=server_url+"mark/"
	let pin=document.getElementById('pin').value
	addMarkTaskToServer(url,taskName,pin)
}

function addMarkTaskToServer(url, taskName,pin){
	let addMarkResponse={}
	let addMarkMessage=""
	makeServiceCall("POST",url,true,{'taskName': taskName, 'pin': pin})
	.then(responseText=>{
	    addMarkResponse=JSON.parse(responseText);
	    addMarkMessage=addMarkResponse.message;
	    displayMessage(addMarkMessage);
	}).catch(error=>{
	    displayMessage("Service error :"+error);
	});
}

function getTasks1(){
	displayTasks(['Eat','Drink','Sleep']);
	displayMessage('Tasks retrieved successfully!')
}

function getTasks(){
	let date=document.getElementById('data').value
	let url=server_url+"getTasks/"
	let pin=document.getElementById('pin').value
	let taskList=[]
	let getTasksMessage=""
	makeServiceCall("POST",url,true,{'date': date, 'pin': pin})
	.then(responseText=>{
	    getTasksResponse=JSON.parse(responseText);
	    taskList=getTasksResponse.taskList;
	    getTasksMessage=getTasksResponse.message;
	    displayTasks(taskList);
	    displayMessage(getTasksMessage);
	}).catch(error=>{
	    displayMessage("Service error :"+error);
	});
}

function displayMessage(message){
	document.getElementById('message').innerHTML=`<div class='alert alert-info' style='opacity: 0.5'>${message}</div>`;
}

function displayTasks(taskList){
	let taskListHtml='';
	for(let task of taskList){
		taskListHtml=`${taskListHtml}<li class='list-group-item'>${task}</li>`;
	}
	taskListHtml=`${taskListHtml}<br>
	<div class="row">
	<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"  style='opacity: 0.5'>
		<button class="btn btn-warning btn-sm btn-block" style="margin: auto;" onClick='hideTasks()'>Hide</button>
	</div>
	</div>`;
	document.getElementById('task-list').innerHTML=taskListHtml;
}

function hideTasks(){
	document.getElementById('task-list').innerHTML=``;
	document.getElementById('message').innerHTML=``;
}
