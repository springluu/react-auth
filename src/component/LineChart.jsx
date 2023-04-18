import React, { useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

export { LineChart }

function LineChart(props) {
    useEffect(() => {
        // Create chart instance
        const chart = am4core.create('chartdiv', am4charts.XYChart)

        // Set background color and opacity
        chart.chartContainer.background.fill = am4core.color('#000');
        chart.chartContainer.background.fillOpacity = 0.5;

        // Add data
        chart.data = [
            { date: '2021-11-01', value: 100 },
            { date: '2021-12-01', value: 190 },
            { date: '2022-01-01', value: 100 },
            { date: '2022-02-01', value: 120 },
            { date: '2022-03-01', value: 140 },
            { date: '2022-04-01', value: 110 },
            { date: '2022-05-01', value: 130 },
            { date: '2022-06-01', value: 150 },
            { date: '2022-07-01', value: 110 },
            { date: '2022-08-01', value: 130 },
            { date: '2022-09-01', value: 100 },
            { date: '2022-10-01', value: 150 },
            { date: '2022-11-01', value: 120 },
            { date: '2022-12-01', value: 150 },
            { date: '2023-01-01', value: 110 },
            { date: '2023-02-01', value: 50 },
            
        ]

        // Create axes
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
        dateAxis.renderer.grid.template.location = 0

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

        // Create series
        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = 'value'
        series.dataFields.dateX = 'date'
        series.tooltipText = '{value}'

        // Add cursor
        chart.cursor = new am4charts.XYCursor()

        // Cleanup
        return () => {
            chart.dispose()
        }
    }, [])

    return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
}