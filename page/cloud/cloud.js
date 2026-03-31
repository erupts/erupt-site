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
    var W = 460, H = 360;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    var cx = 230, cy = 175;
    var OR = 118; // orbit radius

    /* ─── util ─── */
    function ha(hex, a) {
        return 'rgba(' + parseInt(hex.slice(1,3),16) + ',' +
               parseInt(hex.slice(3,5),16) + ',' +
               parseInt(hex.slice(5,7),16) + ',' + a + ')';
    }
    // Quadratic bezier point
    function qb(x0,y0,cpx,cpy,x2,y2,t) {
        var m = 1-t;
        return { x: m*m*x0 + 2*m*t*cpx + t*t*x2,
                 y: m*m*y0 + 2*m*t*cpy + t*t*y2 };
    }
    // Right-perpendicular control point (curves clockwise hub→sat)
    function ctrlPt(ax,ay,bx,by,bend) {
        var mx=(ax+bx)/2, my=(ay+by)/2;
        var dx=bx-ax, dy=by-ay, len=Math.sqrt(dx*dx+dy*dy);
        return { x: mx + (dy/len)*bend, y: my + (-dx/len)*bend };
    }

    /* ─── nodes ─── */
    var hub = { x:cx, y:cy, r:38, l1:'Cloud', l2:'Server', c1:'#38bdf8', c2:'#6366f1' };

    var sats = [
        { a:-90,  r:26, l1:'Console', l2:'Admin',  c1:'#22d3ee', c2:'#0891b2' },
        { a:-30,  r:22, l1:'Node',    l2:'#1',     c1:'#818cf8', c2:'#6366f1' },
        { a: 30,  r:22, l1:'Node',    l2:'#2',     c1:'#a78bfa', c2:'#7c3aed' },
        { a: 90,  r:22, l1:'Config',  l2:'Store',  c1:'#fb923c', c2:'#ea580c' },
        { a:150,  r:22, l1:'Node',    l2:'#3',     c1:'34d399',  c2:'#059669' },
        { a:210,  r:22, l1:'Node',    l2:'#4',     c1:'#818cf8', c2:'#6366f1' },
    ];
    // Fix Node #3 color (was missing #)
    sats[4].c1 = '#34d399';

    sats.forEach(function(s) {
        var rad = s.a * Math.PI / 180;
        s.x = cx + OR * Math.cos(rad);
        s.y = cy + OR * Math.sin(rad);
        s.cp = ctrlPt(cx, cy, s.x, s.y, 22); // bezier control point
    });

    /* ─── packets ─── */
    var pkts = [];
    sats.forEach(function(s, i) {
        var b = i / sats.length;
        // 2× outward (config push) — cyan
        pkts.push({ x0:cx, y0:cy, cpx:s.cp.x, cpy:s.cp.y, x2:s.x, y2:s.y, t:(b)%1,        sp:0.0040+Math.random()*0.0018, c:'#7dd3fc', r:3.0 });
        pkts.push({ x0:cx, y0:cy, cpx:s.cp.x, cpy:s.cp.y, x2:s.x, y2:s.y, t:(b+0.48)%1, sp:0.0032+Math.random()*0.0015, c:'#7dd3fc', r:2.2 });
        // 1× inward (heartbeat) — green
        pkts.push({ x0:s.x, y0:s.y, cpx:s.cp.x, cpy:s.cp.y, x2:cx, y2:cy, t:(b+0.24)%1, sp:0.0048+Math.random()*0.0018, c:'#6ee7b7', r:2.0 });
    });

    /* ─── hub pulse rings ─── */
    var hRings = [];
    var lastRing = -300;

    /* ─── floating particles (drift in canvas space) ─── */
    var drifters = [];
    for (var i = 0; i < 28; i++) {
        drifters.push({
            x: Math.random()*W, y: Math.random()*H,
            vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
            r: Math.random()*1.1+0.3,
            ph: Math.random()*Math.PI*2,
            sp: 0.018+Math.random()*0.025,
            c: Math.random()<0.5 ? '#7dd3fc' : '#818cf8'
        });
    }

    var frame = 0;

    /* ═══════════════════════════════
       DRAWING FUNCTIONS
    ═══════════════════════════════ */

    function drawAtmo() {
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        g.addColorStop(0,   'rgba(56,189,248,0.30)');
        g.addColorStop(0.35,'rgba(99,102,241,0.16)');
        g.addColorStop(0.7, 'rgba(56,189,248,0.06)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    function drawDotGrid() {
        for (var gx = 18; gx < W; gx += 24) {
            for (var gy = 18; gy < H; gy += 24) {
                var d = Math.sqrt((gx-cx)*(gx-cx)+(gy-cy)*(gy-cy));
                var a = Math.max(0.025, 0.10 - d/680);
                ctx.fillStyle = 'rgba(125,211,252,' + a + ')';
                ctx.beginPath(); ctx.arc(gx, gy, 0.75, 0, Math.PI*2); ctx.fill();
            }
        }
    }

    function drawDrifters() {
        drifters.forEach(function(p) {
            p.x = (p.x + p.vx + W) % W;
            p.y = (p.y + p.vy + H) % H;
            var a = 0.12 + 0.18*Math.sin(frame*p.sp + p.ph);
            ctx.fillStyle = ha(p.c, a);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        });
    }

    function drawOrbit() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, OR, 0, Math.PI*2);
        ctx.setLineDash([2, 11]);
        ctx.strokeStyle = 'rgba(125,211,252,0.09)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    function drawHubPulse() {
        if (frame - lastRing > 75) {
            hRings.push({ t:0, maxR: hub.r+80, a:0.80 });
            lastRing = frame;
        }
        hRings = hRings.filter(function(r) {
            r.t += 0.013;
            var rad = hub.r + (r.maxR - hub.r)*r.t;
            var a = r.a * (1-r.t);
            ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI*2);
            ctx.strokeStyle = ha(hub.c1, a);
            ctx.lineWidth = 2.5*(1-r.t*0.6);
            ctx.stroke();
            return r.t < 1;
        });
    }

    function drawConn(s) {
        var x1 = cx + (s.x-cx)/OR*hub.r,   y1 = cy + (s.y-cy)/OR*hub.r;
        var x2 = s.x - (s.x-cx)/OR*s.r,    y2 = s.y - (s.y-cy)/OR*s.r;
        var cp = s.cp;

        // Outermost diffuse glow
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(cp.x,cp.y,x2,y2);
        ctx.strokeStyle = 'rgba(56,189,248,0.18)'; ctx.lineWidth = 22; ctx.stroke();
        // Wide glow
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(cp.x,cp.y,x2,y2);
        ctx.strokeStyle = 'rgba(125,211,252,0.32)'; ctx.lineWidth = 9; ctx.stroke();
        // Mid bright
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(cp.x,cp.y,x2,y2);
        ctx.strokeStyle = 'rgba(186,230,253,0.50)'; ctx.lineWidth = 3.5; ctx.stroke();
        // Dashed bright core
        ctx.save();
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(cp.x,cp.y,x2,y2);
        ctx.setLineDash([5,5]);
        ctx.lineDashOffset = -(frame*0.45 % 10);
        ctx.strokeStyle = 'rgba(224,247,255,0.75)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
    }

    function drawPkt(p) {
        p.t = (p.t + p.sp) % 1;
        var pt = qb(p.x0, p.y0, p.cpx, p.cpy, p.x2, p.y2, p.t);

        // Comet trail (8 steps, brighter)
        for (var i = 1; i <= 8; i++) {
            var tb = p.t - i*p.sp*9;
            if (tb < 0) continue;
            var pb = qb(p.x0, p.y0, p.cpx, p.cpy, p.x2, p.y2, tb);
            var tr = Math.max(0.4, p.r*(1-i*0.10));
            ctx.fillStyle = ha(p.c, 0.60-i*0.062);
            ctx.beginPath(); ctx.arc(pb.x, pb.y, tr, 0, Math.PI*2); ctx.fill();
        }
        // Outer diffuse bloom
        var g2 = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.r*7);
        g2.addColorStop(0, ha(p.c, 0.45));
        g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, p.r*7, 0, Math.PI*2); ctx.fill();
        // Inner bright bloom
        var g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.r*3.5);
        g.addColorStop(0, ha(p.c, 1.0));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, p.r*3.5, 0, Math.PI*2); ctx.fill();
        // White hot core
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(pt.x, pt.y, p.r*0.65, 0, Math.PI*2); ctx.fill();
    }

    function drawSat(s) {
        var pulse = 0.5 + 0.5*Math.sin(frame*0.052 + s.a*0.08);

        // Outer diffuse halo (large, very soft)
        var hr2 = s.r*5.5;
        var outerH = ctx.createRadialGradient(s.x, s.y, s.r, s.x, s.y, hr2);
        outerH.addColorStop(0, ha(s.c1, 0.20+pulse*0.10));
        outerH.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = outerH;
        ctx.beginPath(); ctx.arc(s.x, s.y, hr2, 0, Math.PI*2); ctx.fill();

        // Pulsing outer ring
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r+9+pulse*5, 0, Math.PI*2);
        ctx.strokeStyle = ha(s.c1, 0.28+pulse*0.18); ctx.lineWidth = 2; ctx.stroke();

        // Inner halo
        var hr = s.r*3.2;
        var halo = ctx.createRadialGradient(s.x, s.y, s.r*0.2, s.x, s.y, hr);
        halo.addColorStop(0, ha(s.c1, 0.48+pulse*0.18));
        halo.addColorStop(0.5, ha(s.c1, 0.15));
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(s.x, s.y, hr, 0, Math.PI*2); ctx.fill();

        // Frosted glass base
        ctx.fillStyle = 'rgba(4,18,48,0.68)';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();

        // Colored overlay
        var grad = ctx.createRadialGradient(s.x-s.r*0.25, s.y-s.r*0.3, 0, s.x, s.y, s.r);
        grad.addColorStop(0, ha(s.c1, 0.65));
        grad.addColorStop(1, ha(s.c2, 0.38));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();

        // Specular highlight
        var shine = ctx.createRadialGradient(s.x-s.r*0.25, s.y-s.r*0.35, 0, s.x, s.y, s.r*0.85);
        shine.addColorStop(0, 'rgba(255,255,255,0.38)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();

        // Glowing border (shadowBlur for real glow)
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = s.c1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.strokeStyle = ha(s.c1, 0.90+pulse*0.10); ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();

        // Labels
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8.5px system-ui,sans-serif';
        ctx.fillText(s.l1, s.x, s.y - 4.5);
        ctx.font = '7.5px system-ui,sans-serif';
        ctx.fillStyle = ha(s.c1, 0.95);
        ctx.fillText(s.l2, s.x, s.y + 5.5);
    }

    function drawHub() {
        var p1 = 0.5+0.5*Math.sin(frame*0.027);
        var p2 = 0.5+0.5*Math.sin(frame*0.021+1.3);

        // Vast atmospheric halo
        var bigH = ctx.createRadialGradient(cx, cy, hub.r, cx, cy, hub.r*4.5);
        bigH.addColorStop(0,   ha(hub.c1, 0.38+p1*0.15));
        bigH.addColorStop(0.3, ha(hub.c2, 0.18+p2*0.08));
        bigH.addColorStop(0.7, ha(hub.c1, 0.05));
        bigH.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = bigH;
        ctx.fillRect(0, 0, W, H);

        // Slow pulsing outer rings (brighter, thicker)
        [
            { r: hub.r+54+p1*9,  a: 0.20+p1*0.12, c: hub.c1, w: 1.8 },
            { r: hub.r+74+p2*11, a: 0.14+p2*0.08, c: hub.c2, w: 1.4 },
        ].forEach(function(ring) {
            ctx.save();
            ctx.shadowBlur = 10; ctx.shadowColor = ring.c;
            ctx.beginPath(); ctx.arc(cx, cy, ring.r, 0, Math.PI*2);
            ctx.strokeStyle = ha(ring.c, ring.a); ctx.lineWidth = ring.w; ctx.stroke();
            ctx.restore();
        });

        // Three rotating orbital arcs (brighter, with shadowBlur)
        for (var i = 0; i < 3; i++) {
            var rr  = hub.r + 15 + i*12;
            var spd = 0.015 * (i%2===0 ? 1 : -1.4);
            var rot = frame*spd + i*1.15;
            ctx.save();
            ctx.translate(cx, cy); ctx.rotate(rot);
            ctx.shadowBlur = 12; ctx.shadowColor = hub.c1;
            // Arc body
            ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI*2*(0.65+i*0.04));
            ctx.strokeStyle = ha(hub.c1, 0.55-i*0.08); ctx.lineWidth = 2.0-i*0.35; ctx.stroke();
            // Leading bright dot
            ctx.shadowBlur = 16;
            ctx.fillStyle = ha(hub.c1, 1.0);
            ctx.beginPath(); ctx.arc(rr, 0, 3.2-i*0.5, 0, Math.PI*2); ctx.fill();
            // Secondary dot
            var tailAngle = Math.PI*2*(0.65+i*0.04);
            ctx.shadowBlur = 8;
            ctx.fillStyle = ha(hub.c1, 0.45-i*0.08);
            ctx.beginPath(); ctx.arc(rr*Math.cos(tailAngle), rr*Math.sin(tailAngle), 1.8-i*0.3, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        }

        // Inner halo (stronger)
        var innerH = ctx.createRadialGradient(cx, cy, hub.r*0.2, cx, cy, hub.r*3.2);
        innerH.addColorStop(0,    ha(hub.c1, 0.80));
        innerH.addColorStop(0.3,  ha(hub.c2, 0.40));
        innerH.addColorStop(0.65, ha(hub.c1, 0.10));
        innerH.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = innerH;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r*3.2, 0, Math.PI*2); ctx.fill();

        // Frosted glass base
        ctx.fillStyle = 'rgba(3,14,38,0.72)';
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI*2); ctx.fill();

        // Colored gradient
        var grad = ctx.createRadialGradient(cx-hub.r*0.3, cy-hub.r*0.35, hub.r*0.05, cx, cy, hub.r);
        grad.addColorStop(0,   ha(hub.c1, 0.72));
        grad.addColorStop(0.5, ha('#4f90f8', 0.42));
        grad.addColorStop(1,   ha(hub.c2, 0.62));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI*2); ctx.fill();

        // Inner decoration ring
        ctx.beginPath(); ctx.arc(cx, cy, hub.r*0.58, 0, Math.PI*2);
        ctx.strokeStyle = 'rgba(255,255,255,0.13)'; ctx.lineWidth = 1; ctx.stroke();

        // Specular
        var shine = ctx.createRadialGradient(cx-hub.r*0.28, cy-hub.r*0.38, 0, cx-hub.r*0.28, cy-hub.r*0.38, hub.r*0.92);
        shine.addColorStop(0, 'rgba(255,255,255,0.38)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI*2); ctx.fill();

        // Glowing border (shadowBlur for strong glow)
        ctx.save();
        ctx.shadowBlur = 28; ctx.shadowColor = hub.c1;
        ctx.beginPath(); ctx.arc(cx, cy, hub.r, 0, Math.PI*2);
        ctx.strokeStyle = ha(hub.c1, 0.95); ctx.lineWidth = 2.5; ctx.stroke();
        ctx.restore();

        // Labels
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px system-ui,sans-serif';
        ctx.fillText(hub.l1, cx, cy-7);
        ctx.font = '10px system-ui,sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.86)';
        ctx.fillText(hub.l2, cx, cy+8);
    }

    /* ═══════════════════════════════
       MAIN LOOP
    ═══════════════════════════════ */
    function tick() {
        frame++;
        ctx.clearRect(0, 0, W, H); // transparent — hero bg shows through

        drawDotGrid();
        drawAtmo();
        drawDrifters();
        drawOrbit();
        drawHubPulse();

        sats.forEach(drawConn);
        pkts.forEach(drawPkt);
        sats.forEach(drawSat);
        drawHub();

        window._cloudTopoRaf = requestAnimationFrame(tick);
    }

    tick();
}
