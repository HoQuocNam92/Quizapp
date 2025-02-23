
let questions = [];


 
async function loadQuiz() {
    const quizId = document.getElementById('quizSelector').value;
    try {
 
        const response = await fetch(`https://quizapp-1-vwbx.onrender.com/questions?quizId=${quizId}`);
        questions = await response.json();
         
        renderQuestions();
    } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
    }
}

 
function renderQuestions() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    questions.forEach((q, index) => {
        console.log('Quiz ' + index)
        let optionsHtml = q.options.map((option, i) =>
            `<label><input type="radio" name="question${index}" value="${i}"> ${option}</label>`
        ).join('');
        quizDiv.innerHTML += `
  <div class="question">
    <p><strong>Câu ${index + 1}:</strong> ${q.question}</p>
    <div class="options">${optionsHtml}</div>
    <p id="answer${index}" class="correct" style="display: none;">Đáp án đúng: ${q.options[q.answer]}</p>
  </div>
`;
    });
}

 
function submitQuiz() {
    if (questions.length === 0) {
        alert('Chưa có câu hỏi!');
        return;
    }
    let score = 0;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name='question${index}']:checked`);
        if (selected) {
            if (parseInt(selected.value) === q.answer) {
                score++;
            } else {
                document.getElementById(`answer${index}`).style.display = 'block';
            }
        }
    });
    const resultEl = document.getElementById('result');
    resultEl.textContent = `Bạn đạt ${score} / ${questions.length} điểm`;
    alert(`Bạn đạt ${score} / ${questions.length} điểm!`);
}

 
function resetQuiz() {
    document.getElementById('result').textContent = '';
    questions.forEach((q, index) => {
        document.getElementById(`answer${index}`).style.display = 'none';
        const radios = document.getElementsByName(`question${index}`);
        radios.forEach(radio => radio.checked = false);
    });
}
 