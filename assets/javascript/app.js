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

    // Create variables that hold references to the places in the HTML where we want to display things.
    var directionsText = $("#directions-text");
    var userChoiceText = $("#userchoice-text");
    var opponentChoiceText = $("#opponentchoice-text");
    var winsText = $("#wins-text");
    var lossesText = $("#losses-text");
    var tiesText = $("#ties-text");

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

      var database = firebase.database();

      // Determines which key was pressed.
      var userGuess = event.key;

      database.ref().set({
        userOneInput: userGuess
      });


      // Randomly chooses a choice from the options array. This is the Computer's guess.
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
        directionsText.textContent = "";

        // Display the user and computer guesses, and wins/losses/ties.
        userChoiceText.textContent = "You chose: " + userGuess;
        opponentChoiceText.textContent = "Your Opponent chose: " + userTwoGuess;
        winsText.textContent = "wins: " + wins;
        lossesText.textContent = "losses: " + losses;
        tiesText.textContent = "ties: " + ties;
      }
    };