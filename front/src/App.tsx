import React from "react";
import styles from "./css/LoginPage.module.css";
import LoginForm from "./components/LoginForm";

class App extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <LoginForm></LoginForm>
      </div>
    );
  }
}

export default App;
