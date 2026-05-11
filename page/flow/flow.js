app.controller('flow', ['$scope', '$timeout', function ($scope, $timeout) {
    $timeout(function () {
        // Reveal on scroll
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, {threshold: 0.08});
        document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });

        // Flow particles animation
        var stage = document.getElementById('stage');
        if (!stage) return;
        var dots = Array.from(stage.querySelectorAll('.particles .p'));
        if (!dots.length) return;

        var PATHS = [
            [[608,76],[608,144],[408,144],[408,198],[408,252],[408,328],[408,432],[608,432],[608,510]],
            [[608,76],[608,144],[808,144],[808,198],[808,252],[808,328],[808,432],[608,432],[608,510]],
            [[608,76],[608,144],[160,144],[160,198],[160,252],[160,432],[608,432],[608,510]]
        ];
        var DOT_PATH = [0, 1, 2, 0, 0];
        var DOT_DELAY = [0, 500, 1200, 2000, 2700];
        var SVG_W = 1216, SVG_H = 520;

        var BUILT = PATHS.map(function (pts) {
            var segs = [], cum = 0;
            for (var i = 1; i < pts.length; i++) {
                var dx = pts[i][0] - pts[i-1][0], dy = pts[i][1] - pts[i-1][1];
                var len = Math.sqrt(dx*dx + dy*dy);
                cum += len;
                segs.push({x0:pts[i-1][0],y0:pts[i-1][1],x1:pts[i][0],y1:pts[i][1],len:len,cum:cum});
            }
            return {segs:segs, total:cum};
        });

        function pointAt(built, t) {
            var target = t * built.total;
            var segs = built.segs;
            for (var i = 0; i < segs.length; i++) {
                if (segs[i].cum >= target - 0.001) {
                    var prev = i === 0 ? 0 : segs[i-1].cum;
                    var f = segs[i].len > 0 ? (target - prev) / segs[i].len : 0;
                    f = Math.max(0, Math.min(1, f));
                    return [segs[i].x0 + (segs[i].x1 - segs[i].x0) * f, segs[i].y0 + (segs[i].y1 - segs[i].y0) * f];
                }
            }
            var last = segs[segs.length - 1];
            return [last.x1, last.y1];
        }

        var t0 = null;
        var DUR = 3800;

        function tick(ts) {
            if (t0 === null) t0 = ts;
            var stageRect = stage.getBoundingClientRect();
            var sw = stageRect.width, sh = stageRect.height;
            for (var i = 0; i < dots.length; i++) {
                var el = dots[i];
                var elapsed = (ts - t0 + DOT_DELAY[i]) % DUR;
                var t = elapsed / DUR;
                var built = BUILT[DOT_PATH[i]];
                var pt = pointAt(built, t);
                var px = pt[0] / SVG_W * sw;
                var py = pt[1] / SVG_H * sh;
                var fade = t < 0.05 ? t / 0.05 : t > 0.9 ? (1 - t) / 0.1 : 1;
                el.style.left = (px - 3) + 'px';
                el.style.top = (py - 3) + 'px';
                el.style.opacity = fade * 0.9;
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }, 0);
}]);
