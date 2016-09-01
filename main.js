class Calendar {
  constructor() {
    this.html;
  }

  generateHTML() {
    let currentDate = new Date(),
        labelsDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        labelsMonths = ['Январь', 'Февраль', 'Март', 'Апрель',
                        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                        'Октябрь', 'Ноябрь', 'Декабрь'],
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
      let monthLength = getDaysInMonth(month + 1, currentDate.getFullYear());
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
    document.querySelector(element)
      .innerHTML = this.html;
  }
}

class Shift {
  constructor() {
    self = this;
  }

  createShift() {
    let listID = [];
    Array.from(document.querySelectorAll(".s"))
      .forEach(x => listID.push(x.getAttribute('id')));

    function gradeDown(index) {
      let tmpArray = [];
      while (index >= 0) {
        tmpArray.push(listID[index]);
        index -= 15;
      }
      console.log(tmpArray);
      return tmpArray;
    }

    function gradeUp(index) {
      let tmpArray = [];
      while (index < listID.length--) {
        tmpArray.push(listID[index]);
        index += 15;
      }
      console.log(tmpArray);
      return tmpArray;
    }

    function reShift(prev, next) {
      let shiftArray = [];
      db.forEach(function (dbElement) {
        let index = listID.findIndex(x => dbElement == x);
        if ((index - prev) < 0) {
          index += next;
        } else {
          index -= prev;
        }
        shiftArray.push(listID[index]);
        shiftArray.concat(gradeDown(index - 15), gradeUp(index + 15));
      });
      return shiftArray;
    }

    function run() {
      let classes = ['nightshift', 'dayshift', 'middleshift'];
      listID.forEach(function (id) {
        for (let i = 0; i < classes.length; i++) {
          document.getElementById(id)
            .classList.remove(classes[i]);
        }
      });

      reShift(15, 15)
        .forEach(function (id) {
          document.getElementById(id)
            .classList.add(classes[0]);
        });
      reShift(5, 10)
        .forEach(function (id) {
          document.getElementById(id)
            .classList.add(classes[1]);
        });
      reShift(10, 5)
        .forEach(function (id) {
          document.getElementById(id)
            .classList.add(classes[2]);
        });
    }
    run();
  }

  watch() {
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
        self.createShift();
      }
    }
  }
}

let db = [];
let calendar = new Calendar();
let shift = new Shift();

calendar.render(`.container`);

Array.from(document.querySelectorAll(".s"))
  .forEach(function (element) {
    element.addEventListener('click', shift.watch);
  });
