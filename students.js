/* global $ */
const COLUMS = 7;
let reverseFlag; // when set to 0 sorting is acending set to 1 = decending
let sortColumn; // each value[0 to 6] are each sortable column in the table
let students = [];
let deletedStudents = [];
let rowsOfStudentsToDisplay = 50;
let flag = true;

function renderTableHead() {
	let studentTableHead = [];
	let arrowsAssign = [];
	let arrow;
	const ARROWUP = "▲";
	const ARROWDOWN = "▼";

	let holder = "▷";
	for (let i = 0; i < COLUMS; i++) {
		arrowsAssign[i] = holder;
	}
	if (reverseFlag === 0) {
		arrow = ARROWUP;
	}
	else {
		arrow = ARROWDOWN;
	} // when set to 0 sortin is acending set to 1 = decending
	arrowsAssign[sortColumn] = arrow; // each value[0 to 6] are each sortable column in the table)

	studentTableHead.push(`
			<tr bgcolor="#337ab7">
				<th width='25px'></th>
              	<th width='25px'></th>
              	<th id="test" width="150px" class="clickable" onclick="sortFirstName()">Name${arrowsAssign [0]}</th>
			 	<th width="150px" class="clickable" onclick="sortStartDate()">Start Date ${arrowsAssign [2]}</th>
				<th width="250px">Street</th>
				<th width="150px" class="clickable" onclick="sortCity()">City ${arrowsAssign [3]}</th>
				<th width="100px" class="clickable" onclick="sortState()" |>State ${arrowsAssign [4]}</th>
				<th width="100px" class="clickable" onclick="sortZip()">Zip ${arrowsAssign [5]}</th>
				<th width="150px">Phone</th>
				<th width="150px" class="clickable" onclick="sortClass()">Class ${arrowsAssign [6]}</th>
			</tr>
		`);
	// }
	$('#studentTableView thead').html(studentTableHead.join(" "));
}

function renderTable() {
	setCookie("defaultViewCookie", "table", 30);
	renderTableHead();
	let content = '';
	for (let student of students) {
		let yearClass = "none";
		content += "<tr><td id='" + student.id + "' class='clickable clickDelete'><span class='glyphicon glyphicon-trash' title='Delete' data-toggle='tooltip' aria-label='Delete'></span>"
		content += "<td id='" + student.id + "'class='clickable clickEdit'><span class='glyphicon glyphicon-pencil' title='Edit' data-toggle='tooltip' aria-label='Edit'></span></td>";
		content += "<td>" + student.lname + ", " + student.fname + "</td>";
		content += "<td>" + student.startDate + "</td>";
		content += "<td>" + student.street + "</td>";
		content += "<td>" + student.city + "</td>";
		content += "<td>" + student.state + "</td>";
		content += "<td>" + student.zip + "</td>";
		content += "<td>" + student.phone + "</td>";
		if (student.year == "1") yearClass = "Freshman";
		else if (student.year == "2") yearClass = "Sophomore";
		else if (student.year == "3") yearClass = "Junior";
		else if (student.year == "4") yearClass = "Senior";
		content += "<td>" + yearClass + "</td></tr>";
	}
	$('#studentTableView tbody').html(content);
	$('#studentTilesView').hide();
	$('#studentTableView').show();
	$('#buttonTile').addClass('btn-primary');
	$('#buttonTable').addClass('btn-info');
	$('#buttonTable').removeClass('btn-primary');
	$('#buttonTile').removeClass('btn-info');

	$('.clickDelete').click(function() {
		deleteStudent($(this).attr('id'));
	});
	$('.clickEdit').click(function() {
		loadStudentData($(this).attr('id'));
	});
}

function renderTiles() {
	setCookie("defaultViewCookie", "tile", 30);
	let studentTiles = [];
	for (let student of students) {
		let yearClass = "none";
		if (student.year == "1") yearClass = "Freshman";
		else if (student.year == "2") yearClass = "Sophomore";
		else if (student.year == "3") yearClass = "Junior";
		else if (student.year == "4") yearClass = "Senior";

		studentTiles.push(`
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                <div class='panel panel-custom'>
                    <div class='panel-heading'><h3>${student.fname} ${student.lname}</h3></div>
                    <div class='panel-body'  style='height: 210px;'>
                        <div class='row'>
                            <div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                                Start Date: ${student.startDate}<br>
								Street: ${student.street}<br>
								City: ${student.city}<br>
								State: ${student.state}<br>
								Zip: ${student.zip}<br>
								Phone: ${student.phone}<br>
								Class: ${yearClass}<br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		`);
	}
	$('#studentTilesView').html(studentTiles.join(" "));
	$('#studentTableView').hide();
	$('#studentTilesView').show();
	$('#buttonTable').addClass('btn-primary');
	$('#buttonTile').addClass('btn-info');
	$('#buttonTile').removeClass('btn-primary');
	$('#buttonTable').removeClass('btn-info');
}

