let addCardBtn = document.querySelector("#addCard");

let totdoContainer = document.querySelector("#todo");

addCardBtn.addEventListener("click", addTask);
let count = 1000000;
function addTask() {
    //let cardParent = document.createElement("div");
    //cardParent.className = "cardParent"
    let card = document.createElement("div");
    card.id = `card-${count++}`
    card.className = "card";
    card.innerText = "newCard";
    card.setAttribute("contenteditable", "true"); // content can be editable
    card.setAttribute("draggable", "true"); // element can be draggable
    //cardParent.append(card);
    totdoContainer.append(card);
    card.focus(); //pointer will be in latest editable zone automatically

    //dragStart:
    card.addEventListener("dragstart", (eventDetails)=>{
        let draggedCard = eventDetails.target;

        //--> we will store unique-id of that element innth eventDetails
        eventDetails.dataTransfer.setData("text/plain", draggedCard.id); // this will add the card id in the event details
        draggedCard.style.opacity = 0.5;
    })

    //dragEnd:
    card.addEventListener("dragend", (eventDetails)=>{
        let draggedCard = eventDetails.target;
        draggedCard.style.opacity = 1;
    })

    //drop
    //dragenter
    //dragever
    //--> as a default the elements won't allow "drop", "dragenter", "dragover" on any elements 
    // -- but for droping elements we need to disable all the default 
    let todo = document.querySelector("#todo");
    let progress = document.querySelector("#progress");
    let completed = document.querySelector("#completed");

    let dragEvents = ["dragover", "dragenter", "drop"];

    dragEvents.forEach((dropEvent)=>{
        let columns = document.querySelectorAll(".column");
        for (let c of columns) {
            c.addEventListener(dropEvent, (eventDetails)=>{
                eventDetails.preventDefault(); // this will prevent all defaluts that won't allow to drop the card in "todo", "progress", "completed" columns

                if(dropEvent=="drop") {
                    let cardId = eventDetails.dataTransfer.getData("text/plain");
                    let draggedCard = document.querySelector(`#${cardId}`);
                    let currColumn = eventDetails.target;
                    currColumn.append(draggedCard);
                }
            })
        }
    })



    // //Empty card should automatically be removed
    // card.addEventListener("blur", (eventDetails)=>{
    //     let blurredCard = eventDetails.target;
    //     let blurredCardParent = blurredCard.parentElement;
    //     if(blurredCard.innerText.trim()=="") {
    //         blurredCardParent.remove();
    //     }
    // })

    // //make default text empty when clicked to edit the default text
    // card.addEventListener("click", (eventDetails)=>{
    //     let activeCard = eventDetails.target;
    //     if(activeCard.innerText.trim()=="newCard") {
    //         activeCard.innerText="";
    //     }
    // })

    // //dropDown:
    // let selector = document.createElement("select");
    // selector.innerHTML=`
    //     <option value="todo1">ToDo</option>
    //     <option value="progress1">In-Progress</option>
    //     <option value="completed1">Completed</option>
    // `
    // cardParent.append(selector)

    // //if we selector will change something in dropdown => change event

    // let selectedIdMapping = {
    //     todo1 : "todo",
    //     progress1 : "progress",
    //     completed1 : "completed",
    // }

    // selector.addEventListener("change", (eventDetails)=>{
        
    //     let currentValueOfSelection = eventDetails.target.value;
    //     let columnId = selectedIdMapping[currentValueOfSelection];

    //     let selectedContainer = document.querySelector(`#${columnId}`);

    //     selectedContainer.append(cardParent);

    // })

    

    
}

