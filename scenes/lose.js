add([
  text("Your score is"),
  origin('center'),
  scale(2),
  pos(width()/2, height()/3)
])

add([
  text(args.score),
  origin('center'),
  scale(10),
  pos(width()/2, height()/2)
])

setTimeout(()=>{add([
  text("Thanks for playing"),
  origin('center'),
  scale(2),
  pos(width()/2, height()/1.5)
])}, 1500)

setTimeout(()=>{add([
  text("Bye"),
  origin('center'),
  scale(2),
  pos(width()/2, height()/1.3)
])}, 3000)
