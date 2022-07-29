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
        return "No winner." + message;
    }
    else {
        switch(playerSelection) {
            case "rock":
                if (computerSelection == "scissors") {
                    return "You win! Rock beats scissors. " + message;
                }
                else if (computerSelection == "paper") {
                    return "You lose! Paper beats rock. " + message;
                }
                break;
            case "paper":
                if (computerSelection == "rock") {
                    return "You win! Paper beats rock. " + message;
                }
                else if (computerSelection == "scissors") {
                    return "You lose! Scissors beats paper. " + message;
                }
                break;
            case "scissors":
                if (computerSelection == "paper") {
                    return "You win! Scissors beats paper. " + message;
                }
                else if (computerSelection == "rock") {
                    return "You lose! Rock beats scissors. " + message;
                }
                break;
        }
    }
}


function keepScore(entry) {
    if (entry[4] == "w") {
        player++;
    }
    else if (entry[4] == "l") {
        computer++;
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

function game() {
    let roundResult = undefined;
    let computerChoice = undefined;
    let gameResult = undefined;

    for (let i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        roundResult = playRound(prompt("Choose rock, paper, or scissors."), computerChoice);
        keepScore(roundResult);
        console.log(roundResult);
    }
    
    console.log(announceWinner());

}