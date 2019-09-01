/* Command line to get it working:
alias firebase="C:/Users/Emil/AppData/Roaming/npm/firebase"
firebase login --interactive
firebase init hosting
*/

document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const ref = firebase.database().ref("posts");

  const database = firebase.database();

  addRealTimeListeners(db);
});

const addMessage = ({ message, name }) => {
  let div = document.createElement("div");
  let pMessage = document.createElement("p");
  let pName = document.createElement("p");

  div.classList.add("messageDiv");
  pMessage.innerText = message;
  pMessage.style.fontWeight = 900;
  pMessage.style.fontSize = "1.5em";
  pName.innerText = name;

  div.appendChild(pName);
  div.appendChild(pMessage);
  document.getElementById("messages").appendChild(div);
  document.getElementById("messages").scrollBy(1000, 1000);
};

//Retreieve all posts from firebase database
const addRealTimeListeners = db => {
  db.collection("posts")
    .orderBy("date")
    .onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        addMessage(change.doc.data());
      });
    });
};

/*function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.additionalUserInfo.profile;
      let userNameDiv = document.createElement("p");
      userNameDiv.textContent = `Logged in as: ${user.name}`;
      document.body.append(userNameDiv);
    });
}*/
