let rpsArray = ["rock", "paper", "scissors"];
let player = 0;
let computer = 0;
let imgPlayer = document.getElementById("player-choice");
let imgComputer = document.getElementById("computer-choice");
let message = document.getElementById("message");
let gameMode = document.getElementsByClassName("popup-game-selection");
let fivePointsModeFlag = false;
let fiveRoundsCounter = 0;

function getComputerChoice() {
    let randomNumber = Math.random()*3;
    let flooredRandomNumber = Math.floor(randomNumber);
    let choice = rpsArray[flooredRandomNumber];
    return choice;
}

function playRound(playerSelection, computerSelection) {
    return determineWinner(playerSelection.toLowerCase(), computerSelection.toLowerCase());
}

function determineWinner(playerSelection, computerSelection) {
    let message = "You chose " + playerSelection + ". Computer chose " + computerSelection + ".";

    if (playerSelection == computerSelection) {
        removeHighlightLoser("player-frame");
        removeHighlightLoser("computer-frame");
        return "No winner. " + message;
    }
    else {
        switch(playerSelection) {
            case "rock":
                if (computerSelection == "scissors") {
                    addHighlightWinner("player-frame");
                    removeHighlightLoser("computer-frame");
                    return "You win! Rock beats scissors. " + message;
                }
                else if (computerSelection == "paper") {
                    addHighlightWinner("computer-frame");
                    removeHighlightLoser("player-frame");
                    return "You lose! Paper beats rock. " + message;
                }
                break;
            case "paper":
                if (computerSelection == "rock") {
                    addHighlightWinner("player-frame");
                    removeHighlightLoser("computer-frame");
                    return "You win! Paper beats rock. " + message;
                }
                else if (computerSelection == "scissors") {
                    addHighlightWinner("computer-frame");
                    removeHighlightLoser("player-frame");
                    return "You lose! Scissors beats paper. " + message;
                }
                break;
            case "scissors":
                if (computerSelection == "paper") {
                    addHighlightWinner("player-frame");
                    removeHighlightLoser("computer-frame");
                    return "You win! Scissors beats paper. " + message;
                }
                else if (computerSelection == "rock") {
                    addHighlightWinner("computer-frame");
                    removeHighlightLoser("player-frame");
                    return "You lose! Rock beats scissors. " + message;
                }
                break;
        }
    }
}

function determineGameWinner() {
    if (player > computer) {
        displayMessage("You won!");
    }
    else {
        displayMessage("Computer won!");
    }
}

function keepScore(entry) {
    if (entry[4] == "w") {
        player++;
        updatePlayerScore(player);
    }
    else if (entry[4] == "l") {
        computer++;
        updateComputerScore(computer);
    }
}

function announceWinner() {
    let result = undefined;

    if (player > computer) {
        result = "You win!";
    }
    else if (player < computer) {
        result = "You lose!";
    }
    else {
        result = "No winner. Tied game.";
    }

    let message = result;
    return message;
}

function announceFinalScore() {
    let message = "Player: " + player + ", Computer: " + computer;
    return message;
}

function addHighlightWinner(winner) {
    $("." + winner).addClass("frame-highlight");
}

function removeHighlightLoser(loser) {
    $("." + loser).removeClass("frame-highlight");
}

function resetFiveRoundsCounter() {
    fiveRoundsCounter = 0;
}

function game(playerSelection) {
    let computerChoice = getComputerChoice();
    let roundResult = playRound(playerSelection, computerChoice);

    displayComputerSelectionIcon(computerChoice);
    displayPlayerSelectionIcon(playerSelection);
    keepScore(roundResult);
    displayMessage(roundResult);
    console.log(roundResult);
}

function updatePlayerScore(score) {
    let playerScore = document.getElementById("player-score");
    playerScore.textContent = score;
}

function updateComputerScore(score) {
    let computerScore = document.getElementById("computer-score");
    computerScore.textContent = score;
}

function getSelectionIcon(selectionIcon) {
    return "Images/" + selectionIcon + ".png";
}

function displayPlayerSelectionIcon(playerSelection) {
    let playerSelectionIconAddress = getSelectionIcon(playerSelection);
    imgPlayer.src = playerSelectionIconAddress;
    imgPlayer.width = 250;
}

function displayComputerSelectionIcon(computerSelection) {
    let computerSelectionIconAddress = getSelectionIcon(computerSelection);
    imgComputer.src = computerSelectionIconAddress;
    imgComputer.width = 250;
}

function removeComputerSelectionIcon() {
    imgComputer.src = "";
}

function removePlayerSelectionIcon() {
    imgPlayer.src = "";
}

function displayMessage(theMessage) {
    message.textContent = theMessage;
}

