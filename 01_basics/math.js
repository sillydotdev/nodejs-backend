function add(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

module.exports = {
    add, 
    sub
}

// another way
// exports.add = (a, b) => a + b;
// exports.add = (a, b) => a - b;