diBox = document.getElementById("dialogueBox");

const onSubmitClicked = event => {
  event.preventDefault();
  const db = firebase.firestore();

  if (isValid(event.target)) {
    db.collection("posts")
      .doc()
      .set({
        name: event.target[0].value.toString(),
        message: event.target[1].value.toString(),
        date: new Date().toString()
      })
      .then(function() {
        console.log("succes");
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    diBox.classList.add("dialogueBoxAnimation");
    setTimeout(function() {
      diBox.classList.remove("dialogueBoxAnimation");
    }, 12000);
  }
  let mes = document.getElementById("message");
  mes.value = mes.defaultValue;
};

const isValid = array => {
  if (
    array[0].value.toString() === "" ||
    array[0].value.toString() === " " ||
    array[1].value.toString() === "" ||
    array[1].value.toString() === " "
  ) {
    return false;
  } else {
    return true;
  }
};
