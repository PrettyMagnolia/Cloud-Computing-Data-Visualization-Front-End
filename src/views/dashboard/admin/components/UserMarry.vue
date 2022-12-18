<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getUserGender, getUserMarry } from "@/api/captain";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      userMarry:[
        { value: 0, name: "未婚" },
        { value: 0, name: "已婚" },
      ]
    };
  },
  async mounted() {
    // await getUserMarry()
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.forEach(element => {
    //         if (element.marry_status == 0 ){
    //             this.userMarry[0].value = element.user_nums;
    //         }
    //         else{
    //             this.userMarry[1].value = element.user_nums;
    //         }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["已婚", "未婚"],
        },
        series: [
          {
            name: "用户群体婚姻状况",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: this.userMarry,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>

