<template>
  <div>
    <div style="margin-top: 20px; margin-left: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="年龄段" style="margin-right:30px;margin-left:30px">
          <el-select v-model="formInline.age" placeholder="请选择用户年龄段">
            <el-option label="0-17" value="0-17"></el-option>
            <el-option label="18-25" value="18-25"></el-option>
            <el-option label="26-35" value="26-35"></el-option>
            <el-option label="36-45" value="36-45"></el-option>
            <el-option label="46-50" value="46-50"></el-option>
            <el-option label="51-55" value="51-55"></el-option>
            <el-option label="55+" value="55+"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" style="margin-right:30px;margin-left:30px">
          <el-select v-model="formInline.gender" placeholder="请选择用户性别">
            <el-option label="男" value="M"></el-option>
            <el-option label="女" value="F"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况" style="margin-right:30px;margin-left:30px">
          <el-select
            v-model="formInline.marry"
            placeholder="请选择用户婚姻状况"
          >
            <el-option label="未婚" value="0"></el-option>
            <el-option label="已婚" value="1"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="排序" style="margin-right:30px;margin-left:30px">
          <el-select v-model="formInline.order" placeholder="请选择数据排序类型">
            <el-option label="销量Top10" value="sale_num"></el-option>
            <el-option label="销售额Top10" value="sum_pay"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div v-if="visible" class="chart-container">
      <chart :params="passValue" height="100%" width="100%" />
    </div>
  </div>
</template>

<script>
import Chart from "./Components/CombinationChat.vue";

export default {
  name: "Combination",
  components: { Chart },
  data() {
    return {
      visible: false,
      formInline: {
        age: "",
        gender: "",
        marry: "",
        order:"",
      },
      passValue: {
        age: "",
        gender: "",
        marry: "",
        order:"",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.passValue.age = this.formInline.age;
      this.passValue.gender = this.formInline.gender;
      this.passValue.marry = this.formInline.marry;
      this.passValue.order = this.formInline.order;
      console.log("pass", this.passValue);
      this.visible = true;
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

