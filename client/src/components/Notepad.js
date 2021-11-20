import styles from "./Notepad.module.css";

const Notepad = ({ content }) => {
  if (!content) {
    return (
      <div className={styles.container}>
        <div className={styles.content} contentEditable={true}>
          <p>
            Hello there! My name is Federico Chavazza, I love with all my heart
            painting and designing. I started programming at Henry's bootcamp,
            not even knowing what backend or even frontend was, but once I found
            out, my true passion for web designing and learning new tech
            beginned! I mainly work as a React frontend developer(which i love).
            I have a keen eye for detail and usability and my work is standards
            compliant and accessible.{" "}
          </p>
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
          <img
            style={{
              margin: "auto",
            }}
            contentEditable={false}
            src={content.renderImg && content.renderImg}
            alt=""
          />
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
