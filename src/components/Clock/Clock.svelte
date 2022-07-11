<script lang="ts">
  import names from './names';

  const getMonthName = (month: number) => names.month[month];
  const getDayOfWeekName = (dayOfWeek: number) => names.dayOfWeek[dayOfWeek];

  const getTime = () => {
    let date = new Date();
    let memoizedGetMinutes = date.getMinutes();
    let mins = memoizedGetMinutes < 10 ? `0${memoizedGetMinutes}` : memoizedGetMinutes.toString();
    return `${date.getHours()}∶${mins}`;
  };

  const getDate = () => {
    let date = new Date();
    let dayOfWeek = date.getDay();
    let dayOfMonth = date.getDate();
    let month = date.getMonth();
    return `${getDayOfWeekName(dayOfWeek)}, ${dayOfMonth} ${getMonthName(month)}`;
  };

  let time = getTime();
  let date = getDate();

  setInterval(() => {
    time = getTime();
    if (time === '0∶00') {
      date = getDate();
    }
  }, 1000);
</script>

<div class="flex flex-col items-center rounded-lg m-0 text-dynamic font-bold">
  <time class="text-[4rem] leading-[3rem] select-none mt-0 mb-4">{time}</time>
  <date class="text-sm select-none">{date}</date>
</div>
