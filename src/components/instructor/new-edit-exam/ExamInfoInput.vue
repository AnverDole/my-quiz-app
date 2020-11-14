<template>
  <div class="new-exam-input-component section-tile">
     <div class="input-row">
      <span class="label">Title</span>
      <div class="time-input-container">
        <input-text
          v-bind:text="title"
          v-bind:showerror="errors.titleerror.show"
          placeholder="Title"
          class="input"
          @input="$emit('title-changed', arguments[0])"
        />
      </div>
        <span v-bind:class="{ 'input-error':true, show:errors.titleerror.show }" >{{errors.titleerror.message}}</span>

    </div>
    <div class="input-row">
      <span class="label">Subject</span>
      <drop-down
        class="input"
        v-bind:selectedIndex="translateSubjectIdToLocalIndex(subject)"
        :items="getSubjectNames()"
        @selected-changed="$emit('subject-selected', translateLocalIndexToSubjectId(arguments[0]))"
        :showerror="errors.subjecterror.show"
      />
      <span v-bind:class="{ 'input-error':true, show:errors.subjecterror.show }" >{{errors.subjecterror.message}}</span>
    </div>
    <div class="input-row">
      <span class="label">Duration</span>
      <div class="time-input-container">
        <input-text
          v-bind:text="duration"
          v-bind:showerror="errors.durationerror.show"
          placeholder="00:00"
          class="input"
          @input="$emit('duration-changed', arguments[0])"
        />
      </div>
        <span v-bind:class="{ 'input-error':true, show:errors.durationerror.show }" >{{errors.durationerror.message}}</span>

    </div>
  </div>
</template>
<style scoped>
.section-tile {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
}
.new-exam-input-component {
  margin-top: 20px;
  display: grid;
  grid-template-rows: repeat(2, max-content);
  grid-gap: 10px;
}
.input-row {
  display: grid;
  grid-template-rows: repeat(2, max-content);
}
.input-row span.label {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  margin-bottom: 10px;
}
.input-row .input {
  width: 250px;
}

.input-row .time-input-container {
  display: flex;
  flex-direction: column;
}
.input-row .time-input-container .time-label {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}

div.input-row  span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
div.input-row  span.input-error.show {
  display: block;
}

@media only screen and (max-width: 480px) {
  .section-tile {
    padding: 20px !important;
  }
  .input-row .input {
    width: 100%;
  }
}
</style>
<script>
import InputText from "../../HtmlComponents/InputText";
import DropDown from "../../HtmlComponents/DropDown";
export default {
  name: "ExamInfoInput",
  components: {
    InputText,
    DropDown,
  },
  props: {
    subject: {
      type: Number,
      default: () => -1,
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    duration: {
      type: String,
      default: () => "",
    },
    title:{
      type:String,
      default:() => ""
    },
    errors: {
      type: Object,
      default: () => {
        return {
          durationerror: {
            message: "",
            show: false,
          },
          subjecterror: {
            message: "",
            show: false,
          },
          titleerror: {
            message: "",
            show: false,
          },
        };
      },
    },
  },
  computed:{
    subjectIds: vm => vm.getSubjectIds(),
  },
  data: function () {
    return {
    };
  },
  created: function () {},
  methods: {
     getSubjectIds() {
      return this.subjects.map((item) => {
        return item.id;
      });
    },
    getSubjectNames() {
      return this.subjects.map((item) => {
        return item.name;
      });
    },
     translateLocalIndexToSubjectId(localindex){
      return this.subjectIds[localindex];
    },
    translateSubjectIdToLocalIndex(subjectid){
      return this.subjectIds.indexOf(subjectid);
    }
  },
};
</script>
