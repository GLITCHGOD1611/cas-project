const express = require('express');
const cors = require('cors'); // Importing CORS for Cross-Origin Resource Sharing
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoutes');
const hodRoutes = require('./routes/hodRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const courseRoutes = require('./routes/courseRoute'); 
const subjectsRoutes = require('./routes/subjectsRoutes');
const announcementsRoutes = require('./routes/announcementsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const examRoutes = require('./routes/examRoutes');
const resultRoutes = require('./routes/resultRoutes');
const studentprofileRoutes = require('./routes/studentprofileroute');
const tprRout = require('./routes/tpr');
const teacherdashboardRout = require('./routes/teacherdashboardRout');

const app = express();

// Enable CORS for all routes
app.use(
    cors({
        origin: '*',// Only allow requests from your Angular frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded data

// Register routes
app.use('/api/admin', adminRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api', announcementsRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', examRoutes);
app.use('/api', resultRoutes);
app.use('/api/studentprofile', studentprofileRoutes); 
app.use('/api/teacherprofile', tprRout);
app.use('/api', teacherdashboardRout);



app.use('/api', attendanceRoutes);


// Default 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ success: false, message: 'Something went wrong', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
