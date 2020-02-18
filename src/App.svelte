<script>
  import { onMount } from "svelte";
  import moment from "moment";
  let response;
  let hoursDegree;
  let minutesDegree;
  let secondsDegree;
  let weekDay;
  let todayDate;
  onMount(async () => {
    let res = await fetch(
      "https://staging.followmedia.tk/client/app/get-data/?appdata_id=eafbecdc-70f0-490c-94a9-95043d102bb0"
    );
    let data = await res.json();
    console.log("response data ::", data);
    response = data.appData;
    setDate();
  });
  /**
   * set current hours, minutes and seconds
   */
  function setDate() {
    if (response) {
      let today = moment().utcOffset("utc+5:45");
      let hours = today.format("HH");
      let minutes = today.format("mm");
      let seconds = today.format("ss");
      hoursDegree = (parseInt(hours) / 12) * 360;
      minutesDegree = (parseInt(minutes) / 60) * 360;
      secondsDegree = (parseInt(seconds) / 60) * 360 + 360;
      todayDate = today.format("YYYY-MM-DD");
      weekDay = today.format("dddd");
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
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
    border: 14px solid #333;
    position: relative;
    box-shadow: 0 2vw 4vw -1vw rgba(0, 0, 0, 0.8);
    position: relative;
  }
  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #000;
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
    height: 160px;
    background: #333;
    top: 79px;
    transform-origin: 50% 164px;
    left: 50%;
    margin-left: -2px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }

  .minute-hand {
    position: absolute;
    z-index: 6;
    width: 4px;
    height: 190px;
    background: #666;
    top: 46px;
    left: 50%;
    margin-left: -2px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 195px;
  }

  .second-hand {
    position: absolute;
    z-index: 7;
    width: 2px;
    height: 212px;
    background: gold;
    top: 26px;
    left: 50%;
    margin-left: -1px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 215px;
  }

  span {
    display: inline-block;
    position: absolute;
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    z-index: 4;
  }

  .h12 {
    top: 30px;
    left: 50%;
    margin-left: -9px;
  }
  .h3 {
    top: 48%;
    right: 30px;
  }
  .h6 {
    bottom: 30px;
    left: 50%;
    margin-left: -5px;
  }
  .h9 {
    left: 32px;
    top: 48%;
  }

  .diallines {
    position: absolute;
    z-index: 2;
    width: 2px;
    height: 15px;
    background: #474747;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 240px;
  }
  .diallines:nth-of-type(5n) {
    position: absolute;
    z-index: 2;
    width: 4px;
    height: 25px;
    background: #252525;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 240px;
  }

  .info {
    position: absolute;
    width: 120px;
    height: 20px;
    border-radius: 7px;
    background: #000;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 15px;
    margin-left: -60px;
    font-family: "Poiret One";
    font-weight: 700;
    z-index: 3;
    letter-spacing: 3px;
    left: 50%;
    top: 200px;
    padding: 5px;
  }
  .date {
    top: 80px;
  }
  .day {
    top: 80%;
  }
</style>

<div class="clock-wrapper" style="background-image:url('/img/bg-day.jpg')">
  <div class="clock">
    <div>
      <div class="info date">{todayDate}</div>
      <div class="info day">{weekDay}</div>
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