function displayGameOverMessage() {
    let winnerResult = announceWinner();
    let gameResult = announceFinalScore();
    $(".game-over-winner-loser").text(winnerResult);
    $(".game-over-message").text(gameResult);
}

function resetGame() {
    player = 0;
    computer = 0;
    updatePlayerScore(player);
    updateComputerScore(computer);

    displayMessage("Game has been reset.");
    removeHighlightLoser("player-frame");
    removeHighlightLoser("computer-frame");
    removePlayerSelectionIcon();
    removeComputerSelectionIcon();
    resetFiveRoundsCounter();
}

function turnOnFivePointsMode() {
    toggleFivePointsModeFlag(true);
    resetGame();
    displayMessage("5 Points Mode has started.");
}

function toggleFivePointsModeFlag(trueOrFalse) {
    fivePointsModeFlag = trueOrFalse;
}

function turnOnUnlimitedMode() {
    toggleFivePointsModeFlag(false);
    resetGame();
    displayMessage("Unlmited Mode has started.");
}

function gameModeSwitch(playerSelection) {
    if (fivePointsModeFlag == true) {
        game(playerSelection);
        if (player == 5 || computer == 5) {
            /*game over*/
            $("body").css("pointer-events", "none");
            $(".game-over").css("pointer-events", "auto");
            displayGameOverMessage();
            $(".game-over").toggleClass("toggle-visibility-property");
            $(".game-over").css("opacity", "1");
        }
    }
    else {
        game(playerSelection);
    }
}

function closeWindow() {
    $("body").css("pointer-events", "auto");
    gameMode[0].style.opacity = "0%";
    setTimeout(function(){
        $(".popup-game-selection").toggleClass("toggle-visibility-property");
      }, 100);
}

function closeWindowTest(className) {
    $("body").css("pointer-events", "auto");
    $(className).css("opacity", "0");
    setTimeout(function(){
        $(className).toggleClass("toggle-visibility-property");
      }, 100);
}

function closeGameOverWindow() {
    $(".game-over").css("opacity", "0");
    setTimeout(function() {
        $(".game-over").toggleClass("toggle-visibility-property");
    }, 100);
}

function glowFrame(playerSelection) {
    $(".player-frame").addClass("frame-glow");
    $(".computer-frame").addClass("frame-glow");
    setTimeout(function() {
        $(".player-frame").removeClass("frame-glow");
        $(".computer-frame").removeClass("frame-glow");
    }, 200);
}

function buttonPress(selection) {
    $("'#" + selection.toLowerCase() + "'").addClass("")
}

/************************************************************** 
 * CLICK AND TYPE FUNCTIONS
 * 
**************************************************************/
$(".rps-buttons").click(function(event) {
    gameModeSwitch($(event.target).text());
    glowFrame();
});

$(".reset-game").click(resetGame);

$(".restart-game").click(function() {
    resetGame();
    closeGameOverWindow();
    $("body").css("pointer-events", "auto");
});

$(".game-over-game-mode").click(function() {
    closeGameOverWindow();
    $(".popup-game-selection").css("pointer-events", "auto");
    $(".popup-game-selection").toggleClass("toggle-visibility-property");
    gameMode[0].style.opacity = "100%";
});

$("#game-mode").click(function() {
    $("body").css("pointer-events", "none");
    $(".popup-game-selection").css("pointer-events", "auto");
    $(".popup-game-selection").toggleClass("toggle-visibility-property");
    gameMode[0].style.opacity = "100%";
});

$("#close-game-mode").click(function() {
    closeWindowTest(".popup-game-selection");
});

$("#five-points").click(function() {
    turnOnFivePointsMode();
    $("#current-game-mode").text("5 Points");
    closeWindowTest(".popup-game-selection");
});

$("#five-points").hover(
    function() {
        $("#game-selection-description").css("opacity", 1);
        $("#game-selection-description").text("First player to 5 points wins the game.");
    },
    function() {
        $("#game-selection-description").css("opacity", 0);
        $("#game-selection-description").text("");
    }
);

$("#unlimited-rounds").click(function() {
    turnOnUnlimitedMode();
    $("#current-game-mode").text("Unlimited");
    closeWindowTest(".popup-game-selection");
});

$("#unlimited-rounds").hover(
    function() {
        $("#game-selection-description").css("opacity", 1);
        $("#game-selection-description").text("Play an unending game of Rock, Paper, Scissors.");
    },
    function() {
        $("#game-selection-description").css("opacity", 0);
        $("#game-selection-description").text("");
    }
);

$("#open-credits").click(function() {
    $("body").css("pointer-events", "none");
    $(".credits").css("pointer-events", "auto");
    $(".credits").toggleClass("toggle-visibility-property");
    $(".credits").css("opacity", "1");
});

$("#close-credits").click(function() {
    closeWindowTest(".credits");
});