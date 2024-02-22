"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const powerConstant = 50;
const rangeConstant = 4;
const shoeMenu = document.getElementById('show-menu');
const menu = document.getElementById('menu');
let menuBol = false;
const p1Count = document.getElementById('input-number1');
const p2Count = document.getElementById('input-number2');
const p3Count = document.getElementById('input-number3');
const p1Color = document.getElementById('input-color1');
const p2Color = document.getElementById('input-color2');
const p3Color = document.getElementById('input-color3');
const p1p1Button = document.getElementById('particle1-particle1');
const p2p2Button = document.getElementById('particle2-particle2');
const p3p3Button = document.getElementById('particle3-particle3');
const p1p2Button = document.getElementById('particle1-particle2-attract');
const p1p2Force = document.getElementById('particle1-particle2-force');
const p1p2Range = document.getElementById('particle1-particle2-range');
const p1p3Button = document.getElementById('particle1-particle3-attract');
const p1p3Force = document.getElementById('particle1-particle3-force');
const p1p3Range = document.getElementById('particle1-particle3-range');
const p2p1Button = document.getElementById('particle2-particle1-attract');
const p2p1Force = document.getElementById('particle2-particle1-force');
const p2p1Range = document.getElementById('particle2-particle1-range');
const p2p3Button = document.getElementById('particle2-particle3-attract');
const p2p3Force = document.getElementById('particle2-particle3-force');
const p2p3Range = document.getElementById('particle2-particle3-range');
const p3p1Button = document.getElementById('particle3-particle1-attract');
const p3p1Force = document.getElementById('particle3-particle1-force');
const p3p1Range = document.getElementById('particle3-particle1-range');
const p3p2Button = document.getElementById('particle3-particle2-attract');
const p3p2Force = document.getElementById('particle3-particle2-force');
const p3p2Range = document.getElementById('particle3-particle2-range');
let p1p1 = true;
let p1p2 = true;
let p1p3 = true;
let p2p2 = true;
let p2p1 = true;
let p2p3 = true;
let p3p3 = true;
let p3p1 = true;
let p3p2 = true;
const p1ForceInput = document.getElementById('particle1-particle1-force');
const p2ForceInput = document.getElementById('particle2-particle2-force');
const p3ForceInput = document.getElementById('particle3-particle3-force');
const p1RangeInput = document.getElementById('particle1-particle1-range');
const p2RangeInput = document.getElementById('particle2-particle2-range');
const p3RangeInput = document.getElementById('particle3-particle3-range');
shoeMenu.addEventListener('click', () => {
    menuBol = !menuBol;
    menuBol ? (menu.style.visibility = 'visible') : (menu.style.visibility = 'hidden');
});
p1p1Button.addEventListener('click', () => {
    if (!p1p1) {
        p1p1 = true;
    }
    else if (p1p1) {
        p1p1 = false;
    }
});
p1p2Button.addEventListener('click', () => {
    if (!p1p2) {
        p1p2 = true;
    }
    else if (p1p2) {
        p1p2 = false;
    }
});
p1p3Button.addEventListener('click', () => {
    if (!p1p3) {
        p1p3 = true;
    }
    else if (p1p3) {
        p1p3 = false;
    }
});
p2p2Button.addEventListener('click', () => {
    if (!p2p2) {
        p2p2 = true;
    }
    else if (p2p2) {
        p2p2 = false;
    }
});
p2p1Button.addEventListener('click', () => {
    if (!p2p1) {
        p2p1 = true;
    }
    else if (p2p1) {
        p2p1 = false;
    }
});
p2p3Button.addEventListener('click', () => {
    if (!p2p3) {
        p2p3 = true;
    }
    else if (p2p3) {
        p2p3 = false;
    }
});
p3p3Button.addEventListener('click', () => {
    if (!p3p3) {
        p3p3 = true;
    }
    else if (p3p3) {
        p3p3 = false;
    }
});
p3p1Button.addEventListener('click', () => {
    if (!p3p1) {
        p3p1 = true;
    }
    else if (p3p1) {
        p3p1 = false;
    }
});
p3p2Button.addEventListener('click', () => {
    if (!p3p2) {
        p3p2 = true;
    }
    else if (p3p2) {
        p3p2 = false;
    }
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const draw = (ctx, x, y, color, size) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
};
const drawParticle = (ctx, x, y, color, size) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
};
const particle = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};
const random = () => {
    return Math.random() * canvas.width + 50;
};
const create = (number, color) => {
    let group = [];
    for (let i = 0; i < number; i++) {
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }
    return group;
};
const rule = (particles1, particles2, g, range) => {
    for (let i = 0; i < particles1.length; i++) {
        let a = particles1[i];
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < particles2.length; j++) {
            let b = particles2[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > 0 && d < range) {
                let F = g / d;
                fx += (F * dx) / d;
                fy += (F * dy) / d;
            }
        }
        a.vx = (a.vx + fx) * 0.4;
        a.vy = (a.vy + fy) * 0.4;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= canvas.width) {
            a.vx *= -1;
        }
        if (a.y <= 0 || a.y >= canvas.height) {
            a.vy *= -1;
        }
    }
};
let particle1 = create(p1Count.valueAsNumber, p1Color.value);
let particle2 = create(p2Count.valueAsNumber, p2Color.value);
let particle3 = create(p3Count.valueAsNumber, p3Color.value);
p1Count.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        particle1 = create(p1Count.valueAsNumber, p1Color.value);
    }
});
p2Count.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        particle2 = create(p2Count.valueAsNumber, p2Color.value);
    }
});
p3Count.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        particle3 = create(p3Count.valueAsNumber, p3Color.value);
    }
});
const update = (ctx) => {
    if (ctx === null) {
        return;
    }
    let p1p1a = p1p1 ? p1ForceInput.valueAsNumber : -p1ForceInput.valueAsNumber;
    let p1p2a = p1p2 ? p1p2Force.valueAsNumber : -p1p2Force.valueAsNumber;
    let p1p3a = p1p3 ? p1p3Force.valueAsNumber : -p1p3Force.valueAsNumber;
    let p2p2a = p2p2 ? p2ForceInput.valueAsNumber : -p2ForceInput.valueAsNumber;
    let p2p1a = p2p1 ? p2p1Force.valueAsNumber : -p2p1Force.valueAsNumber;
    let p2p3a = p2p3 ? p2p3Force.valueAsNumber : -p2p3Force.valueAsNumber;
    let p3p3a = p3p3 ? p3ForceInput.valueAsNumber : -p3ForceInput.valueAsNumber;
    let p3p1a = p3p3 ? p3p1Force.valueAsNumber : -p3p1Force.valueAsNumber;
    let p3p2a = p3p3 ? p3p2Force.valueAsNumber : -p3p2Force.valueAsNumber;
    rule(particle1, particle1, -2, 12);
    rule(particle1, particle1, p1p1a / powerConstant, p1RangeInput.valueAsNumber * rangeConstant);
    rule(particle2, particle2, -2, 12);
    rule(particle2, particle2, p2p2a / powerConstant, p2RangeInput.valueAsNumber * rangeConstant);
    rule(particle3, particle3, -2, 12);
    rule(particle3, particle3, p3p3a / powerConstant, p3RangeInput.valueAsNumber * rangeConstant);
    rule(particle1, particle3, p1p3a / powerConstant, p1p3Range.valueAsNumber * rangeConstant);
    rule(particle1, particle2, p1p2a / powerConstant, p1p2Range.valueAsNumber * rangeConstant);
    rule(particle3, particle1, p3p1a / powerConstant, p3p1Range.valueAsNumber * rangeConstant);
    rule(particle3, particle2, p3p2a / powerConstant, p3p2Range.valueAsNumber * rangeConstant);
    rule(particle2, particle1, p2p1a / powerConstant, p2p1Range.valueAsNumber * rangeConstant);
    rule(particle2, particle3, p2p3a / powerConstant, p2p3Range.valueAsNumber * rangeConstant);
    rule(particle1, particle3, -1, 20);
    rule(particle1, particle2, -1, 20);
    rule(particle3, particle1, -1, 20);
    rule(particle3, particle2, -1, 20);
    rule(particle2, particle1, -1, 20);
    rule(particle2, particle3, -1, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx, 0, 0, 'rgb(0,0,0)', canvas.width);
    for (let i = 0; i < particles.length; i++) {
        drawParticle(ctx, particles[i].x, particles[i].y, particles[i].color, 3);
    }
};
setInterval(update, 25, ctx);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//# sourceMappingURL=script.js.map