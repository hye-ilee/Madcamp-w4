const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 작성자 ID
  name: { type: String, required: true }, // 작성자 이름
  content: { type: String, required: true }, // 댓글 내용
  timestamp: { type: Date, required: true }, // 작성 시간
  isReply: { type: Boolean, default: false }, // 답글 여부
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // 상위 댓글 ID (null이면 최상위 댓글)
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // 답글 목록
});

const noticeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 공지 작성자 ID
  name: { type: String, required: true }, // 랩 이름
  index: { type: Number, required: true }, // 공지 번호
  title: { type: String, required: true }, // 공지 제목
  personnel: { type: Number, required: true }, // 모집 인원
  information: { type: String, enum: ['개별연구', '랩인턴', '졸업연구', '모집X'], required: true}, // 모집 정보
  status: { type: String, enum: ['모집중', '모집완료', '마감임박', '지원마감'], required: true }, // 상태
  uploadDate: { type: Date, required: true }, // 업로드 날짜
  deadlineDate: { type: Date, required: true }, // 마감 날짜
  detail: { type: String, required: true }, // 상세 내용
  applyLink: { type: String, required: true }, // 지원 링크
  comments: { type: [commentSchema], default: [] } // 댓글 필드 추가
});

const Notice = mongoose.model('Notice', noticeSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Notice, Comment };
