var fs = require('fs');

var students;
    
// students = JSON.parse(fs.readFileSync('students.json'));
fs.readFile('/home/ubuntu/workspace/server/students.json', (err, data) => {
    if (err) throw err;
    
    students = JSON.parse(data);
    
        for (var student of students){
            var fileName= student.id;
            delete student['id'];
            
        fs.writeFile(`/home/ubuntu/workspace/server/students/${fileName}.json`, JSON.stringify(student, null, 3));
    }
});