function loadStudentData(id) {
	document.getElementById("submitButton").onclick = function() {
		updateStudentInfo();
	}
	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students/${id}.json`,
		method: 'GET'
	}).then(function(student) {
		$("#field-fname").val(student.fname);
		$("#field-lname").val(student.lname);
		$("#field-startDate").val(student.startDate);
		$("#field-street").val(student.street);
		$("#field-city").val(student.city);
		$("#field-state").val(student.state);
		$("#field-zip").val(student.zip);
		$("#field-phone").val(student.phone);
		$("#field-year").prop('selectedIndex', student.year - 1);
		$("#field-id").val(id);
		viewModal();
	});
}

function deleteStudent(id) {
	$.get(`https://final-kellogg02.c9users.io/api/v1/students/${id}.json`, function(student) {
		deletedStudents.push(student);
	});
	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students/${id}.json`,
		type: 'DELETE',
		success: function() {
			students.remove(function(student) {
				return student.id === id;
			});
			renderTable();
		}
	});
}

function updateStudentInfo(studentData) {
	var updatedStudent = {};
	updatedStudent["fname"] = document.getElementById("field-fname").value;
	updatedStudent["lname"] = document.getElementById("field-lname").value;
	updatedStudent["startDate"] = document.getElementById("field-startDate").value;
	updatedStudent["street"] = document.getElementById("field-street").value;
	updatedStudent["city"] = document.getElementById("field-city").value;
	updatedStudent["state"] = document.getElementById("field-state").value;
	updatedStudent["zip"] = document.getElementById("field-zip").value;
	updatedStudent["phone"] = document.getElementById("field-phone").value;
	updatedStudent["year"] = document.getElementById("field-year").value;
	let id = document.getElementById("field-id").value;

	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students/${id}.json`,
		type: 'PUT',
		data: updatedStudent,
		dataType: 'json',
		success: function() {
			console.log(`Updated Student ${id} Successfully`);
			let student = students.find(x => x.id === id);
			let index = $(students).index(student);

			students[index] = updatedStudent;
			checkCookie();
		}
	});
}

function createStudent(studentData) {
	document.getElementById("submitButton").onclick = function() {
		addStudent(studentFromForm());
	};
	$("#field-fname").val('');
	$("#field-lname").val('');
	$("#field-startDate").val('');
	$("#field-street").val('');
	$("#field-city").val('');
	$("#field-state").val('');
	$("#field-zip").val('');
	$("#field-phone").val('');
	$("#field-year").prop('selectedIndex', 0);
	$("#field-id").val('');

	viewModal();
}

function addStudent(newStudent) {
	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students`,
		type: 'POST',
		data: newStudent,
		dataType: 'json',
		success: function(result) {
			console.log(`Student ${result} created successfully`);
			return result;
		}
	});
}

function studentFromForm() {
	let newStudent = {};
	newStudent["fname"] = document.getElementById("field-fname").value;
	newStudent["lname"] = document.getElementById("field-lname").value;
	newStudent["startDate"] = document.getElementById("field-startDate").value;
	newStudent["street"] = document.getElementById("field-street").value;
	newStudent["city"] = document.getElementById("field-city").value;
	newStudent["state"] = document.getElementById("field-state").value;
	newStudent["zip"] = document.getElementById("field-zip").value;
	newStudent["phone"] = document.getElementById("field-phone").value;
	newStudent["year"] = document.getElementById("field-year").value;
	return newStudent;
}

function restoreStudent() {
	if (deletedStudents.length < 1) {
		return console.log('All students have been restored');
	}
	let student = deletedStudents.pop();
	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students`,
		type: 'POST',
		data: student,
		dataType: 'json',
		success: function(result) {
			console.log(`Student ${result} created successfully`);
			student['id'] = result;
			students.push(student);
			checkCookie();
		}
	});
	// checkCookie();
}

function viewModal() {
	$('#editModal').modal({
		backdrop: 'static',
		keyboard: false
	});
}

function sortFirstName() {
	$('.clickTableHead').hide();
	if (sortColumn === 0 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			compareStrings(studentA.fname, studentB.fname);
		}).reverse();

		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.lname, studentB.lname);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			compareStrings(studentA.fname, studentB.fname);
		});

		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.lname, studentB.lname);
		});

		$('#fnameHead').show();
		reverseFlag = 0;
	}
	sortColumn = 0;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function sortLastName() {
	$('.clickTableHead').hide();
	if (sortColumn === 1 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.lname, studentB.lname);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.lname, studentB.lname);
		});
		$('#lnameHead').show();
		reverseFlag = 0;
	}
	sortColumn = 1;
	renderTable();
}

