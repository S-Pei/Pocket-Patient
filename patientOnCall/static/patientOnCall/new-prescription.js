var base_url = window.location.origin;

var hashMap = new Map();

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const patientID = sessionStorage.getItem("patientID")
    const prescription = JSON.parse(sessionStorage.getItem("prescription"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML 
      = "Patient ID: " + patientID

    insertPrescription(prescription);

    assignEvent();

    console.log(sessionStorage.getItem("prescription"))
})();


/**
 * Inserts all prescriptions into current prescription table
 * @param {Dictionary} prescription list of prescriptions
 */
function insertPrescription(prescription) {
  var i = 0
  while (i < prescription.length) {
      addPrescription(i, prescription[i]["drug"], 
                        prescription[i]["dosage"], 
                        prescription[i]["startDate"], 
                        prescription[i]["endDate"], 
                        prescription[i]["duration"], 
                        prescription[i]["route"],
                        prescription[i]["comments"])
      i++;
  }
}

/**
 * Adds a single prescription entry into current prescription table
 * @param {int} row row index of prescription
 * @param {string} drug name of drug
 * @param {string} dosage drug dosage
 * @param {string} startDate prescription start date
 * @param {string} endDate prescription end date
 * @param {string} duration prescription duration
 * @param {string} route prescription route
 */
function addPrescription(row, drug, dosage, startDate, endDate, duration, route, comments) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-prescription-box-table");

    // Insert all information in prescription
    createAndInsertPrescriptionInfo(tableBody, row, "action", null);
    createAndInsertPrescriptionInfo(tableBody, row, "drug", drug);
    createAndInsertPrescriptionInfo(tableBody, row, "dosage", dosage);
    createAndInsertPrescriptionInfo(tableBody, row, "start-date", startDate);
    createAndInsertPrescriptionInfo(tableBody, row, "end-date", endDate);
    createAndInsertPrescriptionInfo(tableBody, row, "duration", duration);
    createAndInsertPrescriptionInfo(tableBody, row, "route", route);
    createAndInsertPrescriptionInfo(tableBody, row, "comments", comments);
    createAndInsertPrescriptionInfo(tableBody, row, "confirmation", null);

    // save value to hashmap
    saveToHash(row, drug, dosage, startDate, endDate, duration, route, comments);
}

function assignEvent() {
    const elements = document.getElementsByClassName("selection");

    // Iterate over the elements and attach the event listener
    for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        elem.addEventListener('change', (e) => {
            e.preventDefault();
            // Check the ID of the clicked element
            // Get the selected option
            const selectedOption = elem.options[elem.selectedIndex];

            // Get the ID of the selected option
            const selectedOptionId = selectedOption.id;
            const name = selectedOptionId.match(/[a-zA-Z]+/)[0];
            const row = selectedOptionId.match(/\d+/)[0];

            // Perform specific actions based on the element's ID
            if (name === 'edit') {
                changeEditable(row);
                document.getElementById("prescription-confirm-button-" + row).addEventListener("click", (e) => {
                    e.preventDefault();

                    let drug = document.getElementById("input-drug-" + row).value;
                    let dosage = document.getElementById("input-dosage-" + row).value;
                    let startDate = document.getElementById("input-start-date-" + row).value;
                    let endDate = document.getElementById("prescription-end-date-" + row).innerHTML;
                    let durationMap = getDurationInfo(row);
                    let duration = durationMap["number"] + " " + durationMap["time"];
                    let route = document.getElementById("input-route-" + row).value;
                    let comments = document.getElementById("input-comments-" + row).value;

                    savedEdit(row, drug, dosage, startDate, endDate, duration, route, comments);

                })
            } 
            else if (name === 'del') {
                showDeleteButton(row);
            }
            else {
                reloadPrescriptionInfo(row, "drug");
                reloadPrescriptionInfo(row, "dosage");
                reloadPrescriptionInfo(row, "start-date");
                reloadPrescriptionInfo(row, "end-date");
                reloadPrescriptionInfo(row, "duration");
                reloadPrescriptionInfo(row, "route");
                reloadPrescriptionInfo(row, "comments");
                reloadPrescriptionInfo(row, "confirm");
            }
        });
    }
}

