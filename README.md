# CoreUI chart

**[DEMO](https://shabuninil.github.io/coreui-chart)**


### Install with NPM

`npm install coreui-chart`

### Example usage

![Preview](https://raw.githubusercontent.com/shabuninil/coreui-chart/master/preview.png)

```html
<div id="chart-line"></div>

<script>
    let lineOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: "line",
                name: "Dubai",
                data: [20.2, 21.6, 24.4, 27.9, 31.8, 34.6, 35.8, 35.8, 33.7, 30.7, 26.2, 22.5],
                style: {
                    color: '#98c18a',
                    width: 1,        // 0 - 10
                    dash: 0,         // 0 - 10
                    markerSize: 3,   // 0 - 10
                    fill: 60,        // 0 - 100
                    theme: 'smooth', // straight, smooth, stepline
                    gradient: true,
                    labels: false
                }
            },
            {
                type: "line",
                name: "London",
                data: [5.1, 5.5, 6.6, 8.7, 11.5, 14.4, 16.6, 16, 13.7, 11.2, 8.2, 6.2],
                style: {
                    width: 0,
                    labels: true,
                    labelColor: '#ffb56a',
                    theme: 'straight'
                }
            },
            {
                type: "line",
                name: "Murmansk",
                data: [-11.2, -8, -4.2, 0.3, 5.6, 10.1, 14.7, 12.2, 7.6, 1.6, -2.9, -7.2],
                style: {
                    width: 3,
                    dash: 5,
                    markerSize: 3,
                    fill: 0,
                    theme: 'stepline'
                }
            },
        ],

        options: {
            width: '100%',
            height: 400,

            title: {
                text: "Temperature",
                align: 'left',          // left, right, center
                fontSize  : '14px',
                fontWeight: 'bold',
                fontFamily: '"Segoe UI",Roboto,"Helvetica Neue"',
                color     : '#333',

                description: {
                    text: '2010 year',
                    align: 'left',      // left, right, center
                    fontSize:  '12px',
                    fontWeight:  'normal',
                    fontFamily:  undefined,
                    color:  '#666'
                }
            },

            style: {
                width: 1,             // 0 - 10
                dash: 0,              // 0 - 100
                stacked: false,       // false, true, '100%'
                markerSize: 1,        // 0 - 10
                markerType: 'circle', // circle, square
                fill: 40,             // 0 - 100
                gradient: false,
                theme: 'straight'     // straight, smooth, stepline
            }
        }
    };

    let chartLine = CoreUI.chart.create(lineOptions);
    chartLine.render('chart-line');
</script>
```