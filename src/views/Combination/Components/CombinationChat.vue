<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./resize";
import { getCombination } from "@/api/captain";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    params: {
      type: Object
    }
  },
  watch:{
    params:{
      async handler(newValue,oldValue){
        if(newValue.order == "sale_num"){
          this.title = "产品销量Top10";
        }
        else{
          this.title = "产品销售额Top10";
        }
        console.log("modify",newValue);
        this.product_id = [];
        this.sale_num = [];
        this.sum_pay = [];
        await getCombination(newValue)
        .then((res) => {
          console.log(res.data);
          res.data.forEach(element => {
            this.product_id.push(element.product_id);
            this.sale_num.push(element.sale_num);
            this.sum_pay.push(parseFloat(element.sum_pay)/10000);
          });
        })
        .catch((err) => {
          console.log(err);
        });
        this.initChart();
      },
      deep:true,
    }
  },
  data() {
    return {
      chart: null,
      product_id: [],
      sale_num: [],
      sum_pay: [],
      title: ""
    };
  },
  async mounted() {
    if(this.params.order == "sale_num"){
      this.title = "产品销量Top10";
    }
    else{
      this.title = "产品销售额Top10";
    }
    console.log("children:",this.params)
    await getCombination(this.params)
      .then((res) => {
        console.log(res.data);
        res.data.forEach(element => {
          this.product_id.push(element.product_id);
          this.sale_num.push(element.sale_num);
          this.sum_pay.push(parseFloat(element.sum_pay)/10000);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.initChart();
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
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: "#344b58",
        title: {
          text: this.title,
          x: "20",
          top: "20",
          textStyle: {
            color: "#fff",
            fontSize: "22",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "5%",
          top: "10%",
          textStyle: {
            color: "#90979c",
          },
          data: ["销量","销售额(x10^4)"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: this.product_id,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 0,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            stack: "total",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(255,144,128,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.sale_num,
          },
          {
            name: "销售额(x10^4)",
            type: "line",
            stack: "total",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(252,230,48,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: this.sum_pay,
          },
        ],
      });
    },
  },
};
</script>
