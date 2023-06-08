var base_url = window.location.origin;

var a = document.createElement('a');
a.href = base_url + "/main" ;
document.getElementById("profile").appendChild(a);

document.getElementById("patient-summary").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = base_url + "/main"  
})

document.getElementById("prescription").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/prescription"
  })

document.getElementById("visit-history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/visit"
  })


if (sessionStorage.getItem("displayDisclaimer") != null && sessionStorage.getItem("displayDisclaimer")) {
  console.log(sessionStorage.getItem("displayDisclaimer"))
  $("#disclaimer-note").removeClass("invisible");
} else {
  $("#disclaimer-note").addClass("invisible");
}
