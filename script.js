let addCardBtn = document.querySelector("#addCard");

let totdoContainer = document.querySelector("#todo");

addCardBtn.addEventListener("click", addTask);

function addTask() {
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = "newCard";
    card.setAttribute("contenteditable", "true")
    totdoContainer.append(card);
    card.focus(); //pointer will be in latest editable zone automatically

    //Empty card should automatically be removed
    card.addEventListener("blur", (eventDetails)=>{
        let blurredCard = eventDetails.card;
        if(blurredCard.innerText.trim()=="") {
            blurredCard.remove();
        }
    })

    //make default text empty when clicked to edit the default text
    card.addEventListener("click", (eventDetails)=>{
        let activeCard = eventDetails.card;
        if(activeCard.innerText.trim()=="newCard") {
            activeCard.innerText="";
        }
    })

    //dropDown:
    let selector = document.createElement("select");
    selector.innerHTML=`
        <option value="todo1">ToDo</option>
        <option value="progress1">In-Progress</option>
        <option value="completed1">Completed</option>
    `
    card.append(selector)

    //if we selector will change something in dropdown => change event

    let selectedIdMapping = {
        todo1 : "todo",
        progress1 : "progress",
        completed1 : "completed",
    }

    selector.addEventListener("change", (eventDetails)=>{
        // let selectedOption = eventDetails.target.value; // todo, progress, completed
        // let selectedContainer = document.querySelector(`#${selectedOption}`);
        // selectedContainer.append(card);

        let currentValueOfSelection = eventDetails.target.value;
        let columnId = selectedIdMapping[currentValueOfSelection];

        let selectedContainer = document.querySelector(`#${columnId}`);

        selectedContainer.append(card);

    })

    

    
}

