require("dotenv").config({ path: "./.env" });
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;

const User = require('./models/user');
const Lab = require('./models/lab');
const { Notice } = require('./models/notice');
const { Comment } = require('./models/notice');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*"}));
// app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.post('/api/register', async (req, res) => {
    const { email, password, name, studentid, major, resume, interests } = req.body;

    try {
      if (!email || !password || !name || !studentid || !major) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }
      const newUser = new User({
          email: email,
          password: password,
          name: name,
          studentid: studentid,
          major: major,
          resume: resume,
          interests: interests
      });

        await newUser.save();
        return res.status(201).json({ message: 'Registered successfully!' });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering student' });
    }
});
  
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({ message: 'Missing required fields.' });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      const isMatch = user.password === password;
      if (!isMatch) {
          return res.status(401).json({ message: 'Incorrect password.' });
      }
      return res.status(200).json({ message: 'Login successful!', user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error logging in user' });
  }
});


app.get('/api/labs', async (req, res) => {
  const { major } = req.query; // major 필터 값 가져오기

  try {
      const query = major ? { major } : {}; // major 필터가 있으면 조건에 추가
      const labs = await mongoose.connection.db.collection('labs').find(query).toArray();

      return res.status(200).json(labs);
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
    const notice = await Notice.findOne({ name: LabName, index: Number(Index)})
      .populate({
        path: "comments",
        populate: {path: "replies"},
      });

    console.log('replies:', notice.comments[0].replies);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    res.status(200).json(notice);
  } catch (err) {
    console.error("Error fetching notice:", err.message);
    res.status(500).json({ message: "Failed to fetch notice." });
  }
});
 
// 댓글 or 대댓글 추가 API
app.post("/api/notices/:LabName/:Index/comments", async (req, res) => {
    const { LabName, Index } = req.params;
    const { email, name, content, parentCommentId } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Missing user info.' });
    }
    if (!content) {
      return res.status(400).json({ message: 'Missing content.' });
    }
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).json({ message: 'Unregistered user email' });
    }
  
    try {
      const notice = await Notice.findOne({ name: LabName, index: Index });
      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }
  
      const newComment = {
        userId: user._id,
        name,
        content,
        timestamp: new Date(),
        isReply: !!parentCommentId,
        parentCommentId: parentCommentId || null,
        replies: []
      };

      const now = new Date();
      // if (isNaN(now)) {
      //   console.error('Invalid Date object created:', now);
      //   return res.status(500).json({ message: "Invalid server date." });
      // }
  
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
      const justCreated = notice.comments[notice.comments.length - 1];
      res.status(201).json(justCreated);
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
app.delete("/api/notices/:LabName/:Index/:CommentId", async (req, res) => {
    const { LabName, Index, CommentId } = req.params;
  
    try {
      console.log('params:',LabName, Index, CommentId);
      const notice = await Notice.findOne({ name: LabName, index: Index });
      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }
      const comment = notice.comments.id(CommentId);
      console.log(comment);
      const reply = await mongoose.connection.db.collection('comments').findOne({_id: new ObjectId(CommentId)});
      if (!comment) {
        console.log('reply:', reply);
        // return res.status(404).json({ message: "Comment not found." });
      }
      const parentComment = await mongoose.connection.db.collection('comments').findOne({_id:reply.parentCommentId});
      if (reply.isReply) {
        console.log('parentComment id:', reply.parentCommentId);
        console.log('parentComment:', parentComment);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== CommentId);
        }
      } else {
        comment.remove();
      }
      await notice.save();
      console.log('deleted: ',parentComment.replies);
      res.status(200).json({ message: "Comment deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete comment." });
    }
});

//deadlineDate 정렬 모든랩 모든공지 다 가져오기
app.get('/api/notices', async (req, res) => {
  try {
      const notices = await Notice.find().sort({ deadlineDate: 1 }); // 1 for ascending order
      const now = new Date();
      const statusNotices = notices.map(notice => {
          const deadline = notice.deadlineDate;
          const hrsLeft = (deadline - now) / 1000 / 60 / 60;
          let status;

          if (hrsLeft > 24) {
            status = '모집중';
          } else if (hrsLeft <= 24 && hrsLeft > 0) {
            status = '마감임박';
          } else {
            const daysPassed = (now - deadline) / 1000 / 60 / 60 / 24;
            if(daysPassed < 7){
              status = '모집완료';
            } else {
              status = '지원마감';
            }
          }
          return { ...notice.toObject(), status };
      });
      return res.status(200).json(statusNotices);
  } catch (err) {
      console.error('Error fetching recruiting notices:', err.message);
      return res.status(500).json({ message: 'Error fetching recruiting notices' });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
