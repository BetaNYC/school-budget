import React, { useState } from "react";

import LineChart from "./LineChart";
import Treemap from "./Treemap";
// import StackedBarChart from "./StackedBarChart";

const ScrollamaModule = require('react-scrollama')
const Scrollama = ScrollamaModule.Scrollama
const Step = ScrollamaModule.Step

function App() {

  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  const onStepEnter = ({ data }: any) => {
    setCurrentStepIndex(data);
  };

  return (
    <div className="flex justify-between">
      <div>
        <Scrollama offset={0.5} onStepEnter={onStepEnter} debug>
          {[1, 2, 3, 4].map((_, stepIndex) => (
            <Step data={stepIndex} key={stepIndex}>
              <div className={`mt-[50vh] ${currentStepIndex === stepIndex ? "opacity-1" : "opacity-[0.2]"}`}>
                I'm a Scrollama Step of index {stepIndex}
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
      <div className="sticky top-[25vh] h-[100vh]">
        <Treemap />
        {/* <StackedBarChart /> */}
        {/* <LineChart/> */}
      </div>

    </div>
  );
}

export default App;
