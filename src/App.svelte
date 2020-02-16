<script>
  import { onMount } from "svelte";
  let day = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  let response;
  let hoursDegree;
  let minutesDegree;
  let secondsDegree;
  let weekday = day[new Date().getDay()];
  let today;
  onMount(async () => {
    let res = await fetch("/data.json");
    let data = await res.json();
    response = data;
    setDate();
  });
  /**
   * set current hours, minutes and seconds
   */
  function setDate() {
    if (response) {
      let currentDate = new Date()
        .toLocaleString(response.data.code, {
          timeZone: response.data.timeZone,
          hour12: response.timeFormat === "24 hours" ? true : false
        })
        .split(" ");
      let currentTime = currentDate[1].split(":");
      hoursDegree = currentTime[0] * 30 + currentTime[1] * (360 / 720);
      minutesDegree = currentTime[1] * 6 + currentTime[2] * (360 / 3600);
      secondsDegree = currentTime[2] * 6;
      today = currentDate[0];
    }
  }
  setInterval(setDate, 1000);
</script>

<style lang="scss">
  .clock-wrapper {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .clock-wrapper::after {
    content: "";
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .clock {
    background: #ececec;
    width: 300px;
    height: 300px;
    margin: 8% auto 0;
    border-radius: 50%;
    border: 14px solid #333;
    position: relative;
    box-shadow: 0 2vw 4vw -1vw rgba(0, 0, 0, 0.8);
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ccc;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    z-index: 10;
    box-shadow: 0 2px 4px -1px black;
  }

  .hour-hand {
    position: absolute;
    z-index: 5;
    width: 4px;
    height: 65px;
    background: #333;
    top: 79px;
    transform-origin: 50% 72px;
    left: 50%;
    margin-left: -2px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }

  .minute-hand {
    position: absolute;
    z-index: 6;
    width: 4px;
    height: 100px;
    background: #666;
    top: 46px;
    left: 50%;
    margin-left: -2px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 105px;
  }

  .second-hand {
    position: absolute;
    z-index: 7;
    width: 2px;
    height: 120px;
    background: gold;
    top: 26px;
    left: 50%;
    margin-left: -1px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 125px;
    /* transition: all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2, 7, 0.58, 1); */
  }

  span {
    display: inline-block;
    position: absolute;
    color: #333;
    font-size: 22px;
    font-family: "Poiret One";
    font-weight: 700;
    z-index: 4;
  }

  .h12 {
    top: 30px;
    left: 50%;
    margin-left: -9px;
  }
  .h3 {
    top: 140px;
    right: 30px;
  }
  .h6 {
    bottom: 30px;
    left: 50%;
    margin-left: -5px;
  }
  .h9 {
    left: 32px;
    top: 140px;
  }

  .diallines {
    position: absolute;
    z-index: 2;
    width: 2px;
    height: 15px;
    background: #666;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 150px;
  }
  .diallines:nth-of-type(5n) {
    position: absolute;
    z-index: 2;
    width: 4px;
    height: 25px;
    background: #666;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 150px;
  }

  .info {
    position: absolute;
    width: 120px;
    height: 20px;
    border-radius: 7px;
    background: #ccc;
    text-align: center;
    line-height: 20px;
    color: #000;
    font-size: 11px;
    top: 200px;
    left: 50%;
    margin-left: -60px;
    font-family: "Poiret One";
    font-weight: 700;
    z-index: 3;
    letter-spacing: 3px;
    margin-left: -60px;
    left: 50%;
  }
  .date {
    top: 80px;
  }
  .day {
    top: 200px;
  }
</style>

<div
  class="clock-wrapper"
  style="background-image:url('https://cdn.pixabay.com/photo/2012/08/27/14/19/evening-55067_960_720.png')">
  <div class="clock">
    <div>
      <div class="info date">{today}</div>
      <div class="info day">{weekday}</div>
    </div>
    <div class="dot" />
    <div>
      <div class="hour-hand" style={`transform:rotate(${hoursDegree}deg);`} />
      <div
        class="minute-hand"
        style={`transform:rotate(${minutesDegree}deg);`} />
      <div
        class="second-hand"
        style={`transform:rotate(${secondsDegree}deg);`} />
    </div>
    <div>
      <span class="h3">3</span>
      <span class="h6">6</span>
      <span class="h9">9</span>
      <span class="h12">12</span>
    </div>
    {#each Array(60) as item, i}
      <div class="diallines" style={`transform:rotate(${6 * i}deg);`} />
    {/each}
  </div>
</div>
