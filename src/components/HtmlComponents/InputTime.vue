<template>
  <input
    class="input-time"
    v-bind:value="value"
    v-bind:class="{ 'show-error': showerror }"
    @change="ValidateInput()"
    type="time"
    v-bind:placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "InputTime",
  props: {
    placeholder: String,
    time:String,
    showerror: Boolean,
  },
  data: function () {
    return {
     time_:this.time,
    };
  },
  methods: {
  
  },
};
</script>

<style scoped>
input.input-time {
  width: 400px;
  height: 40px;
  margin: 0;
  padding: 0 10px;
  border: 1px solid #ac29a3;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;

  background-color: white;
  color: #3f3d56;
  /* box-shadow: 0 0 3px 1px rgba(172, 41, 163, 0.227); */

  font-family: Montserrat;
  font-weight: 500;
  font-size: 15px;

  transition: 0.25s;
}

input.input-time:focus {
  box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
}
input.input-time:focus {
  background-color: rgba(233, 233, 233, 0.253);
}

input.input-time.show-error {
  border: 1px solid rgba(218, 2, 2, 1);
  box-shadow: 0 0 3px 1px rgba(218, 2, 2, 0.227);
}
</style>
