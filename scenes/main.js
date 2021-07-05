layer([
  'obj',
  'ui'],
  'obj')

addLevel([
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
    width: 30,
    height: 22,
    '^': [sprite('space-invader'), scale(0.7), 'space-invader'],
    '!': [sprite('wall'), 'left-wall'],
    '&': [sprite('wall'), 'right-wall'],
  })

const invaderSpeed = 100
let currentSpeed = invaderSpeed
const levelDown = 50
const bulletSpeed = 400
const moveSpeed = 100
const timeLeft = 15

const player = add([sprite('spaceship'),
pos(width() / 2, height() / 2),
origin('center')])

const timer = add([
  text('0'),
  pos(5, 50),
  scale(2),
  layer('ui'),
  {
    time: timeLeft,
  }
])

const shot = (p) => {
  add([
    rect(6, 10),
    pos(p),
    origin('center'),
    color(20, 20, 1),
    'bullet'
  ])
}

keyDown('left', () => {
  player.move(-moveSpeed, 0)
})
keyDown('right', () => {
  player.move(moveSpeed, 0)
})
keyPress('space', () => {
  shot(player.pos.add(0, -10))
})

const score = add([
  text('0'),
  pos(5, 10),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(1)
  if (timer.time <= 0) {
    go('lose', { score: score.value })
  }
})

action('space-invader', (s) => {
  s.move(currentSpeed, 0)
})

collides('space-invader', 'right-wall', () => {
  currentSpeed = -invaderSpeed
  every('space-invader', (s) => {
    s.move(0, levelDown)
  })
})
collides('space-invader', 'left-wall', () => {
  currentSpeed = invaderSpeed
  every('space-invader', (s) => {
    s.move(0, levelDown)
  })
})

player.overlaps('space-invader', () => {
  go('lose', { score: score.value })
})

action('space-invader', (s) => {
  if (s.pos.y >= height() / 2) {
    go('lose', { score: score.value })
  }
})
action('bullet', (b) => {
  b.move(0, -bulletSpeed)
  if (b.pos.y < 0) {
    destroy(b)
  }
})

collides('bullet', 'space-invader', (b, s) => {
  destroy(b),
    destroy(s),
    score.value++
  score.text = score.value
})