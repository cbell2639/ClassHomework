//-----------------------------------------------------------------------------
// HTTP Functions and Stuff
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Got something - hang on...");
            let whatCameBackFromTheServer = JSON.parse(this.responseText);
            theRecordsHaveArrivedSoLayThemOut(whatCameBackFromTheServer);
        } else if (this.readyState == 4 && this.status == 404) {
            console.log("Dang- something's broke");
        }
};

//-----------------------------------------------------------------------------
// My Functions
function shuffle(array) {
    for(let i = array.length-1;i>0;i--){
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]]=[array[j], array[i]];
    console.log(array);
    }
    return array;
}

function getUserAnswers(arrayOfRadioNames){
    for(c=0;c<arrayOfRadioNames.length;c++){
    radioName = arrayOfRadioNames[c];
    radioGroup = document.getElementsByName(radioName);
        for(d=0;d<radioGroup.length;d++){
            if(radioGroup[d].checked) 
            array_of_user_answers.push(radioGroup[d].value);
            }
    }
    
    console.log(array_of_user_answers);
    return array_of_user_answers;
}

function scoreQuiz(userAnswers, correctAnswers){
    for(z=0;z<correctAnswers.length;z++){
        if(userAnswers.length != correctAnswers.length){
            return alert("Select an answer for every question, Noob");
        }
        else if(userAnswers[z] == correctAnswers[z]){ 
            score +=1;
        }  
    }
    return score;
    switch(score){
        case 0:
            resultMessage= "You got 0 out of " + correctAnswers.length + "<br/>";
            bonusMessage= "!BRUTALITY!";
            break;
        case(score>0 && score<4):
            resultMessage= "You got " + score + " out of " + correctAnswers.length + "<br/>";
            bonusMessage= "!FATALITY!";
            break;
        case(score>3 && score<7):
            resultMessage= "You got " + score + " out of " + correctAnswers.length + "<br/>";
            bonusMessage= "!DRAW!";
            break;
        case(score>6 && score<10):
            resultMessage= "You got " + score + " out of " + correctAnswers.length + "<br/>";
            bonusMessage= "!FINISH THIS!";
            break;
        case 10:
            resultMessage= "You got " + score + " out of " + correctAnswers.length + "<br/>";
            bonusMessage= "!FLAWLESS VICTORY";
            break;
    }
    return resultMessage;
    console.log(resultMessage);
    return bonusMessage;
    console.log(bonusMessage);
}

function theRecordsHaveArrivedSoLayThemOut(thingThatsBeingPassedIn) {
    let full_Quiz = "";
    let incorrectAnswers = ""
    let correctAnswer = "";
    let array_of_answers = "";
    let user_answer = "";
    let array_of_user_answers = [];
    let array_of_correct_answers = [];
    let radioName = "";
    let radioGroup = "";
    let array_of_radio_names = [];
    let score = "";
    let resultMessage="";
    let bonusMessage="";
    
    // For debugging
    console.log(thingThatsBeingPassedIn);
    
    // Build it
    let array_of_results = thingThatsBeingPassedIn.results;
    let totalQuestions = array_of_results.lenth;
    
    // Loop
    for(let x=0;x<array_of_results.length;x++) {
        incorrectAnswers = array_of_results[x].incorrect_answers;
        correctAnswer = array_of_results[x].correct_answer;
        incorrectAnswers.push(correctAnswer);
        array_of_answers = incorrectAnswers;
        console.log(array_of_answers);
        shuffle(array_of_answers);
        array_of_correct_answers.push(correctAnswer);
        console.log(array_of_correct_answers);
        array_of_radio_names.push(array_of_results.question);
        full_Quiz += "<br/>" + (x + 1) + ". " + array_of_results[x].question + "<br/>";
                
            for(let a=0;a<array_of_answers.length;a++) {
                    full_Quiz += "<input type='radio' name="+ array_of_results[x].question + " value=" + array_of_answers[a] + "> " +array_of_answers[a] + "<br/>";
            } 
    }
    full_Quiz+= "<br/><form method='get' action='TriviaGame_Score.html'><button id='submitButton' type='submit'>Test Your Intelligence</button></form>";
        
    // Update the document
    document.getElementById("id01").innerHTML = full_Quiz;
    document.getElementById("submitButton").onclick = function () {
        getUserAnswers(array_of_radio_names);
        scoreQuiz(array_of_user_answers, array_of_correct_answers);
        location.href = "TrivaGame_Score.html";
        document.getElementById("id02").innerHTML = resultMessage + bonusMessage;
    }
}
    
//--------------------------------------------------------------------------------
//Main Start Point
let urlParams = new URLSearchParams(window.location.search);
let url = "https://opentdb.com/api.php?amount=10" + urlParams.getAll("results");
    
console.log("Making request...");

// Build the request as async
xmlhttp.open("GET", url, true);

// Send it off 
xmlhttp.send();