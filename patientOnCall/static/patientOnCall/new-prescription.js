var base_url = window.location.origin;

var hashMap = {};

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
})();


function insertPrescription(prescription) {
  var i = 0
  while (i < prescription.length) {
    
      addPrescription(i, prescription[i]["drug"], 
                        prescription[i]["dosage"], 
                        prescription[i]["startDate"], 
                        prescription[i]["endDate"], 
                        prescription[i]["duration"], 
                        prescription[i]["route"])
      i++;
  }
}

function addPrescription(row, drug, dosage, startDate, endDate, duration, route) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-prescription-box-table");

    // Create the <div> element
    const prescriptionAction = document.createElement('div');

    // Create the <select> element
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

    // Append the <select> element to the <div> element
    prescriptionAction.appendChild(selectElement);

    // Add class to element
    prescriptionAction.classList.add("info-table-item");

    const prescriptionDrug = document.createElement("div");
    prescriptionDrug.classList.add("info-table-item");
    prescriptionDrug.id = 'prescription-drug-' + row;
    prescriptionDrug.textContent = drug;

    const prescriptionDosage = document.createElement("div");
    prescriptionDosage.classList.add("info-table-item");
    prescriptionDosage.id = 'prescription-dosage-' + row;
    prescriptionDosage.textContent = dosage;

    const prescriptionStartDate = document.createElement("div");
    prescriptionStartDate.classList.add("info-table-item");
    prescriptionStartDate.id = 'prescription-start-date-' + row;
    prescriptionStartDate.textContent = startDate;

    const prescriptionEndDate = document.createElement("div");
    prescriptionEndDate.classList.add("info-table-item");
    prescriptionEndDate.id = 'prescription-end-date-' + row;
    prescriptionEndDate.textContent = endDate;

    const prescriptionDuration = document.createElement("div");
    prescriptionDuration.classList.add("info-table-item");
    prescriptionDuration.id = 'prescription-duration-' + row;
    prescriptionDuration.textContent = duration;

    const prescriptionRoute = document.createElement("div");
    prescriptionRoute.classList.add("info-table-item");
    prescriptionRoute.id = 'prescription-route-' + row;
    prescriptionRoute.textContent = route;

    // Create the confirm button element
    const confirmButton = document.createElement('div');
    confirmButton.textContent = 'Confirmed';
    confirmButton.id = 'confirm-' + row;
    
    // Create the div element
    const prescriptionConfirm = document.createElement('div');
    
    // Add class to element
    prescriptionConfirm.classList.add("info-table-item");

    // Append the confirm button to the div element
    prescriptionConfirm.appendChild(confirmButton);

    tableBody.appendChild(prescriptionAction);
    tableBody.appendChild(prescriptionDrug);
    tableBody.appendChild(prescriptionDosage);
    tableBody.appendChild(prescriptionStartDate);
    tableBody.appendChild(prescriptionEndDate);
    tableBody.appendChild(prescriptionDuration);
    tableBody.appendChild(prescriptionRoute);
    tableBody.appendChild(prescriptionConfirm);
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

            const drug = document.getElementById("prescription-drug-" + row).value;
            const dosage = document.getElementById("prescription-dosage-" + row).value
            const startDate = document.getElementById("prescription-start-date-" + row).value
            const endDate = document.getElementById("prescription-end-date-" + row).value
            const duration = document.getElementById("prescription-duration-" + row).value
            const route = document.getElementById("prescription-route-" + row).value

            // Perform specific actions based on the element's ID
            if (name === 'edit') {
                changeEditable(row);
                document.getElementById("confirm-button-" + row).addEventListener("click", (e) => {
                    e.preventDefault();

                    let drug = document.getElementById("input-drug-" + row).value;
                    let dosage = document.getElementById("input-dosage-" + row).value;
                    let startDate = document.getElementById("input-start-date-" + row).value;
                    let endDate = document.getElementById("input-end-date-" + row).value;
                    let duration = document.getElementById("input-duration-" + row).value;
                    let route = document.getElementById("input-route-" + row).value;

                    const firstName = sessionStorage.getItem("patientFirstName");
                    const lastName = sessionStorage.getItem("patientLastName");

                    //compare to database
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
                        'prescriptionRoute': route
                    },
                    success: function (returned_value) {
                        if (returned_value.ok == true) { 
                            savedEdit(row, drug, dosage, startDate, endDate, duration, route)
                            sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
                        }
                    },
                    error: function () { }
                    })
                })
            } 
            else if (name === 'del') {
                console.log("hi2")
            }
            else {
                document.getElementById("prescription-drug-" + row).innerHTML = drug;
                document.getElementById("prescription-dosage-" + row).innerHTML = dosage;
                document.getElementById("prescription-start-date-" + row).innerHTML = startDate;
                document.getElementById("prescription-end-date-" + row).innerHTML = endDate;
                document.getElementById("prescription-duration-" + row).innerHTML = duration;
                document.getElementById("prescription-route-" + row).innerHTML = route;
                document.getElementById("confirm-" + row).innerHTML = Confirmed;
            }
        });
    }
    // Add a click event listener to each element
}

