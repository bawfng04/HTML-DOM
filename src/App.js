import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [test, setTest] = useState(false);
  const [jsontest, setJsontest] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [test1, setTest1] = useState([]);

  const toggleTest = () => {
    setTest(!test);
    setJsontest(!jsontest);
  };

  const consoleAndAlert = (e) => {
    console.log(e);
    //alert(e);
  };

  useEffect(() => {
    const foa = document.getElementsByClassName("testDiv");
    const foa2 = document.querySelector(".App-link");
    consoleAndAlert(foa);
    consoleAndAlert(foa2);
  }, [test]);

  //==============================================================================================
  //JSON
  // JSON parse -> dữ liệu thuần.
  // Dữ liệu thuần -> stringify -> JSON.
  //Khi làm FE, từ API -> JSON -> parse ra thành dữ liệu thực sự.
  useEffect(() => {
    //parse
    var a = "1";
    var JSONtoNumber = JSON.parse(a);
    var b = '"this is a string"';
    var JSONtoString = JSON.parse(b);

    var c = 1;
    var numberToJSON = JSON.stringify(c);
    var obj = {
      name: "Bang",
      age: 20,
      address: "who knows?",
    };
    var objectToJSON = JSON.stringify(obj);

    console.log("type: ", typeof JSONtoNumber, JSONtoNumber);
    console.log("type: ", typeof JSONtoString, JSONtoString);
    console.log("type: ", typeof numberToJSON, numberToJSON);
    console.log("type: ", typeof objectToJSON, objectToJSON);
  }, [jsontest]);
  //==============================================================================================

  //Sync / Async / Promise

  //Trong JS, cơ bản code chạy bằng đồng bộ (sync), nghĩa là single thread.
  //Khi compile code sẽ chạy từ trên xuống.

  //Nhưng có những trường hợp bất đồng bộ, ví dụ:
  //(setTimeout(1000){ consolelog(a)) };
  //consolelog(b);

  //Khi đó b sẽ in ra trước -> Nghĩa là có một thread khác đang giám sát setTimeout của a -> async.

  //Async: fetch, setTimeout, setInterval, XMLHttpRequest...
  //Khi đó, Js sẽ có callback (để báo lại khi các async function chạy xong, ví dụ, fetch xong API...)
  //Callback hell: Khi điều kiện chạy của function này phụ thuộc vào function khác, lồng vào nhau liên tục...
  //Mỗi promise chỉ có thể là resolve hoặc reject, không được có cả 2

  var PromiseAAA = new Promise(function (resolve, reject) {
    //resolve(): Khi gọi thành công //then - finally
    //reject(): Khi gọi thất bại    //catch - finally
    //cả khi gọi resolve lẫn reject đều sẽ chạy lần lượt ở then và catch, sau đó finally sẽ luôn có
    reject("something"); // -> failllllllllllllll something // finallyyyyyyyyyy
    resolve("somethingg"); // -> thanh congggggggggg somethingg // finallyyyyyyyyyy
    ////Lệnh này sẽ không có hiệu quả vì Promise đã được resolved trước đó. Một Promise chỉ có thể được resolved hoặc rejected một lần.
  });

  PromiseAAA.then(function (e) {
    console.log("thanh congggggggggg", e);
  })
    .catch(function (e) {
      console.log("failllllllllllllll", e);
    })
    .finally(function () {
      console.log("finallyyyyyyyyyy");
    });

  //ví dụ về promise:
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; // Thay đổi giá trị này để kiểm tra các trường hợp khác nhau
        if (success) {
          resolve("Data fetched successfully");
        } else {
          reject("Error fetching data");
        }
      }, 1000);
    });
  }

  fetchData()
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });

  //Tạo hai Promise, promise1 và promise2. promise2 chỉ được thực thi sau khi promise1 hoàn thành. In ra kết quả của cả hai Promise.
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 1 resolved");
    }, 1000);
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 2 resolved");
    }, 2000);
  });

  promise1
    .then((result1) => {
      console.log(result1);
      return promise2;
    })
    .then((result2) => {
      console.log(result2);
    })
    .catch((error) => {
      console.log(error);
    });

  //Tạo ba Promise, promiseA, promiseB, và promiseC. Sử dụng Promise.all để đợi tất cả các Promise hoàn thành và in ra kết quả của chúng.
  const promiseA = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise A resolved");
    }, 1000);
  });

  const promiseB = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise B resolved");
    }, 2000);
  });

  const promiseC = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise C resolved");
    }, 3000);
  });

  Promise.all([promiseA, promiseB, promiseC])
    .then((results) => {
      console.log(results); // ["Promise A resolved", "Promise B resolved", "Promise C resolved"]
      //giả sử PromiseA mất 2s, PromiseB Mất 3s, PromiseC mất 2s, thì tổng
      //thời gian khi chạy bình thường sẽ mất 7s
      //Nhưng khi dùng Promise.all -> Chạy song song -> Chỉ mất 3s.
      //Dùng khi các Promise không phụ thuộc lẫn nhau, nhưng cần kết hợp kết quả
      //để làm gì đó
    })
    .catch((error) => {
      console.log(error);
    });

  //==============================================================================================
  //Promise chain
  //Khi có một Promise và gọi resolve(data), thì hàm callback trong nhánh .then() đầu tiên sẽ nhận được data đó làm tham số.
  //Sau đó:
  // Nhánh .then() đầu tiên xử lý data (trong resolve) và có thể trả về một giá trị mới (bằng cách sử dụng return).
  // Nhánh .then() thứ hai sẽ nhận được giá trị mà nhánh .then() trước đó trả về.
  // Quá trình này tiếp tục cho các nhánh .then() tiếp theo,

  const promiseChain = new Promise(function (resolve, reject) {
    resolve("chain resolve");
    reject("chain reject"); //Lệnh này sẽ không có hiệu quả vì Promise đã được resolved trước đó. Một Promise chỉ có thể được resolved hoặc rejected một lần.
  });

  promiseChain
    .then(function () {
      return 1;
    })
    .then(function (data) {
      console.log("promiseChain: ", data); //Nhận data là 1 từ lần .then() trước -> In ra promiseChain: 1.
      return 2;
    })
    .then(function (data) {
      console.log("promiseChain: ", data); //Nhận data là 2 -> In ra promiseChain: 2.
      return 3;
    })
    .then(function (data) {
      console.log("promiseChain: ", data);
    })
    //Mỗi lần .then() nhận giá trị trả về từ lần trước, cho phép xử lý tuần tự các giá trị.
    .catch(function (error) {
      console.log("promiseChain error:", error);
    });

  // promiseChain:  1
  // promiseChain: 2;
  // promiseChain: 3;

  //another ví dụ về chain:
  new Promise(function (resolve, reject) {
    resolve("Initial Data");
  })
    .then(function (data) {
      console.log("First then:", data); // "Initial Data"
      return "Data from first then";
    })
    .then(function (data) {
      console.log("Second then:", data); // "Data from first then"
      return "Data from second then";
    })
    .then(function (data) {
      console.log("Third then:", data); // "Data from second then"
    });

  //another promise chain
  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  sleep(1000)
    .then(function () {
      console.log("sleep: 1");
      return sleep(5000);
    })
    .then(function () {
      console.log("sleep: 2"); //
      //ví dụ: Khi return về một promise bị reject, thì sẽ nhảy vào catch (*) ngay lập tức.
      //return new Promise(function(resolve, reject) { reject("error"); });
      return sleep(5000);
    })
    .then(function () {
      console.log("sleep: 3");
      return sleep(5000);
    })
    .catch((error) => {
      //(*)
      console.log("sleep error:", error);
    });
  //https://www.youtube.com/watch?v=pxyxbaq8i8c&list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5&index=92

  //sleep: 1 (5s) -> sleep: 2 (5s) -> sleep: 3 (5s);

  //==============================================================================================

  //Promise in realworld (comments)

  //lay comment, tu comment -> lay userId -> tu userId lay ra usermame
  var users = [
    {
      id: 1,
      name: "Nguyen Van A",
      userName: "A2004",
    },
    {
      id: 2,
      name: "Nguyen Thi B",
      userName: "B0322",
    },
    {
      id: 3,
      name: "Nguyen Thi C",
      userName: "C032232",
    },
  ];

  var comments = [
    {
      id: 1,
      userId: 1,
      content: "Tai sao GPU lai khong nho nhu CPU nhi??",
    },
    {
      id: 2,
      userId: 2,
      content: "Tai vi may bi ngu!!",
    },
  ];

  function getComment() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(comments);
      }, 1000);
    });
  }

  function getUsersByIds(userIds) {
    //userIds ex: [1, 2, ...]
    //truyền vào getUsersByIds một mảng, và kết quả trả về sẽ là các user tương ứng (cũng là mảng)
    return new Promise(function (resolve) {
      //lấy ra user từ userIDs
      var commentedUsers = users.filter(function (user) {
        return userIds.includes(user.id);
      });
      resolve(commentedUsers);
    });
  }

  getComment()
    .then(function (comments) {
      var userIDs = comments.map((comment) => {
        //userIDs là một mảng, ví dụ: [1, 2].
        return comment.id; //print the userID list
      });
      //lấy user bằng mảng userIDs
      return getUsersByIds(userIDs).then(function (users) {
        console.log("result: ", users);
        return {
          users: users,
          comments: comments,
        };
      });
    })
    .then(function (data) {
      //data:
      // {
      //   users: users,
      //   comments: comments,
      // }

      //render ra bang html
      var commentBlock = document.getElementById("commentBlock");
      var html = "";
      data.comments.forEach(function (comment) {
        var user = data.users.find(function (user) {
          return user.id === comment.userId; //tìm user có id trùng với comment
        });
        html += `<li>${user.name}: ${comment.content}</li>`;
      });
      commentBlock.innerHTML = html;
    });

  //==============================================================================================

  //fetch
  //example
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log("Fetched::: ", json));

  //another fetch: Comment data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json()) //JSON.parse()
      .then((data) => {
        setCommentData(data);
        //names: ["312321", "f23hguugfe", ...]
        var names = data.map((unit) => {
          //lay het name trong API
          return unit.name;
        });

        setTest1(names);

        //in ra trong web
        var printNames = data.map((unit) => {
          return `<h4>
            <p>${unit.email}</p>
            <p>${unit.body}</p>
          </h4>`;
        });

        var printContent = printNames.join("");
        document.getElementById("printNameDiv").innerHTML = printContent;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //bất đồng bộ -> cần useEffect mới để chạy sau khi fetch.
  useEffect(() => {
    console.log("commentData: =======", commentData);
  }, [commentData]);
  console.log("🚀 ~ App ~ commentData:", commentData);

  useEffect(() => {
    console.log("nameeeeeeees: ", test1);
  }, [test1]);

  //==============================================================================================

  fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((data) => {
      console.log("dataaaaaaaa ", data);
    });

  //cần vào json-server để npm start tạo API

  //==============================================================================================

  //==============================================================================================

  //==============================================================================================

  //test commit
  //git add .
  //git commit -m ""
  //git push origin main

  return (
    <div className="App">
      <div id="commentBlock" className="commentBlock"></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="test">
        <p className="testP"> foaiefiewjfw </p>
        <div className="testDiv">
          <div className="div1"> div 1</div>
          <div className="div2"> div 2</div>
        </div>
        <div className="testDiv">
          <div className="div1"> div 1</div>
          <div className="div2"> div 2</div>
        </div>
      </div>
      <button onClick={toggleTest}>test</button>

      <div id="printNameDiv"></div>
    </div>
  );
}

export default App;
