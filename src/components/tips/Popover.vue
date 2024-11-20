<template>
  <a-popover 
    title="Title" 
    overlayClassName="custom-popover"
    :overlayStyle="{ padding: '10px' }"
    placement="topLeft"
    v-bind="$attrs"
    :arrowPointAtCenter="true"
  >
    <template #content>
      <p>Content with custom styles</p>
    </template>
    <a-button type="primary">Hover me</a-button>
  </a-popover>
</template>

<style lang="less">
.custom-popover .ant-popover-arrow {
  width: 60px;
  height: 14px;
  &:before {
    width: 60px;
    height: 14px;
    clip-path: unset;
    background-color: transparent;
    background-image: url('./img/popover_arrow.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  &::after {
    display: none;
  }
  
}

.custom-popover {
  &.ant-popover-placement-top, &.ant-popover-placement-topLeft, &.ant-popover-placement-topRight  {
    .ant-popover-arrow {
      transform: translateX(-50%) translateY(7px) rotate(0deg);
    }
  }
  &.ant-popover-placement-topLeft, &.ant-popover-placement-bottomRight {
    .ant-popover-inner {
      transform: translateX(-24px);
    }
  }
  // &.ant-popover-placement-bottom, &.ant-popover-placement-bottomLeft, &.ant-popover-placement-bottomRight
  &.ant-popover-placement-left, &.ant-popover-placement-leftTop, &.ant-popover-placement-leftBottom {
    .ant-popover-arrow {
      transform: translateY(-50%) translateX(50%) rotate(-90deg);
    }
  }
  &.ant-popover-placement-leftTop, &.ant-popover-placement-rightTop {
    .ant-popover-inner {
      transform: translateY(-20px);
    }
  }
  &.ant-popover-placement-right, &.ant-popover-placement-rightTop, &.ant-popover-placement-rightBottom {
    .ant-popover-arrow {
      transform: translateY(-50%) translateX(-30px) rotate(90deg);
    }
  }
}


</style>
