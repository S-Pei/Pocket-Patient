var base_url = window.location.origin;

var a = document.createElement('a');
a.href = base_url + "/main" ;
document.getElementById("profile").appendChild(a);

document.getElementById("patient-summary").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = base_url + "/main"  
})

document.getElementById("medication").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/medication"
  })

document.getElementById("visit-history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/visit"
  })

document.getElementById("patient-diary").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = base_url + "/patient-diary"
})


if (sessionStorage.getItem("displayDisclaimer") != null && sessionStorage.getItem("displayDisclaimer") == "true") {
  $("#disclaimer-note").removeClass("invisible");
} else {
  $("#disclaimer-note").addClass("invisible");
}
