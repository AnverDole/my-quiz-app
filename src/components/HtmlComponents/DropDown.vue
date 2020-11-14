<template>
  <div tabindex="0" :class="{'drop-down-box':true, 'show-error':showerror}">
    <span class="label">{{
      selectedIndex != -1 ? items[selectedIndex] : "Choose one"
    }}</span>
    <font-awesome-icon :icon="['fas', 'caret-down']" />
    <div class="menu">
      <ul>
        <li class="locked">Choose one</li>
        <li
          @click="setSelectedIndex(key)"
          v-for="(item, key) in items"
          v-bind:key="key"
          v-bind:class="{ selected: selectedIndex == key }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  model: {
    event: "selected-changed",
    prop: "selectedIndex",
  },
  props: {
    selectedIndex: {
      type: Number,
      default: () => -1,
    },
    items: {
      type: Array,
      default: () => [],
    },
    showerror:{
      type:Boolean,
      default: () => false
    },
  },
  data: function () {
    return{

    }
  },
  methods: {
    setSelectedIndex: function (key) {
      event.preventDefault();
      this.$el.blur();
      this.$emit("selected-changed", key);
    },
  },
};
</script>

<style>
.drop-down-box {
  position: relative;
  width: 400px;
  height: 40px;
  margin: 0;
  padding: 0 20px;
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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drop-down-box:focus {
  box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
}
.drop-down-box:hover {
  background-color: rgba(233, 233, 233, 0.253);
}

.drop-down-box.show-error {
  border: 1px solid rgba(218, 2, 2, 1);
  box-shadow: 0 0 3px 1px rgba(218, 2, 2, 0.227);
}

.drop-down-box .label {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 15px;
}
.drop-down-box .menu {
  transform: scale(0);
  z-index: -1;
  transform-origin: top;
  position: absolute;
  left: 0;
  top: 105%;
  width: 100%;
  background-color: white;
  border: 1px solid rgb(212, 212, 212);
  border-radius: 5px;
  box-shadow: 0 0 3px 1px rgba(235, 235, 235, 0.555);
  padding: 10px 0;
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.drop-down-box:focus .menu {
  transform: scale(1);
  z-index: 1;
}
.drop-down-box .menu ul {
  padding: 0;
  margin: 0;
}
.drop-down-box .menu ul li {
  padding: 10px 20px;
  margin: 0;
  list-style: none;
  cursor: pointer;
  transition: 0.25s;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 15px;
  transition: 0.25;
}
.drop-down-box .menu ul li.selected {
  font-weight: 500;
}
.drop-down-box .menu ul li:not(.locked):hover {
  background-color: rgba(233, 233, 233, 0.562);
}
</style>