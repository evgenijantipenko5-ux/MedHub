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

// ===== RECIPE STRUCTURE =====
var recipeParts = {
    1: { num: 1, latin: 'Inscriptio', ru: 'надпись',
         desc: '<p><strong>Сведения об учреждении здравоохранения</strong> (штамп), дата выписки, фамилия и инициалы <strong>врача и пациента</strong>. При необходимости — возраст, место проживания (регистрации), № амбулаторной карты, форма оплаты, № и дата выдачи документа о льготах.</p>' },
    2: { num: 2, latin: 'Praepositio', ru: 'предложение',
         desc: '<p><span class="rx-font">Recipe (Rp.)</span> — «возьми». Приглашение фармацевту приступить к приготовлению.</p>' },
    3: { num: 3, latin: 'Designatio materiarum', ru: 'перечень материалов',
         desc: '<p>Названия лекарственных средств на <strong>латинском, русском или белорусском</strong> языке, с большой буквы в <strong>родительном падеже</strong>, и их дозы. Доза твёрдых ЛС — в <strong>граммах</strong> (0,1; 0,01; 0,001; 1,0) или в <strong>единицах действия</strong> (ЕД, МЕ).</p>' },
    4: { num: 4, latin: 'Subscriptio', ru: 'приписка',
         desc: '<p>Что сделать с лекарственными средствами и сколько выдать:<br><code>Misce, fiat…</code> (M., f.) — «смешай, чтобы получилось…»<br><code>Da tales doses numero…</code> (D. t. d. №) — «дай таких доз числом».</p>' },
    5: { num: 5, latin: 'Signatura', ru: 'обозначение',
         desc: '<p><code>Signa. (S.)</code> — «обозначь», далее — <strong>способ применения</strong> препарата.</p>' },
    6: { num: 6, latin: 'Nomen medici', ru: 'имя врача',
         desc: '<p>Фамилия и <strong>подпись врача</strong>.</p>' }
};

document.addEventListener('DOMContentLoaded', function() {
    // add numbers to recipe parts
    var parts = document.querySelectorAll('.recipe-part');
    parts.forEach(function(p, i) {
        var n = document.createElement('div');
        n.className = 'recipe-number';
        n.textContent = i + 1;
        p.style.paddingTop = '40px';
        p.insertBefore(n, p.firstChild);
        p.addEventListener('click', function() { showRecipePart(i + 1); });
    });
});

function showRecipePart(num) {
    document.querySelectorAll('.recipe-part').forEach(p => p.classList.remove('active'));
    var part = document.querySelector('.recipe-part[data-part="' + num + '"]');
    if (part) part.classList.add('active');

    var info = document.getElementById('recipeInfo');
    var d = recipeParts[num];
    if (d) {
        info.innerHTML = '<div class="part-number">Часть ' + d.num + '</div>' +
            '<h3>' + d.latin + ' <span class="part-latin">(' + d.ru + ')</span></h3>' +
            d.desc;
    }
}

