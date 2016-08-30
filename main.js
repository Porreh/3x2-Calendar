class Calendar {
  constructor() {
    this.html;
    // this.month = (isNaN(month) || month == null) ? this.currentDate.getMonth() : month;
    // this.year = (isNaN(year) || year == null) ? this.currentDate.getFullYear() : year;
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

    function genYear() {
      html += `<div class="year"><h1>${currentDate.getFullYear()}</h1></div>`;
    }
    
    function genMont(month) {
      html += `<div class="month_name">${labelsMonths[month]}</div>`;
    }

    function genWeek() {
      html += `<div class="week">`;
      for (let i = 0; i < 7; i++) {
        html += `<div class="week_days">${labelsDay[i]}</div>`;
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
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (day <= monthLength && (i > 0 || j >= startDay)) {
            if (day === today && month === currentDate.getMonth()) {
              html += `<div id="${month + 1}&${day}" class="day today">`;
            } else {
              html += `<div id="${month + 1}&${day}" class="day">`;
            }
          } else {
            html += `<div class="clear">`;
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
      html += `<div class="calendar">`;
      genYear();
      for (let i = 0; i < 12; i++) {
        html += `<div class="month">`;
        genMont(i);
        genWeek();
        genDays(i);
        html += `</div>`;
      }
      html += `</div>`;
    }

    generator();
    this.html = html;
  }
  
  render() {
    this.generateHTML();
    document.write(this.html);
  }
}

let calendar = new Calendar();
calendar.render();
