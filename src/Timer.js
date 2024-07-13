import { useState } from "react";

function Timer() {
  var tempTime = new Date().toLocaleTimeString();
  const [time, setTime] = useState(tempTime);

  const updateTime = () => {
    tempTime = new Date().toLocaleTimeString();
    setTime(tempTime);
  };
  var hours = time[0] + time[1];
  var minutes = time[3] + time[4];
  var seconds = time[6] + time[7];
  console.log(seconds);

  setInterval(updateTime, 1000);





  return (
    <div className="ml-10">
      <div
        style={{ fontSize: "10rem" }}
        className="pl-10 p-5 font-family: ui-monospace border-2 border-black rounded"
      >
        {time}
      </div>
      {/* <div style={{width:"800px", height:"200px"}} className="pl-10 p-5 font-family: ui-monospace border-2 border-black rounded">
        {time}
      </div> */}
    </div>
  );
}

export default Timer;

// import { useState } from "react";
// import Clock from "./Unit";
// import Contain from "./Contain";

// function Timer() {
//   var tempTime = new Date().toLocaleTimeString();
//   const [time, setTime] = useState(tempTime);

//   const updateTime = () => {
//     tempTime = new Date().toTimeString();
//     setTime(tempTime);
//   };
//   var hours = time[0] + time[1];
//   var minutes = time[3] + time[4];
//   var seconds = time[6] + time[7];
//   console.log(seconds);

//   setInterval(updateTime, 1000);

//   //7
//   var config = {
//     0:false,
//     1:false,
//     2:false,
//     3:false,
//     4:false,
//     5:false,
//     6:false,
//     7:false,
//   }

//   var seven = [];

//   for(var num in time){
//     switch(num){
//       case "1":
//         var n = config;
//         n[3] = true;
//         n[5] = true;
//         seven.push(n);
//         break;
//       default:
//         break;
//     }

//   }


//   return (
//     <div className="ml-10">
//       {/* <div
//         style={{ fontSize: "10rem" }}
//         className="ml-10 pl-10 font-family: ui-monospace"
//       >
//         {time}
//       </div> */}
//       <div className="pl-10 p-5 font-family: ui-monospace border-2 border-black rounded flex items-center">
//         <Contain object={seven[0]}/>
//         <Contain />
//         <h1>:</h1>
//         <Contain />
//         <Contain />
//         <h1>:</h1>
//         <Contain />
//         <Contain />
//       </div>
//     </div>
//   );
// }

// export default Timer;
