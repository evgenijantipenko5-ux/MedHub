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

// ===== PLANES SWITCHER =====
function showPlane(plane) {
    document.querySelectorAll('.plane-layer').forEach(l => l.classList.remove('active-plane'));
    document.querySelectorAll('.plane-tab').forEach(t => t.classList.remove('active'));

    var target = document.getElementById(plane + 'Plane');
    if (target) target.classList.add('active-plane');
    event.target.classList.add('active');

    var desc = document.getElementById('planeDesc');
    var descriptions = {
        sagittal: '<h3>Сагиттальная плоскость <em>(plana sagittalis)</em></h3>' +
            '<p>Проходит в <strong>переднезаднем</strong> направлении и делит тело на <strong>правую (dexter)</strong> и <strong>левую (sinister)</strong> части.</p>' +
            '<p>Сагиттальная плоскость, проходящая через середину тела, называется <strong>срединной (медианной)</strong>.</p>' +
            '<div class="mnemonic">💡 Запомни: <strong>Сагиттальная = Стрелка</strong> (стрелка летит вперёд-назад)</div>',
        frontal: '<h3>Фронтальная плоскость <em>(plana frontalis)</em></h3>' +
            '<p>Располагается <strong>параллельно плоскости лба</strong> и делит тело на <strong>переднюю (anterior)</strong> и <strong>заднюю (posterior)</strong> части.</p>' +
            '<p>Другие названия: <strong>корональная</strong> плоскость.</p>' +
            '<div class="mnemonic">💡 Запомни: <strong>Фронтальная = Фронт</strong> (лицевая сторона, перед)</div>',
        horizontal: '<h3>Горизонтальная плоскость <em>(plana horizontalis)</em></h3>' +
            '<p>Идёт <strong>перпендикулярно</strong> к фронтальной и сагиттальной плоскостям и отделяет <strong>нижние (inferior)</strong> отделы тела от <strong>верхних (superior)</strong>.</p>' +
            '<p>Другие названия: <strong>поперечная</strong>, аксиальная плоскость.</p>' +
            '<div class="mnemonic">💡 Запомни: <strong>Горизонтальная = горизонт</strong> (как линия горизонта — делит вверх и вниз)</div>'
    };
    if (descriptions[plane]) desc.innerHTML = descriptions[plane];
}

// ===== LINES INFO =====
var lineData = {
    'anterior-median': { name: 'Передняя срединная линия', desc: 'Идёт сверху вниз по середине грудины. Делит тело на правую и левую половины (совпадает с медианной плоскостью).', latin: 'Linea mediana anterior' },
    'sternal': { name: 'Грудинные линии (правая и левая)', desc: 'Идут сверху вниз соответственно по правому и левому краям грудины.', latin: 'Lineae sternales' },
    'midclavicular': { name: 'Среднеключичные линии (правая и левая)', desc: 'Начинаются от середины ключицы и направляются перпендикулярно вниз.', latin: 'Lineae medioclaviculares' },
    'anterior-axillary': { name: 'Передние подмышечные линии (правая и левая)', desc: 'Направляются вертикально вниз по переднему краю подмышечных впадин.', latin: 'Lineae axillares anteriores' },
    'mid-axillary': { name: 'Средние подмышечные линии (правая и левая)', desc: 'Идут вертикально вниз из середины подмышечных впадин.', latin: 'Lineae axillares mediae' },
    'posterior-axillary': { name: 'Задние подмышечные линии (правая и левая)', desc: 'Направляются вертикально вниз по заднему краю подмышечных впадин.', latin: 'Lineae axillares posteriores' },
    'scapular': { name: 'Лопаточные линии (правая и левая)', desc: 'Проходят сверху вниз через нижний угол лопатки.', latin: 'Lineae scapulares' },
    'paravertebral': { name: 'Околопозвоночные линии (правая и левая)', desc: 'Идут на середине расстояния между задней срединной и лопаточными линиями.', latin: 'Lineae paravertebrales' }
};

