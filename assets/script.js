const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  //gets current hour from dayjs library
  const currentHour = dayjs().format('H');
  //colors change depending on the following: past, present, future.
  //uses jQuery selector to select element with class 'time-block'
  //iterates using the each() method
  //toggleClass() method sets and updates the codition according to the time.
  function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  //the following function save user input into localStorage when save button in clicked.
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    })
  }

  //Refreshes the color to stick to the conditions of: past, present, future.
  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  //retrieves user input from local storage
$('.time-block').each(function() {
  const key = $(this).attr('id');
  const value = localStorage.getItem(key);
  $(this).children('.description').val(value);
});

//displays the current time and date on the header of the page.
function updateTime() {
  const dateElement = $('#currentDay');
  const timeElement = $('#currentTime');
  const currentDate = dayjs().format('MMM D, dddd, YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}

//this calls all the functions and adds the live counter to the page header.
hourlyColor();
textEntry();
refreshColor();
setInterval(updateTime,1000);
});
