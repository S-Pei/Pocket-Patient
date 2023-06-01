(function() {
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const labHistory = JSON.parse(sessionStorage.getItem("labHistory"))
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-age").innerHTML = "1"
})();
// document.getElementById("name").addEventListener("mouseover", (e) => {

//     console.log("hohoho")
  
    //compare to database
    // $.ajax({
    //   type: "POST",
    //   url: "api/doctor/patient-data/",
    //   data: {
    //       'patientId': patientId,
    //       'patientName': patientName
    //   },
    //   success: function (returned_value) {
    //     if (returned_value.ok == true) { 
    //       console.log(returned_value["medical-history"])
    //       sessionStorage.setItem("labHistory", returned_value["lab-history"])
    //       sessionStorage.setItem("medicalHistory", returned_value["medical-history"])
    //       window.location.href = "main/"
    //     }
    //   },
    //   error: function () { }
    // });
//   })