function savedEdit(row, drug, dosage, startDate, endDate, duration, route) {
    document.getElementById("prescription-drug-" + row).innerHTML = drug;
    document.getElementById("prescription-dosage-" + row).innerHTML = dosage;
    document.getElementById("prescription-start-date-" + row).innerHTML = startDate;
    document.getElementById("prescription-end-date-" + row).innerHTML = endDate;
    document.getElementById("prescription-duration-" + row).innerHTML = duration;
    document.getElementById("prescription-route-" + row).innerHTML = route;

    document.getElementById("select-" + row).selectedIndex = 0;
    document.getElementById("confirm-" + row).innerHTML = Confirmed;
}

function changeEditable(row) {
    // Create input elements
    
    const drug = document.getElementById("prescription-drug-" + row);
    const dosage = document.getElementById("prescription-dosage-" + row);
    const startDate = document.getElementById("prescription-start-date-" + row);
    const endDate = document.getElementById("prescription-end-date-" + row);
    const duration = document.getElementById("prescription-duration-" + row);
    const route = document.getElementById("prescription-route-" + row);
    const confirm = document.getElementById("confirm-" + row);

    const inputDrug = document.createElement("input");
    inputDrug.type = "text";
    inputDrug.name = "input-drug-" + row;
    inputDrug.id = "input-drug-" + row
    inputDrug.value = drug.textContent; 

    const inputDosage = document.createElement("input");
    inputDosage.type = "text";
    inputDosage.name = "input-dosage-" + row;
    inputDosage.id = "input-dosage-" + row
    inputDosage.value = dosage.textContent; 

    const inputStartDate = document.createElement("input");
    inputStartDate.type = "date";
    inputStartDate.name = "input-start-date-" + row;
    inputStartDate.id = "input-start-date-" + row
    inputStartDate.value = getToday();

    const inputEndDate = document.createElement("input");
    inputEndDate.type = "date";
    inputEndDate.name = "input-end-date-" + row;
    inputEndDate.id = "input-end-date-" + row
    inputEndDate.value = getToday(); 

    const inputDuration = document.createElement("input");
    inputDuration.type = "text";
    inputDuration.name = "input-duration-" + row;
    inputDuration.id = "input-duration-" + row
    inputDuration.value = duration.textContent; 

    const inputRoute = document.createElement("input");
    inputRoute.type = "text";
    inputRoute.name = "input-route-" + row;
    inputRoute.id = "input-route-" + row
    inputRoute.value = route.textContent; 

    const confirmation = document.createElement("button");
    confirmation.textContent = "Save";
    confirmation.id = "confirm-button-" + row;

    drug.innerHTML = "";
    drug.appendChild(inputDrug);

    dosage.innerHTML = "";
    dosage.appendChild(inputDosage);
    
    startDate.innerHTML = "";
    startDate.appendChild(inputStartDate);

    endDate.innerHTML = "";
    endDate.appendChild(inputEndDate);

    duration.innerHTML = "";
    duration.appendChild(inputDuration);

    route.innerHTML = "";
    route.appendChild(inputRoute);

    confirm.innerHTML = "";
    confirm.appendChild(confirmation);
}

function getToday() {
    // Get today's date
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}
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