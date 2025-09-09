const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');
nextCtx.scale(20, 20);

const arenaWidth = 12;
const arenaHeight = 20;

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset, ctx = context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function drawGrid(ctx, width, height) {
    ctx.save();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.05;
    for (let x = 1; x < width; x++) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 1; y < height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    ctx.restore();
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y >= 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'TJLOSZI';
    if (!player.next) {
        player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
    }
    player.matrix = player.next;
    player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arenaWidth / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function draw() {
    context.fillStyle = '#111';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, arenaWidth, arenaHeight);
    drawMatrix(arena, {x:0, y:0});
    drawMatrix(player.matrix, player.pos);

    // Siguiente pieza
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    nextCtx.fillStyle = '#222';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    drawGrid(nextCtx, 4, 4);
    if (player.next) {
        // Centrar la pieza en el canvas de preview
        const offset = {
            x: Math.floor((4 - player.next[0].length) / 2),
            y: Math.floor((4 - player.next.length) / 2)
        };
        drawMatrix(player.next, offset, nextCtx);
    }
}

function updateScore() {
    document.getElementById('score').innerText = 'Puntaje: ' + player.score;
}

const colors = [
    null,
    '#FF0D72', // T
    '#0DC2FF', // O
    '#0DFF72', // L
    '#F538FF', // J
    '#FF8E0D', // I
    '#FFE138', // S
    '#3877FF', // Z
];

const arena = createMatrix(arenaWidth, arenaHeight);

const player = {
    pos: {x:0, y:0},
    matrix: null,
    next: null,
    score: 0,
};

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === 'q' || event.key === 'Q') {
        playerRotate(-1);
    } else if (event.key === 'w' || event.key === 'W') {
        playerRotate(1);
    }
});

playerReset();
updateScore();
update();
