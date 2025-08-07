const userString = localStorage.getItem('LoggedInUser');
if (!userString) {
  alert("You must log in first.");
  window.location.href = '../index.html'; 
  throw new Error("Unauthorized - No user logged in");
}

const userData = JSON.parse(userString);
const userId = userData[0]?.userId;

if (userId !== 1002) {
  alert("You are not authorized to access this page.");
  window.location.href = '../index.html'; 
  throw new Error("Unauthorized access");
}



const callClass = localStorage.getItem('selectedClass');
const classConvert = { '9': 'Nine', '10': 'Ten' };
const selectedDate = localStorage.getItem('selectedDate');
const className = classConvert[callClass];

document.getElementById('className').textContent = 'Class : ' + className;
document.getElementById('selectedDate').textContent = 'Date: ' + selectedDate;

const studentsDiv = document.getElementById('studentsList');
const submitContainer = document.querySelector('.submit-container');


const messageContainer = document.createElement('div');
messageContainer.style.margin = '20px auto';
messageContainer.style.textAlign = 'center';
messageContainer.style.fontSize = '1.2rem';
messageContainer.style.color = '#333';
submitContainer.parentNode.insertBefore(messageContainer, submitContainer.nextSibling);



function getApiEndpoints(classNumber) {
  if (classNumber === '9') {
    return {
      submit: 'http://localhost:5000/submitAttendanceNinePhy',
      update: 'http://localhost:5000/updateAttendanceNinePhy',
      check: 'http://localhost:5000/attendanceStatusNinePhy',
      fetch: 'http://localhost:5000/getAttendanceByDateNinePhy',
    };
  } else if (classNumber === '10') {
    return {
      submit: 'http://localhost:5000/submitAttendanceTenPhy',
      update: 'http://localhost:5000/updateAttendanceTenPhy',
      check: 'http://localhost:5000/attendanceStatusTenPhy',
      fetch: 'http://localhost:5000/getAttendanceByDateTenPhy',
    };
  } else {
    throw new Error('Unsupported class number');
  }
}

function renderStudents(students, existingAttendance = []) {
  studentsDiv.innerHTML = ''; 
  students.forEach((student, index) => {
    const studentDiv = document.createElement('div');
    studentDiv.classList.add('child');

    const rollDiv = document.createElement('div');
    rollDiv.textContent = student.roll;

    const nameDiv = document.createElement('div');
    nameDiv.textContent = student.name;

    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status-container');

    const absentWrap = document.createElement('div');
    const absentBtn = document.createElement('button');
    absentBtn.classList.add('absent-btn');
    absentBtn.textContent = 'Absent';

    const presentWrap = document.createElement('div');
    const presentBtn = document.createElement('button');
    presentBtn.classList.add('present-btn');
    presentBtn.textContent = 'Present';

    const defaultBg = (index % 2 === 1) ? 'white' : 'lightgray';
    absentBtn.style.backgroundColor = defaultBg;
    presentBtn.style.backgroundColor = defaultBg;
    absentBtn.style.color = 'black';
    presentBtn.style.color = 'black';

    // Check existing attendance status for this student
    const attendanceRecord = existingAttendance.find(a => Number(a.roll) === Number(student.roll));
    if (attendanceRecord) {
      if (attendanceRecord.status === 'Present') {
        presentBtn.style.backgroundColor = '#28a745';
        presentBtn.style.color = 'white';
        absentBtn.style.backgroundColor = defaultBg;
        absentBtn.style.color = 'black';
        studentDiv.dataset.status = 'Present';
      } else if (attendanceRecord.status === 'Absent') {
        absentBtn.style.backgroundColor = '#dc3545';
        absentBtn.style.color = 'white';
        presentBtn.style.backgroundColor = defaultBg;
        presentBtn.style.color = 'black';
        studentDiv.dataset.status = 'Absent';
      }
    } else {
      studentDiv.dataset.status = '';
    }

    absentBtn.addEventListener('click', () => {
      absentBtn.style.backgroundColor = '#dc3545';
      absentBtn.style.color = 'white';

      presentBtn.style.backgroundColor = defaultBg;
      presentBtn.style.color = 'black';

      studentDiv.dataset.status = 'Absent';
    });

    presentBtn.addEventListener('click', () => {
      presentBtn.style.backgroundColor = '#28a745';
      presentBtn.style.color = 'white';

      absentBtn.style.backgroundColor = defaultBg;
      absentBtn.style.color = 'black';

      studentDiv.dataset.status = 'Present';
    });

    absentWrap.appendChild(absentBtn);
    presentWrap.appendChild(presentBtn);
    statusDiv.appendChild(absentWrap);
    statusDiv.appendChild(presentWrap);

    studentDiv.appendChild(rollDiv);
    studentDiv.appendChild(nameDiv);
    studentDiv.appendChild(statusDiv);

    studentsDiv.appendChild(studentDiv);
  });
}


