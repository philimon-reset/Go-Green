import "./style.css";

const Sponsor = () => {
  return (
    <>
      <div className="section">
        <h1 className="title">Sponsor a Tree 🍃</h1>
        <form className="form">
          <div className="question">
            <label htmlFor="trees">
              <b>Tree Type</b>
            </label>
            <select name="trees" id="trees">
              <option value="black">The cool one</option>
              <option value="others">Others</option>
            </select>
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
                placeholder="Minimum Pric: $5"
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

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Sponsor;
