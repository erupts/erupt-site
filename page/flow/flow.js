app.controller('flow', ['$scope', '$timeout', function ($scope, $timeout) {
    $timeout(function () {
        // Reveal on scroll
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, {threshold: 0.1});
        document.querySelectorAll('.reveal').forEach(function (n) {
            io.observe(n);
        });

        // Apply current lang to data-zh/data-en elements
        function applyLang(lang) {
            document.querySelectorAll('[data-zh],[data-en]').forEach(function (el) {
                var v = el.getAttribute('data-' + lang);
                if (v != null) el.innerHTML = v;
            });
        }

        applyLang(i18n.getLang());

        // Accent switching
        var ACCENTS = {
            'hot-orange': {a: 'oklch(0.74 0.18 42)', b: 'oklch(0.82 0.14 58)', r: 'oklch(0.74 0.17 18)'},
            'cyber-cyan': {a: 'oklch(0.78 0.15 200)', b: 'oklch(0.85 0.12 180)', r: 'oklch(0.72 0.17 230)'},
            'terminal-green': {a: 'oklch(0.78 0.18 145)', b: 'oklch(0.85 0.14 130)', r: 'oklch(0.74 0.17 170)'},
            'amethyst': {a: 'oklch(0.72 0.18 290)', b: 'oklch(0.80 0.14 310)', r: 'oklch(0.74 0.17 340)'}
        };

        function setAccent(name) {
            var col = ACCENTS[name] || ACCENTS['hot-orange'];
            document.documentElement.style.setProperty('--accent', col.a);
            document.documentElement.style.setProperty('--accent-2', col.b);
            document.documentElement.style.setProperty('--rose', col.r);
            document.querySelectorAll('.sw').forEach(function (s) {
                s.classList.toggle('on', s.dataset.accent === name);
            });
        }

        document.querySelectorAll('.sw').forEach(function (s) {
            s.addEventListener('click', function () {
                setAccent(s.dataset.accent);
            });
        });

        // Tweaks toggles
        document.querySelectorAll('.tw-toggle').forEach(function (t) {
            t.addEventListener('click', function () {
                t.classList.toggle('on');
                var on = t.classList.contains('on');
                if (t.dataset.key === 'showGrid') document.body.classList.toggle('no-grid', !on);
                if (t.dataset.key === 'showGlow') document.body.classList.toggle('no-glow', !on);
                if (t.dataset.key === 'showFlow') document.body.classList.toggle('no-flow', !on);
            });
        });

        setAccent('hot-orange');
    }, 0);
}])
