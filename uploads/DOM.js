
const uploadBox = document.getElementById("uploadBox");
const formContent = document.getElementById("formContent");
const clearBtn = document.getElementById("clearBtn");
const fileInp = document.getElementById("fileInput");
const generateAni = document.querySelector(".generating");

uploadBox.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formContent.classList.add("hide");
    setTimeout(() => {
        formContent.style.display = "none";
        clearBtn.style.display = "inline-block";
    }, 500);
    generateAni.style.display = "flex";
    try {
        const res = await fetch("/format", {
            method: "POST",
            body: formData
        })

        if (!res.ok) {
            const errMsg = await res.text();
            throw new Error(errMsg || "Something went wrong");
        }

        const data = await res.json();
        output(data.response);
        return;
    } catch (error) {
        console.error("Frontend caught error:", error.message);
    }
})

clearBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.reload();
});



// Haddle image Upload Input and Label :
const fileInput = document.getElementById("fileInput");
const fileLabel = document.getElementById("fileLabel");

fileInput.addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
        fileLabel.textContent = this.files[0].name;
    } else {
        fileLabel.textContent = "Choose a file";
    }
});


function output(response) {
    const textDiv = document.querySelector(".textdiv");
    const sumDiv = document.querySelector(".sumdiv");
    const noteDiv = document.querySelector(".taskdiv");
    const section2 = document.querySelector(".sec2");

    textDiv.textContent = response.text;
    sumDiv.textContent = response.summary;

    response.actions.forEach((action) => {
        const actionDiv = document.createElement("div");
        actionDiv.className = "action";

        // Task
        const taskDiv = document.createElement("div");
        taskDiv.className = "sub";
        const taskSpan = document.createElement("span");
        taskSpan.textContent = "Task: ";
        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(document.createTextNode(action.task || "N/A"));

        // Speaker
        const speakerDiv = document.createElement("div");
        speakerDiv.className = "sub";
        const speakerSpan = document.createElement("span");
        speakerSpan.textContent = "Speaker: ";
        speakerDiv.appendChild(speakerSpan);
        speakerDiv.appendChild(document.createTextNode(action.owner || "N/A"));

        // Due Date
        const dateDiv = document.createElement("div");
        dateDiv.className = "sub";
        const dateSpan = document.createElement("span");
        dateSpan.textContent = "Due-Date: ";
        dateDiv.appendChild(dateSpan);
        dateDiv.appendChild(document.createTextNode(action.due_date || "N/A"));

        actionDiv.appendChild(taskDiv);
        actionDiv.appendChild(speakerDiv);
        actionDiv.appendChild(dateDiv);
        noteDiv.appendChild(actionDiv);
    });

    generateAni.style.display = "none";
    section2.style.display = "flex";

}
