const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'postbook2'  
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        throw err;
    } else {
        console.log('Database connected successfully');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.post('/getUserInfo', (req,res)=>{
    const {inputId, inputPassword} = req.body;
    const getUserInfosql = `SELECT userId,userName,userImage FROM users WHERE userId=? AND userPassword=?`;
    db.query(getUserInfosql, [inputId,inputPassword], (err,result)=>{
        if(err){
            console.log('error getting info from server:', err);
            return res.status(500).send('Database error');
        }
        res.send(result);
    });
});


app.post('/studentsList', (req, res) => {
    const { class: selectedClass, userId } = req.body;

    const sql1 = "SELECT name, roll FROM students WHERE class = ? ORDER BY roll ASC;";
    const sql2 = "SELECT subject, subject_code FROM teacher_subject WHERE userId = ? AND class = ?;";

    db.query(sql1, [selectedClass], (err1, studentResults) => {
        if (err1) {
            console.error('Error fetching students:', err1);
            return res.status(500).json({ error: 'Database error (students)' });
        }

        db.query(sql2, [userId, selectedClass], (err2, subjectResults) => {
            if (err2) {
                console.error('Error fetching subjects:', err2);
                return res.status(500).json({ error: 'Database error (subjects)' });
            }

            res.json({
                students: studentResults,
                subjects: subjectResults
            });
        });
    });
});


// ---- NINE PHY ATTENDANCE ROUTES ----


app.post('/submitAttendanceNinePhy', (req, res) => {
    const { attendanceData } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        return res.status(400).json({ success: false, message: 'Invalid attendance data' });
    }

    const sql = `INSERT INTO ninephy (student_name, roll, attendance_date, status) VALUES ?`;
    const values = attendanceData.map(item => [
        item.student_name,
        item.roll,
        item.attendance_date,
        item.status
    ]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting attendance for ninephy:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Attendance recorded for class Nine Physics' });
    });
});

// Check if attendance exists for ninephy by date
app.get('/attendanceStatusNinePhy', (req, res) => {
    const date = req.query.date;
    const sql = 'SELECT COUNT(*) AS count FROM ninephy WHERE attendance_date = ?';
    db.query(sql, [date], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        const exists = results[0].count > 0;
        res.json({ exists });
    });
});

// Get attendance by date for ninephy
app.post('/getAttendanceByDateNinePhy', (req, res) => {
    const { attendance_date } = req.body;
    const sql = 'SELECT student_name, roll, attendance_date, status FROM ninephy WHERE attendance_date = ? ORDER BY roll';
    db.query(sql, [attendance_date], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        res.json({ success: true, attendance: results });
    });
});

// Update attendance for ninephy
app.post('/updateAttendanceNinePhy', (req, res) => {
    const { attendanceData } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        return res.status(400).json({ success: false, message: 'Invalid attendance data' });
    }

    const promises = attendanceData.map(item => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE ninephy SET status = ? WHERE roll = ? AND attendance_date = ?';
            db.query(sql, [item.status, item.roll, item.attendance_date], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    });

    Promise.all(promises)
        .then(() => {
            res.json({ success: true, message: 'Attendance updated successfully for Nine Physics' });
        })
        .catch(err => {
            console.error('Error updating attendance for ninephy:', err);
            res.status(500).json({ success: false, message: 'Database error' });
        });
});


// ---- TEN PHY ATTENDANCE ROUTES ----

app.post('/submitAttendanceTenPhy', (req, res) => {
    const { attendanceData } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        return res.status(400).json({ success: false, message: 'Invalid attendance data' });
    }

    const sql = `INSERT INTO tenphy (student_name, roll, attendance_date, status) VALUES ?`;
    const values = attendanceData.map(item => [
        item.student_name,
        item.roll,
        item.attendance_date,
        item.status
    ]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting attendance for tenphy:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Attendance recorded for class Ten Physics' });
    });
});

// Check if attendance exists for tenphy by date
app.get('/attendanceStatusTenPhy', (req, res) => {
    const date = req.query.date;
    const sql = 'SELECT COUNT(*) AS count FROM tenphy WHERE attendance_date = ?';
    db.query(sql, [date], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        const exists = results[0].count > 0;
        res.json({ exists });
    });
});

