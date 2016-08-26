class Calendar {
  constructor(month, year) {
    this.curDay = new Date();
    this.html = ``;
    this.month = (isNaN(month) || month == null) ? this.curDay.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? this.curDay.getFullYear() : year;
    this.labelsDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    this.labelsMonths = ['Январь', 'Февраль', 'Март', 'Апрель',
                        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                        'Октябрь', 'Ноябрь', 'Декабрь'];
  }

  generateHTML() {
    let firstDay = new Date(this.year, this.month, 0),
        startDay = firstDay.getDay(),
        monthLength = getDaysInMonth(this.year, this.month),
        monthName = this.labelsMonths[this.month],
        labelsDay = this.labelsDay,
        labelsMonths = this.labelsMonths,
        curDay = this.curDay,
        year = this.year,
        html = ``;

    // DONE
    function getDaysInMonth(year, month) {
      let maxDays = new Date(year, month, 0);
      return maxDays.getDate();
    }

    function genYear() {
      html += `<table class="calendar">`;
      html += `<tr><th class="month" colspan="7">${monthName} ${year}</th></tr>`;
    }

    function genWeek() {
      html += `<tr>`;
      for (let i = 0; i <= 6; i++) {
        html += `<td class="week">${labelsDay[i]}</td>`;
      }
      html += `</tr>`;
    }

    function genDays() { // REDO
      let today = curDay.getDate();
      let day = 1;

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j <= 6; j++) {
          if (today === day) {
            html += `<td class="day today">`;
          } else {
            html += `<td class="day">`;
          }
          if (day <= monthLength && (i > 0 || j >= startDay)) {
            html += day;
            day++;
          }
          html += `</td>`;
        }
        if (day > monthLength) {
          break;
        } else {
          html += `</tr><tr>`;
        }
      }
    }
    
    // DONE
    function generator() {
      genYear();
      genWeek();
      genDays();
    }

    generator();
    this.html = html;
  }
  
  // DONE
  render() {
    this.generateHTML();
    document.write(this.html);
    this.clear();
  }
  
  clear() {
    this.html = ``;
    this.month = this.curDay.getMonth();
    this.year = this.curDay.getFullYear();
  }

  nextMonth() {
    let month = this.curDay.getMonth() + 1;
    let year = this.curDay.getFullYear() + 1;
    this.html = ``;
    this.month = month;
    this.year = year;
    this.render();
    console.info(`Next month`);
  }
}




let calendar = new Calendar();
calendar.render();

let button = document.createElement('button');
document.body.appendChild(button);
button.addEventListener("click", calendar.nextMonth);

