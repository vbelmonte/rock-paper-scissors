let rpsArray = ["rock", "paper", "scissors"];
let player = 0;
let computer = 0;

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
        return "No winner. Play again! " + message;
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


function keepScore(entry) {
    if (entry[4] == "w") {
        player++;
    }
    else {
        computer++;
    }
}

function game() {
    let computerChoice = undefined;
    for (let i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        console.log(playRound(prompt(), computerChoice));
    }
}