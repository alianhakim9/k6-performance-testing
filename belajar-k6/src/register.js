import http from "k6/http";
// import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  const uniqueId = new Date().getTime();
  const body = {
    username: `user-${uniqueId}`,
    password: "rahasia",
    name: "Alian Hakim",
  };

  http.post("http://localhost:3000/api/users", JSON.stringify(body), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const loginBody = {
    username: `user-${uniqueId}`,
    password: "rahasia",
  };

  const loginResponse = http.post(
    "http://localhost:3000/api/users/login",
    JSON.stringify(loginBody),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseBody = loginResponse.json();

  const currentResponse = http.get("http://localhost:3000/api/users/current", {
    headers: {
      Accept: "application/json",
      Authorization: responseBody.data.token,
    },
  });

  const currentBody = currentResponse.json();
}
