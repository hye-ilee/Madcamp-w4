const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Student = require('./models/student');
const Lab = require('./models/lab');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*"}));
// app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/register', async (req, res) => {
    const { email, password, accountType } = req.body;
    if (!['student', 'lab'].includes(accountType)) {
        return res.status(400).json({ message: 'Invalid account type. Please select either "student" or "lab".' });
    }
    const newUser = new User({
        accountType: accountType,
        email: email,
        password: password,
    });

    try {
        const savedUser = await newUser.save();
        return res.status(201).json({ message: 'User registered successfully. Please proceed with further details.', userId: savedUser._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering user' });
    }
});


app.post('/api/register/student', async (req, res) => {
    const { userId, name, studentid, major, resume, interests } = req.body;

    try {
        const user = await User.findById(userId); // 사용자의 정보 가져오기
        if (!user || user.accountType !== 'student') {
            return res.status(400).json({ message: 'Invalid user or account type mismatch' });
        }
        const newStudent = new Student({
            userid: user._id,
            email: user.email,
            password: user.password, // 이미 해시된
            name: name,
            studentid: studentid,
            major: major,
            resume: resume,
            interests: interests
        });

        await newStudent.save();
        return res.status(201).json({ message: 'Student registered successfully!' });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering student' });
    }
});
  
app.post('/api/register/lab', async (req, res) => {
    const { userId, dept, labname } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user || user.accountType !== 'lab') {
            return res.status(400).json({ message: 'Invalid user or account type mismatch' });
        }
        if (!['CS', 'ID'].includes(dept)) {
            return res.status(400).json({ message: 'Invalid department. Must be "CS" or "ID".' });
        }

        const labCollection = dept === "CS" ? 'cslabs' : 'idlabs';
        
        // Use findOne to search for the lab by key (labname)
        const lab = await mongoose.connection.db.collection(labCollection).findOne({ [labname]: { $exists: true } });
        if (!lab) {
            return res.status(400).json({ message: `Invalid lab name for ${dept} department` });
        }
        const labData = lab[labname];
        console.log(labData);
        const newLab = new Lab({
            userid: user._id,
            email: user.email,
            password: user.password,
            major: dept,
            name: labname,
            lab_data: labData
        });
        console.log(newLab);
        // await newLab.save();
        await mongoose.connection.db.collection('labusers').insertOne(labData);
        return res.status(201).json({ message: 'Lab registered successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering lab', error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Unregistered email' });
      }
    
      const isMatch = await bcrypt.compare(password, user.password.trim());
    //   console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password'});
      }
  
      const token = jwt.sign(
        { userId: user._id, accountType: user.accountType }, // 페이로드에 사용자 정보 추가
        process.env.JWT_SECRET, // JWT 비밀 키 (환경 변수로 설정)
        { expiresIn: '1h' } // 토큰 만료 시간 설정
      );

      return res.status(200).json({ message: 'Login successful', token: token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/labs', async (req, res) => {
    try {
        console.log('Fetching labs data...');
        const labs = await mongoose.connection.db.collection('labs').find().toArray(); // 'labs'를 조회
        if (!labs || labs.length === 0) {
            console.warn('No labs data found in the database.');
            return res.status(404).json({ message: 'No labs data found' });
        }
        return res.status(200).json(labs);
    } catch (err) {
        console.error('Error fetching labs data:', err.message);
        return res.status(500).json({ message: 'Error fetching labs data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
