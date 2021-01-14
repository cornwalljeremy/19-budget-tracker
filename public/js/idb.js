let db;
const request = indexedDb.open("19-budget-tracker", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  db.createObjectStore("<enter-item-here>", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.online) {
    uploadBudget();
  }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};

function saverecord(record){
    const transaction = db.transaction(["<enter-item-here>"], "readwrite");
    const budgetObectStore = transaction.objectStore("<enter-item-here>");

    budgetObectStore.add(record);
}

function uploadBudget(){
    const transaction = db.transaction(["<enter-item-here>"], "readwrite");
    const budgetObectStore = transaction.objectStore("<enter-item-here>");
    const getAll = budgetObectStore.getAll();

    getAll.onsuccess = function (){
        if(getAll.result.length > 0){
            fetch("<enter-api-item-here>", {
                method: "post",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((serverResponse) => {
            if(serverResponse.message){
                throw new Error(serverResponse);
            }
            const transaction = db.transaction(["<enter-item-here>"], "readwrite");

            const budgetObectStore = transaction.objectStore("<enter-item-here>");
            budgetObectStore.clear();

            alert("all values have been submitted")

            })
            .catch((err)=> {
                console.log(err);
            });
        }
    };
}

window.addEventListener('online', uploadBudget);
