const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas (Thay YOUR_CONNECTION_STRING)
mongoose.connect('mongodb+srv://mobile:quocnam@quocnam.kktu4dc.mongodb.net/?retryWrites=true&w=majority&appName=QuocNam', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: Number
});

const Question = mongoose.model('Question', questionSchema);

app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy câu hỏi' });
    }
});

app.post('/questions', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: "Dữ liệu phải là một mảng câu hỏi." });
        }
        
        const newQuestions = await Question.insertMany(req.body);
        res.status(201).json({ message: "Đã thêm câu hỏi thành công!", data: newQuestions });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi thêm câu hỏi!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
