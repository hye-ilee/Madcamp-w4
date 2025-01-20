const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Student = require('./models/student');
const Lab = require('./models/lab');
const { Notice } = require('./models/notice');
const { Comment } = require('./models/notice');

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
    
      if (password !== user.password) {
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
        //console.log('Fetching labs data...');
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

//학과별 랩 가져오기
app.get('/api/labs/:major', async (req, res) => {
    const { major } = req.params;

    try {
        const labs = await mongoose.connection.db
            .collection('labs') // 'labs' 컬렉션 조회
            .find({ major: major }) //해당하는 연구실 찾기
            .toArray();
        console.log(labs);

        if (!labs || labs.length === 0) {
            return res.status(404).json({ message: `No labs found for department "${major}"` });
        }

        return res.status(200).json(labs); // 성공적으로 데이터 반환
    } catch (err) {
        console.error('Error fetching labs data:', err.message);
        return res.status(500).json({ message: 'Error fetching labs data' });
    }
});

app.get('/api/labs/:LabName', async (req, res) => {
    const { LabName } = req.params; // URL에서 LabName 추출

    try {
        const lab = await mongoose.connection.db
            .collection('labs') // 'labs' 컬렉션 조회
            .findOne({ name: LabName }); // LabName에 해당하는 연구실 찾기

        if (!lab) {
            return res.status(404).json({ message: `Lab with name "${LabName}" not found` });
        }

        return res.status(200).json(lab); // 성공적으로 데이터 반환
    } catch (err) {
        console.error('Error fetching lab data:', err.message);
        return res.status(500).json({ message: 'Error fetching lab data' });
    }
});

// 특정 LabName의 모든 Notice 가져오기
app.get('/api/notices/:LabName', async (req, res) => {
    const { LabName } = req.params; // URL에서 LabName 추출

    try {
        // notices 컬렉션에서 특정 LabName과 일치하는 공지사항 모두 찾기
        const notices = await Notice.find({ name: LabName });

        return res.status(200).json(notices); // 성공적으로 데이터 반환
    } catch (err) {
        console.error('Error fetching notices data:', err.message);
        return res.status(500).json({ message: 'Error fetching notices data' });
    }
});


// 특정 Notice 가져오기
app.get("/api/notices/:LabName/:Index", async (req, res) => {
  const { LabName, Index } = req.params;

  try {
    const notice = await Notice.findOne({ name: LabName, index: Number(Index) })
      .populate({
        path: "comments.replies",
        populate: { path: "replies" }, // Nested population for replies
      })
      .exec();

    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    res.status(200).json(notice);
  } catch (err) {
    console.error("Error fetching notice:", err.message);
    res.status(500).json({ message: "Failed to fetch notice." });
  }
});

//notice 추가
app.post('/api/notices/:LabName', async (req, res) => {
    const { LabName } = req.params;
    const { title, content } = req.body;

    try {
        const notice = new Notice({
            name: LabName,
            title: title,
            content: content,
            comments: []
        });
        await notice.save();
        return res.status(201).json({ message: 'Notice added successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to add notice.' });
    }
});

//특정 글 수정
app.put('/api/notices/:LabName/:Index', async (req, res) => {
    const { LabName, Index } = req.params;
    const { title, content } = req.body;

    try {
        const notice = await Notice.findOne({ name: LabName, index: Index });
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found.' });
        }
        notice.title = title;
        notice.content = content;
        await notice.save();
        return res.status(200).json({ message: 'Notice updated successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update notice.' });
    }
});

//특정 글 삭제
app.delete('/api/notices/:LabName/:Index', async (req, res) => {
    const { LabName, Index } = req.params;

    try {
        const notice = await Notice.findOne({ name: LabName, index: Index });
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found.' });
        }
        await notice.remove();
        return res.status(200).json({ message: 'Notice deleted successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete notice.' });
    }
});
  
// 댓글 or 대댓글 추가 API
app.post("/api/notices/:LabName/:Index/comments", async (req, res) => {
    const { LabName, Index } = req.params;
    const { userId, name, content, parentCommentId } = req.body;
  
    try {
      const notice = await Notice.findOne({ name: LabName, index: Index });
      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }
  
      const newComment = {
        userId,
        name,
        content,
        timestamp: new Date(),
        isReply: !!parentCommentId,
        parentCommentId: parentCommentId || null,
        replies: []
      };
  
      if (parentCommentId) {
        const parentComment = notice.comments.id(parentCommentId);
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found." });
        }
        parentComment.replies.push(newComment);
      } else {
        notice.comments.push(newComment);
      }
  
      await notice.save();
      res.status(201).json({ message: "Comment added successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add comment." });
    }
});

// 댓글 or 대댓글 수정 API
app.put("/api/notices/:LabName/:Index/comments/:CommentId", async (req, res) => {
    const { LabName, Index, CommentId } = req.params;
    const { content } = req.body;
  
    try {
      const notice = await Notice.findOne({ name: LabName, index: Index });
      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }
      const comment = notice.comments.id(CommentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found." });
      }
      comment.content = content;
      comment.timestamp = new Date();//수정시간 업뎃
      if (comment.isReply) {
        const parentComment = notice.comments.id(comment.parentCommentId);
        if (parentComment) {
          const reply = parentComment.replies.find(reply => reply._id.toString() === commentId);
          if (reply) {
            reply.content = content;
            reply.timestamp = new Date();
          }
        }
      }
      await notice.save();
      res.status(200).json({ message: "Comment updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update comment." });
    }
});

// 댓글 or 대댓글 삭제 API
app.delete("/api/notices/:LabName/:Index/comments/:CommentId", async (req, res) => {
    const { LabName, Index, CommentId } = req.params;
  
    try {
      const notice = await Notice.findOne({ name: LabName, index: Index });
      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }
      const comment = notice.comments.id(CommentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found." });
      }
      if (comment.isReply) {
        const parentComment = notice.comments.id(comment.parentCommentId);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(reply => reply._id.toString() !== commentId);
        }
      } else {
        comment.remove();
      }
      await notice.save();
      res.status(200).json({ message: "Comment deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete comment." });
    }
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
