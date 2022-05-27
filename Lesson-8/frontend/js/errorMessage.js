export default {
  data() {
    return {
      error: "",
      isVisible: false,
    };
  },
  methods: {
    show(errorMessage) {
      this.isVisible = true;
      this.error = errorMessage;
    },
    hide() {
      this.isVisible = false;
    },
  },
  template: `
    <div @click="hide()" v-if="isVisible" class="error-message">{{ error }}</div>
  `,
};
