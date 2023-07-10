import React, { useEffect, RefObject, useRef } from "react";
import * as d3 from 'd3';

const data = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv"

type DataType = {
    date: string,
    value: number
}


const LineChart = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const refCurrent = ref.current!
        const svg = d3.select(refCurrent).select('svg');
        const height: number = refCurrent.clientHeight;
        const width: number = refCurrent.clientWidth;

        d3.dsv(",", data, (d:unknown): {
            date: Date | null,
            value: number,
        } => {
            const res = d as DataType
            const date = d3.timeParse('%Y-%m-%d')(res.date)
            return {
                date: date,
                value: res.value,
            }
        }).then(data => {
            const x = d3.scaleTime().domain(d3.extent(data, d => {
                return d.date
            }) as [Date, Date]).range([0, width])

            const y = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(data, (d) => {
                        return Math.max(...data.map((d: unknown) => ((d) as DataType).value), 0)
                    }),
                ] as number[])
                .range([height, 0])

            svg.append('g').call(d3.axisLeft(y))

            svg.append('path').datum(data).attr('fill', 'none').attr('stroke', "#808080").attr('stroke-width', 1.5)
                .attr(
                    'd',
                    // @ts-ignore
                    d3
                        .line()
                        .x((d: unknown) => {
                            return x(((d) as { date: number }).date)
                        })
                        .y((d) => {
                            return y(((d as unknown) as DataType).value)
                        })
                )





        })
    })

    return <div ref={ref} className="w-[50vw] h-[100vh]">
        <svg className="w-full h-full">

        </svg>
    </div>
}

export default LineChart