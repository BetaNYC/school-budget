import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';


const data = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"

type DataType = {
    group: string
    Nitrogen: string
    normal: string
    stress: string
}



const StackedBarChart = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const refCurrent = ref.current!
        const svg = d3.select(refCurrent).select('svg');
        const height = refCurrent.clientHeight;
        const width = refCurrent.clientWidth;

        d3.csv(data, (d: unknown): {
            group: string
            Nitrogen: number
            normal: number
            stress: number
        } => {
            const res = d as DataType
            const nitro = parseInt(res.Nitrogen)
            const nor = parseInt(res.normal)
            const stress = parseInt(res.stress)
            return {
                group: res.group,
                Nitrogen: nitro,
                normal: nor,
                stress: stress
            }

        }).then(data => {
            console.log(data)

            let subgroups = data.columns.slice(1)
            let groups = data.map(d => d.group)

            let x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2)
            let y = d3.scaleLinear().domain([0, 60]).range([height, 0])

            svg.append('g').call(d3.axisLeft(y))

            let color = d3.scaleOrdinal().domain(subgroups).range(["#d2def9", "#d4c5e9", "#fff8e5"])

            // @ts-ignore
            let stackedData = d3.stack().keys(subgroups)(data)
            console.log(stackedData[0].key)

            svg.append("g")
                .selectAll("g")
                .data(stackedData)
                .enter().append("g")
                // @ts-ignore
                .attr("fill", function (d) { return color(d.key); })
                .selectAll("rect")
                .data(function (d) { return d; })
                .enter().append("rect")
                // @ts-ignore
                .attr("x", function (d) { return x(d.data.group); })
                .attr("y", function (d) { return y(d[1]); })
                .attr("height", function (d) { return y(d[0]) - y(d[1]); })
                .attr("width", x.bandwidth())


        })
    })

    return <div ref={ref} className="w-[50vw] h-[100vh]">
        <svg className="w-full h-full">

        </svg>
    </div>
}

export default StackedBarChart

