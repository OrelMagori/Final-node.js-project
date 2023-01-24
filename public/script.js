function get() {
  // XMLHttpRequest -
  let req = new XMLHttpRequest();

  // XMLHttpRequest.open(method: string, url: string)
  req.open("GET", "http://localhost:3000/students");

  req.onreadystatechange = () => {
    // readyState of 4 - DONE (operation is complete).
    if (req.readyState === 4) {
      // req.response - is the data that returns from the address
      // JSON.parse() - convert to array.
      let arr = JSON.parse(req.response);

      let result = "";
      result += `<th>Name</th>
                 <th>Age</th>
                 <th>Degree</th>
                 <th>Average</th>
                 <th>Edit</th>
                 <th>Delete</th>`;

      for (const student of arr) {
        // tr -> table row, td -> table data(cell)
        result += `
                <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.degree}</td>
                <td>${student.avg}</td>
                <td><button onclick="put('${student.name}'), seccessUpdate()" class="btn btn-outline-primary text-center">Edit Average</button></td>
                <td><button onclick="deleteStudent('${student.name}'), seccessDelete()" class="btn btn-outline-danger text-center">Delete</button></td>
                </tr>
                `;
      }
      document.getElementById("students").innerHTML = result;
    }
  };
  req.send();
}

function post() {
  // get all the values from the user
  let studentName = document.getElementById("studentName").value;
  let studentAge = document.getElementById("studentAge").value;
  let studentDegree = document.getElementById("studentDegree").value;
  let studentAvg = document.getElementById("studentAvg").value;

  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/students/add");

  req.onreadystatechange = () => {
    // when we finish adding new student - call the student's list again
    if (req.readyState === 4) get();
  };

  // define header of request
  req.setRequestHeader("Content-type", "application/json");
  // send the values from user with request:
  // in req.send() - we can add the body
  req.send(
    JSON.stringify({
      name: studentName,
      age: studentAge,
      degree: studentDegree,
      avg: studentAvg,
    })
  );
}

function put(StudentName) {
  let input = prompt("Enter a new Average"); // input from user:

  let req = new XMLHttpRequest(); // מאפשר לגשת לכתובת באינטרנט ולקבל את הנתונים שבתוכה
  req.open("PUT", `http://localhost:3000/students/update/${StudentName}`);

  // after update - refresh the table:
  req.onreadystatechange = () => {
    if (req.readyState === 4) get();
  };

  // define header of request
  req.setRequestHeader("Content-type", "application/json");
  // send the values from user with request:
  // in req.send() - we can add the body
  req.send(JSON.stringify({ newAvg: input }));
}

function deleteStudent(studentName) {
  //let param = Number(param);
  let req = new XMLHttpRequest();
  req.open("DELETE", `http://localhost:3000/students/delete/${studentName}`);
  // show the updated table after request is sent.
  req.onreadystatechange = () => {
    if (req.readyState === 4) get();
  };
  req.send();
}

