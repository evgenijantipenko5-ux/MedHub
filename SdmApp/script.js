// ===== SIDEBAR NAVIGATION =====
function scrollToSection(id, el) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('#sidebar a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
}

// Highlight active section on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('#sidebar a');
    let current = '';
    sections.forEach(s => {
        const top = s.offsetTop - 100;
        if (pageYOffset >= top) current = s.getAttribute('id');
    });
    links.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});

// ===== TIMELINE =====
var tlData = {
    '1715': 'Воспитательные дома (Указ Петра I): женщины ухаживали за здоровыми и больными детьми, часто новорождёнными подкидышами.',
    '1716': '«Устав воинский»: законодательно закреплено, что женщины участвуют в уходе за ранеными солдатами в полевых лазаретах.',
    '1722': '«Старицы» при госпиталях: пожилые женщины или монахини следили за работницами и бельём, т.е. выполняли функции надзора и ухода.',
    '1776': 'Екатерининская больница в Москве (150 коек): в штате 24 сиделки мужского и женского пола.',
    '1803': 'Императрица Мария Фёдоровна учредила «Вдовьи дома» и создала группу «сердобольных вдов» для постоянного ухода за престарелыми и больными.',
    '1854': '25 октября создана Крестовоздвиженская община сестёр милосердия (Елена Павловна, Н. И. Пирогов) — работа в Крымской войне. Тогда же Ф. Найтингейл прибывает в Скутари.',
    '1859': '«Записки об уходе» Ф. Найтингейл — сестринское дело определено как профессия, показано его отличие от врачебного дела.',
    '1865': 'Открыта первая в Беларуси средняя медикола — Могилёвская повивальная школа (инициатор Н. М. Мандельштам).',
    '1879': 'Общество попечения о раненых и больных воинах переименовано в Российское общество Красного Креста.',
    '1920': 'Появляются первые медицинские школы в СССР — начинается системная подготовка медсестёр.',
    '1941': 'Великая Отечественная война: героизм медсестёр и санитарок, 72,3% раненых возвращены в строй.',
    '1971': 'День рождения Ф. Найтингейл (12 мая) объявлен Международным днём медицинских сестёр.'
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tl-item').forEach(function(item) {
        item.addEventListener('click', function() {
            document.querySelectorAll('.tl-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            var key = this.getAttribute('data-tl');
            var info = document.getElementById('timelineInfo');
            var d = tlData[key];
            if (d) {
                info.innerHTML = '<h4>' + key + '</h4><p>' + d + '</p>';
            }
        });
    });
    initQuiz();
});

// ===== QUIZ =====
var quizQuestions = [
    { q: 'Что такое сестринское дело?', answer: ['наука и искусство ухода за пациентом, направленное на решение проблем пациента', 'наука и искусство ухода за пациентом', 'искусство ухода за пациентом', 'наука о уходе за больными'], feedback: 'Верно! Сестринское дело — это наука и искусство ухода за пациентом, направленное на решение его проблем.' },
    { q: 'Какова цель сестринского дела?', answer: ['удовлетворение потребностей пациента', 'удовлетворение потребностей больного', 'решение проблем пациента', 'удовлетворение потребностей'], feedback: 'Правильно! Цель СД — удовлетворение потребностей пациента.' },
    { q: 'Чему обязанно начало сестринского дела как профессии в России?', answer: ['реформам петра i', 'петру i', 'реформам петра', 'царствованию петра первого и его реформам'], feedback: 'Да! Как официальная профессия СД обязано реформам Петра I (1672–1725).' },
    { q: 'Что было создано в 1715 году по Указу Петра I?', answer: ['воспитательные дома', 'воспитательные дома, где женщины ухаживали за детьми', 'дома для воспитания детей', 'приюты для подкидышей'], feedback: 'Верно! В 1715 по Указу Петра I созданы Воспитательные дома, где женщины ухаживали за детьми.' },
    { q: 'В каком документе 1716 года впервые законодательно закреплено участие женщин в уходе за ранеными?', answer: ['устав воинский', 'в уставе воинском', 'устав воинский 1716 года'], feedback: 'Отлично! В «Уставе воинском» (1716) законодательно регламентировано участие женщины в уходе за ранеными.' },
    { q: 'Что такое «сердобольные вдовы»?', answer: ['группа вдов, которые ухаживали за престарелыми и больными во вдовьих домах', 'вдовы, ухаживавшие за больными', 'группа женщин из вдов для ухода за престарелыми', 'прототип общин сестер милосердия'], feedback: 'Верно! «Сердобольные вдовы» (с 1803, Мария Фёдоровна) — группа вдов для ухода за престарелыми и больными. Прототип сестёр милосердия.' },
    { q: 'Когда была создана Крестовоздвиженская община сестёр милосердия?', answer: ['25 октября 1854 года', 'в 1854 году', '25 октября 1854', 'во время крымской войны, 1854'], feedback: 'Правильно! Община создана 25 октября 1854 г. для работы на фронте Крымской войны (Елена Павловна, Н. И. Пирогов).' },
    { q: 'Кого во всём мире считают основоположницей сестринского дела?', answer: ['флоренс найтингейл', 'ф. найтингейл', 'флоренс найдитегал', 'английскую сестру флоренс найтингейл'], feedback: 'Да! Основоположница СД — англичанка Флоренс Найтингейл (1820–1910).' },
    { q: 'Почему Ф. Найтингейл называли «Леди с лампой»?', answer: ['она по ночам обходила раненых, держа в руках лампу', 'обходила больных ночью с лампой', 'по ночам ухаживала за ранеными с лампой', 'ухаживала за больными по ночам, держа лампу'], feedback: 'Верно! По ночам она обходила раненых с лампой в руках, отсюда прозвище «Леди с лампой».' },
    { q: 'Какой день отмечается как Международный день медицинских сестёр?', answer: ['12 мая', '12 мая, день рождения найтингейл', 'день рождения флоренс найтингейл'], feedback: 'Правильно! 12 мая — день рождения Ф. Найтингейл — Международный день медицинских сестёр (с 1971 г.).' },
    { q: 'Сколько квалификационных категорий у медицинских работников в Беларуси?', answer: ['три: вторая, первая и высшая', '3 категории', 'вторая, первая и высшая', 'три квалификационные категории'], feedback: 'Верно! Три категории: вторая → первая → высшая, присваиваются последовательно.' },
    { q: 'Какой итог работы медицинских работников во время ВОВ по возвращению раненых в строй?', answer: ['72,3 процента раненых вернулись в строй', '72,3 процента', '72,3 процента возвращенных в строй раненых', 'большинство раненых вернулось в строй'], feedback: 'Отлично! 72,3% раненых и 90% больных были возвращены в строй — таков итог труда медработников.' }
];

