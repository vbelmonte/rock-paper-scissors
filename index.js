let rpsArray = ["rock", "paper", "scissors"];
let player = 0;
let computer = 0;
let imgPlayer = document.getElementById("player-choice");
let imgComputer = document.getElementById("computer-choice");
let message = document.getElementById("message");
let gameMode = document.getElementsByClassName("popup-game-selection");

function getComputerChoice() {
    let randomNumber = Math.random()*3;
    let flooredRandomNumber = Math.floor(randomNumber);
    let choice = rpsArray[flooredRandomNumber];
    return choice;
}

function playRound(playerSelection, computerSelection) {
    return determineWinner2(playerSelection.toLowerCase(), computerSelection.toLowerCase());
}

function determineWinner(playerSelection, computerSelection) {
    let message = "You chose " + playerSelection + ". Computer chose " + computerSelection + ".";

    if (playerSelection == computerSelection) {
        return "No winner." + message;
    }
    else if (playerSelection == "rock") {
        if (computerSelection == "scissors") {
            return "You win! Rock beats scissors. " + message;
        }
        else if (computerSelection == "paper") {
            return "You lose! Paper beats rock. " + message;
        }
    }
    else if (playerSelection == "paper") {
        if (computerSelection == "rock") {
            return "You win! Paper beats rock. " + message;
        }
        else if (computerSelection == "scissors") {
            return "You lose! Scissors beats paper. " + message;
        }
    }
    else if (playerSelection == "scissors") {
        if (computerSelection == "paper") {
            return "You win! Scissors beats paper. " + message;
        }
        else if (computerSelection == "rock") {
            return "You lose! Rock beats scissors. " + message;
        }
    }
}

function determineWinner2(playerSelection, computerSelection) {
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

    let message = result + " Final score: player - " + player + ", computer - " + computer;
    return message;
}

function addHighlightWinner(winner) {
    $("." + winner).addClass("frame-highlight");
}

function removeHighlightLoser(loser) {
    $("." + loser).removeClass("frame-highlight");
}


/*function game() {
    let roundResult = undefined;
    let computerChoice = undefined;
    let gameResult = undefined;

    computerChoice = getComputerChoice();
    roundResult = playRound(prompt("Choose rock, paper, or scissors."), computerChoice);
    keepScore(roundResult);

    for (let i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        roundResult = playRound(prompt("Choose rock, paper, or scissors."), computerChoice);
        keepScore(roundResult);
        console.log(roundResult);
    }
    
    console.log(announceWinner());

}*/

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
}


/************************************************************** 
 * CLICK AND TYPE FUNCTIONS
 * 
**************************************************************/
$(".rps-buttons").click(function(event) {
    /*console.log($(event.target).text());*/
    game($(event.target).text());
});

$("#reset-game").click(resetGame);

$("#game-mode").click(function() {
    gameMode[0].style.display = "block";
});

$(".close").click(function() {
    gameMode[0].style.display = "none";
})