
window.addEventListener("DOMContentLoaded", ()=>{
    const inputTask = document.getElementById("inputTarefa")
    const buttonTask = document.getElementById ("buttonAdd")
    const taskList= document.getElementById("taskList")

    
    buttonTask.addEventListener("click", function(){  //Botão evento click
        if(!inputTask.value)return;
        createTask(inputTask.value);
    })

    function createLi(){                            //criando elemento li
        const newLi = document.createElement("li");
        newLi.className = "taskItem"
        return newLi
    }

    function cleanInput(){             //Limpar input
        inputTask.value = ""
        inputTask.focus();
    }

    function createTask(textoInput){            //Inserindo na lista a tarefa do input
        const li = createLi();
        li.innerText = textoInput;
        taskList.appendChild(li);
        createButtonClean(li);

        cleanInput();
        saveTasksToLocalStorage();
    }

    inputTask.addEventListener("keydown", function(e){   //Reconhecimento do Enter para add
        if(e.key === "Enter"){
            if(!inputTask.value)return;
            createTask(inputTask.value);
            
        };
    });

    function createButtonClean(li){    //Criar botão apagar
        li.innerText += ""
        const buttonClean= document.createElement("button")
        buttonClean.setAttribute('class', "btnDelete")

        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined" , "cleanIcon");
        icon.innerText = "delete";

        buttonClean.appendChild(icon);
        li.appendChild(buttonClean);
    }

    document.addEventListener("click", function(e){    //Função de apagar tarefa
        const event = e.target.closest(".btnDelete");
        if(event !== null){
            event.parentElement.remove();
            saveTasksToLocalStorage()
        }
    })

    function saveTasksToLocalStorage(){                                         //Salva as tarefas no localStorage
        const listWithTasks = taskList.querySelectorAll("li")
        const savedList = [];

        for(let tasksList of listWithTasks){
            let tasksText = tasksList.innerText
            tasksText = tasksText.replace("delete", "").trim();
            savedList.push(tasksText)
            
        }
        const taskJSON = JSON.stringify(savedList);
        localStorage.setItem("tasks", taskJSON);
    }

    function returnTask(){
        const task = localStorage.getItem("tasks")
        const taskList = JSON.parse(task);
        
        for(let tasks of taskList){
            createTask(tasks);
        }
    }
    returnTask();



})