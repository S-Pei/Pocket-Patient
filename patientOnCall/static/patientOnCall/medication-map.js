// // Get the current URL
// var currentUrl = window.location.href;

// var base_url = window.location.origin;
// // Define the URLs that should not trigger data removal
// var exemptUrls = [base_url + '/edit-medication/', base_url + '/add-medication/'];

// // Check if the current URL matches any exempt URL
// var shouldRemoveData = !exemptUrls.some(function(url) {
//   return currentUrl.includes(url);
// });

// const value = sessionStorage.getItem('medicationDict');

// // Remove the data from localStorage if necessary
// if (shouldRemoveData && value !== null && value !== undefined) {
//     console.log("removed");
//     console.log(value !== null && value !== undefined);
//   sessionStorage.removeItem('medicationMap');
//   const k = sessionStorage.getItem('medicationDict');

// }


// if (currentUrl.includes(base_url + '/add-medication') && 
//     (value === null || value === undefined)) {
//     window.location.href = "/main"
// }