// ===== LFS TAB SWITCHER =====
var lfData = {
    // Порошки
    'pv-simple': {
        schema: '<p><strong>Схема:</strong> название ЛС и доза → <em>Da tales doses numero №</em> → сигнатура</p>',
        example: 'Rp.: Pancreatini 0,5<br>D. t. d. № 10<br>S. По 1 порошку 3 раза в сутки',
        info: '<h3>Порошок простой дозированный</h3><p>Одно лекарственное средство, разделённое на отдельные дозы.</p><p class="lf-schema-text"><strong>Схема:</strong> Rp.: название, доза → D. t. d. № → S.</p>'
    },
    'pv-complex': {
        schema: '<p><strong>Схема:</strong> названия ЛС и дозы (каждое на отдельной строке) → <em>M., f. pulvis</em> → <em>D. t. d. №</em> → сигнатура</p>',
        example: 'Rp.: Riboflavini 0,01<br>Thiamini chloridi 0,02<br>Glucosi 0,2<br>M., f. pulvis<br>D. t. d. № 20<br>S. По 1 порошку 2 раза в сутки',
        info: '<h3>Порошок сложный дозированный</h3><p>Несколько ЛС, каждое на отдельной строке со своей дозой. Затем смешивают: <code>M., f. pulvis</code>.</p>'
    },
    'pv-simple-non': {
        schema: '<p><strong>Схема:</strong> название ЛС и общее количество → <em>D. S.</em> → сигнатура</p>',
        example: 'Rp.: Magnesii oxydi 30,0<br>D. S. По 1 чайной ложке 3 раза в сутки',
        info: '<h3>Порошок простой недозированный</h3><p>Общее количество без разделения на дозы. Выдача и сигнатура идут вместе: <code>D. S.</code></p>'
    },
    'pv-complex-non': {
        schema: '<p><strong>Схема:</strong> названия ЛС и дозы → <em>M., f. pulvis</em> → <em>D. S.</em> → сигнатура</p>',
        example: 'Rp.: Zinci oxydi 5,0<br>Amyli<br>Talci ana 20,0<br>M., f. pulvis<br>D. S. Присыпка',
        info: '<h3>Порошок сложный недозированный</h3><p>Несколько ЛС, все дозы через <code>ana</code> (поровну). Пример — присыпка: <code>D. S. Присыпка</code>.</p>'
    },
    'pv-plant': {
        schema: '<p><strong>Схема:</strong> лекарственная форма → часть растения → растение → доза → <em>D. t. d. №</em> → сигнатура</p>',
        example: 'Rp.: Pulveris radicis Rhei 0,5<br>D. t. d. № 20<br>S. По 1 порошку 2 раза в сутки',
        info: '<h3>Порошок дозированный из растительного сырья</h3><p>Порядок: форма (<em>Pulveris</em>) → часть растения (<em>radicis</em>) → растение (<em>Rhei</em>) → доза (<em>0,5</em>).</p>'
    },
    // Таблетки
    'tb-1': {
        example: 'Rp.: Paracetamoli 0,5<br>D. t. d. № 10 in tabulettis (tab.)<br>S. По 1 таблетке при высокой температуре',
        info: '<h3>Таблетки простые — вариант 1</h3><p>Название ЛС + доза, затем <code>D. t. d. № … in tabulettis (tab.)</code>.</p>'
    },
    'tb-2': {
        example: 'Rp.: Tabulettas (Tab.) Paracetamoli 0,5<br>D. t. d. № 10<br>S. По 1 таблетке при высокой температуре',
        info: '<h3>Таблетки простые — вариант 2</h3><p>Первой идёт лекарственная форма <em>Tabulettas</em>, затем название ЛС и доза, далее <code>D. t. d. №</code>.</p>'
    },
    'tb-3': {
        example: 'Rp.: Tabulettas (Tab.) Paracetamoli 0,5 № 10<br>D. S. По 1 таблетке при высокой температуре',
        info: '<h3>Таблетки простые — вариант 3</h3><p>Всё в одной строке: форма, название, доза и количество № 10. Затем сразу <code>D. S.</code></p>'
    },
    'tb-comp': {
        example: 'Rp.: Metamizoli<br>Phenylbutazoni ana 0,125<br>D. t. d. № 10 in tabulettis (tab.)<br>S. По 1 таблетке при головной боли',
        info: '<h3>Таблетки сложные</h3><p>Каждое ЛС на отдельной строке, общая доза через <code>ana</code> (поровну).</p>'
    },
    'tb-trade': {
        example: 'Rp.: Tabulettas «Citramonum» № 10<br>D. S. По 1 таблетке при головной боли',
        info: '<h3>Таблетки сложные с торговым названием</h3><p>Специальное (коммерческое) название в кавычках, именительный падеж, + количество таблеток.</p>'
    },
    // Драже
    'dr-1': {
        example: 'Rp.: Dragees Mebhydrolini 0,1<br>D. t. d. № 20<br>S. По 1 драже 1 раз в сутки',
        info: '<h3>Драже простые — вариант 1</h3><p>Лекарственная форма + название + доза, затем <code>D. t. d. №</code>.</p>'
    },
    'dr-2': {
        example: 'Rp.: Dragees Mebhydrolini 0,1 № 20<br>D. S. По 1 драже 1 раз в сутки',
        info: '<h3>Драже простые — вариант 2</h3><p>Форма + название + доза + количество в одной строке, затем <code>D. S.</code></p>'
    },
    'dr-trade': {
        example: 'Rp.: Dragees «Revitum» № 50<br>D. S. По 1 драже 2 раза в сутки',
        info: '<h3>Драже сложные с торговым названием</h3><p>Название в кавычках (именительный падеж) + количество драже.</p>'
    }
};

