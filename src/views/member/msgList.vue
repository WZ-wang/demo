
<template>
  <div>
    <input ref="one" type="text" v-model="one" />
    <input type="text" v-model="two" />
    <input type="text" v-model="all" />
    <p>{{one}}</p>
  </div>
</template>

<script>
export default {
  name: "msgList",
  data() {
    return {
      one: "",
      two: "",
      all: ""
    };
  },
  created() {},
  watch: {
    one(newName, oldName) {
      this.one = newName;
      this.all = this.one + " " + this.two;
    },
    two(newName, oldName) {
      this.two = newName;
      this.all = this.one + " " + this.two;
    },
    all(newName, oldName) {
      this.all = newName;
      let s = this.all.split(" ");
      this.one = s[0];
      this.two = s[1];
    }
  },
  methods: {}
};
</script>

<style>
</style>