function fetchStudentsAndSubjects() {
  return fetch('http://localhost:5000/studentsList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ class: callClass, userId }),
  })
    .then(res => res.json());
}


function fetchExistingAttendance() {
  const endpoints = getApiEndpoints(callClass);
  return fetch(endpoints.fetch, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance_date: selectedDate }),
  })
    .then(res => res.json())
    .then(data => data.attendance || []);
}


function checkAttendanceExists() {
  const endpoints = getApiEndpoints(callClass);
  return fetch(`${endpoints.check}?date=${selectedDate}`)
    .then(res => res.json())
    .then(data => data.exists)
    .catch(() => false);
}


async function init() {
  document.getElementById('subjectName').textContent = 'Loading...';
  document.getElementById('totalStudents').textContent = 'Loading...';

  const attendanceExists = await checkAttendanceExists();
  const data = await fetchStudentsAndSubjects();

  document.getElementById('subjectName').textContent = `${data.subjects[0].subject} (${data.subjects[0].subject_code})`;
  document.getElementById('totalStudents').textContent = `Total Students: ${data.students.length}`;

  if (attendanceExists) {

    messageContainer.innerHTML = `
      Attendance for ${selectedDate} is completed. 
      <button id="edit-btn">Edit Attendance</button>
      <a href="http://127.0.0.1:5500/frontend/Teacher/teacherPanel.html" id="panel-btn" style="margin-left: 10px;">
        <button id='panel-bt' >Go to Panel</button>
      </a>
    `;

    submitContainer.style.display = 'none';
    studentsDiv.style.display = 'none';

    document.getElementById('edit-btn').addEventListener('click', async () => {
      messageContainer.innerHTML = '';
      submitContainer.style.display = 'block';
      studentsDiv.style.display = 'block';

      const existingAttendance = await fetchExistingAttendance();
      renderStudents(data.students, existingAttendance);
    });
  } else {
    messageContainer.innerHTML = '';
    submitContainer.style.display = 'block';
    studentsDiv.style.display = 'block';
    renderStudents(data.students);
  }
}


document.getElementById('submit-btn').addEventListener('click', async () => {
  const studentDivs = Array.from(document.querySelectorAll('.child'));
  const unmarked = studentDivs.filter(div => div.dataset.status === '');
  if (unmarked.length > 0) {
    alert('Please mark all students Present or Absent before submitting.');
    return;
  }

  const attendanceData = studentDivs.map(div => ({
    student_name: div.children[1].textContent,
    roll: Number(div.children[0].textContent),
    attendance_date: selectedDate,
    status: div.dataset.status,
  }));

  const attendanceExists = await checkAttendanceExists();
  const endpoints = getApiEndpoints(callClass);

  const url = attendanceExists
    ? endpoints.update
    : endpoints.submit;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendanceData }),
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        messageContainer.innerHTML = `
          Attendance for ${selectedDate} is completed. 
          <button id="edit-btn">Edit Attendance</button>
          <a href="http://127.0.0.1:5500/frontend/Teacher/teacherPanel.html" id="panel-btn" style="margin-left: 10px;">
            <button id='panel-bt'>Go to Panel</button>
          </a>
        `;
        submitContainer.style.display = 'none';
        studentsDiv.style.display = 'none';

        document.getElementById('edit-btn').addEventListener('click', async () => {
          messageContainer.innerHTML = '';
          submitContainer.style.display = 'block';
          studentsDiv.style.display = 'block';

          const data = await fetchStudentsAndSubjects();
          const existingAttendance = await fetchExistingAttendance();
          renderStudents(data.students, existingAttendance);
        });
      } else {
        alert('Error: ' + response.message);
      }
    })
    .catch(err => {
      console.error('Error submitting attendance:', err);
      alert('Error submitting attendance.');
    });
});

init();
