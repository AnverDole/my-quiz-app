<template>
  <input
    class="input-email"
    v-bind:class="{'show-error':showerror}"
    @input="$emit('input', $event.target.value)"
    type="email"
    v-bind:placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "InputEmail",
  props: {
    placeholder: String,
    email: String,
    showerror: Boolean,
  },
};
</script>

<style scoped>
input.input-email {
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

input.input-email:focus {
  box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
}
input.input-email:hover {
  background-color: rgba(233, 233, 233, 0.253);
}

input.input-email.show-error {
  border: 1px solid rgba(218, 2, 2, 1);
  box-shadow: 0 0 3px 1px rgba(218, 2, 2, 0.227);
}

</style>
