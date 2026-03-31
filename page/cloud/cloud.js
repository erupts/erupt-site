app.controller("cloud", function ($scope, $timeout) {
    $timeout(function () {
        Prism.highlightAll();
        initCloudTopo();
    }, 320);

    $scope.$on('$destroy', function () {
        if (window._cloudTopoRaf) {
            cancelAnimationFrame(window._cloudTopoRaf);
            window._cloudTopoRaf = null;
        }
    });
});

function initCloudTopo() {
    var canvas = document.getElementById('cloudTopoCanvas');
    if (!canvas) return;
    if (window._cloudTopoRaf) {
        cancelAnimationFrame(window._cloudTopoRaf);
        window._cloudTopoRaf = null;
    }

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 420, H = 320;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    var cx = 210, cy = 152;
    var ORBIT_R = 108;

    /* ── helpers ── */
    function ha(hex, a) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function dist2(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }

    /* ── nodes ── */
    var hub = { x: cx, y: cy, r: 35, line1: 'Cloud', line2: 'Server', c1: '#38bdf8', c2: '#6366f1' };

    var satDefs = [
        { angle: -90,  r: 23, line1: 'Admin',  line2: 'Console', c1: '#22d3ee', c2: '#0891b2' },
        { angle: -30,  r: 20, line1: 'Node',   line2: '#1',      c1: '#818cf8', c2: '#6366f1' },
        { angle:  30,  r: 20, line1: 'Node',   line2: '#2',      c1: '#a78bfa', c2: '#7c3aed' },
        { angle:  90,  r: 21, line1: 'Config', line2: 'Store',   c1: '#fb923c', c2: '#ea580c' },
        { angle: 150,  r: 20, line1: 'Node',   line2: '#3',      c1: '#34d399', c2: '#059669' },
        { angle: 210,  r: 20, line1: 'Node',   line2: '#4',      c1: '#818cf8', c2: '#6366f1' },
    ];

    satDefs.forEach(function (s) {
        var rad = s.angle * Math.PI / 180;
        s.x = cx + ORBIT_R * Math.cos(rad);
        s.y = cy + ORBIT_R * Math.sin(rad);
    });

    /* ── data packets ── */
    // outward = config push (cyan), inward = heartbeat (green)
    var packets = [];
    satDefs.forEach(function (s, i) {
        var base = i / satDefs.length;
        packets.push({ from: hub, to: s, t: base,              speed: 0.0038 + Math.random() * 0.002, c: '#7dd3fc', r: 3.2 });
        packets.push({ from: hub, to: s, t: (base + 0.5) % 1, speed: 0.0030 + Math.random() * 0.002, c: '#7dd3fc', r: 2.4 });
        packets.push({ from: s, to: hub, t: (base + 0.28) % 1, speed: 0.0045 + Math.random() * 0.002, c: '#6ee7b7', r: 2.2 });
    });

    /* ── pulse rings ── */
    var rings = [];
    var lastRingFrame = -200;
    function spawnRing(node) {
        rings.push({ x: node.x, y: node.y, r0: node.r, r: node.r, rMax: node.r + 52, t: 0, c: node.c1 });
    }

    /* ── stars ── */
    var stars = [];
    for (var i = 0; i < 55; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 0.9 + 0.25,
            ph: Math.random() * Math.PI * 2,
            sp: 0.016 + Math.random() * 0.028
        });
    }

    /* ── nebula clouds (static) ── */
    var nebulas = [
        { x: 55,  y: 60,  rx: 70, ry: 45, c: '#6366f1', a: 0.07 },
        { x: 360, y: 240, rx: 60, ry: 40, c: '#38bdf8', a: 0.06 },
        { x: 90,  y: 260, rx: 50, ry: 35, c: '#22d3ee', a: 0.05 },
    ];

    var frame = 0;

    /* ════════════════════════════════
       DRAW FUNCTIONS
    ════════════════════════════════ */

    function drawBg() {
        /* base */
        var bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, '#020c1b');
        bg.addColorStop(1, '#030f22');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        /* dot matrix grid — brighter near center */
        for (var gx = 16; gx < W; gx += 22) {
            for (var gy = 16; gy < H; gy += 22) {
                var d = dist2(gx, gy, cx, cy);
                var a = Math.max(0.03, 0.14 - d / 650);
                ctx.fillStyle = 'rgba(56,189,248,' + a + ')';
                ctx.beginPath();
                ctx.arc(gx, gy, 0.85, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        /* nebula blobs */
        nebulas.forEach(function (nb) {
            ctx.save();
            ctx.scale(1, nb.ry / nb.rx);
            var g = ctx.createRadialGradient(nb.x, nb.y * nb.rx / nb.ry, 0,
                nb.x, nb.y * nb.rx / nb.ry, nb.rx);
            g.addColorStop(0, ha(nb.c, nb.a));
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(nb.x, nb.y * nb.rx / nb.ry, nb.rx, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        /* central atmospheric glow */
        var atm = ctx.createRadialGradient(cx, cy, 0, cx, cy, 165);
        atm.addColorStop(0, 'rgba(99,102,241,0.22)');
        atm.addColorStop(0.38, 'rgba(56,189,248,0.09)');
        atm.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = atm;
        ctx.fillRect(0, 0, W, H);
    }

    function drawStars() {
        stars.forEach(function (s) {
            var a = 0.22 + 0.55 * Math.sin(frame * s.sp + s.ph);
            ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawOrbitRing() {
        ctx.beginPath();
        ctx.arc(cx, cy, ORBIT_R, 0, Math.PI * 2);
        ctx.setLineDash([3, 9]);
        ctx.strokeStyle = 'rgba(56,189,248,0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawPulseRings() {
        rings = rings.filter(function (pr) {
            pr.t += 0.017;
            pr.r = pr.r0 + (pr.rMax - pr.r0) * pr.t;
            var a = 0.5 * (1 - pr.t);
            ctx.beginPath();
            ctx.arc(pr.x, pr.y, pr.r, 0, Math.PI * 2);
            ctx.strokeStyle = ha(pr.c, a);
            ctx.lineWidth = 1.5;
            ctx.stroke();
            return pr.t < 1;
        });
    }

    function drawConn(sat) {
        var dx = sat.x - hub.x, dy = sat.y - hub.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var nx = dx / d, ny = dy / d;
        var x1 = hub.x + nx * hub.r, y1 = hub.y + ny * hub.r;
        var x2 = sat.x - nx * sat.r, y2 = sat.y - ny * sat.r;

        /* wide outer glow */
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(56,189,248,0.08)';
        ctx.lineWidth = 10; ctx.stroke();

        /* mid glow */
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(125,211,252,0.16)';
        ctx.lineWidth = 4; ctx.stroke();

        /* dashed bright core */
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = -(frame * 0.5 % 10);
        ctx.strokeStyle = 'rgba(186,230,253,0.42)';
        ctx.lineWidth = 1.2; ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawPacket(p) {
        p.t = (p.t + p.speed) % 1;
        var px = lerp(p.from.x, p.to.x, p.t);
        var py = lerp(p.from.y, p.to.y, p.t);

        /* comet trail */
        for (var i = 1; i <= 6; i++) {
            var tBack = p.t - i * p.speed * 7;
            if (tBack < 0) continue;
            var tx = lerp(p.from.x, p.to.x, tBack);
            var ty = lerp(p.from.y, p.to.y, tBack);
            var tr = Math.max(0.5, p.r * (1 - i * 0.14));
            ctx.fillStyle = ha(p.c, 0.45 - i * 0.06);
            ctx.beginPath(); ctx.arc(tx, ty, tr, 0, Math.PI * 2); ctx.fill();
        }

        /* glow bloom */
        var bloom = ctx.createRadialGradient(px, py, 0, px, py, p.r * 2.8);
        bloom.addColorStop(0, ha(p.c, 0.95));
        bloom.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bloom;
        ctx.beginPath(); ctx.arc(px, py, p.r * 2.8, 0, Math.PI * 2); ctx.fill();

        /* white core */
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(px, py, p.r * 0.55, 0, Math.PI * 2); ctx.fill();
    }

    function drawSatNode(s) {
        var pulse = 0.5 + 0.5 * Math.sin(frame * 0.05 + s.angle * 0.08);

        /* halo */
        var hr = s.r * 2.9;
        var halo = ctx.createRadialGradient(s.x, s.y, s.r * 0.4, s.x, s.y, hr);
        halo.addColorStop(0, ha(s.c1, 0.28 + pulse * 0.12));
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(s.x, s.y, hr, 0, Math.PI * 2); ctx.fill();

        /* body */
        var grad = ctx.createRadialGradient(s.x - s.r * 0.3, s.y - s.r * 0.35, s.r * 0.08, s.x, s.y, s.r);
        grad.addColorStop(0, s.c1);
        grad.addColorStop(1, s.c2);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();

        /* specular shine */
        var shine = ctx.createRadialGradient(s.x - s.r * 0.28, s.y - s.r * 0.38, 0,
            s.x - s.r * 0.28, s.y - s.r * 0.38, s.r * 0.85);
        shine.addColorStop(0, 'rgba(255,255,255,0.32)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();

        /* border */
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.26)';
        ctx.lineWidth = 1.2; ctx.stroke();

        /* label */
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px system-ui,sans-serif';
        ctx.fillText(s.line1, s.x, s.y - 4.5);
        ctx.font = '7.5px system-ui,sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        ctx.fillText(s.line2, s.x, s.y + 5);
    }

    function drawHub() {
        var pulse = 0.5 + 0.5 * Math.sin(frame * 0.028);
        var pulse2 = 0.5 + 0.5 * Math.sin(frame * 0.021 + 1.4);

        /* outermost soft halo */
        var outerH = ctx.createRadialGradient(cx, cy, hub.r, cx, cy, hub.r + 90);
        outerH.addColorStop(0, ha(hub.c2, 0.12 + pulse * 0.06));
        outerH.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = outerH;
        ctx.fillRect(0, 0, W, H);

        /* slow expanding pulse rings */
        var pr1 = hub.r + 52 + pulse * 10;
        ctx.beginPath(); ctx.arc(cx, cy, pr1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99,102,241,' + (0.07 + pulse * 0.05) + ')';
        ctx.lineWidth = 1; ctx.stroke();

        var pr2 = hub.r + 70 + pulse2 * 12;
        ctx.beginPath(); ctx.arc(cx, cy, pr2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56,189,248,' + (0.05 + pulse2 * 0.04) + ')';
        ctx.lineWidth = 1; ctx.stroke();

        /* three rotating orbital arcs */
        for (var i = 0; i < 3; i++) {
            var rr = hub.r + 13 + i * 12;
            var rot = frame * 0.014 * (i % 2 === 0 ? 1 : -1) + i * 1.05;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rot);
            /* arc (partial) */
            ctx.beginPath();
            ctx.arc(0, 0, rr, 0, Math.PI * 2 * (0.62 + i * 0.06));
            ctx.strokeStyle = 'rgba(56,189,248,' + (0.28 - i * 0.06) + ')';
            ctx.lineWidth = 1.6 - i * 0.35;
            ctx.stroke();
            /* leading dot */
            ctx.fillStyle = ha(hub.c1, 0.75 - i * 0.18);
            ctx.beginPath();
            ctx.arc(rr * Math.cos(0), rr * Math.sin(0), 2.5 - i * 0.5, 0, Math.PI * 2);
            ctx.fill();
            /* trailing dot (opposite) */
            ctx.fillStyle = ha(hub.c1, 0.25 - i * 0.05);
            ctx.beginPath();
            ctx.arc(rr * Math.cos(Math.PI * 2 * 0.62), rr * Math.sin(Math.PI * 2 * 0.62),
                1.5 - i * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        /* inner halo */
        var halo = ctx.createRadialGradient(cx, cy, hub.r * 0.35, cx, cy, hub.r * 3.2);
        halo.addColorStop(0, ha(hub.c1, 0.48));
        halo.addColorStop(0.35, ha(hub.c2, 0.18));
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r * 3.2, 0, Math.PI * 2); ctx.fill();

        /* body */
        var grad = ctx.createRadialGradient(cx - hub.r * 0.3, cy - hub.r * 0.35, hub.r * 0.08, cx, cy, hub.r);
        grad.addColorStop(0, hub.c1);
        grad.addColorStop(0.55, '#4f8ef7');
        grad.addColorStop(1, hub.c2);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI * 2); ctx.fill();

        /* specular */
        var shine = ctx.createRadialGradient(cx - hub.r * 0.28, cy - hub.r * 0.38, 0,
            cx - hub.r * 0.28, cy - hub.r * 0.38, hub.r * 0.95);
        shine.addColorStop(0, 'rgba(255,255,255,0.35)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI * 2); ctx.fill();

        /* border */
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.32)';
        ctx.lineWidth = 1.6; ctx.stroke();

        /* text */
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11.5px system-ui,sans-serif';
        ctx.fillText(hub.line1, cx, cy - 6.5);
        ctx.font = '9.5px system-ui,sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.82)';
        ctx.fillText(hub.line2, cx, cy + 7.5);
    }

    /* ════════════════════════════════
       MAIN LOOP
    ════════════════════════════════ */
    function animate() {
        frame++;
        ctx.clearRect(0, 0, W, H);

        drawBg();
        drawStars();
        drawOrbitRing();

        /* spawn pulse ring every ~75 frames, cycling through all nodes */
        if (frame - lastRingFrame > 75) {
            var allNodes = [hub].concat(satDefs);
            spawnRing(allNodes[Math.floor(frame / 75) % allNodes.length]);
            lastRingFrame = frame;
        }

        drawPulseRings();

        /* connections */
        satDefs.forEach(drawConn);

        /* packets */
        packets.forEach(drawPacket);

        /* satellite nodes */
        satDefs.forEach(drawSatNode);

        /* hub last (on top) */
        drawHub();

        window._cloudTopoRaf = requestAnimationFrame(animate);
    }

    animate();
}
