let addCardBtn = document.querySelector("#addCard");

let totdoContainer = document.querySelector("#todo");

addCardBtn.addEventListener("click", addTask);

function addTask() {
    let cardParent = document.createElement("div");
    cardParent.className = "cardParent"
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = "newCard";
    card.setAttribute("contenteditable", "true")
    cardParent.append(card);
    totdoContainer.append(cardParent);
    card.focus(); //pointer will be in latest editable zone automatically

    //Empty card should automatically be removed
    card.addEventListener("blur", (eventDetails)=>{
        let blurredCard = eventDetails.target;
        let blurredCardParent = blurredCard.parentElement;
        if(blurredCard.innerText.trim()=="") {
            blurredCardParent.remove();
        }
    })

    //make default text empty when clicked to edit the default text
    card.addEventListener("click", (eventDetails)=>{
        let activeCard = eventDetails.target;
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
    cardParent.append(selector)

    //if we selector will change something in dropdown => change event

    let selectedIdMapping = {
        todo1 : "todo",
        progress1 : "progress",
        completed1 : "completed",
    }

    selector.addEventListener("change", (eventDetails)=>{
        
        let currentValueOfSelection = eventDetails.target.value;
        let columnId = selectedIdMapping[currentValueOfSelection];

        let selectedContainer = document.querySelector(`#${columnId}`);

        selectedContainer.append(cardParent);

    })

    

    
}

