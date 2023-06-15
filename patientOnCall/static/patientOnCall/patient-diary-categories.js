var base_url = window.location.origin;

(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const patientID = sessionStorage.getItem("patientID")

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + patientID

  insertDiaryCategories();
  addCategoriesClickRedirectListener();
})();

function insertDiaryCategories() {
  let diaryData = JSON.parse(sessionStorage.getItem("patientDiary"));
  for (category of Object.keys(diaryData)) {
    let categoryElement = createCategoryElement(category);
    insertCategoryElement(categoryElement);
  }
}

function createCategoryElement(category) {
  let categoryElementBox = document.createElement("div");
  categoryElementBox.classList.add("category-item-box");
  let categoryElement = document.createElement("div");
  categoryElement.classList.add("category-item");
  categoryElement.innerText = category;
  categoryElementBox.appendChild(categoryElement);
  return categoryElementBox;
}

function insertCategoryElement(categoryElement) {
  $("#categories-grid-box").append(categoryElement);
}

function addCategoriesClickRedirectListener() {
  $(".category-item").click(function (e) { 
    e.preventDefault();

    let categorySelected = $(this).text();
    let categoryFormatted = categorySelected.replace(/ /g,'').toLowerCase();
    window.location.href = base_url + `/patient-diary/${categoryFormatted}`;
  });
}