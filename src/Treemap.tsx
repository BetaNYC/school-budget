import React, { useRef, useEffect, RefObject, createRef } from "react";
import * as d3 from 'd3';


const data = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv'

type dataType = {
    name: string,
    parent: string,
    value: string
}


// interface TreemapProps {
//     currentStepIndex: number | null
//     stepIndex: number | null
// }

const Treemap = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    // console.log(currentStepIndex)
    // console.log(stepIndex)

    useEffect(() => {
        const refCurrent = ref.current!
        const svg = d3.select(refCurrent).select('svg');
        const margin = 20
        const height = refCurrent.clientHeight - margin;
        const width = refCurrent.clientWidth - margin;

        d3.dsv(",", data).then(data => {
            // console.log(data)

            let root = d3.stratify()
                .id((d: unknown) => ((d as dataType).name))
                .parentId((d: unknown) => ((d as dataType).parent))(data)
            root.sum((d: unknown) => (+(d as dataType).value))

            d3.treemap().size([width, height]).padding(4)(root)

            // console.log(root.leaves())

            svg.selectAll('rect').data(root.leaves()).enter().append("rect")
                .attr('x', (d: unknown) => (d as { x0: number }).x0)
                .attr('y', (d: unknown) => (d as { y0: number }).y0)
                .attr('width', (d: unknown) => ((d as { x1: number }).x1 - (d as { x0: number }).x0))
                .attr('height', (d: unknown) => ((d as { y1: number }).y1 - (d as { y0: number }).y0))
                // .style('opacity', currentStepIndex === stepIndex ? 1 : 1)
                .style("stroke", "black")
                .style("fill", "#69b3a2")



            svg.selectAll('text')
                .data(root.leaves())
                .enter()
                .append('text')
                .attr('x', (d: unknown) => ((d as { x0: number }).x0 + 10))
                .attr('y', (d: unknown) => ((d as { y0: number }).y0 + 20))
                .text((d: unknown) => ((d as {
                    data: {
                        name: string
                    }
                }).data.name))
                .attr("font-size", "15px")
                .attr('fill', "white")
        })



    }

    )




    return <div ref={ref} className="w-[50vw] h-[100vh] bg-slate-200">
        <svg className="w-full h-full">

        </svg>
    </div>

}

export default Treemap