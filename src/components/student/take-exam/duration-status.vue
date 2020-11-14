<template>
  <div class="duration-status">
    <div class="duration-status-header">
      <span class="duration-label">Duration</span>
    </div>
    <div class="duration-status-body">
      <span class="duration-label">{{ AvailableTimeString() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionStatus",
  data: function () {
    return {
      interval_id:null,
      available_millis:0,
      time_infomation:{},
    };
  },
  methods: {
    AvailableTimeString: function () {
      return this.millisecondsToTimeString(this.available_millis);
    },
    dateTimeStringToMilliseconds: function (dateTimeString) {
      let [dateString, timeString] = dateTimeString.split(" ");
      let [year, month, day] = dateString.split("-");
      let [hour, miniute] = timeString.split(":");
      return new Date(year, month, day, hour, miniute);
    },
    millisecondsToTimeString: function (milliseconds) {
      let hours = parseInt(milliseconds / (60 * 60 * 1000));
      let minitues = parseInt((milliseconds - hours * 60 * 60 * 1000) / (60 * 1000));
      let seconds = parseInt((milliseconds - hours * 60 * 60 * 1000 - minitues * 60 * 1000) / 1000);

      let hoursString = String(hours).padStart(2, "0");
      let minituesString = String(minitues).padStart(2, "0");
      let secondsString = String(seconds).padStart(2, "0");
      return `${hoursString}h : ${minituesString}m :${secondsString} s`;
    },
    mmToMillis: function (mm) {
      return mm * 60 * 1000;
    },
    startCountDown: function(time_infomation){
      this.time_infomation = time_infomation;
      this.available_millis = this.mmToMillis(this.time_infomation.available_time.minitues);
      this.interval_id = setInterval(() => {
        if(this.available_millis > 1000){
          this.available_millis-=1000;
        }else{
          this.$emit('time-over-event');
          this.stopCountDown();
        }
      }, 1000);
    },
    stopCountDown: function(){
      clearInterval(this.interval_id);
    }
  },
};
</script>

<style scoped>
.duration-status {
  background-color: white;
  /* padding: 20px 30px; */
  border-radius: 10px;
  /* box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227); */
  box-sizing: border-box;
  /* border: 1px solid rgba(177, 177, 177, 0.315); */
  width: 100%;
  margin-bottom: 20px;
}

.duration-status-header {
  display: flex;
}
.duration-status-header span {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}
.duration-status-body {
  display: flex;
}

.duration-status .duration-status-body .duration-label {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-top: 5px;
}

@media only screen and (min-width: 700px) {
  .duration-status {
    padding: 20px 30px;
    box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
    border: 1px solid rgba(177, 177, 177, 0.315);
  }
}

@media only screen and (max-width: 700px) {
  .duration-status {
    padding: 0;
  }
  .duration-status .duration-status-body .duration-label {
    margin-top: 10px;
  }
}
@media only screen and (max-width: 480px) {
}
</style>