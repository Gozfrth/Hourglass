import Comp from "./HourGlass";
import Timer from "./Timer";

function App() {
  return (
    <div className="h-screen bg-orange-200">
      <div style={{height: "950px"}} className=" flex items-center justify-center ">
      <Comp />
      <Timer />
    </div>
    </div>
  );
}

export default App;
