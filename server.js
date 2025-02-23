const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./questionSchema');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối tới MongoDB (sử dụng MONGO_URI từ biến môi trường hoặc kết nối cục bộ)
const MONGO_URI = 'mongodb+srv://mobile:qk3QFE7qgWakNDLe@quocnam.kktu4dc.mongodb.net/?retryWrites=true&w=majority&appName=QuocNam';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));cd

// API GET: Lấy câu hỏi theo quizId
// Ví dụ: GET /questions?quizId=1 sẽ trả về tất cả câu hỏi của bài 1
app.get('/questions', async (req, res) => {
  try {
    const quizId = req.query.quizId;
    let query = {};
    if (quizId) {
      query.quizId = parseInt(quizId);  // chuyển sang số nếu cần
    }
    const questions = await Question.find(query);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Lỗi lấy câu hỏi' });
  }
});

// API POST: Thêm câu hỏi (có thể thêm 1 hoặc nhiều câu hỏi cùng lúc)
app.post('/questions', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const newQuestions = await Question.insertMany(req.body);
      res.status(201).json({ message: 'Đã thêm câu hỏi', data: newQuestions });
    } else {
      const newQuestion = new Question(req.body);
      await newQuestion.save();
      res.status(201).json({ message: 'Đã thêm câu hỏi', data: newQuestion });
    }
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Lỗi khi thêm câu hỏi' });
  }
});

const PORT =    5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
