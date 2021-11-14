import styles from "./Notepad.module.css";

const Notepad = ({ content }) => {
  if (!content) {
    return (
      <div className={styles.container}>
        <div className={styles.content} contentEditable={true}>
          <h2>About me</h2>
          <p>holaaa soy fede</p>
        </div>
      </div>
    );
  }

  if (content) {
    return (
      <div className={styles.container}>
        <div className={styles.content} contentEditable={true}>
          <h2>{content.title}</h2>
          {content.text}
          <img src={content.renderImg && content.renderImg} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>
              -------------------------------Link-------------------------------
            </p>
            {content.link && content.link} <br />
            <p>
              ----------------------------Github
              code----------------------------
            </p>
            <a
              contentEditable={false}
              target="_blank"
              href={content.gitCode}
              id="gitcode"
              style={{ textDecoration: "none", color: "black" }}
              href={content.gitCode}
            >
              {" "}
              Click Here!{" "}
            </a>
            <p>
              {" "}
              -----------------------------Tech
              stack-----------------------------
            </p>
            {content.techStack &&
              content.techStack.map((data) => (
                <ul>
                  <li>{data}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Notepad;
