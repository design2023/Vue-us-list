<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      :search="search"
      class="elevation-1 rtl-table"
      item-value="name"
      @update:options="loadItems"
    >
   
</v-data-table-server>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    backendDomain: "http://127.0.0.1:8000",
    itemsPerPage: 15,
    account_id: "",
    account_name: "",
    file: "",
    date: "",
    day: "",
    time: "",
    headers: [
      {
        title: "الرقم",
        align: "center",
        sortable: false,
        key: "account_id",
      },
      { title: "اسم الشخص", key: "account_name" },
      {
        title: "التاريخ",
        key: "date",
        align: "center",
      },
      {
        title: "اليوم",
        key: "day",
        align: "center",
      },
      {
        title: "التوقيت",
        key: "time",
        align: "center",
      },
      {
        title: "الملف",
        key: "file",
        align: "center",
      },
      {
        title: "تحميل",
        key: "downloadAction",
        align: "center",
        sortable: false
      }
      
    ],
    search: "",
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    loadItems() {
      this.loading = true;
      axios
        .post("http://127.0.0.1:8000/get-transactions?format=json")
        .then((response) => {
          this.serverItems = response.data;
          this.serverItems.forEach((element) => {

            element["file"]  =  this.backendDomain +element["file"];
            let dateObj = new Date(element["uploaded_at"]);

            // Extract the date
            let date = dateObj.toISOString().split("T")[0];

            // Get the day of the week
            const days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            let day = days[dateObj.getDay()];

            // Extract the time
            let time = dateObj.toTimeString().split(" ")[0];
            element["date"] = date;
            element["day"] = day;
            element["time"] = time;
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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

.rtl-table {
  direction: rtl;
}

.rtl-table th,
.rtl-table td {
  text-align: right; /* Align the text to the right */
}
</style>
