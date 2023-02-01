<template>
  <el-container style="height: 100vh; overflow: hidden">
    <el-header style="background: #b3c0d1; padding-top: 0.8rem">
      <div style="display: flex; justify-content: space-around">
        <div><h1>Head</h1></div>
        <div>
          <el-button color="#845EC2">登录</el-button>
          <el-button>注册</el-button>
        </div>
      </div>
    </el-header>
    <el-row>
      <!-- main -->
      <el-col
        style="
          padding: 180px 0;
          display: flex;
          flex-flow: column wrap;
          place-content: center space-around;
          background: #e9eef3;
        "
        :xs="24"
        :sm="24"
        :md="11"
        :lg="11"
        :xl="11"
      >
        <div style="width: 20rem" class="main-box">
          <!-- title -->
          <p style="font-size: 4rem; font-weight: 800; color: #845ec2">Hello</p>
          <p style="font-size: 2.5rem; font-weight: 800">Welcome to ChatRoom</p>
          <!-- text -->
          <p style="font-size: 1.1rem; font-weight: 200; margin: 1rem 0">
            因为背景是在padding区域显示的，设置一个大数值的padding-bottom，再设置相同数值的负的margin-bottom，使背景色铺满元素区域，又符合元素的盒模型的计算公式，实现视觉上的等高效果
          </p>
          <!-- button -->
          <div>
            <el-button color="#845EC2" size="large" @click="push('chat')">
              Go
            </el-button>
            <el-button size="large">About</el-button>
          </div>
        </div>
      </el-col>
      <!-- main -->

      <!-- aside -->
      <el-col
        style="background: #e9eef3; position: relative"
        class="hidden-xs-only hidden-sm-only"
        :xs="24"
        :sm="24"
        :md="13"
        :lg="13"
        :xl="13"
      >
        <Transition appear name="slide-fade">
          <img
            style="
              border-radius: 0.5rem;
              box-shadow: 0.5rem 0.5rem 0.3rem #888888;
            "
            class="img"
            :src="imgSrc"
            alt="err"
          />
        </Transition>
      </el-col>
      <!-- aside -->
    </el-row>
  </el-container>
</template>

<script setup>
import "element-plus/theme-chalk/display.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
  // data
  const imgSrc = ref(
    "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
  );

  // methods
  const router = useRouter();
  const push = (routeName) => {
    console.log(routeName);
    router.push({ path: `${routeName}` });
    return router.push;
  };
</script>

<style scoped>
/* .img-container { */
/* position: relative; */
/* border-radius: 0.5rem; */

/* overflow: hidden; */
/* } */
.img {
  width: auto;
  height: auto;
  max-width: 90%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* slide-fade */
.slide-fade-enter-active {
  transition: all 0.6s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 1.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>