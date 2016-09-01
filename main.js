"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),Calendar=function(){function e(){_classCallCheck(this,e),this.html}return _createClass(e,[{key:"generateHTML",value:function(){function e(e,t){var n=new Date(t,e,0);return n.getDate()}function t(e){o+='<div class="month_name">'+s[e]+"</div>"}function n(){o+='<div class="week">';for(var e=0;7>e;e++)o+='<div class="week_name">'+c[e]+"</div>";o+="</div>"}function a(t){var n=new Date(i.getFullYear(),t,0),a=n.getDay(),r=e(t+1,i.getFullYear()),c=i.getDate(),s=1;o+='<div class="days">';for(var l=0;6>l;l++){for(var d=0;7>d;d++)o+=s>r||0>=l&&a>d?'<div class="day clear">':s===c&&t===i.getMonth()?'<div id="'+(t+1)+"&"+s+'" day="'+s+'" class="day s today">':'<div id="'+(t+1)+"&"+s+'" day="'+s+'" class="day s">',s>r||0>=l&&a>d||(o+=s,s++),o+="</div>";if(s>r)break}o+="</div>"}function r(){o+='<div class="calendar noselect">',o+='<div class="board">';for(var e=0;12>e;e++)o+='<div class="month">',t(e),n(),a(e),o+="</div>";o+="</div></div>"}var i=new Date,c=["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"],s=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],o="";r(),this.html=o}},{key:"render",value:function(e){this.generateHTML(),document.querySelector(e).innerHTML=this.html}}]),e}(),Shift=function(){function e(){_classCallCheck(this,e),self=this}return _createClass(e,[{key:"createShift",value:function(){function e(e){for(var t=[];e>=0;)t.push(r[e]),e-=15;return t}function t(e){for(var t=[];e<r.length-1;)t.push(r[e]),e+=15;return t}function n(n,a){var i=[];return db.forEach(function(c){var s=r.findIndex(function(e){return c==e});0>s-n?s+=a:s-=n,i.push(r[s]),e(s-15).forEach(function(e){return i.push(e)}),t(s+15).forEach(function(e){return i.push(e)})}),i}function a(){var e=["nightshift","dayshift","middleshift"];r.forEach(function(t){for(var n=0;n<e.length;n++)document.getElementById(t).classList.remove(e[n])}),n(15,15).forEach(function(t){document.getElementById(t).classList.add(e[0])}),n(5,10).forEach(function(t){document.getElementById(t).classList.add(e[1])}),n(10,5).forEach(function(t){document.getElementById(t).classList.add(e[2])})}var r=[];Array.from(document.querySelectorAll(".s")).forEach(function(e){return r.push(e.getAttribute("id"))}),a()}},{key:"watch",value:function(){var e=this.getAttribute("day"),t=this.getAttribute("id");if(db.find(function(e){return t==e})){var n=db.findIndex(function(e){return t==e});db.splice(n,1),console.info("Deleted: "+e+"."),this.classList.remove("selection")}else 3==db.length?console.log("Already created."):(db.push(t),console.info("Added: "+e+"."),this.classList.add("selection"),3==db.length&&self.createShift())}}]),e}(),db=[],calendar=new Calendar,shift=new Shift;calendar.render(".container"),Array.from(document.querySelectorAll(".s")).forEach(function(e){e.addEventListener("click",shift.watch)});
