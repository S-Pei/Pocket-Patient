function create_websocket(openFunction) {
  let connectionString = ''
  if (window.location.protocol == "https:") {
    connectionString += 'wss://';
  } else {
    connectionString += 'ws://';
  }
  connectionString += window.location.host + '/ws/patientoncall/'
                      + sessionStorage.getItem("patientID") + '/'
                      + sessionStorage.getItem("patientName") + '/'

  let websocket = new WebSocket(connectionString);

  websocket.onopen = openFunction

  websocket.onmessage = function (response) {
    let data = JSON.parse(response.data)
    let event = data["event"]

    if (event == "GRANT_PATIENT_DATA_ACCESS") {
      let toHideIds = data["ids"];
      console.log(toHideIds);
      api_fetch_patient_full_data();
    }
  }

  return websocket;
}


function reconnectWebsocket() {
  sessionStorage.setItem("websocket", create_websocket(sessionStorage.getItem("patientID"), sessionStorage.getItem("patientName")));
  console.log("websocket reconnected");
}