function showLf(key) {
    var tab = event.target;
    var tabsGroup = tab.closest('.lf-tabs');
    if (tabsGroup) tabsGroup.querySelectorAll('.lf-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    var section = tab.closest('.section');
    var d = lfData[key];
    if (!d) return;

    var ex = section.querySelector('.lf-example');
    if (ex && d.example) ex.innerHTML = d.example;

    var schema = section.querySelector('.lf-schema');
    if (schema && d.schema) schema.innerHTML = d.schema;

    var info = section.querySelector('.lf-info');
    if (info && d.info) info.innerHTML = d.info;
}

// ===== QUIZ =====
var quizQuestions = [
    { q: 'Что такое лекарственное средство?', answer: ['средство, применяемое для лечения, профилактики или диагностики заболеваний', 'применяется для лечения, профилактики и диагностики', 'средство для лечения, профилактики или диагностики', 'лекарственное вещество'], feedback: 'Верно! Лекарственное средство — это средство, применяемое для лечения, профилактики или диагностики заболеваний.' },
    { q: 'Что такое лекарственный препарат?', answer: ['лекарственное средство в определенной лекарственной форме', 'лекарственное средство в лекарственной форме', 'средство в лекарственной форме', 'готовое лекарство в форме'], feedback: 'Да! Лекарственный препарат — это лекарственное средство в определённой лекарственной форме.' },
    { q: 'Что такое лекарственная форма?', answer: ['удобное для применения состояние, придаваемое лекарственному средству, при котором достигается необходимый лечебный эффект', 'удобное для применения состояние', 'состояние, при котором достигается лечебный эффект', 'форма выпуска лекарства'], feedback: 'Правильно! Лекарственная форма — удобное для применения состояние ЛС, при котором достигается необходимый лечебный эффект.' },
    { q: 'Что такое Государственная фармакопея (ГФ)?', answer: ['специальный сборник с описанием методов приготовления лекарственных форм и методов контроля качества', 'сборник с описанием методов приготовления лекарственных форм', 'сборник по контролю качества лекарств', 'официальный сборник по лекарственным средствам'], feedback: 'Верно! ГФ — специальный сборник с описанием методов приготовления ЛФ и методов контроля качества и активности ЛС и растительного сырья.' },
    { q: 'Перечислите группы лекарственных средств.', answer: ['ядовитые, сильнодействующие, наркотические, общего списка', 'список а, список б, наркотические, общего списка', 'ядовитые (список а), сильнодействующие (список б), наркотические, общего списка', 'а, б, наркотические и общий список'], feedback: 'Отлично! 4 группы: ядовитые (список А), сильнодействующие (список Б), наркотические и средства общего списка.' },
    { q: 'Что такое лекарственные средства списка А?', answer: ['ядовитые лекарственные средства', 'ядовитые средства', 'средства списка а, утвержденные фармакопеей'], feedback: 'Да! Список А — это ядовитые лекарственные средства, утвержденные Государственной фармакопеей.' },
    { q: 'Что такое лекарственные средства списка Б?', answer: ['сильнодействующие лекарственные средства', 'сильнодействующие средства', 'средства списка б, утвержденные фармакопеей'], feedback: 'Верно! Список Б — это сильнодействующие лекарственные средства.' },
    { q: 'Что устанавливается для средств списков А, Б и наркотических?', answer: ['высшие разовые и высшие суточные дозы', 'врд и всд', 'высшие разовые и высшие суточные дозы (врд и всд)'], feedback: 'Правильно! Для них устанавливаются ВРД (высшая разовая доза) и ВСД (высшая суточная доза).' },
    { q: 'Что такое рецепт?', answer: ['письменное обращение врача к фармацевту о приготовлении или выдаче лекарственной формы с указанием способа применения', 'письменное обращение врача к фармацевту', 'обращение врача к фармацевту о приготовлении лекарственной формы', 'документ врача с указанием способа применения'], feedback: 'Верно! Рецепт — письменное обращение врача к фармацевту о приготовлении ЛФ или выдаче готовой ЛФ с указанием способа её применения.' },
    { q: 'Перечислите части рецепта по порядку.', answer: ['inscriptio, praepositio, designatio materiarum, subscriptio, signatura, nomen medici', 'надпись, предложение, перечень материалов, приписка, обозначение, имя врача', 'inscriptio, praepositio, designatio, subscriptio, signatura, nomen medici', 'надпись, предложение, перечень, приписка, сигнатура, имя врача'], feedback: 'Превосходно! 6 частей: Inscriptio → Praepositio → Designatio materiarum → Subscriptio → Signatura → Nomen medici.' },
    { q: 'Что означает сокращение «Rp.»?', answer: ['recipe, возьми', 'возьми', 'recipe'], feedback: 'Верно! Rp. = Recipe — «возьми». Это часть Praepositio.' },
    { q: 'В каких единицах указывается доза твёрдых лекарственных средств?', answer: ['в граммах или в единицах действия', 'в граммах', 'в граммах или единицах действия (ед, ме)', 'граммах и международных единицах'], feedback: 'Правильно! Доза твёрдых ЛС — в граммах (0,1; 0,01; 0,001; 1,0) или в единицах действия (ЕД, МЕ).' },
    { q: 'Что означает «D. t. d. №»?', answer: ['da tales doses numero, дай таких доз числом', 'дай таких доз числом', 'da tales doses numero'], feedback: 'Верно! D. t. d. № = Da tales doses numero — «дай таких доз числом».' },
    { q: 'Какие формы рецептурных бланков существуют?', answer: ['форма 1, форма 2, форма 3, льготный', 'три формы и льготный бланк', 'форма 1, форма 2, форма 3 и бланк для льготных рецептов'], feedback: 'Отлично! Форма 1 (полная стоимость), форма 2 (наркотические), форма 3 (психотропные и анаболические) и льготный бланк.' },
    { q: 'Каков срок действия бланка формы 1?', answer: ['2 месяца', '2 месяца, для списка а и средств на учете 30 дней', 'два месяца', '2 месяца, при списке а 30 дней'], feedback: 'Верно! Форма 1 действует 2 месяца (для списка А, спирта этилового и средств на учёте — 30 дней).' },
    { q: 'Каков срок действия и цвет бланка формы 2?', answer: ['15 дней, розовый', 'розовый, 15 дней', '15 дней, бланк розового цвета', 'срок 15 дней, цвет розовый'], feedback: 'Правильно! Форма 2 — розовый бланк для наркотических средств, срок действия 15 дней.' },
    { q: 'Что такое порошок?', answer: ['твердая лекарственная форма для внутреннего и наружного применения, состоящая из одного или нескольких лекарственных средств и обладающая сыпучестью', 'твердая лекарственная форма, обладающая сыпучестью', 'сыпучая лекарственная форма для внутреннего и наружного применения', 'лекарственная форма из одного или нескольких средств со свойством сыпучести'], feedback: 'Верно! Порошок — твёрдая ЛФ для внутреннего и наружного применения из одного или нескольких ЛС, обладающая сыпучестью.' },
    { q: 'Какие бывают порошки по составу и по дозированию?', answer: ['простые и сложные, дозированные и недозированные', 'простые и сложные', 'дозированные и недозированные', 'простые, сложные, дозированные, недозированные'], feedback: 'Отлично! По составу: простые (1 ЛС) и сложные (несколько). По дозированию: дозированные и недозированные.' },
    { q: 'Что такое таблетки?', answer: ['твердая дозированная лекарственная форма, получаемая путем прессования лекарственных средств или их смеси со вспомогательными', 'твердая дозированная форма, получаемая прессованием', 'форма, получаемая прессованием порошков', 'дозированная форма, которую прессуют'], feedback: 'Верно! Таблетки — твёрдая дозированная ЛФ, получаемая прессованием ЛС или их смеси со вспомогательными средствами.' },
    { q: 'Что такое драже?', answer: ['твердая дозированная лекарственная форма для внутреннего применения, получаемая наслаиванием на сахарные гранулы', 'дозированная форма для внутреннего применения, получаемая наслаиванием', 'форма, получаемая наслаиванием лекарственных средств на сахарные гранулы', 'твердая форма, которую наслаивают на сахарные гранулы'], feedback: 'Верно! Драже — твёрдая дозированная ЛФ, получаемая наслаиванием ЛС и вспомогательных средств на сахарные гранулы.' },
    { q: 'Что такое капсулы и какие они бывают?', answer: ['твердая дозированная лекарственная форма из лекарственных средств в оболочке; желатиновые, крахмальные, из полимеров, мягкие, твердые', 'лекарственная форма, где средства заключены в оболочку', 'форма в оболочке (желатиновой, крахмальной, полимерной)', 'дозированная форма из лекарственных средств в капсуле'], feedback: 'Правильно! Капсулы — твёрдая дозированная ЛФ, где ЛС заключены в оболочку. Бывают желатиновые, крахмальные, из полимеров; мягкие, твёрдые, с крышечкой.' },
    { q: 'Что такое глоссеты?', answer: ['небольшие таблетки для сублингвального и трансбуккального применения', 'небольшие таблетки', 'таблетки для сублингвального (под язык) и трансбуккального (за щеку) применения'], feedback: 'Да! Глоссеты — небольшие таблетки для сублингвального (под язык) и трансбуккального (за щёку) применения.' },
    { q: 'Для какой цели предназначены карамели?', answer: ['для лечения заболеваний слизистой оболочки полости рта', 'для лечения заболеваний полости рта', 'твердая форма по типу конфет для слизистой полости рта', 'лечение заболеваний слизистой рта'], feedback: 'Верно! Карамели — твёрдая ЛФ по типу конфет для лечения заболеваний слизистой оболочки полости рта.' }
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

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});