   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyBBMMKvmWsRObaSI4vJGQOmTe_M2thgSvw",
    authDomain: "rpsmultiplayer-13fc9.firebaseapp.com",
    databaseURL: "https://rpsmultiplayer-13fc9.firebaseio.com",
    projectId: "rpsmultiplayer-13fc9",
    storageBucket: "",
    messagingSenderId: "465170171818"
  };
  firebase.initializeApp(config);
 
 // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var computerChoices = ["r", "p", "s"];

    // Creating variables to hold the number of wins, losses, and ties. They start at 0.
    var wins = 0;
    var losses = 0;
    var ties = 0;

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

      var database = firebase.database();
      var userGuess = event.key;

      database.ref().set({
        userOneInput: userGuess
      });

    database.ref().on("value", function(snapshot) {

      
        userGuess = snapshot.val().userOneInput;
    });
  

console.log(userGuess);

      // 
      var userTwoGuess = "";

      // Reworked our code from last step to use "else if" instead of lots of if statements.

      // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
      if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

        if ((userGuess === "r") && (userTwoGuess === "s")) {
          wins++;
        } else if ((userGuess === "r") && (userTwoGuess === "p")) {
          losses++;
        } else if ((userGuess === "s") && (userTwoGuess === "r")) {
          losses++;
        } else if ((userGuess === "s") && (userTwoGuess === "p")) {
          wins++;
        } else if ((userGuess === "p") && (userTwoGuess === "r")) {
          wins++;
        } else if ((userGuess === "p") && (userTwoGuess === "s")) {
          losses++;
        } else if (userGuess === userTwoGuess) {
          ties++;
        }

        // Hide the directions
        $("#directions-text").text("");

        // Display the user and computer guesses, and wins/losses/ties.
        $("#userchoice-text").text("You chose: " + userGuess);
        $("#opponentchoice-text").text("Your Opponent chose: " + userTwoGuess);
        $("#wins-text").text("wins: " + wins);
        $("#losses-text").text("losses: " + losses);
        $("#ties-text").text("ties: " + ties);
      }
    };