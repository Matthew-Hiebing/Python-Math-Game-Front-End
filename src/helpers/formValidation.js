import { validate, numericality } from 'validate.js'


function answerValidator(user_input) {
    let constraints = {
        mathGameinput: {
            numericality: {
                onlyInteger: true,
                // message: "You must enter an integer!"
            },
            length: {
                minimum: 0,
                maximum: 3,
                message: "You are only allowed to enter an answer length between 0 and 3!"
            }
        }
    };

    validate({ userAnswer: user_input }, constraints);
}

export default answerValidator