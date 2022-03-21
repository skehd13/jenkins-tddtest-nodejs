import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <div id="app">
      <div id="hello">hello world</div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.target);
          const data = new FormData(event.currentTarget);
          console.log(data);

          const values = {
            email: data.get("email"),
            password: data.get("password"),
          };
          console.log(JSON.stringify(values));
          fetch(`/login`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((response) => {
            if (!response.ok) {
              alert("정보확인");
              return;
            }
            navigate("/login");
          });
        }}
        action="#"
      >
        <input name="email" id="email" />
        <input name="password" id="password" />
        <button type="submit" id="submitBt">
          완료
        </button>
      </form>
    </div>
  );
};

export default App;
