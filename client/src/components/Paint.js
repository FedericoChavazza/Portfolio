import styles from "./Paint.module.css";

const Paint = () => {
  return (
    <div className={styles.container}>
      <iframe
        src="https://jspaint.app/"
        onLoad={(e) => {
          e.target.style.height = "100%";
          e.target.style.width = "100%";
        }}
      ></iframe>
    </div>
  );
};

export default Paint;
