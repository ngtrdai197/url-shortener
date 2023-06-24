import React, { type PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface Props extends PropsWithChildren {}

const Main: React.FC<Props> = ({ children }) => <main className={styles.main}>{children}</main>;

export default Main;
