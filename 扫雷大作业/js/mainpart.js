var templateAlert = function(message) {
    var alert = [{message : message}]
    if(message === 'YOU WIN!!!') {
      var result = 'win'
    } else {
      var result = 'lose'
    }
    var t1 = `
        <div class="alert-content">
          <div class="alert-mask"></div>
          <div class="alert-cell ${result} ">
            <div id="alert1-message">${alert[0].message}</div>
            <div class='alert1-button'>OK</div>
          </div>
        </div>
        `
    return t1
  }
  
  var insertAlert = function(string) {
    var target = e('body')
    var alert = templateAlert(string)
    appendHtml(target, alert)
    endTime = time
    clockOff()
    var target = e('#clock')
    target.innerHTML = `TIME : ${endTime}S`
  }
  
  var alert = function(message) {
    bindAlert1(deleteAlert)
    insertAlert(message)
  }
  
  var deleteAlert = function() {
    var t = event.target
    var alert1 = t.classList.contains("alert1-button")
    if(alert1) {
      resetTable(num.rows)
      var p = e('.alert-content')
      p.remove()
      var b = e('body')
      b.removeEventListener('click', deleteAlert)
    }
  }
  
  var bindAlert1 = function(deleteAlert) {
    bind('body', 'click', deleteAlert)
  }

  const victory = function() {
    alert('YOU WIN!!!')
    log('YOU WIN!!')
  }
  
  const failure = function() {
    alert('YOU LOSE!!!')
    log('YOU FAILED')
  }
  
  const showResult = function(s='') {
    var k = (num.bomb === 0 && num.flagLeft === 0) || num.noBomb === 0
    if(s === 'fail') {
      failure()
    }
    if(k === true) {
      victory()
    }

  }
  
  var clickBomb = function() {
    num.bomb--
    showResult()
  }
  
  var clickNoBomb = function() {
    num.noBomb--
    showResult()
  }

  const bindLeftClick = function() {
    bindAll('.tableCell', 'click', function(event) {
      var target = event.target
      var n = parseInt(target.dataset.value)
      var flag = target.classList.contains('flag')
      var boom = target.classList.contains('boom')
      var cover = target.classList.contains('cover')
      if(clock10 === 0) {
        clockOn()
      }
      if(flag === false && cover === true) {
        if(n === 9) {
          showBomb()
          changeClass(target, 'cover', 'boom')
        } else {
          changeClass(target, 'cover')
          if(flag == false)
          target.innerHTML = n
          //log('taget.classList', target.classList)
          if(n === 0) {
            spread(target)
          }
          clickNoBomb()
        }
      }
    })
  }
  

  const bindRightClick = function() {
    bindAll('.tableCell', 'mousedown', function(event) {
      var target = event.target
      var n = parseInt(target.dataset.value)
      var cover = target.classList.contains('cover')
      var flag = target.classList.contains('flag')
      target.oncontextmenu = function(event) {
        return false
      }
      if(event.button === 2) {
        if(cover === true) {
          num.flagLeft--
          if(clock10 === 0) {
            clockOn()
          }
          changeClass(target, 'cover', 'flag')
          if(n === 9) {
            clickBomb()
          }
        } else if (flag === true) {
          num.flagLeft++
          if(clock10 === 0) {
            clockOn()
          }
          changeClass(target, 'flag', 'cover')
          if(n === 9) {
            num.bomb++
          }
        }
      }
    })
  }

  const showBomb = function() {
    var cells = tableCells()
    var len = cells.length
    var bombs = []
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        var cell = cells[i][j]
        if (cell.dataset.value === '9') {
          bombs.push(cell)
        }
      }
    }
    timer(bombs)
  }

  const timer = function(bombs) {
    var k = 0
    showResult('fail')
    var t = setInterval(function() {
      bombs[k].classList.value = 'tableCell boom'
      k++
      if(k >= bombs.length){
        clearInterval(t)
      }
    }, 80)
  }
  
  const tableCells = function() {
    var all = eAll('.tableCell')
    var len = all.length
    var n = Math.sqrt(len)
    var row = []
    var square = []
    for (let i = 0; i < len; i++) {
      row.push(all[i])
      if(i % n == (n-1)) {
        square.push(row)
        row = []
      }
    }
    return square
  }
  const open1 = function(square, i, j) {
    var len = square.length
    if(i >= 0 && i < len && j >= 0 && j < len) {
      var cell = square[i][j]
      var value = cell.dataset.value
      var cover = cell.classList.contains('cover')
      var flag = cell.classList.contains('flag')
      if(value === '9' || flag === true) {
        clickBomb()
        return null
      }
      if(cover === true) {
        changeClass(cell, 'cover')
        cell.innerHTML = value
        if(value === '0') {
          openAround(square, i, j)
          clickNoBomb()
          return null
        }
        clickNoBomb()
      }
    }
  }
  
  const openAround = function(square, x, y) {
    open1(square, x-1, y)
    open1(square, x-1, y+1)
    open1(square, x-1, y-1)
    open1(square, x, y+1)
    open1(square, x, y-1)
    open1(square, x+1, y+1)
    open1(square, x+1, y)
    open1(square, x+1, y-1)
  }
  
  const spread = function(target) {
    var i = parseInt(target.dataset.i)
    var j = parseInt(target.dataset.j)
    var cells = tableCells()
    openAround(cells, i, j)
  }
  const testMine = function(n) {
    var square = randomSquare09(n)
    return square
  }
  
  const testTable = function(n) {
    var mine = testMine(n)
    var t = squareTemp(mine)
    insertTemp(t)
  }

  const setRestart = function(n) {
    let target = e('.restart')
    target.dataset.row = String(n)
  }
  const bindButtons = function() {
    bind('.junior', 'click', function() {
      resetTable(6)
      setRestart(6)
    })
    bind('.middle', 'click', function() {
      resetTable(9)
      setRestart(9)
    })
    bind('.master', 'click', function() {
      resetTable(12)
      setRestart(12)
    })
    bind('.restart', 'click', function(event) {
      let target = event.target
      let n = target.dataset.row
      n = parseInt(n)
      resetTable(n)
    })
  }
  const resetTable = function(n) {
    creatTable(n)
    bindLeftClick()
    bindRightClick()
    clockOff()
  }
  
  const main = function() {
    resetTable(9)
    bindButtons()
  }
  main()
  