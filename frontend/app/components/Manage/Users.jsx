import React, { useState, useEffect } from "react";
import { getData, sendData } from "../utils/api";
import Notification from "../Notification/Notification";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData(`/users`);
    setUsers(data.users);
  };

  const resetUser = async (userId) => {
    const result = await sendData(`/users/reset/${userId}`, "PUT", {});

    if (result.status === 200) {
      setNotification({
        text: "Account erfolgreich zurückgesetzt",
        status: "is-success",
      });
    } else {
      setNotification({
        text: "Account konnte nicht zurückgesetzt",
        status: "is-danger",
      });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <React.Fragment>
      <div className="content-box users">
        <div className="page-header">Account-Management</div>
        <div className="flex list-header">
          <div className="email">Email</div>
          <div className="name">Name</div>
          {/* <div className="status">Status</div> */}
          <div className="manage">Manage</div>
        </div>
        {users &&
          users.map((user) => {
            return (
              <div key={user._id} className="flex bottom">
                <div className="email">{user.email}</div>
                <div className="name">
                  {user.forename} {user.surname}
                </div>
                {/* <div className="status">{user.status}</div> */}
                <div className="manage">
                  <button
                    className="button is-info is-small is-outlined"
                    onClick={resetUser}
                  >
                    Anträge zurücksetzen
                  </button>
                </div>
              </div>
            );
          })}
        <Notification
          notification={notification}
          size="large"
          close={closeNotification}
        />
      </div>
    </React.Fragment>
  );
};

export default Users;