function highlightLine(lineId) {
    document.querySelectorAll('.body-line').forEach(l => l.classList.remove('highlighted'));
    var target = document.querySelector('[data-line=\"' + lineId + '\"]');
    if (target) target.classList.add('highlighted');

    var info = document.getElementById('lineInfo');
    var d = lineData[lineId];
    if (d) {
        info.innerHTML = '<h3>' + d.name + '</h3><p class=\"line-desc\">' + d.desc + '</p><p class=\"line-latin\">' + d.latin + '</p>';
    }
}

// ===== QUIZ =====
var quizQuestions = [
    { q: 'Анатомия - это...', answer: ['наука, которая изучает форму и строение отдельных органов, систем и организма в целом', 'наука о строении тела', 'изучает форму и строение органов', 'наука о строении'], feedback: 'Правильно! Анатомия изучает форму и строение отдельных органов, систем и организма в целом.' },
    { q: 'Физиология - это...', answer: ['наука, изучающая закономерности функционирования живых организмов', 'наука о функциях организма', 'изучает как работает организм', 'наука о жизнедеятельности'], feedback: 'Верно! Физиология изучает закономерности функционирования живых организмов, их систем, органов, тканей и клеток.' },
    { q: 'Что называют анатомической номенклатурой?', answer: ['система анатомических терминов', 'система терминов', 'набор анатомических названий', 'международная система названий органов'], feedback: 'Да! Анатомическая номенклатура - это система анатомических терминов. Различают международную (на латыни) и национальные.' },
    { q: 'Какое положение тела человека при описании расположения органов принимают за исходное?', answer: ['стоя, руки опущены вдоль туловища, ладони вперёд, большие пальцы кистей кнаружи', 'стоя с вытянутыми руками', 'лёжа на спине', 'стоя, руки в стороны'], feedback: 'Именно! Естественное вертикальное положение тела: стоя, руки опущены вдоль туловища, ладони вперёд, большие пальцы кистей кнаружи.' },
    { q: 'Перечислите плоскости, используемые при описании положения отдельных органов.', answer: ['сагиттальная, фронтальная и горизонтальная', 'сагиттальная, фронтальная, горизонтальная', 'переднезадняя, боковая, поперечная', 'медианная, корональная, аксиальная'], feedback: 'Верно! Три плоскости: сагиттальная, фронтальная и горизонтальная.' },
    { q: 'Какую плоскость называют фронтальной?', answer: ['располагается параллельно плоскости лба и делит тело на переднюю и заднюю части', 'делит тело на переднюю и заднюю части', ' параллельна лбу', 'проходит параллельно лбу'], feedback: 'Правильно! Фронтальная плоскость располагается параллельно плоскости лба и делит тело на переднюю (anterior) и заднюю (posterior) части.' },
    { q: 'Какую плоскость называют сагиттальной?', answer: ['проходит в переднезаднем направлении и делит тело на правую и левую части', 'делит тело на правую и левую части', 'проходит спереди назад', 'переднезадняя плоскость'], feedback: 'Верно! Сагиттальная плоскость проходит в переднезаднем направлении и делит тело на правую (dexter) и левую (sinister) части.' },
    { q: 'Какую плоскость называют горизонтальной?', answer: ['идёт перпендикулярно к фронтальной и сагиттальной и отделяет нижние отделы от верхних', 'делит тело на верхнюю и нижнюю части', 'поперечная плоскость', 'перпендикулярна двум другим'], feedback: 'Да! Горизонтальная плоскость идёт перпендикулярно к фронтальной и сагиттальной и отделяет нижние (inferior) отделы от верхних (superior).' },
    { q: 'Какую плоскость называют срединной?', answer: ['сагиттальная плоскость, проходящая через середину тела', 'проходит через центр тела', 'медианная плоскость', 'сагиттальная, проходящая по центру'], feedback: 'Правильно! Срединная (медианная) плоскость - это сагиттальная плоскость, проходящая через середину тела.' },
    { q: 'Перечислите оси, используемые при описании частей тела и положения отдельных органов.', answer: ['вертикальная, фронтальная (поперечная) и сагиттальная', 'вертикальная, фронтальная, сагиттальная', 'продольная, поперечная, переднезадняя', 'в трёх взаимно перпендикулярных направлениях'], feedback: 'Верно! Три оси: вертикальная, фронтальная (поперечная) и сагиттальная.' },
    { q: 'Как ориентирована фронтальная ось?', answer: ['справа налево или слева направо', 'горизонтально', 'поперёк тела', 'от правого плеча к левому'], feedback: 'Да! Фронтальная ось ориентирована справа налево или слева направо.' },
    { q: 'Как ориентирована вертикальная ось?', answer: ['направлена вдоль тела стоящего человека', 'сверху вниз', 'от головы до ног', 'вдоль позвоночного столба'], feedback: 'Правильно! Вертикальная ось направлена вдоль тела стоящего человека. По ней располагается позвоночный столб.' },
    { q: 'Как ориентирована сагиттальная ось?', answer: ['в переднезаднем направлении', 'спереди назад', 'от живота к спине', 'перпендикулярно фронтальной плоскости'], feedback: 'Верно! Сагиттальная ось расположена в переднезаднем направлении.' },
    { q: 'Какие условные вертикальные линии проводят по поверхности тела человека?', answer: ['передняя срединная, грудинные, среднеключичные, передние/средние/задние подмышечные, лопаточные, задняя срединная, околопозвоночные', 'срединная, грудинные, ключичные, подмышечные, лопаточные, позвоночные', '9 линий: передняя и задняя срединные, грудинные, среднеключичные, 3 подмышечные, лопаточные, околопозвоночные', 'перечислить все'], feedback: 'Отлично! 9 видов линий: передняя срединная, грудинные, среднеключичные, передние/средние/задние подмышечные, лопаточные, задняя срединная, околопозвоночные.' },
    { q: 'Как проходит передняя срединная линия?', answer: ['сверху вниз по середине грудины', 'по центру грудины', 'вдоль грудины посередине', 'от яремной вырезки до мечевидного отростка'], feedback: 'Верно! Передняя срединная линия идёт сверху вниз по середине грудины.' },
    { q: 'Как проходят среднеключичные линии?', answer: ['начинаются от середины ключицы и направляются перпендикулярно вниз', 'из середины ключицы вниз', 'от ключицы вертикально вниз', 'вниз от середины ключицы'], feedback: 'Правильно! Среднеключичные линии начинаются от середины ключицы и направляются перпендикулярно вниз.' },
    { q: 'Объясните значение терминов: медиальный, латеральный, краниальный, каудальный, дистальный, проксимальный, вентральный, дорсальный, апикальный, базальный.', answer: ['медиальный - ближе к срединной плоскости; латеральный - дальше от срединной; краниальный - к голове; каудальный - к тазу; проксимальный - ближе к туловищу; дистальный - дальше от туловища; вентральный - передний; дорсальный - задний; апикальный - у вершины; базальный - у основания', 'серединный, боковой, к голове, к тазу, ближе, дальше, передний, задний, верхушка, основание'], feedback: 'Превосходно! Ты выучил все термины! Медиальный(серединный), латеральный(боковой), краниальный(к голове), каудальный(к тазу), проксимальный(ближе к туловищу), дистальный(дальше), вентральный(передний), дорсальный(задний), апикальный(у вершины), базальный(у основания).' }
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
        // Also check if user typed something reasonably close (contains key words)
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

// ===== BODY PARTS INTERACTION =====
document.querySelectorAll('.info-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        var part = this.getAttribute('data-highlight');
        document.querySelectorAll('.body-part').forEach(function(bp) {
            if (bp.getAttribute('data-part') === part) {
                bp.style.filter = 'brightness(0.8) drop-shadow(0 0 6px rgba(231,76,60,0.5))';
            } else {
                bp.style.opacity = '0.5';
            }
        });
        this.classList.add('active');
    });
    item.addEventListener('mouseleave', function() {
        document.querySelectorAll('.body-part').forEach(function(bp) {
            bp.style.filter = '';
            bp.style.opacity = '1';
        });
        this.classList.remove('active');
    });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});
