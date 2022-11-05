import fetch from "node-fetch";
// let fetch =  require("node-fetch");

const userAction = async () => {
    const response = await fetch('http://https://documenter.getpostman.com/view/6643991/S17m1X5P.com/movies.json');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
  }

(async () => {
    await userAction();
})();