function saveToHash(row, drug, dosage, startDate, endDate, duration, route, comments) {
    if (!hashMap.has("" + row)) {
        hashMap.set("" + row, new Map());
    }
    corresponding = hashMap.get("" + row);
    corresponding.set("drug", drug);
    corresponding.set("dosage", dosage);
    corresponding.set("startDate", startDate);
    corresponding.set("endDate", endDate);
    corresponding.set("duration", duration);
    corresponding.set("route", route);
    corresponding.set("comments", comments);
}

function savedEdit(row, drug, dosage, startDate, endDate, duration, route, comments) {
    document.getElementById("prescription-drug-" + row).innerHTML = drug;
    document.getElementById("prescription-dosage-" + row).innerHTML = dosage;
    document.getElementById("prescription-start-date-" + row).innerHTML = startDate;
    document.getElementById("prescription-end-date-" + row).innerHTML = endDate;
    document.getElementById("prescription-duration-" + row).innerHTML = duration;
    document.getElementById("prescription-route-" + row).innerHTML = route;
    document.getElementById("prescription-comments-" + row).innerHTML = comments;

    document.getElementById("select-" + row).selectedIndex = 0;
    document.getElementById("prescription-confirm-" + row).innerHTML = "Confirmed";
}

function changeEditable(row) {
    // Create input elements
    changePrescriptionInfoToEditable(row, "drug");
    changePrescriptionInfoToEditable(row, "dosage");
    changePrescriptionInfoToEditable(row, "start-date");
    changePrescriptionInfoToEditable(row, "duration");
    changePrescriptionInfoToEditable(row, "route");
    changePrescriptionInfoToEditable(row, "comments");
    changePrescriptionInfoToEditable(row, "confirm");

    addDurationInputsEventListener(row);
}

