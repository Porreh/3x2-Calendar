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
        // monthName = this.labelsMonths[this.month],
        html = ``;

    function getDaysInMonth(month, year) {
      let maxDays = new Date(year, month, 0);
      return maxDays.getDate();
    }

    function genYear() {
      html += `<div><h1 class="year">${currentDate.getFullYear()}</h1></div>`;
    }
    
    function genMont(month) {
      html += `<div class="month_name">${labelsMonths[month]}<div>`;
    }

    function genWeek() {
      html += `<div class="week">`;
      for (let i = 0; i < 7; i++) {
        html += `<div class="week_days">${labelsDay[i]}</div>`;
      }
      html += `</div>`;
    }

    function genDays() { // REDO
      // let monthLength = getDaysInMonth(),
      // let today = currentDate.getDate();
      // let day = 1;

      // for (let i = 0; i < 9; i++) {
      //   for (let j = 0; j <= 6; j++) {
      //     if (today === day) {
      //       html += `<td class="day today">`;
      //     } else {
      //       html += `<td class="day">`;
      //     }
      //     if (day <= monthLength && (i > 0 || j >= startDay)) {
      //       html += day;
      //       day++;
      //     }
      //     html += `</td>`;
      //   }
      //   if (day > monthLength) {
      //     break;
      //   } else {
      //     html += `</tr><tr>`;
      //   }
      // }
    }
    
    function generator() {
      genYear();
      html += `<div class="calendar">`;
      for (let i = 0; i < 12; i++) {
        html += `<div class="month">`;
        genMont(i);
        genWeek();
        genDays();
        html += `</div>`;
      }
      html += `</div>`;
    }

    generator();
    this.html = html;
  }
  
  render() {
    this.generateHTML();
    console.log(this.html);
    // document.write(this.html);
  }
}

let calendar = new Calendar();
calendar.render();
