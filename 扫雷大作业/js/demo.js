var log = function(){
    console.log.apply(console , arguments)
  }
  
  var ajax = function(method, path, headers, data, response){
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')//headers
    r.onreadystatechange = function() {
      if(r.readyState === 4){
        response(r)
      }
    }
  }
  
  var e = function(input){
    var target = document.querySelector(input)
    return target
  }
  
  var eAll = function(input){
    return document.querySelectorAll(input)
  }
  
  var setAttri = function(target, atri, newvalue) {
    target.setAttribute(atri, newvalue)
  }
  
  var removeAttri = function(target, attri) {
    target.removeAttribute(attri)
  }
  
  var time = function(){
    var d = new Date()
    var year = d.getFullYear()
    var mon = d.getMonth()+1
    var date = d.getDate()
    var hour = d.getHours()
    var min = d.getMinutes()
    var day = d.getDay()
    if(day == 7){day = '日'}
    var time = `${year}/${mon}/${date} ${hour}:${min}`
    return time
  }
  
  var appendHtml = function(target, string){
    target.insertAdjacentHTML('beforeend', string)
  }
  
  var find = function(target, selector) {
    var find = target.querySelector(selector)
    return find
  }
  
  var findAll = function(target, string) {
    var findAll = target.querySelectorAll(string)
    return findAll
  }
  
  var bind = function(selector,trigger,callback) {
    var target = e(selector)
    target.addEventListener(trigger,callback)
  }
  
  var bindAll = function(selector, trigger, callback) {
    var target = document.querySelectorAll(selector)
    for (var i = 0; i < target.length; i++) {
      target[i].addEventListener(trigger, callback)
    }
  }
  
  var toggle = function(target, classname) {
    var bool = target.classList.contains(classname)
    if(bool === true) {
      target.classList.remove(classname)
      log('remove', classname, target)
    } else {
      target.classList.add(classname)
      log('add', classname, target)
    }
  }
  
  var classRemove = function(target, classname) {
      var x = target
      if(x.classList.contains(classname)){
        x.classList.remove(classname)
        log('classRemove', x)
    }
  }
  
  var classRemoveAll = function(target, classname) {
    var len = target.length
    log('classRemove', len)
    for (var i = 0; i < len; i++) {
      var x = target[i]
      if(x.classList.contains(classname)){
        x.classList.remove(classname)
        log('classRemove', x)
      }
    }
  }
  
  var classAdd = function(target, classname) {
      var x = target
      if(!x.classList.contains(classname)){
        x.classList.add(classname)
        log('classAdd', x)
    }
  }
  
  var classAddAll = function(target,classname) {
    var len = target.length
    for (var i = 0; i < len; i++) {
      var x = target[i]
      if(!x.classList.contains(classname)) {
        x.classList.add(classname)
        log('classAdd', x)
      }
    }
  }
  
  var randomInt = function(n) {
    var x = Math.random()
    var j = n + 1
    x = x * j
    x = Math.floor(x)

    return x
  }  
  var randomInt_test = function(n) {
    var chances =[]
    for (var i = 0; i < (n + 1); i++) {
      var k = 0
      for (var j = 0; j < 1000000; j++) {
        var x = randomInt(n)
        if( x === i){ k++ }
      }
      var chance = k / 10000
      chances.push(chance)
    }
    log('chances', chances)
  }
  
  const arrayCopy = function(array) {
    var string = JSON.stringify(array)
    var arrayNew = JSON.parse(string)
    return arrayNew
  }
  const changeClass = function(target, class1, class2='') {
    var bool = target.classList.contains(class1)
    if(bool == true) {
      if (class2 == '') {
        target.classList.toggle(class1)
      } else {
        target.classList.toggle(class1)
        target.classList.toggle(class2)
      }
    }
  }
  