function getToday() {
    // Get today's date
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

function createAndInsertPrescriptionInfo(tableBody, row, type, data) {
    let prescriptionInfo = document.createElement("div");
    prescriptionInfo.classList.add("info-table-item");
    prescriptionInfo.classList.add(`prescription-${row}`);
    if (type == "action") {
        let selectElem = createActionPrescriptionElement(row);
        prescriptionInfo.appendChild(selectElem);
    } else if (type == "confirmation") {
        let confirmBtnElem = createConfirmButtonElement(row);
        prescriptionInfo.appendChild(confirmBtnElem);
    } else {
        prescriptionInfo.id = `prescription-${type}-${row}`;
        prescriptionInfo.textContent = data;    
    }
    tableBody.appendChild(prescriptionInfo);
}

function createActionPrescriptionElement(row) {
    // Create the <select> element for prescription action
    const selectElement = document.createElement('select');
    selectElement.classList.add("selection")
    selectElement.id = "select-" + row;

    // Create the "Saved" option
    const savedOption = document.createElement('option');
    savedOption.classList.add("selection-option");
    savedOption.id = 'saved-option-' + row;
    savedOption.value = 'option1';
    savedOption.selected = true;
    savedOption.textContent = 'Saved';

    // Create the "Edit" option
    const editOption = document.createElement('option');
    editOption.classList.add("selection-option");
    editOption.id = 'edit-option-' + row;
    editOption.value = 'option2';
    editOption.textContent = 'Edit';

    // Create the "Delete" option
    const deleteOption = document.createElement('option');
    deleteOption.classList.add("selection-option");
    deleteOption.id = 'del-option-' + row;
    deleteOption.value = 'option3';
    deleteOption.textContent = 'Delete';

    // Append the options to the <select> element
    selectElement.appendChild(savedOption);
    selectElement.appendChild(editOption);
    selectElement.appendChild(deleteOption);

    return selectElement;
}

function createConfirmButtonElement(row) {
    const confirmButton = document.createElement('div');
    confirmButton.textContent = 'Confirmed';
    confirmButton.id = 'prescription-confirm-' + row;
    return confirmButton;
}

function changePrescriptionInfoToEditable(row, type) {
    const elem = document.getElementById(`prescription-${type}-${row}`);
    let newChild = null;

    if (type == "confirm") {
        newChild = document.createElement("button");
        newChild.textContent = "Save";
        newChild.id = "prescription-confirm-button-" + row;
    } else if (type == "duration") {
        newChild = createDurationEditablesElement(elem, row);
    } else {
        newChild = document.createElement("input");
        newChild.type = (type == "start-date" || type == "end-date") ? "date": "text";
        newChild.name = `input-${type}-${row}`;
        newChild.id = `input-${type}-${row}`;
        if (type == "start-date" || type == "end-date") {
            newChild.value = getToday();
        } else {
            newChild.value = elem.textContent;
        }
    }
    elem.innerHTML = "";
    elem.appendChild(newChild);
}

function createDurationEditablesElement(elem, row) {
    let durationStr = elem.textContent
    let durationNum = durationStr.split(" ")[0];
    let durationTime = durationStr.split(" ")[1];

    let editablesElem = document.createElement("div");
    editablesElem.classList.add("input-duration-editables");
    editablesElem.id =`input-duration-editables-${row}`;

    let editNumber = document.createElement("div");
    editNumber.classList.add("input-duration-number-wrapper");
    let numberInput = document.createElement("input");
    numberInput.type = "text";
    numberInput.name = `input-duration-number-${row}`;
    numberInput.id = `input-duration-number-${row}`;
    numberInput.value = durationNum;
    editNumber.appendChild(numberInput);

    let editTime = document.createElement("div");
    editTime.classList.add("input-duration-time-wrapper");
    let timeSelect = document.createElement("select");
    timeSelect.class = `input-duration-time`;
    timeSelect.id = `input-duration-time-${row}`;
    let times = ["day", "week", "month", "year"]
    let optionIndex = times.indexOf(durationTime);
    for (i in times) {
        let newOption = document.createElement("option");
        newOption.value = times[i];
        newOption.innerHTML = `${times[i]}(s)`;
        timeSelect.appendChild(newOption);
    }
    timeSelect.selectedIndex = optionIndex;
    editTime.appendChild(timeSelect);

    
    editablesElem.appendChild(editNumber);
    editablesElem.appendChild(editTime);
    return editablesElem;
}

function addDurationInputsEventListener(row) {
    $(`.input-duration-number-wrapper > input, .input-duration-time-wrapper > select, #input-start-date-${row}`)
        .on("change", function () {
            let durationInfo = getDurationInfo(row);
            let startDateStr = document.getElementById(`input-start-date-${row}`).value;
            let newEndDate = new Date(startDateStr);
            let dayMul = dayMultiplier(durationInfo["time"]);
            newEndDate.setDate(newEndDate.getDate() 
                                + parseInt(durationInfo["number"]) * dayMul);
            $(`#prescription-end-date-${row}`).html(newEndDate.toISOString().slice(0, 10));
        });
}

function getDurationInfo(row) {
    let number = document.getElementById(`input-duration-number-${row}`).value;
    let time = document.getElementById(`input-duration-time-${row}`).value;

    return {
        "number": number,
        "time": time
    }
}

function dayMultiplier(time) {
    switch (time) {
        case "day":
            return 1;
        case "week":
            return 7;
        case "month":
            return 30;
        case "year":
            return 365;
    }
}

function reloadPrescriptionInfo(row, type) {
    if (type == "confirm") {
        document.getElementById(`prescription-${type}-${row}`).innerHTML = "Confirmed"
    } else if (type == "start-date") {
        document.getElementById(`prescription-${type}-${row}`).innerHTML = hashMap.get("" + row).get("startDate");
    } else if (type == "end-date") {
        document.getElementById(`prescription-${type}-${row}`).innerHTML = hashMap.get("" + row).get("endDate");
    } else {
        document.getElementById(`prescription-${type}-${row}`).innerHTML = hashMap.get("" + row).get(type);
    }
}

function getRowFromId(id) {
    let ws = id.split("-");
    return parseInt(ws[ws.length - 1]);
}

function updatePrescription(row) {
    const selectElem = document.getElementById(`select-${row}`);
    if (selectElem.value == "option1") {
        let drug = document.getElementById(`prescription-drug-${row}`).innerHTML;
        let dosage = document.getElementById(`prescription-dosage-${row}`).innerHTML;
        let startDate = document.getElementById(`prescription-start-date-${row}`).innerHTML;
        let endDate = document.getElementById(`prescription-end-date-${row}`).innerHTML;
        let duration = document.getElementById(`prescription-duration-${row}`).innerHTML;
        let route = document.getElementById(`prescription-route-${row}`).innerHTML;
        let comments = document.getElementById(`prescription-comments-${row}`).innerHTML;

        const firstName = sessionStorage.getItem("patientFirstName");
        const lastName = sessionStorage.getItem("patientLastName");

        $.ajax({
            type: "POST",
            url: base_url + "/api/doctor/patient-data/prescription/",
            data: {
                'patientID': sessionStorage.getItem("patientID"),
                'patientName': firstName + ' ' + lastName,
                'prescriptionDrug': drug, 
                'prescriptionDosage': dosage, 
                'prescriptionStartDate': startDate, 
                'prescriptionEndDate': endDate, 
                'prescriptionDuration': duration, 
                'prescriptionRoute': route,
                'prescriptionComments': comments,
            },
            success: function (returned_value) {
                if (returned_value.ok == true) { 
                    savedEdit(row, drug, dosage, startDate, endDate, duration, route, comments)
                    sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
                }
            },
            error: function () { }
            })
    }
}

document.getElementById("save-prescription").addEventListener("click", (e) => {
    var i = 0;
    const prescription = JSON.parse(sessionStorage.getItem("prescription"));
    while (i < prescription.length) {
        updatePrescription(i);
        i++;
    }
    window.location.href = "/prescription"
})

// DELETE PRESCRIPTION
function showDeleteButton(row) {
    let deleteButton = document.createElement("button");
    deleteButton.id = `prescription-delete-button-${row}`;
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", (e) => { 
        e.preventDefault();
        deletePrescription(row);
    });
    $(`#prescription-confirm-${row}`).html(deleteButton);
}

