import styles from "./Notepad.module.css";

const Notepad = ({ content }) => {
  if (!content) {
    return (
      <div className={styles.container}>
        <div className={styles.content} contentEditable={true}>
          <p>
            Hello there! My name is Federico Chavazza. I am deeply passionate
            about painting and designing. I started programming at Henry's
            bootcamp without even knowing what backend or frontend development
            was. Once I discovered them, my true passion for web design and
            learning new technologies began! I mainly work as a React frontend
            developer (which I love). I have a keen eye for detail and
            usability, and my work is standards-compliant and accessible.
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
              rel="noreferrer"
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
