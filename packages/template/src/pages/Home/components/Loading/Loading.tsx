import { Spin } from "antd";
import React from "react";
import $style from "./style.module.less";

interface IProps {}

export const Loading: React.FC<IProps> = (props) => {
  return (
    <div className={$style.loadingWrapper}>
      <Spin />
    </div>
  );
};