function sortStartDate() {
	if (sortColumn === 2 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareDates(studentA.startDate, studentB.startDate);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareDates(studentA.startDate, studentB.startDate);
		});
		reverseFlag = 0;
	}
	sortColumn = 2;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function sortCity() {
	if (sortColumn === 3 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.city, studentB.city);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.city, studentB.city);
		});
		reverseFlag = 0;
	}
	sortColumn = 3;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function sortState() {
	if (sortColumn === 4 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.state, studentB.state);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareStrings(studentA.state, studentB.state);
		});
		reverseFlag = 0;
	}
	sortColumn = 4;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function sortZip() {
	if (sortColumn === 5 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareNumbers(studentA.zip, studentB.zip);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareNumbers(studentA.zip, studentB.zip);
		});
		reverseFlag = 0;
	}
	sortColumn = 5;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function sortClass() {
	if (sortColumn === 6 && reverseFlag === 0) {
		students.sort(function(studentA, studentB) {
			return compareNumbers(studentA.year, studentB.year);
		}).reverse();
		reverseFlag = 1;
	}
	else {
		students.sort(function(studentA, studentB) {
			return compareNumbers(studentA.year, studentB.year);
		});
		reverseFlag = 0;
	}
	sortColumn = 6;
	renderTable();
	setCookie("sortColumnCookie", sortColumn, 30);
	setCookie("sortOrderCookie", reverseFlag, 30);
}

function setCookie(cookieName, cookieValue, expireDays) {
	let d = new Date();
	d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toGMTString();
	document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

function getCookie(cookieName) {
	let name = cookieName + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let defaultView = getCookie("defaultViewCookie");
	if (defaultView === "tile") {
		renderTiles();
		$('.tableView').hide();
		$('#studentTableView').hide();
		$('#studentTableHead').hide();
		$('#studentTilesView').show();
		$('.tileView').show();
		$('#buttonTile').addClass('btn-info');
		$('#buttonTable').addClass('btn-primary');
	}
	else {
		sortColumn = getCookie("sortColumnCookie");
		reverseFlag = getCookie("sortOrderCookie");
		(sortColumn + ", " + reverseFlag);
		if (reverseFlag === "0") {
			reverseFlag = 1;
		}
		else {
			reverseFlag = 0;
		}
		if (sortColumn === "0") {
			sortColumn = 0;
		}
		if (sortColumn === "1") {
			sortColumn = 1;
		}
		if (sortColumn === "2") {
			sortColumn = 2;
		}
		if (sortColumn === "3") {
			sortColumn = 3;
		}
		if (sortColumn === "4") {
			sortColumn = 4;
		}
		if (sortColumn === "5") {
			sortColumn = 5;
		}
		if (sortColumn === "6") {
			sortColumn = 6;
		}

		switch (sortColumn) {
			case 0:
				sortFirstName();
				break;
			case 1:
				sortLastName();
				break;
			case 2:
				sortStartDate();
				break;
			case 3:
				sortCity();
				break;
			case 4:
				sortState();
				break;
			case 5:
				sortZip();
				break;
			case 6:
				sortClass();
				break;
			default:
				break;
		}
		
		renderTable();
		$('#studentTilesView').hide();
		$('.tileView').hide();
		$('.tableView').show();
		$('#studentTableView').show();
		$('#studentTableHead').show();
		$('#buttonTile').addClass('btn-primary');
		$('#buttonTable').addClass('btn-info');
	}
}

function getListOfStudents() {
	$('#myModal').modal('show')
	$.ajax({
		url: 'https://final-kellogg02.c9users.io/api/v1/students.json'
	}).done(function(studentsIdList) { //save as a varibale and only update when a new student is created or deleted a student. StudentIDList is global
		getPagedStudents(studentsIdList);
	});
}

function getStudent(studentId) {
	$.ajax({
		url: `https://final-kellogg02.c9users.io/api/v1/students/${studentId}`
	}).then(function(student) {
		students.push(student);
		student["id"] = studentId.replace('.json', '');
		$('#studentTilesView').hide();
		$('.tileView').hide();
		checkCookie();
		$('#myModal').modal('hide')
	});
}

function getPagedStudents(studentIds) {
		let progressBarStatus = 0;
	for (let id of studentIds.slice(0, rowsOfStudentsToDisplay)) { //limit paging
		getStudent(id);
		progressBarStatus += 1;
		document.getElementById("progressBar").setAttribute("style", `${progressBarStatus}%`);
	}
}

$(document).ready(function() {
	getListOfStudents();
});