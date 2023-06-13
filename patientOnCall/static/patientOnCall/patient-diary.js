(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  const diary = JSON.parse(sessionStorage.getItem("patientDiary"))
  console.log(diary)

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

  insertDiaryEntries(diary);
  // for(var i = 1; i <= medicalHistory.length; i ++) {
  //     row_hover(i, medicalHistory[i-1]["visitType"]);
  //     row_click(i);
  // }
})();

function insertDiaryEntries(diary) {
  let i = 0;
  for (entry of diary) {
    addDiaryEntry(
      i,
      entry["id"],
      entry["date"],
      entry["content"],
      entry["readByDoctor"],
      i >= diary.length - 1
    )
    row_hover(i);
    i++;
  }
}

function addDiaryEntry(rowNum, id, date, content, readByDoctor, isLastRow) {
  var table = document.getElementById("main-patient-diary-box-table");

  let isReadByDoctorElem = document.createElement("div");
  isReadByDoctorElem.classList.add("read-by-doctor-indicator-col");
  isReadByDoctorElem.setAttribute("diary-id", id);
  isReadByDoctorElem.innerHTML = "*";
  if (readByDoctor) { isReadByDoctorElem.classList.add("invisible"); }

  let dateElem = document.createElement("div");
  dateElem.classList.add("info-table-item", "diary-date", `row-${rowNum}`);
  if (isLastRow) { dateElem.classList.add("last-row"); }
  if (!readByDoctor) { dateElem.classList.add("read-by-doctor-info"); }
  dateElem.setAttribute("id", `diary-date-${rowNum}`);
  dateElem.setAttribute("diary-id", id);
  dateElem.innerHTML = date;

  let contentElem = document.createElement("div");
  contentElem.classList.add("info-table-item", "diary-content", `row-${rowNum}`);
  if (isLastRow) { contentElem.classList.add("last-row"); }
  if (!readByDoctor) { contentElem.classList.add("read-by-doctor-info"); }
  contentElem.setAttribute("id", `diary-content-${rowNum}`);
  contentElem.setAttribute("diary-id", id);
  contentElem.innerHTML = content;

  table.appendChild(isReadByDoctorElem);
  table.appendChild(dateElem);
  table.appendChild(contentElem);
}

function row_hover(rowNum){
  var rowClass = 'row-' + rowNum 
  var row = document.getElementsByClassName(rowClass);
  for(var i = 0; i <  row.length; i ++) {
      row[i].onmouseover = function() {
        for (var j = 0; j < row.length; j++) {
          row[j].classList.add("hovered-row");
        }
      };
      row[i].onmouseout = function() {
        for (var j = 0; j < row.length; j++) {
          row[j].classList.remove("hovered-row");
        }
      };   
  }
}