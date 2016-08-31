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
              html += `<div id="${month + 1}&${day}" day="${day}" class="day today wrk">`;
            } else {
              html += `<div id="${month + 1}&${day}" day="${day}" class="day wrk">`;
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
  Array.from(document.querySelectorAll(".wrk"))
    .forEach(x => listID.push(x.getAttribute('id')));
  
  function nightShift() {
    let wert =[];
    function cvb() {
      db.forEach(function(dbElement) {
        let index = listID.findIndex(x => dbElement == x);
        wert.push(listID[index]);
        console.lo
        downGrade(index - 15);
      });
    }
    
    function downGrade(index) {
      if(index < 0) {
        return;
      }
      wert.push(listID[index]);
      downGrade(index - 15);
    }
    cvb();
    console.dir(wert);
  }
  
  function dayShift() {
    
  }
  
  function middleShift() {
    
  }
  
  nightShift();
}

function dbInterface() {
  let value = this.getAttribute('day');
  let id = this.getAttribute('id');
  if (db.find(x => id == x)) {
    let index = db.findIndex(x => id == x);
    db.splice(index, 1);
    console.info(`Deleted: ${value}.`);
    this.style.backgroundColor = "#5c6bc0";
  } else if (db.length === 3) {
    console.log(`Already created.`);
  } else {
    db.push(id);
    console.info(`Added: ${value}.`);
    this.style.backgroundColor = "#ec407a";
    if (db.length === 3) {
      create3x2();
    }
  }
}

Array.from(document.querySelectorAll(".day"))
  .forEach(function (element) {
    element.addEventListener('click', dbInterface);
  });
