class Calendar {
  constructor() {
    this.html;
    // this.month = (isNaN(month) || month == null) ? this.currentDate.getMonth() : month;
    // this.year = (isNaN(year) || year == null) ? this.currentDate.getFullYear() : year;
  }

  generateHTML() {
    let currentDate = new Date(),
        // firstDay = new Date(this.year, this.month, 0),
        // startDay = firstDay.getDay(),
        labelsDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        labelsMonths = ['Январь', 'Февраль', 'Март', 'Апрель',
                        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                        'Октябрь', 'Ноябрь', 'Декабрь'],
        // monthLength = getDaysInMonth(this.year, this.month),
        // monthName = this.labelsMonths[this.month],
        html = ``;

    // DONE
    function getDaysInMonth(month, year) {
      let maxDays = new Date(year, month, 0);
      return maxDays.getDate();
    }

    function genYear() {
      html += `<table class="calendar">`;
      html += `<tr><th class="month" colspan="7">${monthName} ${self.year}</th></tr>`;
    }

    function genWeek() {
      html += `<tr>`;
      for (let i = 0; i <= 6; i++) {
        html += `<td class="week">${self.labelsDay[i]}</td>`;
      }
      html += `</tr>`;
    }

    function genDays() { // REDO
      let today = self.currentDate.getDate();
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
      for (let i = 0; i < 13; i++) {
        console.log(i);
        // genYear();
        // genWeek();
        // genDays();
      }
    }

    generator();
    this.html = html;
  }
  
  // DONE
  render() {
    this.generateHTML();
    document.write(this.html);
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