function deletePrescription(row) { 
    $(`.prescription-${row}`).remove();
}

// TODO
// document.getElementById("prescription-submit").addEventListener("click", (e) => {
//     e.preventDefault();

//     let drug = document.getElementById("prescription-drug").value;
//     let dosage = document.getElementById("prescription-dosage").value;
//     let startDate = document.getElementById("prescription-start-date").value;
//     let endDate = document.getElementById("prescription-end-date").value;
//     let duration = document.getElementById("prescription-duration").value;
//     let route = document.getElementById("prescription-route").value;

//     const firstName = sessionStorage.getItem("patientFirstName")
//     const lastName = sessionStorage.getItem("patientLastName")
  
//     //compare to database
//     $.ajax({
//       type: "POST",
//       url: base_url + "/api/doctor/patient-data/prescription/",
//       data: {
//         'patientID': sessionStorage.getItem("patientID"),
//         'patientName': firstName + ' ' + lastName,
//         'prescriptionDrug': drug, 
//         'prescriptionDosage': dosage, 
//         'prescriptionStartDate': startDate, 
//         'prescriptionEndDate': endDate, 
//         'prescriptionDuration': duration, 
//         'prescriptionRoute': route
//       },
//       success: function (returned_value) {
//         if (returned_value.ok == true) { 
//           addPrescription(drug, dosage, startDate, endDate, duration, route)
//           sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
//         }
//       },
//       error: function () { }
//     });
//   })