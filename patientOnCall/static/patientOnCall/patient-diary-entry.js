(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const patientID = sessionStorage.getItem("patientID")

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number: ' + patientID

  getDiaryData();
})();


function getDiaryIDFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const diaryId = urlParams.get('diaryId');
  return diaryId;
}

function getDiaryData() {
  let diaryId = getDiaryIDFromUrl();
  $.ajax({
    method: "POST",
    url: base_url + "/api/doctor/patient-data/diary/entry/",
    data: {
      "diaryId": diaryId
    },
    success: function(returned_value) {
      if (returned_value.ok == true) {
        console.log(returned_value["diary-data"]);
        loadDiaryData(returned_value["diary-data"]);
      }
    },
    error: function (xhr) {
      console.log(xhr);
    }
  })
}

function loadDiaryData(diary) {
  setDiaryDate(diary["date"]);
  setDiaryContent(diary["content"]);
}

function setDiaryDate(date) {
  $("#diary-entry-date").text(date);
}

function setDiaryContent(content) {
  $("#diary-entry-content").text(content);
}