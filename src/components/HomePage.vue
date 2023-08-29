<template>
  <div>
    <h1>قائمة الإرهاب المحلية (الأفراد)</h1>

    <br />
    <br />

    <v-row>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="category"
          label="التصنيف"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="nationality"
          label="الجنسية"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="family_arabic"
          label="(عربي)العائلة"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="family_english"
          label="(لاتيني)العائلة"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="fullname_arabic"
          label="الاسم الكامل(عربي)"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="fullname_english"
          label="الاسم الكامل(لاتيني)"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <div class="ma-1 pa-2">
          <label for="date-picker">تاريخ الميلاد</label>
          <br />
          <input id="date-picker" type="date" v-model="birth_date" />
        </div>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="birth_place"
          label="مكان الميلاد"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="nick_name"
          label="الاسم المدرج"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="street"
          label="الشارع"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="city"
          label="المدينة"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="country"
          label="الدولة"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="type"
          label="النوع"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="document_number"
          label="رقم الوثيقة"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <v-text-field
          class="ma-1 pa-2"
          dir="rtl"
          v-model="issuer"
          label="جهة الإصدار"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <div class="ma-1 pa-2">
          <label for="date-picker">تاريخ الإصدار</label>
          <br />
          <input id="date-picker" type="date" v-model="from_date" />
        </div>
      </v-col>
      <v-col cols="12" lg="2" sm="4" xs="12">
        <div class="ma-1 pa-2">
          <label for="date-picker">تاريخ الانتهاء</label>
          <br />
          <input id="date-picker" type="date" v-model="to_date" />
        </div>
      </v-col>
    </v-row>
    <div class="d-flex mb-1" style="padding: 20">
      <v-btn
        outline
        class="ma-6 pa-2"
        dir="rtl"
        color="#afd"
        v-on:click="loadItems"
        style="font-size: 15px"
        dark
        >بحث</v-btn
      >
    </div>
    <br />

    <br />
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
    ></v-data-table-server>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    category: "",
    nationality: "",
    family_arabic: "",
    family_english: "",
    fullname_arabic: "",
    fullname_english: "",
    birth_date: null,
    birth_place: "",
    nick_name: "",
    street: "",
    city: "",
    country: "",
    type: "",
    document_number: "",
    issuer: "",
    from_date: "",
    to_date: "",
    other_information: "",
    itemsPerPage:10,
    headers: [
      {
        title: "التصنيف",
        align: "center",
        sortable: false,
        key: "category",
      },
      { title: "الجنسية", key: "nationality" },
      {
        title: "اسم العائلة (بالحروف العربية)",
        key: "family_arabic",
        align: "center",
      },
      {
        title: "اسم العائلة (بالحروف اللاتينية)",
        key: "family_english",
        align: "center",
      },
      {
        title: "الاسم الكامل (بالحروف العربية)",
        key: "fullname_arabic",
        align: "center",
      },
      {
        title: "الاسم الكامل (بالحروف اللاتينية)",
        key: "fullname_english",
        align: "center",
      },
      { title: "تاريخ الميلاد ", key: "birth_date", align: "center" },
      { title: "مكان الميلاد", key: "birth_place", align: "center" },
      { title: "الاسم المدرج", key: "nick_name", align: "center" },
      { title: "الشارع", key: "street", align: "center" },
      { title: "المدينة", key: "city", align: "center" },
      { title: "الدولة", key: "country", align: "center" },
      { title: "النوع", key: "type", align: "center" },
      { title: "رقم الوثيقة", key: "document_number", align: "center" },
      { title: "جهة الإصدار", key: "issuer", align: "center" },
      { title: "تاريخ الإصدار", key: "from_date", align: "center" },
      { title: "تاريخ الانتهاء", key: "to_date", align: "center" },
      { title: "معلومات أخرى", key: "other_information", align: "center" },
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
        .post("http://127.0.0.1:8000/?format=json", {
          category: this.category,
          nationality: this.nationality,
          family_arabic: this.family_arabic,
          family_english: this.family_arabic,
          fullname_arabic: this.fullname_arabic,
          fullname_english: this.fullname_english,
          birth_date: this.birth_date,
          birth_place: this.birth_place,
          nick_name: this.nick_name,
          street: this.street,
          city: this.city,
          country: this.country,
          type: this.type,
          document_number: this.document_number,
          issuer: this.issuer,
          from_date: this.from_date,
          to_date: this.to_date,
        })
        .then((response) => {
          console.log("response.data    ", response.data);
          this.totalItems = response.data.length;
          this.serverItems = response.data;
          this.serverItems.forEach((element) => {
            if (element["street"] == "-") {
              element["street"] = "-";
            }
            if (element["city"] == "-") {
              element["city"] = "-";
            }

            if (element["birth_date"] == "1900-01-01") {
              element["birth_date="] = "-";
            }
            if (element["to_date"] == "1900-01-01") {
              element["to_date"] = "-";
            }

            if (element["to_date"] == "1900-01-01") {
              element["to_date"] = "-";
            }
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
