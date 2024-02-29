import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY_jqtRoNcVsvm_mYVJEN439twCfrT0hY",
  authDomain: "playground-bac60.firebaseapp.com",
  databaseURL: "https://playground-bac60-default-rtdb.firebaseio.com",
  projectId: "playground-bac60",
  storageBucket: "playground-bac60.appspot.com",
  messagingSenderId: "1008146749833",
  appId: "1:1008146749833:web:c1793fdd452b7e5235e958"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementPostListInDB = ref(database, "endorsementList");


const endorsementInput = document.getElementById("endorsement-Input");
const publishBtn = document.getElementById("publishBtn");
const endorsementList = document.getElementById("endorsement-List");
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");

//Pushing data to the Firebas database 
publishBtn.addEventListener('click', function() {
    let endorsementValue = endorsementInput.value;
    let fromValue = "From " + fromInput.value;
    let toValue = "To " + toInput.value; 

    let completeEndorsement = {
        from: fromValue,
        endorsement: endorsementValue,
        to: toValue
    };
    
    push(endorsementPostListInDB, completeEndorsement);
    
    clearInputFieldEl();
});

//Getting data from the Firebase database
onValue(endorsementPostListInDB, function(snapshot){

    if(snapshot.exists()) {
        let itemsArray = Object.values(snapshot.val());

        clearEndorsementList();

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i];

            appendItemToEndorsementList(currentItem);
        }
    } 
});

//Creating new list elements and attaching input data from Firebase to them
function appendItemToEndorsementList(item) {

    let divEl = document.createElement("div");
    divEl.setAttribute("id", "textPost");

    let childTo = document.createElement('p');
    childTo.textContent = item.to;
    childTo.setAttribute("id", "toAndFromInEndorsement");

    let childEndorsement = document.createElement('p');
    childEndorsement.textContent = item.endorsement;
    childEndorsement.setAttribute("id", "TextInEndorsement");

    let childFrom = document.createElement('p');
    childFrom.textContent = item.from;
    childFrom.setAttribute("id", "toAndFromInEndorsement");

    divEl.appendChild(childTo);
    divEl.appendChild(childEndorsement);
    divEl.appendChild(childFrom);

    endorsementList.append(divEl);
}

function clearInputFieldEl(){
    endorsementInput.value = "";
    fromInput.value = "";
    toInput.value = "";
};

function clearEndorsementList(){
    endorsementList.innerHTML = "";
};