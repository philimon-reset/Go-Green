import { Navigate, useOutletContext } from "react-router-dom";
import "./style.css";

import server from "../../service/server";
import { useQuery, useMutation } from "@tanstack/react-query";

const Sponsor = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <Navigate to="/auth/" />;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["trees"],
    queryFn: async () => {
      const { data } = await server.get("/tree");
      return data;
    },
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  const showSuggestions = async (e) => {
    console.log(e.target.value);
    let recommendations = document.getElementById("suggestions");

    let inputData = e.target.value;
    let emptyArray = [];
    let test = await data;
    console.log("here", test);
    let suggestions = [
      "Channel",
      "CodingLab",
      "CodingNepal",
      "YouTube",
      "YouTuber",
      "YouTube Channel",
      "Blogger",
      "Bollywood",
      "Vlogger",
      "Vechiles",
      "Facebook",
      "Freelancer",
      "Facebook Page",
      "Designer",
      "Developer",
      "Web Designer",
      "Web Developer",
      "Login Form in HTML & CSS",
      "How to learn HTML & CSS",
      "How to learn JavaScript",
      "How to became Freelancer",
      "How to became Web Designer",
      "How to start Gaming Channel",
      "How to start YouTube Channel",
      "What does HTML stands for?",
      "What does CSS stands for?",
    ];

    if (inputData) {
      emptyArray = suggestions.filter((data) => {
        return data
          .toLocaleLowerCase()
          .startsWith(inputData.toLocaleLowerCase());
      });

      emptyArray = emptyArray.map((data, index) => {
        return (data = `

        <li className="tree-result-container" data="${data}" index="${index}"} >
          <div className="tree-details">
              <div className="tree-name" index="${index}"><b>${data}</b></div>
              <span>min price:  <div className="tree-minimum-price">$10</div></span>
          </div>
          
        </li>

        `);
      });

      console.log(emptyArray);

      if (!emptyArray.length) {
        emptyArray.push(
          '<li className="search-item" new-string="' +
            inputData +
            '" >' +
            inputData +
            "</li>"
        );
      }

      recommendations.classList.add("open");
    } else {
      let list = document.querySelectorAll("li");
      list.forEach((item) => {
        item.remove();
      });
    }

    toggleSuggestions(emptyArray);
  };

  const toggleSuggestions = (list) => {
    let listData;
    let suggestions = document.getElementById("suggestions");

    if (!list.length) {
    } else {
      listData = list.join("");
      suggestions.innerHTML = listData;
    }
  };

  const changeInputValue = (e) => {};

  return (
    <>
      <div className="section">
        <h1 className="title">Sponsor a Tree 🍃</h1>
        <form class="form">
          <div className="question">
            <label htmlFor="trees">
              <b>Tree Type</b>
            </label>
            <div className="drop-down-search">
              <div className="search-container">
                <input
                  type="text"
                  name="tree-search"
                  id="tree-input"
                  onChange={(e) => {
                    showSuggestions(e);
                  }}
                  placeholder="Search tree species"
                />
                {/* <svg
                  className="search-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="38"
                  width="40"
                >
                  <path d="m38.65 40.1-12-12q-1.55 1.35-3.625 2.025Q20.95 30.8 19 30.8q-5.1 0-8.575-3.45-3.475-3.45-3.475-8.5t3.45-8.5q3.45-3.45 8.5-3.45 5 0 8.5 3.45t3.5 8.5q0 2.1-.7 4.1-.7 2-2.05 3.55L40.3 38.55q.35.35.35.8 0 .45-.4.8-.35.3-.8.3-.45 0-.8-.35Zm-19.7-11.5q4.15 0 6.975-2.8 2.825-2.8 2.825-6.95 0-4.2-2.825-7t-6.975-2.8q-4.2 0-7 2.8t-2.8 7q0 4.15 2.8 6.95t7 2.8Z" />
                </svg> */}
                <div id="suggestions"></div>
              </div>
            </div>
          </div>

          <div className="question">
            <label htmlFor="bounty">
              <b>Bounty</b>
            </label>
            <span>
              <input
                type="number"
                id="bounty"
                name="bounty"
                min="5"
                placeholder="Minimum Price: $5"
              />
            </span>
          </div>

          <div className="question">
            <label htmlFor="location">
              <b>Location</b>
            </label>
            <select name="location" id="trees">
              <option value="black">Germany</option>
              <option value="others">No preference</option>
            </select>
          </div>

          <div className="question">
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sponsor;
