function compareNumbers(a, b) {
    return a - b;
}

function compareStrings(a, b) {
    let strA = a.toLowerCase();
    let strB = b.toLowerCase();

    if (strA < strB) return -1;

    if (strA > strB) return 1;

    return 0;
}

function compareDates(a, b) {
    return new Date(a) - new Date(b);
}