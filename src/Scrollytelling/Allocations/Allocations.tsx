import React, { useState } from "react";

import Treemap from "./Treemap";

const ScrollamaModule = require('react-scrollama')
const Scrollama = ScrollamaModule.Scrollama
const Step = ScrollamaModule.Step


const dataContent = [
    "overall",
    "FSF",
    "AIDP",
    "TL",
    "C4E",
    "C4E"
]

const Allocations = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    // @ts-ignore
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    return (
        <div className="flex justify-between">
            <div className="">
                <Scrollama offset={0.5} onStepEnter={onStepEnter} debug>
                    {dataContent.map((d, stepIndex) => (
                        <Step data={stepIndex} key={stepIndex}>
                            <div className={`border-2 my-[100vh] w-[400px] h-[250px] ${currentStepIndex === stepIndex ? "opacity-1" : "opacity-[0.2]"}`}>
                                {d}
                            </div>
                        </Step>
                    ))}
                </Scrollama>
            </div>
            <div className="fixed right-0">
                <Treemap currentStepIndex={currentStepIndex} />
            </div>
        </div>
    )

}

export default Allocations