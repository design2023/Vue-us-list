<template>
  <div class="mb-1" style="padding: 20">
    <v-col cols="12" lg="2" sm="4" xs="12">
      <v-text-field
      :value="localValue"
       @input="updateValue"
        class="ma-1 pa-2"
        dir="rtl"
        :label="label"
        variant="solo-filled"
      ></v-text-field>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "CustomTextField",
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    }
  },
  methods: {
    updateValue(event) {
      this.localValue = event.target.value;
      this.$emit('input',  this.localValue);  
    }
  }

};
</script>

<style scoped></style>
