<script lang="ts">
  export let img: string;
  export let auto = false;
  export let href = '';

  let sitename = href.match('https') ? href.substring(8) : href.substring(7);
  const src = `https://www.google.com/s2/favicons?sz=32&domain=${sitename}`;
</script>

{#if auto && img === ''}
  <div
    class="w-12 h-12 bg-gradient-to-br from-[#272A3D] to-[#1D1E26] rounded-2xl flex items-center justify-center"
  >
    <img {src} alt="icon" />
  </div>
{:else if img !== ''}
  <img width="48px" height="48px" alt="icon" src={img} />
{:else}
  <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 83C0 37.1604 37.1604 0 83 0H173C218.84 0 256 37.1604 256 83V173C256 218.84 218.84 256 173 256H83C37.1604 256 0 218.84 0 173V83Z"
      fill="url(#paint0_linear_3_15)"
    />
    <circle cx="128" cy="128" r="90" fill="black" fill-opacity="0.1" />
    <path
      d="M121.472 83.7536C123.53 77.4155 132.469 77.4155 134.52 83.7536L141.86 106.408C142.309 107.788 143.18 108.99 144.351 109.843C145.521 110.696 146.931 111.156 148.377 111.157H172.127C178.775 111.157 181.533 119.69 176.161 123.613L156.953 137.61C155.78 138.464 154.906 139.668 154.458 141.05C154.009 142.433 154.008 143.922 154.455 145.304L161.796 167.959C163.854 174.297 156.616 179.576 151.231 175.653L132.023 161.655C130.851 160.802 129.44 160.343 127.992 160.343C126.544 160.343 125.134 160.802 123.962 161.655L104.753 175.653C99.375 179.576 92.1443 174.297 94.1955 167.959L101.536 145.304C101.983 143.922 101.982 142.433 101.534 141.05C101.085 139.668 100.212 138.464 99.0388 137.61L79.8372 123.62C74.4656 119.697 77.2303 111.164 83.8709 111.164H107.614C109.062 111.164 110.473 110.705 111.645 109.852C112.816 108.999 113.689 107.796 114.138 106.415L121.479 83.7605L121.472 83.7536Z"
      fill="#3B94A8"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3_15"
        x1="0"
        y1="0"
        x2="256"
        y2="256"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#272A3D" />
        <stop offset="1" stop-color="#1D1E26" />
      </linearGradient>
    </defs>
  </svg>
{/if}
