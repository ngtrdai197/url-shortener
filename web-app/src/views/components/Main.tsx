import React, { PropsWithChildren } from "react";
import styles from "./Main.module.scss";

interface Props extends PropsWithChildren {}

const Main: React.FC<Props> = ({ children }) => {
  return <main className={styles["main"]}>{children}</main>;
};

export default Main;
