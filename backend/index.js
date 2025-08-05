// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'postbook2'
// }); 

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         throw err;
//     } else {
//         console.log('Database connected successfully');
//     }
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// app.post('/getUserInfo', (req,res)=>{
// const {inputId, inputPassword} = req.body;

// const getUserInfosql = `SELECT userId,userName,userImage FROM users WHERE users.userId=? AND users.userPassword=?`;
// let query = db.query(getUserInfosql, [inputId,inputPassword], (err,result)=>{
//     if(err){
//         console.log('error getting info from server:', err);
//         throw err;
//     }else{
//         res.send(result)
//     }
// });

// });


  

// app.post('/studentsList', (req, res) => {
//     const { class: selectedClass, userId } = req.body;
  
//     const sql1 = "SELECT name, roll FROM students WHERE class = ? ORDER BY roll ASC;";
//     const sql2 = "SELECT subject, subject_code FROM teacher_subject WHERE userId = ? AND class = ?;";
  
//     db.query(sql1, [selectedClass], (err1, studentResults) => {
//       if (err1) {
//         console.error('Error fetching students:', err1);
//         return res.status(500).json({ error: 'Database error (students)' });
//       }
  
//       db.query(sql2, [userId, selectedClass], (err2, subjectResults) => {
//         if (err2) {
//           console.error('Error fetching subjects:', err2);
//           return res.status(500).json({ error: 'Database error (subjects)' });
//         }
  
//         res.json({
//           students: studentResults,
//           subjects: subjectResults
//         });
//       });
//     });
//   });

  
  
//   app.post('/submitAttendanceNinePhy', (req, res) => {
//     const { attendanceData } = req.body;
  
//     if (!attendanceData || !Array.isArray(attendanceData)) {
//       return res.status(400).json({ success: false, message: 'Invalid attendance data' });
//     }
  
//     const sql = `INSERT INTO ninePhy (student_name, roll, attendance_date, status) VALUES ?`;
  
//     const values = attendanceData.map(item => [
//       item.student_name,
//       item.roll,
//       item.attendance_date,
//       item.status
//     ]);
  
//     db.query(sql, [values], (err, result) => {
//       if (err) {
//         console.error('Error inserting attendance:', err);
//         return res.status(500).json({ success: false, message: 'Database error' });
//       }
  
//       res.json({ success: true, message: 'Attendance recorded for class Nine Physics' });
//     });
//   });
  
//   // New route: check if attendance exists for given date
// app.get('/attendanceStatus', (req, res) => {
//   const date = req.query.date;
//   const sql = 'SELECT COUNT(*) AS count FROM ninePhy WHERE attendance_date = ?';
//   db.query(sql, [date], (err, results) => {
//       if (err) return res.status(500).json({ success: false, message: 'Database error' });
//       const exists = results[0].count > 0;
//       res.json({ exists });
//   });
// });

// // New route: get attendance records by date (for editing)
// app.post('/getAttendanceByDate', (req, res) => {
//   const { attendance_date } = req.body;
//   const sql = 'SELECT student_name, roll, attendance_date, status FROM ninePhy WHERE attendance_date = ? ORDER BY roll';
//   db.query(sql, [attendance_date], (err, results) => {
//       if (err) return res.status(500).json({ success: false, message: 'Database error' });
//       res.json({ success: true, attendance: results });
//   });
// });

// // New route: update attendance records (edit attendance)
// app.post('/updateAttendanceNinePhy', (req, res) => {
//   const { attendanceData } = req.body;

//   if (!attendanceData || !Array.isArray(attendanceData)) {
//       return res.status(400).json({ success: false, message: 'Invalid attendance data' });
//   }

//   // Update attendance records one by one
//   const promises = attendanceData.map(item => {
//       return new Promise((resolve, reject) => {
//           const sql = 'UPDATE ninePhy SET status = ? WHERE roll = ? AND attendance_date = ?';
//           db.query(sql, [item.status, item.roll, item.attendance_date], (err, result) => {
//               if (err) reject(err);
//               else resolve(result);
//           });
//       });
//   });

//   Promise.all(promises)
//       .then(() => {
//           res.json({ success: true, message: 'Attendance updated successfully' });
//       })
//       .catch(err => {
//           console.error('Error updating attendance:', err);
//           res.status(500).json({ success: false, message: 'Database error' });
//       });
// });

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
    database: 'postbook2'  // your DB name
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

// User login info route
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

// Get students and subjects for a class & teacher
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

// Insert attendance for ninephy
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

// Insert attendance for tenphy
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
