function displayRegistration() {
  console.log(">>> function being called");
  document.getElementsByTagName("button")[0].addEventListener("click", function() {
    console.log(">>> event listener added");
    document.getElementById("registration-form").removeAttribute("id");
  });
};

displayRegistration();
