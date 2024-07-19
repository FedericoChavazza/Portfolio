import styles from "./Icon.module.css";

const Icon = ({ handleClick, name, img }) => {
  return (
    <button
      className={`${styles.singleIconClick}  `}
      onDoubleClick={handleClick}
    >
      <img src={img} alt={name} />
      <div>{name}</div>
    </button>
  );
};

export default Icon;
