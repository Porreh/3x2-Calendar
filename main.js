class Calendar {
  constructor(month, year) {
    this.date = new Date();
    this.currentDate = [];
    this.html = ``;
    this.month = (isNaN(month) || month == null) ? this.date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? this.date.getFullYear() : year;
    this.labelsDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    this.labelsMonths = ['Январь', 'Февраль', 'Март', 'Апрель',
                        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                        'Октябрь', 'Ноябрь', 'Декабрь'];
  }

  generateHTML() {
    let self = this,
        firstDay = new Date(this.year, this.month, 0),
        startDay = firstDay.getDay(),
        monthLength = getDaysInMonth(this.year, this.month),
        monthName = this.labelsMonths[this.month],
        labelsDay = this.labelsDay,
        labelsMonths = this.labelsMonths,
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
      let today = self.date.getDate();
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
    this.currentDate = [this.month, this.year]
    this.html = html;
  }
  
  // DONE
  render() {
    this.generateHTML();
    document.write(this.html);
    this.clear();
  }
  
  clear() {
    this.html = null;
    this.month = null;
    this.year = null;
  }

  nextMonth() {
    let nxt = this.currentDate;
    console.log(nxt);
    // let month = this.date.getMonth();
    // let year = this.date.getFullYear();
    // this.month = month + 1;
    // this.year = year + 1;
    // this.render();
    console.info(`Next month`);
  }
}






let calendar = new Calendar();
calendar.render();

function nextMonth() {
  calendar.nextMonth();
}

let button = document.createElement('button');
document.body.appendChild(button);
button.addEventListener("click", nextMonth);

