import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [test, setTest] = useState(false);
  const [jsontest, setJsontest] = useState(false);

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

  var PromiseAAA = new Promise(function (resolve, reject) {
    //resolve(): Khi gọi thành công //then - finally
    //reject(): Khi gọi thất bại    //catch - finally
    //cả khi gọi resolve lẫn reject đều sẽ chạy lần lượt ở then và catch, sau đó finally sẽ luôn có
    reject("something"); // -> failllllllllllllll something // finallyyyyyyyyyy
    resolve("somethingg"); // -> thanh congggggggggg somethingg // finallyyyyyyyyyy
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
    })
    .catch((error) => {
      console.log(error);
    });

  //==============================================================================================

  //test commit
  //git add .
  //git commit -m ""
  //git push origin main

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
