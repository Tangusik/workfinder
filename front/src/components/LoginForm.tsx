import React from "react";
import styles from "../css/LoginForm.module.css";

const LoginForm = () => {
  return (
    <div id="wrapper" className={styles.signin}>
      <form id="signin" method="" action="">
        <input type="text" id="user" name="user" placeholder="username" />
        <input type="password" id="pass" name="pass" placeholder="password" />
        <button type="submit">&#8594;</button>
      </form>
    </div>
  );
};

export default LoginForm;
