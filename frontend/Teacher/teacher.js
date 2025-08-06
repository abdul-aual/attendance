    const today = new Date();
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('todayDate').textContent = today.toLocaleDateString('en-GB', dateOptions);

    function updateTime() {
      const now = new Date();
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      document.getElementById('currentTime').textContent = formattedTime;
    }
    updateTime();
    setInterval(updateTime, 1000);

    const LoggedUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (LoggedUser && LoggedUser.length > 0) {
      const user = LoggedUser[0];
      document.getElementById('userName').textContent = `Teacher : ${user.userName}`;
      document.getElementById('userId').textContent = `ID: ${user.userId}`;
      document.getElementById('userImage').src = user.userImage;
    } else {
      alert("No user info found. Please log in again.");
      window.location.href = '../index.html';
    }

    function logout() {
      localStorage.removeItem('LoggedInUser');
      window.location.href = '../index.html';
    }


    function toggleAttendanceForm() {
      const user =  LoggedUser[0];
      if(user.userId===1002){

        const form = document.getElementById('attendanceForm');
      const isVisible = form.style.display === 'flex';

      if (isVisible) {
        form.style.display = 'none';
      } else {
        form.style.display = 'flex';

      
        setTimeout(() => {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      }
      
    }

    // view records;

    function toggleRecords(){
      const user =  LoggedUser[0];
      if(user.userId===1002){

        const records = document.getElementById('viewRecords');
        const isVisible = records.style.display ==='flex';

      if (isVisible) {
        records.style.display = 'none';
      } else {
        records.style.display = 'flex';

      
        setTimeout(() => {
          records.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      }
    }


    const selectedElement = document.getElementById('classSelect');
    const attendanceDateInput = document.getElementById('attendanceDate');

    selectedElement.addEventListener('change', ()=>{
       const selectedClass = selectedElement.value;
       localStorage.setItem('selectedClass', selectedClass);
    });
    attendanceDateInput.addEventListener('change', ()=>{
      const selectedDate = attendanceDateInput.value;
      localStorage.setItem('selectedDate',selectedDate);
    });


  
    function goToAttendancePage() {
      const selectedClass = document.getElementById('classSelect').value;
      const selectedDate = document.getElementById('attendanceDate').value;

      if (!selectedClass || !selectedDate) {
        alert("Please select both class and date.");
        return;
      }
  
      window.location.href = `/frontend/attendance/attendance.html`;
    }

