<template>
  <div class="mask" v-if="isShow">
    <div
      :class="[
        'my-notice',
        {
          'notice-success': type === 'success',
          'notice-error': type === 'error',
        },
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    dulation: {
      type: Number,
      default: 2000,
    },
    type: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, this.dulation);
    },
    // hide() {
    //     this.isShow = false;
    //     // 删除组件，要求组件实例上实现remove方法，这里在创建组件实例的create.js中实现
    //     this.remove()
    // }
  },
};
</script>

<style scope lang="scss">
.mask {
  /* 
        1.定位嵌套产生的z-index问题：
            由于mask在my-notice里面，所以mask的层级也由父级my-notice决定，即：
            当有一个div与m-notice并列，虽然该div的z-index没有mask大，但只要比my-notice大，
            该div及里面的元素就能覆盖mask(覆盖整个my-notice，所以my-notice里面的元素也理应被覆盖)
                                                                            ---血统法则
        2.固定定位不固定问题：
            fixed定位一般是根据浏览器视口来定位，若其父元素设置有transform属性(如translate/rotate),则会影响
            到子元素的固定定位(此时会根据父级定位)，导致固定定位不固定问题
        所以为防止以上两个问题，一般fixed定位元素都放置在body标签内(如element-ui嵌套dialog的append-to-body属性，
        还有遮罩层v-modal),这里解决办法可以将mask与my-notice父子关系对调一下
     */
  z-index: 100;
  position: fixed;
  /* 设置定位后，至少得设置一个方向的值定位才生效，不设置默认根据父元素定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.7;
  .my-notice {
    position: fixed;
    color: ghostwhite;
    text-align: center;
    top: 5px;
    left: 50%;
    /* transform将影响子元素fixed定位 */
    transform: translate(-50%);
    padding: 5px 20px;
    width: 40%;
    z-index: 101;
    /* box-shadow: X轴偏移量 Y轴偏移量 阴影模糊值大小 阴影颜色 inset(不加默认外阴影，加上设置成内阴影) */
    box-shadow: 0 0 5px gray;
  }
  .notice-success {
    background: forestgreen;
  }
  .notice-error {
    background: red;
  }
}
</style>
