import styles from "./Notepad.module.css";

import MyCV from "./../cv/Federico_Martin_Chavazza.pdf";

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
          <div className={styles.myInfo}>
            <a
              contentEditable={false}
              className={styles.downloadCV}
              id="downloadCV"
              href={MyCV}
              download="Federico_Chavazza_CV.pdf"
            >
              Here is my CV, Download it!
            </a>
            <a
              contentEditable={false}
              className={styles.myGithub}
              id="github"
              href="https://github.com/FedericoChavazza"
              target="_blank"
              rel="noreferrer"
            >
              Here is my Github, Join!
            </a>
          </div>
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
            <a
              contentEditable={false}
              target="_blank"
              id="gitcode"
              style={{ textDecoration: "none", color: "black" }}
              href={content.link}
              rel="noreferrer"
            >
              {content.link && content.link}
            </a>

            <p>
              ----------------------------Github
              code----------------------------
            </p>
            <a
              contentEditable={false}
              target="_blank"
              id="gitcode"
              style={{
                textDecoration: "none",
                color: "black",
                cursor: content?.gitCode ? "pointer" : "default",
              }}
              href={content?.gitCode ?? undefined}
              rel="noreferrer"
            >
              {content?.gitCode ? "Click Here!" : "Private"}
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
