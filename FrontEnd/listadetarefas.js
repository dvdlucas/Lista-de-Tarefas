;(function () {
    "use strict"
        //ARMAZENAR O DOM EM VARIAVIES
    const itemInput = document.getElementById("item-input");
    const todoAddForm = document.getElementById("todo-add");
    const ul = document.getElementById("todo-list");
    const lis = ul.getElementsByTagName("li");
    
    let arrTask = [
        {
            name: "Programar em JavaScript",          // crio um array de objetos
            createAt: Date.now(),
            completed: false
        },
        {
            name: "Estudar C#",          // crio um array de objetos
            createAt: Date.now(),
            completed: true
        }
    ]

/*
    function addEventLi(li){
        li.addEventListener("click", function(){
            console.log(this)
        })
    }
*/

    function generateLiTask(obj){  // [2]
        const li = document.createElement("li"); 
        const p = document.createElement("p");    // crio uma li com o paragrafo e classes de css
        const checkButton = document.createElement("button");
        const editButton = document.createElement("i");
        const deleteButton = document.createElement("i");

        li.className = "todo-item";
        checkButton.className = "button-check";
        checkButton.innerHTML = `<i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`
        checkButton.setAttribute("data-action", "checkButton");

        li.appendChild(checkButton)


        p.className = "task-name";
        p.textContent = obj.name;    // coloco o name do obj que recebo no meu paragraf
        li.appendChild(p);

        editButton.className = "fas fa-edit";
        editButton.setAttribute("data-action", "editButton");
        li.appendChild(editButton);

        const containerEdit = document.createElement("div");
        containerEdit.className = "editContainer";
        const inputEdit = document.createElement("input")
        inputEdit.setAttribute("type", "text");
        inputEdit.className = "editInput";
        inputEdit.value = obj.name;
        containerEdit.appendChild(inputEdit);

        const containerEditButton = document.createElement("button");
        containerEditButton.className = "editButton";
        containerEditButton.setAttribute("data-action","containerEditButton");
        containerEditButton.textContent = "Editar";
        containerEdit.appendChild(containerEditButton);

        const containerCancelButton = document.createElement("button");
        containerCancelButton.className = "cancelButton";
        containerCancelButton.setAttribute("data-action","containerCancelButton");
        containerCancelButton.textContent = "Cancelar";
        containerEdit.appendChild(containerCancelButton);

        li.appendChild(containerEdit)

        deleteButton.className = "fas fa-trash-alt";
        deleteButton.setAttribute("data-action", "deleteButton");
        li.appendChild(deleteButton);

       // addEventLi(li);
       return li;
    }

    function renderTasks(){  // [1]
        ul.innerHTML = ""     // limpo a ul 
        arrTask.forEach(task=> {
            ul.appendChild(generateLiTask(task))  // chamo a funçAõ que constroi a li
        });
    }

    function addTask(task){   // funçAõ responsável por adicionar minha li no array
        arrTask.push({
            name: task,
            createAt: Date.now(),
            completed: false
        })
    }

    function clickUl(e){
        const dataAction = e.target.getAttribute("data-action");

       if(!dataAction) return

       let currentLi = e.target;

       while(currentLi.nodeName !== "LI"){
            currentLi = currentLi.parentElement
       } 
      
       const currentLiIndex = [...lis].indexOf(currentLi);
       
        const actions = {
            editButton: function(){
                const editContainer = currentLi.querySelector(".editContainer");

                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style");
                });

                editContainer.style.display = "flex";
              
            },
            deleteButton: function(){
                arrTask.splice(currentLiIndex, 1);
                renderTasks();
            },
            containerEditButton: function(){
                const val = currentLi.querySelector(".editInput").value;
                arrTask[currentLiIndex].name = val;
                renderTasks();
            },
            containerCancelButton: function(){
                    currentLi.querySelector(".editContainer").removeAttribute("style");
                    currentLi.querySelector(".editInput").value = arrTask[currentLiIndex].name;
            },
            checkButton: function () {
                    arrTask[currentLiIndex].completed = !arrTask[currentLiIndex].completed;
                    if (arrTask[currentLiIndex].completed){
                        currentLi.querySelector(".fa-check").classList.remove("displayNone");
                    } else {
                        currentLi.querySelector(".fa-check").classList.add("displayNone");
                    }
            }
        }

        if(actions[dataAction]){
            actions[dataAction]()
        }


        
    }

    todoAddForm.addEventListener("submit", function(e){  // [0] formulário que espera receber um texto no seu input para adicionar nova task
        e.preventDefault() // evito recarregar a pagina, chamar o servidro

        addTask(itemInput.value)  //chamo a função que coloca li no array
        renderTasks()            // coloco a li no document
        itemInput.value = "";
        itemInput.focus();
    });

    ul.addEventListener("click", clickUl);

    renderTasks();  // renderizo a vizualização
 
})()