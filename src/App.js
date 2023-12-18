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

const useIterator = (url) => {
  const [userList, setUserList] = useState([]);
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [current, setCurrentUser] = useState([]);
  const [index, setIndex] = useState(0);
  const fetchUserData = async () => {
    try {
      setisLoading(true);
      const responseData = await axios.get(url);
      setUserList(responseData.data.results);
      setCurrentUser(responseData.data.results[0]);
      setisSuccess(true);
      setisLoading(false);
    } catch (error) {
      setisError(true);
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const next = () => {
    if (index === 49) {
      fetchUserData();
      setIndex(0);
    } else {
      setIndex(index + 1);
      setCurrentUser(userList && userList[index + 1]);
    }
  };
  const previous = () => {
    if (index === 0) {
      setIndex(49);
      setCurrentUser(userList && userList[49]);
    } else {
      setIndex(index - 1);
      setCurrentUser(userList && userList[index - 1]);
    }
  };
  return [isLoading, isSuccess, isError, userList, current, next, previous];
};
function App() {
  const [isLoading, isSuccess, isError, userList, current, next, previous] =
    useIterator("https://randomuser.me/api/?results=50");

  return (
    <div>
      {isLoading && <Spinner />}
      <h1 className="header-text">Current User</h1>
      <div className="main">
        {isSuccess && (
          <div className="user-items">
            <img
              alt="Current User"
              src={current && current.picture.large}
              className="profile-pictures"
            />
            <h5 className="user-names">
              {current && current.name.first} {current && current.name.last}
            </h5>
            <button
              onClick={() => {
                previous();
              }}
            >
              previous
            </button>
            <button
              onClick={() => {
                next();
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
          userList &&
          userList.map((user, index) => (
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
