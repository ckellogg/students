var fs = require('fs');
var students;

// students = JSON.parse(fs.readFileSync('students.json'));
fs.readFile('../server/students.json', (err, data) => {
    if (err) throw err;

    students = JSON.parse(data);
    var IDnum = 1;
    for (var student of students) {
        var formatedString = '0000000' + IDnum;
        student["id"] = formatedString.slice(-4);
        IDnum++;
        // delete student["ID"];
    }
    fs.writeFile('../server/students.json', JSON.stringify(students, null, 3));
})