const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: {
    type: Number,        // Số xác định bài quiz (ví dụ: 1, 2, 3, …)
    required: true
  },
  topic: {
    type: String,        // Chủ đề của bài (ví dụ: "đá bóng", "game")
    required: true
  },
  question: {
    type: String,        // Nội dung câu hỏi
    required: true
  },
  options: {
    type: [String],      // Danh sách các lựa chọn
    required: true
  },
  answer: {
    type: Number,        // Chỉ mục của đáp án đúng trong mảng options
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
