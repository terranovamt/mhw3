var CLIENT_ID = "704116477846-g00cn0npuqrhf40ns8pajre07idb50bb.apps.googleusercontent.com";
var API_KEY = "AIzaSyBGl8pq0-THlsSOaDJNJl7nQnf1YjAXYcc";
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

function caricamentoGapi() {
  gapi.load("client:auth2", richiestaClient);
}

function richiestaClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        richiestaEventi();
      },
      function (error) {
        console.log("ERRORE JSON =" + JSON.stringify(error));
      }
    );
}

function createImg(src) {
  const img = document.createElement("img");
  img.src = src;
  return img;
}

function richiestaEventi() {
  gapi.client.calendar.events
    .list({
      calendarId: "072v42vfjd8ckcan5bgv8rkiuo@group.calendar.google.com",

      showDeleted: false,
      singleEvents: true,
      maxResults: 24,
      orderBy: "startTime",
    })
    .then(function (response) {
      var events = response.result.items;

      if (events.length > 0) {
        var calendar = document.getElementById("calendar");
        for (i = 0; i < events.length; i++) {
          var event = events[i];

          //seleziono e organizzo le date
          var parts = event.start.date.split("-");
          var start = new Date(parts[0], parts[1] - 1, parts[2]);

          var day = start.getDate();
          var month = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];

          //creo tutti gli elementi
          const box = document.createElement("div");
          const data = document.createElement("div");
          const gg = document.createElement("div");
          const mm = document.createElement("div");
          const tit = document.createElement("h2");
          const end = document.createElement("p");
          const location = document.createElement("p");

          const src = event.description;

          const img = createImg(src);

          tit.textContent = event.summary;
          end.textContent = "Fine evento: " + event.end.date;
          location.textContent = "Luogo: " + event.location;
          gg.textContent = day.toString();
          mm.textContent = month[start.getMonth()];
          box.classList.add("box");
          data.classList.add("data");
          gg.classList.add("gg");
          mm.classList.add("mm");
          img.classList.add("img");

          calendar.appendChild(box);
          box.appendChild(data);
          data.appendChild(gg);
          data.appendChild(mm);
          box.appendChild(img);
          box.appendChild(tit);
          box.appendChild(end);
          box.appendChild(location);
          removeLoading();
          if (!start) {
            start = event.start.date;
          }
        }
      } else {
        console.log("Nessun evento trovato.");
      }
    });
}

function removeLoading() {
  const loading = document.getElementById("loading");
  console.log(loading);
  loading.classList.add("hidden");
}
