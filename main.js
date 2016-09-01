class Calendar {
  constructor() {
    this.html;
  }

  generateHTML() {
    let currentDate = new Date(),
      labelsDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
      labelsMonths = ['Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      html = ``;

    function getDaysInMonth(month, year) {
      let maxDays = new Date(year, month, 0);
      return maxDays.getDate();
    }

    function genMont(month) {
      html += `<div class="month_name">${labelsMonths[month]}</div>`;
    }

    function genWeek() {
      html += `<div class="week">`;
      for (let i = 0; i < 7; i++) {
        html += `<div class="week_name">${labelsDay[i]}</div>`;
      }
      html += `</div>`;
    }

    function genDays(month) {
      let firstDay = new Date(currentDate.getFullYear(), month, 0);
      let startDay = firstDay.getDay();
      let monthLength = getDaysInMonth(month, currentDate.getFullYear());
      let today = currentDate.getDate();
      let day = 1;

      html += `<div class="days">`;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          if (day <= monthLength && (i > 0 || j >= startDay)) {
            if (day === today && month === currentDate.getMonth()) {
              html += `<div id="${month + 1}&${day}" day="${day}" class="day s today">`;
            } else {
              html += `<div id="${month + 1}&${day}" day="${day}" class="day s">`;
            }
          } else {
            html += `<div class="day clear">`;
          }
          if (day <= monthLength && (i > 0 || j >= startDay)) {
            html += day;
            day++;
          }
          html += `</div>`;
        }
        if (day > monthLength) {
          break;
        }
      }
      html += `</div>`;
    }

    function generator() {
      html += `<div class="calendar noselect">`;
      html += `<div class="board">`;
      for (let i = 0; i < 12; i++) {
        html += `<div class="month">`;
        genMont(i);
        genWeek();
        genDays(i);
        html += `</div>`;
      }
      html += `</div></div>`;
    }

    generator();
    this.html = html;
  }

  render(element) {
    this.generateHTML();
    document.querySelector(element).innerHTML = this.html;
  }
}

let db = [];
let calendar = new Calendar();

calendar.render(`.container`);

function create3x2() {
  let listID = [];
  Array.from(document.querySelectorAll(".s"))
    .forEach(x => listID.push(x.getAttribute('id')));
  
  function nightShift() {
    let shiftArray =[];
    function countNight() {
      db.forEach(function(dbElement) {
        let index = listID.findIndex(x => dbElement == x);
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
        gradeUp(index + 15);
      });
      
      function gradeDown(index) {
        if(index < 0) return;
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
      }
      
      function gradeUp(index) {
        if(index > listID.length) return;
        shiftArray.push(listID[index]);
        gradeUp(index + 15);
      }
    }
    countNight();
    console.dir(shiftArray);
    return shiftArray;
  }
  
  function dayShift() {
    let shiftArray =[];
    function countDay() {
      db.forEach(function(dbElement) {
        let index = listID.findIndex(x => dbElement == x);
        if ((index - 5) < 0) {
          index += 10;
        } else {
          index -= 5;
        }
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
        gradeUp(index + 15);
      });
      
      function gradeDown(index) {
        if(index < 0) return;
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
      }
      
      function gradeUp(index) {
        if(index > listID.length) return;
        shiftArray.push(listID[index]);
        gradeUp(index + 15);
      }
    }
    countDay();
    console.dir(shiftArray);
    return shiftArray;
  }
  
  function middleShift() {
    let shiftArray =[];
    function countMiddle() {
      db.forEach(function(dbElement) {
        let index = listID.findIndex(x => dbElement == x);
        if ((index - 10) < 0) {
          index += 5;
        } else {
          index -= 5;
        }
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
        gradeUp(index + 15);
      });
      
      function gradeDown(index) {
        if(index < 0) return;
        shiftArray.push(listID[index]);
        gradeDown(index - 15);
      }
      
      function gradeUp(index) {
        if(index > listID.length) return;
        shiftArray.push(listID[index]);
        gradeUp(index + 15);
      }
    }
    countMiddle();
    console.dir(shiftArray);
    return shiftArray;
  }
  
  function start() {
    listID.forEach(function(id) {
      let classes = ['nightshift', 'dayshift', 'middleshift'];
      for (let i = 0; i < classes.length; i++) {
        document.getElementById(id).classList.remove(classes[i]);
      }
    });
    
    nightShift().forEach(function(id) {
      document.getElementById(id).classList.add('nightshift');
    });
    dayShift().forEach(function(id) {
      document.getElementById(id).classList.add('dayshift');
    });
    middleShift().forEach(function(id) {
      document.getElementById(id).classList.add('middleshift');
    });
  }
  start();
}

function dbInterface() {
  let value = this.getAttribute('day');
  let id = this.getAttribute('id');
  if (db.find(x => id == x)) {
    let index = db.findIndex(x => id == x);
    db.splice(index, 1);
    console.info(`Deleted: ${value}.`);
    this.classList.remove('selection');
  } else if (db.length == 3) {
    console.log(`Already created.`);
  } else {
    db.push(id);
    console.info(`Added: ${value}.`);
    this.classList.add('selection');
    if (db.length == 3) {
      create3x2();
    }
  }
}

Array.from(document.querySelectorAll(".s"))
  .forEach(function (element) {
    element.addEventListener('click', dbInterface);
  });
  
console.dir(Array.from(document.querySelectorAll(".s")));
