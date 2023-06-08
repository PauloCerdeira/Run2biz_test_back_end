function isValidPassword(password, exactlyOneGroup) {
    let splitPassword = password.toString().split("");
    let hasAdjacentDigits = false;
    let n1 = null;
    let n2 = null;

    for (let [i, char] of splitPassword.entries()) {
        if (!n1) {
            n1 = char;
            continue;
        } else if (!n2) {
            n2 = char;

            // Starting from left to right,
            // digits only increase or stay the same
            if (n1 > n2) {
                return false;
            }

            if (n1 === n2) {
                // You must have at least one group of exactly two of the same characters
                if (exactlyOneGroup) {
                    if (splitPassword[i + 1] != n2 && splitPassword[i - 2] != n2) {
                        // At least two adjacent digits must be the same (like 22 in 122346).
                        hasAdjacentDigits = true;
                    }
                } else {
                    hasAdjacentDigits = true;
                }
            }
            n1 = n2;
            n2 = null;
        }
    }
    return hasAdjacentDigits;
}

function findPossiblePasswords({ min = 184759, max = 856920, exactlyOneGroup = 1 } = {}) {
    // The password must be between 184759-856920.
    let count = 0;
    let list = ''

    for (let password = min; password <= max; password++) {
        if (isValidPassword(password, exactlyOneGroup)) {
            count++;
            list += (password + '\n')
        }
    }

    return { count: count, list }
}

function calcAddress(commands) {
    let address = 0
    let skip = 0
    let splitCommands = commands.trim().split('\n')
    let history = []
    for (let command of splitCommands) {
        if (skip) {
            skip--
            history.push({ command, value: "Skipped" })
            continue
        }
        if (command.slice(0, 1) == "5") {
            history.push({ command: command.slice(0, 1), value: parseInt(command.slice(1)) })
            skip = parseInt(command.slice(1)) - 1
        } else if (command.slice(0, 2) == "20") {
            history.push({ command: command.slice(0, 2), value: parseInt(command.slice(2))})
            address += parseInt(command.slice(2))
        } else {
            history.push({ command, value: 'invalid' })
        }
    }
    return { address, history }
}

export { findPossiblePasswords, calcAddress };
