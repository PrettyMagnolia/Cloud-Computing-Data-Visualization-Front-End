<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getUserAge } from "@/api/captain";

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      userAge:[],
    }
  },
  async mounted() {
    // await getUserAge()
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.forEach(element => {
    //         this.userAge.push(element.user_nums);
    //     });
    //     console.log(this.userAge);
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
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['0-17', '18-25', '26-35', '36-45', '46-50', '51-55', '55+'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '该年龄段用户数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.userAge,
          animationDuration
        }]
      })
    }
  }
}
</script>
