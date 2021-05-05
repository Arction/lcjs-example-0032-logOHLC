/*
 * LightningChart JS Example that showcases TODO
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    OHLCSeriesTypes,
    AxisTickStrategies,
    SolidLine,
    SolidFill,
    ColorRGBA,
    LegendBoxBuilders,
    UIOrigins,
    Themes
} = lcjs

// Import data-generator from 'xydata'-library.
const {
    createProgressiveTraceGenerator
} = require('@arction/xydata')

// Initialize chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.dark
    // Specify Y Axis as logarithmic.
    defaultAxisY: {
        type: 'logarithmic',
        base: '10',
    }
})
    .setTitle('OHLC Chart with Logarithmic Y Axis')

// Configure DateTime Axis X.
const dateOrigin = new Date(2013, 8, 16) //
const xAxis = chart.getDefaultAxisX()
    .setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

const yAxis = chart.getDefaultAxisY()
    .setTitle('Stock price (€)')

// Generate progressive XY data.
const y1 =  1000 * (0.5 + Math.random())
const y2 = 10000 * (0.5 + Math.random())
const priceBoomStartX = 3216
const priceBoomEndX = 5796
const flipAtY = (limitY, y) => y < limitY ? limitY + (limitY - y) : y
Promise.all([
    createProgressiveTraceGenerator()
        .setNumberOfPoints(15000)
        .generate()
        .toPromise()
        .then((data) => data.map((xy) => ({ x: xy.x, y: Math.max(y1 + xy.y * 6, 1) }))),
    createProgressiveTraceGenerator()
        .setNumberOfPoints(15000)
        .generate()
        .toPromise()
        .then((data) => data.map((xy) => ({ x: xy.x, y: y2 + flipAtY(y2 * 0.75, xy.y * 250) })))
])
    .then((dataSets) => {
        // Merge two data sets into one by interpolating from data set 1 to data set 2, simulating a "price boom".
        const data = dataSets[0].map((xy, i) => {
            if (i <= priceBoomStartX) return xy
            if (i >= priceBoomEndX) return dataSets[1][i]
            // Linear interpolation.
            const lerpAmount = (i - priceBoomStartX) / (priceBoomEndX - priceBoomStartX)
            return { x: xy.x, y: xy.y + lerpAmount * (dataSets[1][i].y - xy.y) }
        })
        return data
    })
    // Scale X step from [1] to 1 hour.
    .then((data) => data.map((xy) => ({ x: xy.x * 1000 * 60 * 60, y: xy.y })))
    .then((data) => {
        // Package XY points into OHLC series automatically.
        const series = chart.addOHLCSeries({ seriesConstructor: OHLCSeriesTypes.AutomaticPacking })
            .setName('Stock price')
            .setPackingResolution(1000 * 60 * 60)
            .add(data)

        // Add marker for price boom start.
        xAxis.addConstantLine()
            .setName('Price boom start')
            .setValue(priceBoomStartX * 1000 * 60 * 60)
            .setStrokeStyle(new SolidLine({
                thickness: 5,
                fillStyle: new SolidFill({ color: ColorRGBA(0, 255, 0, 50) })
            }))
            .setMouseInteractions(false)

        // Fit X Axis immediately.
        xAxis.fit()

        // Add LegendBox.
        const legend = chart.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
            .add(chart)
    })