function initQuiz() {
    var container = document.getElementById('quizContainer');
    var html = '';
    quizQuestions.forEach(function(q, i) {
        html += '<div class="quiz-question" id="q' + i + '">';
        html += '<div class="q-number">Вопрос ' + (i+1) + '</div>';
        html += '<div class="q-text">' + q.q + '</div>';
        html += '<textarea id="ans' + i + '" placeholder="Введите ответ..." oninput="updateProgress()"></textarea>';
        html += '<div class="feedback" id="fb' + i + '"></div>';
        html += '</div>';
    });
    container.innerHTML = html;
}

function updateProgress() {
    var answered = 0;
    quizQuestions.forEach(function(q, i) {
        var val = document.getElementById('ans' + i).value.trim();
        if (val.length > 5) answered++;
    });
    var pct = Math.round((answered / quizQuestions.length) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressText').textContent = answered + ' / ' + quizQuestions.length;
}

function checkAllAnswers() {
    var correct = 0;
    quizQuestions.forEach(function(q, i) {
        var ans = document.getElementById('ans' + i).value.trim().toLowerCase();
        var fb = document.getElementById('fb' + i);
        var qEl = document.getElementById('q' + i);
        var isCorrect = false;

        for (var j = 0; j < q.answer.length; j++) {
            if (ans.indexOf(q.answer[j].toLowerCase()) !== -1 || q.answer[j].toLowerCase().indexOf(ans) !== -1) {
                isCorrect = true;
                break;
            }
        }
        if (!isCorrect && ans.length > 10) {
            var keyWords = q.answer[0].toLowerCase().split(' ').filter(function(w) { return w.length > 4; });
            var matches = keyWords.filter(function(w) { return ans.indexOf(w) !== -1; });
            if (matches.length >= Math.ceil(keyWords.length * 0.4)) isCorrect = true;
        }

        qEl.classList.remove('correct', 'incorrect');
        fb.classList.remove('correct', 'incorrect', 'show');

        if (isCorrect) {
            qEl.classList.add('correct');
            fb.className = 'feedback correct show';
            fb.innerHTML = '<strong>&#10004; Правильно!</strong> ' + q.feedback;
            correct++;
        } else if (ans.length > 3) {
            qEl.classList.add('incorrect');
            fb.className = 'feedback incorrect show';
            fb.innerHTML = '<strong>&#10008; Попробуй ещё раз.</strong> Подсмотри в материале выше. Ключевые слова: <em>' + q.answer[0].substring(0, 60) + '...</em>';
        } else {
            fb.className = 'feedback incorrect show';
            fb.innerHTML = 'Напиши ответ, чтобы я мог проверить.';
        }
    });

    var result = document.getElementById('quizResult');
    var title = document.getElementById('resultTitle');
    var text = document.getElementById('resultText');
    result.style.display = 'block';

    var pct = Math.round((correct / quizQuestions.length) * 100);
    if (pct >= 90) {
        title.textContent = 'Отлично! ' + correct + '/' + quizQuestions.length;
        text.textContent = 'Ты великолепно справился! ' + pct + '% правильных ответов. Можно идти на пару!';
        title.style.color = '#27ae60';
    } else if (pct >= 60) {
        title.textContent = 'Хорошо! ' + correct + '/' + quizQuestions.length;
        text.textContent = 'Неплохой результат. Перечитай те вопросы, где ошибся, и попробуй снова.';
        title.style.color = '#f39c12';
    } else {
        title.textContent = 'Нужно подтянуть! ' + correct + '/' + quizQuestions.length;
        text.textContent = 'Перечитай лекцию ещё раз, обрати внимание на выделенные ключевые моменты.';
        title.style.color = '#e74c3c';
    }

    result.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    quizQuestions.forEach(function(q, i) {
        document.getElementById('ans' + i).value = '';
        var fb = document.getElementById('fb' + i);
        fb.className = 'feedback';
        fb.innerHTML = '';
        document.getElementById('q' + i).classList.remove('correct', 'incorrect');
    });
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0 / ' + quizQuestions.length;
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}