// Get attendance by date for tenphy
app.post('/getAttendanceByDateTenPhy', (req, res) => {
    const { attendance_date } = req.body;
    const sql = 'SELECT student_name, roll, attendance_date, status FROM tenphy WHERE attendance_date = ? ORDER BY roll';
    db.query(sql, [attendance_date], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        res.json({ success: true, attendance: results });
    });
});

// Update attendance for tenphy
app.post('/updateAttendanceTenPhy', (req, res) => {
    const { attendanceData } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        return res.status(400).json({ success: false, message: 'Invalid attendance data' });
    }

    const promises = attendanceData.map(item => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE tenphy SET status = ? WHERE roll = ? AND attendance_date = ?';
            db.query(sql, [item.status, item.roll, item.attendance_date], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    });

    Promise.all(promises)
        .then(() => {
            res.json({ success: true, message: 'Attendance updated successfully for Ten Physics' });
        })
        .catch(err => {
            console.error('Error updating attendance for tenphy:', err);
            res.status(500).json({ success: false, message: 'Database error' });
        });
});




// Route to get monthly attendance report
app.post('/getMonthlyReport', (req, res) => {
    let { selectedClass, selectedMonth } = req.body;
  
    if (!selectedClass || !selectedMonth) {
      return res.status(400).json({ success: false, message: 'Missing class or month' });
    }
  
    selectedClass = selectedClass.toString().trim();
    selectedMonth = parseInt(selectedMonth, 10);
  
    if (isNaN(selectedMonth) || selectedMonth < 1 || selectedMonth > 12) {
      return res.status(400).json({ success: false, message: 'Invalid month value' });
    }
  
    let tableName;
    if (selectedClass === '9') {
      tableName = 'ninephy';
    } else if (selectedClass === '10') {
      tableName = 'tenphy';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid class' });
    }
  
    const getDatesSQL = `
      SELECT DISTINCT attendance_date
      FROM \`${tableName}\`
      WHERE MONTH(attendance_date) = ?
      ORDER BY attendance_date ASC
    `;
  
    db.query(getDatesSQL, [selectedMonth], (err, dateResults) => {
      if (err) {
        console.error('Error fetching dates:', err);
        return res.status(500).json({ success: false, message: 'Database error (dates)' });
      }
  
      if (dateResults.length === 0) {
        return res.json({ success: true, message: 'No attendance records for this month', data: { dates: [], students: [] } });
      }
  
      const workingDates = dateResults.map(row => new Date(row.attendance_date).toISOString().slice(0, 10));
  
      const getAttendanceSQL = `
        SELECT student_name, roll, attendance_date, status
        FROM \`${tableName}\`
        WHERE MONTH(attendance_date) = ?
        ORDER BY roll ASC, attendance_date ASC
      `;
  
      db.query(getAttendanceSQL, [selectedMonth], (err2, attendanceResults) => {
        if (err2) {
          console.error('Error fetching attendance:', err2);
          return res.status(500).json({ success: false, message: 'Database error (attendance)' });
        }
  
        const reportMap = {};
  
        attendanceResults.forEach(row => {
          const dateKey = new Date(row.attendance_date).toISOString().slice(0, 10);
          if (!reportMap[row.roll]) {
            reportMap[row.roll] = {
              student_name: row.student_name,
              roll: row.roll,
              statusByDate: {}
            };
          }
          reportMap[row.roll].statusByDate[dateKey] = row.status || 'A';
        });
  
        const finalReport = {
          dates: workingDates,
          students: Object.values(reportMap)
        };
  
        res.json({ success: true, data: finalReport });
      });
    });
  });
  

  //new backend after creating 

  app.post('/create-user', (req, res) => {
    const { userName, userPassword, userImage } = req.body;
  
    if (!userName || !userPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const sql = `INSERT INTO users(userName, userPassword, userImage) VALUES (?, ?, ?)`;
  
    db.query(sql, [userName, userPassword, userImage || null], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      const newUserId = result.insertId;
      res.status(201).json({ message: 'User created', userId: newUserId });
    });
  });
  
  