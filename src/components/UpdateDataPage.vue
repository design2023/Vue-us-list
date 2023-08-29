<template>
  <div>
    <h1>إدراج ملف Excel جديد</h1>
    <br />
    <br />

    <v-row align="center" justify="center">
      <v-col centered cols="4" lg="4" sm="4" xs="4">
        <v-file-input
          title="إدراج ملف جديد"
          accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          placeholder=""
          @change="handleFileChange"
          prepend-icon="mdi-camera"
          label="Excel ملف"
          v-model="file"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row v-show="activeUpload" align="center" justify="center">
      <div class="d-flex mb-1" style="padding: 20">
        <v-btn
          outline
          class="ma-6 pa-2"
          dir="rtl"
          color="#afd"
          v-on:click="loadItems"
          style="font-size: 15px"
          dark
          >حفظ الملف</v-btn
        >
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <v-label id="label_message">{{ message }}</v-label>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    file: null,
    loading: true,
    message: "",
    activeUpload: false,
  }),
  methods: {
    loadItems() {
      if (this.file[0] instanceof File) {
        this.loading = true;

        // Create a FormData object to handle the file upload
        let formData = new FormData();
        formData.append("account_id", 1);
        formData.append("account_name", "Beshr");
        formData.append("file", this.file[0], this.file[0].name);

        axios
          .post("http://127.0.0.1:8000/upload/?format=json", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.loading = false;
              this.message = response.data["message"];
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
          })
          .catch((error) => {
            this.message = error.response.data["message"];
          });
      } else {
        console.error("No file selected");
      }
    },
    handleFileChange() {
      this.activeUpload = true
    },

    getData() {
      console.log("category : ", this.category);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.rtl-field input {
  direction: rtl;
  text-align: right;
}
.v-text-field input {
  text-align: right;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#label_message {
  color: #000;
  font-size: 26px;
}

</style>
