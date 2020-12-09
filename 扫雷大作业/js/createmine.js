var num = {
    bomb : 24,
    noBomb : 57,
    rows : 9,
    flagLeft : 24,
  }
  
  var endTime = 0
  
  var time = 0
  
  var clock = 0
  
  var clock10 = 0
  
  const clockOn = function() {
    clock10 = 1
    var target = e('#clock')
    clock = setInterval(function() {
      time++
      target.innerHTML = `TIME : ${time}S`
      //log('time', time)
    }, 1000)
  }
  
  const clockOff = function() {
    log('clockOff', endTime, time)
    clock10 = 0
    var target = e('#clock')
    clearInterval(clock)
    time = 0
    target.innerHTML = `TIME : ${time}S`
   
  }

  const square0 = function(n) {
    var square = []
    var row = []
    for (var i = 0; i < n; i++) {
      row.push(0)
    }
    for (var i = 0; i < n; i++) {
      var array = arrayCopy(row)
      square.push(array)
    }
    return square
  }
  
  const randomSquare09 = function(n) {
    var square = square0(n)

    var all = n * n
    var bombNum = Math.floor(all * 0.2)
    num.bomb = bombNum
    num.noBomb = all - bombNum
    num.rows = n
    num.flagLeft = bombNum
    for (var i = 0; i < bombNum; i++) {
      let x = randomInt(n-1)
      let y = randomInt(n-1)
      while(square[x][y] === 9) {
        x = randomInt(n-1)
        y = randomInt(n-1)
      }
      square[x][y] = 9
    }
    return square
  }
  const plus1 = function(square, i, j) {
    var len = square.length
    if(i >= 0 && i < len && j >= 0 && j < len) {
      if(square[i][j] !== 9) {
        square[i][j] += 1
      }
    }
  }
  
  const squareAdd = function(square, x, y) {
    plus1(square, x-1, y)
    plus1(square, x-1, y+1)
    plus1(square, x-1, y-1)
    plus1(square, x, y+1)
    plus1(square, x, y-1)
    plus1(square, x+1, y+1)
    plus1(square, x+1, y)
    plus1(square, x+1, y-1)
  }
  
  const markMine = function(square) {
    var len = square.length
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        if(square[i][j] === 9)
        squareAdd(square, i, j)
      }
    }
    return square
  }
  
  const creatMine = function(n) {
    var square = randomSquare09(n)
    var mine = markMine(square)
    log('creatMine', square)
    return mine
  }
  
  const rowTemp = function(array, n) {
    var len = array.length
    var t = `<div class="tableRow">`
    for (var i = 0; i < array.length; i++) {
      var s = `<div class="tableCell cover" data-value=${array[i]} data-i=${n} data-j=${i}></div>`
      t += s
    }
    t += `</div>`
    return t
  }
  
  const squareTemp = function(array) {
    var t = ``
    var len = array.length
    for (let i = 0; i < len; i++) {
      let s = rowTemp(array[i], i)
      t += s
    }
    return t
  }
  
  const insertTemp = function(t) {
    var table = e('.tableContainer')
    table.innerHTML = t
  }
  
  const creatTable = function(n) {
    var mine = creatMine(n)
    var t = squareTemp(mine)
    insertTemp(t)
  }
  