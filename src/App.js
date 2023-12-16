import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Spinner = () => {
  return (
    <div className="container">
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  );
};

const useFetchWetherData = () => {
  const [data, setData] = useState([]);
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchWhetherData = async () => {
      try {
        setisLoading(true);
        const responseData = await axios.get(
          "https://randomuser.me/api/?results=50"
        );
        console.log(responseData.data.results);
        console.log(Array.isArray(responseData.data.results));
        setData(responseData.data.results);
        setisSuccess(true);
        setisLoading(false);
      } catch (error) {
        setisError(true);
        setisLoading(false);
      }
    };
    fetchWhetherData();
  }, []);
  return [isLoading, isSuccess, isError, data];
};
function App() {
  const [isLoading, isSuccess, isError, data] = useFetchWetherData();
  const [currentUser, setCurrentUser] = useState(0);
  console.log("This is the  users", data && data);
  console.log("This is the current user", currentUser);
  const increment = () => {
    if (currentUser === 49) {
      setCurrentUser(0);
    } else {
      setCurrentUser(currentUser + 1);
    }
  };
  const decrement = () => {
    if (currentUser === 0) {
      setCurrentUser(49);
    } else {
      setCurrentUser(currentUser - 1);
    }
  };
  return (
    <div>
      {isLoading && Spinner()}
      <h1 className="header-text">Current User</h1>
      <div className="main">
        {isSuccess && (
          <div className="user-items">
            <img
              alt="Current User"
              src={data && data[currentUser] && data[currentUser].picture.large}
              className="profile-pictures"
            />
            <h5 className="user-names">
              {data && data[currentUser] && data[currentUser].name.first}{" "}
              {data && data[currentUser] && data[currentUser].name.last}
            </h5>
            <button
              onClick={() => {
                decrement();
              }}
            >
              previous
            </button>
            <button
              onClick={() => {
                increment();
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <h1 className="header-text"> System Users</h1>
      <div className="main">
        {isError && <div> Sorry, Something went wrong!</div>}
        {isSuccess &&
          data &&
          data.map((user, index) => (
            <div key={index} className="user-items">
              <img
                alt="All  User"
                src={user.picture.large}
                className="profile-pictures"
              />
              <h5 className="user-names">
                {user.name.first} {user.name.last}
              </h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
