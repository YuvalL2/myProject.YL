const DOM = {
    text: null,
    date: null,
    time: null,
    boardBody: null,

};

let taskBoard = JSON.parse(localStorage.getItem("taskBoard")) || [];

function init() {
    DOM.text = document.querySelector("#pText");
    DOM.date = document.querySelector("#pDate");
    DOM.time = document.querySelector("#pTime");
    DOM.boardBody = document.querySelector("#notesTable");

    const addNewButton = document.querySelector("#addNewProductButton");
    addNewButton.addEventListener("click", addNewProductFn,);



    function addNewProductFn(event) {
        taskBoard.push(new TaskBoard(DOM.text.value, DOM.date.value, DOM.time.value));
        localStorage.setItem("taskBoard", JSON.stringify(taskBoard));
        draw(taskBoard);
        clearForm();
    }
    draw(taskBoard)
}


function clearForm() {
    DOM.text.value = "";
    DOM.date.value = "";
    DOM.time.value = "";
}

function clearTableFn() {
    DOM.boardBody.innerHTML = "";
}

function draw(notesArray) {
    if (Array.isArray(notesArray) === false) return;

    clearTableFn();
    for (let index = 0; index < notesArray.length; index++) {
        const currentNotes = notesArray[index];

        const note = document.createElement("div");
        note.className = "note-style"
        note.classList.add("note", "note-style")

        // 
        const noteBod = document.createElement("div");
        noteBod.classList.add("note-body")
        const pText = document.createElement("p");
        pText.innerText = currentNotes.text;
        // 
        const noteFoot = document.createElement("div");
        noteFoot.classList.add("note-foot")
        const divDate = document.createElement("div");
        divDate.innerText = currentNotes.date;
        //
        const divTime = document.createElement("div");
        divTime.innerText = currentNotes.time;
        noteBod.append(pText)
        noteFoot.append(divTime, divDate)
        //
        const noteHead = document.createElement("div");
        const dBtn = document.createElement("button");
        dBtn.classList.add("btn", "d-btn");
        // 
        const dIcon = document.createElement("span");
        dIcon.classList.add("bi", "bi-trash");
        dBtn.append(dIcon);
        dBtn.addEventListener("click", function () {
            taskBoard.splice(index, 1);
            draw(taskBoard);
        });
        noteHead.append(dBtn)

        // note.append(dBtn, pText, divDate, divTime);

        note.append(noteHead, noteBod, noteFoot);
        DOM.boardBody.append(note);
    }

}
init();



