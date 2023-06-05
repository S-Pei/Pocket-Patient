var base_url = window.location.origin;
document.getElementById("prescription").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/prescription"
  })

document.getElementById("visit-history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/visit"
  })