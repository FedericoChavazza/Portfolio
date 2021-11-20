import React, { useState } from "react";
import styles from "./FolderView.module.css";
import { openWindow } from "../actions/actions";
import { useDispatch } from "react-redux";

const Explorer = ({ isMotoG4 }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.windowInfo}>
      <div className={`${styles.column1} ${isMotoG4 && styles.closed}`}>
        <SpoilerBox title="File and folder tasks" description="Hello there!" />
        <SpoilerBox
          title="GitHub"
          isOpen={false}
          description="FedericoChavazza"
        />
        <SpoilerBox
          title="Email"
          isOpen={false}
          description="fchavazza@gmail.com"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "15px",
          padding: "10px",
          flexWrap: "wrap",
          width: "auto",
          height: "fit-content",
        }}
      >
        {archives.map((value) => {
          return (
            <button
              style={{
                width: "150px",
              }}
              className={styles.singleBlock}
              onDoubleClick={() => {
                dispatch(
                  openWindow({
                    windowTitle: `${value.name} - Notepad`,
                    kind: "project",
                    content: value.content,
                    img: "https://i.imgur.com/4sQ8mdp.png",
                  })
                );
              }}
            >
              <img style={{ cursor: "pointer" }} src={value.img} />
              <div className={styles.infoNote}>
                <div
                  style={{
                    lineHeight: "1.25",
                    cursor: "pointer",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {value.name}
                </div>
                <div
                  style={{
                    color: "rgba(107,114,128,1)",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Text Document
                </div>
                <div
                  style={{
                    color: "rgba(107,114,128,1)",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  1KB
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SpoilerBox = ({ title, description, isOpen: defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(
    typeof defaultOpen === "undefined" ? true : false
  );

  return (
    <article className={styles.spoilerBox}>
      <header>
        <p>{title}</p>
        <button
          className={`${!isOpen && styles.menuClosed}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </header>
      <section className={`${!isOpen && styles.closed}`}>
        <p>{description}</p>
      </section>
    </article>
  );
};

const archives = [
  {
    img: "https://i.imgur.com/4sQ8mdp.png",
    name: "Countries App.txt",
    content: {
      title: "Countries App",
      renderImg: "",
      text: "A full-stack SPA that consumes the country API where you can search for every country in the world! Search them by input, learn about their specific information and much more! You can create activities to recommend in the countries you like! Like walking or swimming in Uruguay. You can too, edit the activity if you have created one and you are not sure about what you just wrote earlier. At last, you can filter them by population, name, activity and continent",
      link: "http://google.com",
      techStack: [
        "NodeJS",
        "ExpressJS",
        "React",
        "PostgreSQL",
        "Sequelize",
        "Redux",
      ],
    },
  },
  {
    img: "https://i.imgur.com/4sQ8mdp.png",
    name: "Weather App.txt",
    content: {
      title: "Weather App",
      renderImg: "",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id, aliquid doloribus mollitia voluptatem explicabo ipsam provident et, vero ratione reiciendis culpa neque, totam molestiae nesciunt eos accusantium ad similique!",
      link: "http://google.com",
    },
  },
  {
    img: "https://i.imgur.com/4sQ8mdp.png",
    name: "Online chat App.txt",
    content: {
      title: "Online chat App",
      renderImg: "",
      text: "An Online Chat where you choose an specific room, a name and talk with all the people you want! the chat works in real time!. ",
      link: "http://google.com",
      techStack: ["React", "Socket.io", " ExpressJS"],
    },
  },
  {
    img: "https://i.imgur.com/4sQ8mdp.png",
    name: "Scrum.io.txt",
    content: {
      title: "Scrum.io",
      renderImg:
        "https://portfolio-lamaolo.vercel.app/_next/image?url=%2Fscrum-io%2Fscrum-io-1.JPG&w=1920&q=75",
      text: "Scrum.io was developed by a team of 7 people, It was the Henry's FullStack bootcamp last project. Scrum.io is a SCRUM management system, designed to provide a set of tools for both SCRUM masters and developers. Including many features like getting the information of every developer performance in a chart, notifications, a chat and changes in real time, an interactive poker planning with rooms. In this project i worked in both front and backend, doing too some real-time features",
      link: "http://google.com",
      techStack: [
        "React",
        "Socket.io",
        "MongoDB",
        "ExpressJS",
        "NodeJS",
        "Socket.io",
        "Redux",
      ],
      gitCode: "https://github.com/SHIMER-jpg/Scrum.io/",
    },
  },
];
export default Explorer;
