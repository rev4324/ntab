<script lang="ts">
  import names from './names';
  import { locale } from '$lib/translations';

  let time: string;
  let date: string;

  locale.subscribe((currentLocale) => {
    const localizedNames = names.filter((elem) => elem.locale === currentLocale)[0];

    const getMonthName = (month: number) => localizedNames.month[month];
    const getDayOfWeekName = (dayOfWeek: number) => localizedNames.dayOfWeek[dayOfWeek];

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
      return currentLocale === 'pl'
        ? `${getDayOfWeekName(dayOfWeek)}, ${dayOfMonth} ${getMonthName(month)}`
        : `${getDayOfWeekName(dayOfWeek)}, ${getMonthName(month)} ${dayOfMonth}`;
    };

    time = getTime();
    date = getDate();

    setInterval(() => {
      time = getTime();
      if (time === '0∶00') {
        date = getDate();
      }
    }, 1000);
  });
</script>

<div class="flex flex-col items-center rounded-lg m-0 text-dynamic font-bold">
  <time class="text-[4rem] leading-[3rem] select-none mt-0 mb-4">{time}</time>
  <date class="text-sm select-none">{date}</date>
</div>
