<template>
  <div class="dashboard-editor-container">
    <!-- 订单整体消费情况 -->
    <overall-consumption @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <user-gender />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <user-age />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <user-marry />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OverallConsumption from './components/OverallConsumption'
import UserGender from './components/UserGender'
import UserMarry from './components/UserMarry'
import UserAge from './components/UserAge'

export default {
  name: 'DashboardAdmin',
  components: {
    OverallConsumption,
    UserGender,
    UserMarry,
    UserAge
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 60px;
    margin-top: 40px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
