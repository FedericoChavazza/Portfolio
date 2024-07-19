import "./App.css";
import styles from "./App.module.css";
import { Route } from "react-router-dom";
import { Start } from "./components/Start";
import { useSelector } from "react-redux";
import { TurnOffComputer } from "./components/TurnOff";
import HomeWrapper from "./components/Home/Container";

function App() {
  const grayscale = useSelector((state) => state.grayscale);

  const onClick = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };

  return (
    <div
      onClick={onClick}
      className={!grayscale ? styles.header : styles.grayHeader}
    >
      <Route exact path="/Deskop" component={HomeWrapper} />
      <Route exact path="/" component={Start} />
      <Route exact path="/turnedOff" component={TurnOffComputer} />
    </div>
  );
}

export default App;
