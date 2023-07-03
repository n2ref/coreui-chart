document.addEventListener('DOMContentLoaded', function () {

    // Line chart
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


    // Bar chart
    let barOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                type: "bar",
                name: "Net Profit",
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                style: {
                    color: '#74c45c',
                    labelColor: '#79b267',
                    width: 1,        // 0 - 10
                    dash: 0,         // 0 - 10
                    fill: 50,        // 0 - 100
                    labels: true
                }
            },
            {
                type: "bar",
                name: "Revenue",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                style: {
                    width: 0
                }
            },
            {
                type: "bar",
                name: "Free Cash Flow",
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
                style: {
                    width: 2,
                    dash: 5,
                    fill: 0,
                }
            },
        ],
        options: {
            width: '100%',
            height: 300,

            style: {
                width: 1,         // 0 - 10
                dash: 6,          // 0 - 100
                stacked: false,   // false, true, '100%'
                borderRadius: 2,  // 0 - 10
                fill: 70,         // 0 - 100
                theme: 'straight' // straight, smooth, stepline
            }
        }
    };

    let chartBar = CoreUI.chart.create(barOptions);
    chartBar.render('chart-bar');


    // Points chart
    let pointsOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: "points",
                name: "Dubai",
                data: [20.2, 21.6, 24.4, 27.9, 31.8, 34.6, 35.8, 35.8, 33.7, 30.7, 26.2, 22.5],
                style: {
                    color: '#98c18a',
                    markerSize: 3,   // 0 - 10
                    fill: 100,       // 0 - 100
                    theme: 'smooth', // straight, smooth, stepline
                    labels: false
                }
            },
            {
                type: "points",
                name: "London",
                data: [5.1, 5.5, 6.6, 8.7, 11.5, 14.4, 16.6, 16, 13.7, 11.2, 8.2, 6.2],
                style: {
                    labels: true,
                    labelColor: '#ffb56a',
                }
            },
            {
                type: "points",
                name: "Murmansk",
                data: [-11.2, -8, -4.2, 0.3, 5.6, 10.1, 14.7, 12.2, 7.6, 1.6, -2.9, -7.2],
            },
        ],
        options: {
            width: '100%',
            height: 400,

            style: {
                markerSize: 3,        // 0 - 10
                markerType: 'circle', // circle, square
                fill: 100,            // 0 - 100
            }
        }
    };

    let chartPoints = CoreUI.chart.create(pointsOptions);
    chartPoints.render('chart-points');


    // Bar horizontal
    let barHorizontalOptions = {
        labels: [
            'South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan'
        ],
        datasets: [
            {
                type: "bar",
                name: "PRODUCT A",
                data: [44, 55, 41, 37, 22, 43, 21],
                style: {
                    color: '#98c18a',
                    labelColor: '#fff',
                    labels: true,
                    width: 1,        // 0 - 10
                    dash: 0,         // 0 - 10
                    fill: 50,        // 0 - 100
                }
            },
            {
                type: "bar",
                name: "PRODUCT B",
                data: [53, 32, 33, 52, 13, 43, 32],
            },
        ],
        options: {
            type: 'hBar',
            width: '100%',
            height: 500,

            style: {
                width: 1,        // 0 - 10
                dash: 0,         // 0 - 100
                borderRadius: 0, // 0 - 10
                fill: 70,        // 0 - 100
                size: 70,        // 0 - 100
                stacked: false,  // false, true, '100%'
                isFunnel: false,
            }
        }
    };

    let chartBarHorizontal = CoreUI.chart.create(barHorizontalOptions);
    chartBarHorizontal.render('chart-bar-horizontal');


    // Range area
    let rangeAreaOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: "rangeArea",
                name: "Team A Range",
                data: [
                    [3100, 3400], [4200, 5200], [3900, 4900],  [3400, 3900],
                    [5100, 5900], [5400, 6700],  [4300, 4600], [2100, 2900]
                ],
                style: {
                    color: null,
                    labelColor: null,
                    labels: false,
                    width: 0,           // 0 - 10
                    dash: 0,            // 0 - 10
                    markerSize: 0,      // 0 - 10
                    fill: 40,           // 0 - 100
                    theme: 'smooth'     // straight, smooth, stepline
                }
            },
            {
                type: 'rangeArea',
                name: 'Team B Range',
                data: [
                    [1100, 1900], [1200, 1800], [900, 2900], [1400, 2700],
                    [2600, 3900], [500, 1700], [1900, 2300], [1000, 1500],
                ]
            },
            {
                type: 'line',
                name: 'Team A Median',
                data: [ 3300, 4900, 4300, 3700, 5500, 5900, 4500, 2400, 2100, 1500 ],
                style: {
                    dash: 4
                }
            }
        ],
        options: {
            type: 'rangeArea',
            width: '100%',
            height: 350,

            style: {
                labels: false,
                width: 1,            // 0 - 10
                dash: 0,             // 0 - 10
                markerSize: 0,       // 0 - 10
                fill: 40,            // 0 - 100
                theme: 'straight',   // straight, smooth, stepline
                markerType: 'circle' // circle, square
            }
        }
    };

    let chartRangeArea = CoreUI.chart.create(rangeAreaOptions);
    chartRangeArea.render('chart-range-area');


    // Range bars
    let rangeBarsOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                type: "bar",
                name: "Team A Range",
                data: [
                    [200, 3400], [1500, 4500], [2900, 4900],  [2400, 4000],
                    [1800, 5900], [4700, 6700],  [3000, 4600], [1500, 2900]
                ],
                style: {
                    color:       null,
                    labelColor: null,
                    labels: false,
                    width: 0,         // 0 - 10
                    dash: 0,          // 0 - 10
                    fill: 40,         // 0 - 100
                }
            },
            {
                type: 'bar',
                name: 'Team B Range',
                data: [
                    [800, 1900], [1000, 2700], [900, 2900], [1400, 3000],
                    [2600, 4600], [2300, 4100], [1900, 2300], [1000, 1500],
                ]
            }
        ],
        options: {
            type: 'rangeBar',
            width: '100%',
            height: 350,

            style: {
                labels: true,
                horizontal: false,
                width: 1,          // 0 - 10
                dash: 0,           // 0 - 10
                fill: 40,          // 0 - 100
                borderRadius: 3,   // 0 - 100
                size: 70,          // 0 - 100
            }
        }
    };

    let chartRangeBars = CoreUI.chart.create(rangeBarsOptions);
    chartRangeBars.render('chart-range-bars');


    // Candlestick
    let candlestickOptions = {
        datasets: [
            {
                type: "candlestick",
                name: "Candlestick",
                data: [
                    [1538778600000, [6629.81, 6650.5, 6623.04, 6633.33] ],
                    [1538780400000, [6632.01, 6643.59, 6620, 6630.11] ],
                    [1538782200000, [6630.71, 6648.95, 6623.34, 6635.65] ],
                    [1538784000000, [6635.65, 6651, 6629.67, 6638.24] ],
                    [1538785800000, [6638.24, 6640, 6620, 6624.47] ],
                    [1538787600000, [6624.53, 6636.03, 6621.68, 6624.31] ],
                    [1538789400000, [6624.61, 6632.2, 6617, 6626.02] ],
                    [1538791200000, [6627, 6627.62, 6584.22, 6603.02] ],
                    [1538793000000, [6605, 6608.03, 6598.95, 6604.01] ],
                    [1538794800000, [6604.5, 6614.4, 6602.26, 6608.02] ],
                    [1538796600000, [6608.02, 6610.68, 6601.99, 6608.91] ],
                    [1538798400000, [6608.91, 6618.99, 6608.01, 6612] ],
                    [1538800200000, [6612, 6615.13, 6605.09, 6612] ],
                    [1538802000000, [6612, 6624.12, 6608.43, 6622.95] ],
                    [1538803800000, [6623.91, 6623.91, 6615, 6615.67] ],
                    [1538805600000, [6618.69, 6618.74, 6610, 6610.4] ],
                    [1538807400000, [6611, 6622.78, 6610.4, 6614.9] ],
                    [1538809200000, [6614.9, 6626.2, 6613.33, 6623.45] ],
                    [1538811000000, [6623.48, 6627, 6618.38, 6620.35] ],
                    [1538812800000, [6619.43, 6620.35, 6610.05, 6615.53] ],
                    [1538814600000, [6615.53, 6617.93, 6610, 6615.19] ],
                    [1538816400000, [6615.19, 6621.6, 6608.2, 6620] ],
                    [1538818200000, [6619.54, 6625.17, 6614.15, 6620] ]
                ],
                style: {
                    labels: false,
                    labelColor: '#777',
                    width: 1,
                    dash: 0,
                    fill: 60,
                }
            }
        ],
        options: {
            type: 'candlestick',
            width: '100%',
            height: 300,

            axis: {
                xaxis: {
                    type: 'datetime',
                }
            },

            style: {
                colorUpward: '#00B746',
                colorDownward: '#EF403C',
                width: 1,
                dash: 0,
                fill: 50,
            }
        }
    };

    let chartCandlestick = CoreUI.chart.create(candlestickOptions);
    chartCandlestick.render('chart-candlestick');


    // Box
    let boxOptions = {
        labels: [ 'Jan 2015', 'Jan 2016', 'Jan 2017', 'Jan 2018', 'Jan 2019', 'Jan 2020', 'Jan 2021' ],
        datasets: [
            {
                type: "box",
                name: "Box",
                data: [
                    [54, 66, 69, 75, 88],
                    [43, 65, 69, 76, 81],
                    [31, 39, 45, 51, 59],
                    [39, 46, 55, 65, 71],
                    [29, 31, 35, 39, 44],
                    [41, 49, 58, 61, 67],
                    [54, 59, 66, 71, 88]
                ],
                style: {
                    labels: false,
                    labelColor: '#777',
                    width: 1,              // 0 - 10
                    dash: 0,               // 0 - 100
                    fill: 30,              // 0 - 100
                }
            }
        ],
        options: {
            type: 'box',
            width: '100%',
            height: 300,

            style: {
                colorUpper: '#5C4742',
                colorLower: '#A5978B',
                horizontal: false,
                labels: false,
                size:       50,        // 0 - 100
                width: 1,              // 0 - 10
                dash: 0,               // 0 - 100
                fill: 50,              // 0 - 100
            }
        }
    };

    let chartBox = CoreUI.chart.create(boxOptions);
    chartBox.render('chart-box');


    // Pie
    let pieOptions = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [
            {
                type: "pie",
                name: "Pie",
                data: [25, 15, 44, 55, 41, 17]
            }
        ],
        options: {
            type: 'pie',
            width: 400,
            height: 300,

            legend: {
                position: 'right'
            },

            style: {
                labels: true,
                labelColor: '#ffffff',
                startAngle: 0,    // -360 - 360
                endAngle: 360,    // -360 - 360
                size: 50,         // 0 - 100
                fill: 100,        // 0 - 100
            }
        }
    };

    let chartPie = CoreUI.chart.create(pieOptions);
    chartPie.render('chart-pie');


    // Donut
    let donutOptions = {
        labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
        datasets: [
            {
                type: "donut",
                name: "Donut",
                data: [44, 55, 41, 17, 15]
            }
        ],
        options: {
            type: 'pie',
            width: 400,
            height: 300,

            legend: {
                position: 'right'
            },

            style: {
                labels: true,
                labelColor: '#ffffff',
                startAngle: 0,    // -360 - 360
                endAngle: 360,    // -360 - 360
                size: 60,         // 0 - 100
                fill: 100,        // 0 - 100
                total: {
                    label: 'Всего',
                    color: '#333',
                    formatter: function (data) {
                        return data.reduce(function (a, b) { return a + b; });
                    },
                }
            }
        }
    };

    let chartDonut = CoreUI.chart.create(donutOptions);
    chartDonut.render('chart-donut');


    // Radial bar
    let radialBarOptions = {
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        datasets: [
            {
                type: "radialBar",
                name: "Radial Bar",
                data: [44, 55, 67, 83]
            }
        ],
        options: {
            type: 'pie',
            width: 400,
            height: 300,

            legend: {
                position: 'right'
            },

            style: {
                labels: true,
                labelColor: '#ffffff',
                startAngle: -120,  // -360 - 360
                endAngle: 120,     // -360 - 360
                size: 10,          // 0 - 100
                fill: 100,         // 0 - 100
                total: {
                    label: 'Всего',
                    color: '#333',
                    formatter: function (data) {
                        return data.reduce(function (a, b) { return a + b; });
                    },
                }
            }
        }
    };

    let chartRadialBar = CoreUI.chart.create(radialBarOptions);
    chartRadialBar.render('chart-radial-bar');


    // Radar
    let radarOptions = {
        labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        datasets: [
            {
                type: "radar",
                name: "Radial Bar 1",
                data: [4.3, 5.1, 1.0, 1.1, 2.0, 4.6, 6.2, 8.3],
                style: {
                    color: null,
                    labels: false,
                    labelColor: '#ffabab',
                    fill: 40,       // 0 - 100
                    dash: 3,        // 0 - 10
                    markerSize: 5,  // 0 - 10
                }
            },
            {
                type: "radar",
                name: "Radial Bar 2",
                data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3]
            }
        ],
        options: {
            type: 'radar',
            width: 400,
            height: 300,

            legend: {
                position: 'top',
                horizontalAlign: 'center',
            },

            style: {
                labels: false,
                fill: 25,         // 0 - 100
                dash: 0,          // 0 - 10
                markerSize: 3,    // 0 - 10
            }
        }
    };

    let chartRadar = CoreUI.chart.create(radarOptions);
    chartRadar.render('chart-radar');


    // Polar Area
    let polarAreaOptions = {
        datasets: [
            {
                type: "polarArea",
                name: "Radial Bar 1",
                data: [14, 23, 21, 17, 15, 10, 12, 17, 21]
            }
        ],
        options: {
            type: 'polarArea',
            width: 400,
            height: 300,

            legend: {
                position: 'left'
            },

            style: {
                labels: false,
                labelColor: '#c981c9',
                fill: 70, // 0 - 100
            }
        }
    };

    let chartPolarArea = CoreUI.chart.create(polarAreaOptions);
    chartPolarArea.render('chart-polar-area');



    // Mixed chart
    let mixedOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: "bar",
                name: "Website Blog",
                data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
                style: {
                    fill: 40, // 0 - 10
                }
            },
            {
                type: "line",
                name: "Social Media",
                data: [230, 420, 350, 270, 430, 220, 170, 310, 220, 220, 120, 160],
                style: {
                    width: 3,        // 0 - 10
                    dash: 0,         // 0 - 10
                    markerSize: 3,   // 0 - 10
                    fill: 10,        // 0 - 100
                    theme: 'smooth', // straight, smooth, stepline
                    labels: true,
                    labelColor: '#ffb56a',
                }
            },
            {
                type: "points",
                name: "Video",
                data: [300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390, 450],
                style: {
                    markerSize: 6, // 0 - 10
                }
            },
        ],
        options: {
            type: 'line',
            width: '100%',
            height: 400,

            enabled: {
                legend: false
            },

            style: {
                width: 1,             // 0 - 10
                dash: 0,              // 0 - 100
                stacked: false,       // false, true, '100%'
                markerSize: 1,        // 0 - 10
                markerType: 'circle', // circle, square
                fill: 100,             // 0 - 100
                gradient: false,
                theme: 'straight'     // straight, smooth, stepline
            }
        }
    };

    let chartMixed = CoreUI.chart.create(mixedOptions);
    chartMixed.render('chart-mixed');



    // Stacked
    let stackedOptions = {
        labels: [ '01/01/2011', '01/02/2011', '01/03/2011', '01/04/2011', '01/05/2011', '01/06/2011' ],
        datasets: [
            { type: "bar", name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43] },
            { type: "bar", name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27] },
            { type: "bar", name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14] },
            { type: "bar", name: "PRODUCT D", data: [21, 7, 25, 13, 22, 8] },
        ],
        options: {
            width: '100%',
            height: 400,

            legend: {
                horizontalAlign: 'center'
            },

            style: {
                stacked: true,         // false, true, '100%'
                labels: true,          // false, true, '100%'
                fill: 80,              // 0 - 100
                borderRadius: 4,       // 0 - 10
                labelColor: '#6e4cb6',
                labelTotal: true
            }
        }
    };

    let chartStacked = CoreUI.chart.create(stackedOptions);
    chartStacked.render('chart-stacked');


    // Stacked 100%
    let stacked100Options = {
        labels: [ '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018' ],
        datasets: [
            { type: "bar", name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43, 21, 49] },
            { type: "bar", name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27, 33, 12] },
            { type: "bar", name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14, 15, 13] },
        ],
        options: {
            width: '100%',
            height: 400,

            legend: {
                horizontalAlign: 'center'
            },

            style: {
                stacked: '100%',      // false, true, '100%'
                fill: 80,             // 0 - 100
                labels: true,
                labelColor: '#801b53'
            }
        }
    };

    let chartStacked100 = CoreUI.chart.create(stacked100Options);
    chartStacked100.render('chart-stacked-100');



    // Annotations
    let annotationsOptions = {
        labels: [
            '13 Nov 2017', '14 Nov 2017', '15 Nov 2017', '16 Nov 2017', '17 Nov 2017',
            '20 Nov 2017', '21 Nov 2017', '22 Nov 2017', '23 Nov 2017', '24 Nov 2017',
            '27 Nov 2017', '28 Nov 2017', '29 Nov 2017', '30 Nov 2017', '01 Dec 2017',
            '04 Dec 2017', '05 Dec 2017', '06 Dec 2017', '07 Dec 2017', '08 Dec 2017'
        ],
        datasets: [
            {
                type: "line",
                name: "Line",
                data: [
                    8107.85, 8128, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5,
                    8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3,
                    8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85
                ],
                style: {
                    width: 4,
                    fill: 0,
                }
            }
        ],
        annotations: [
            {
                type: "yLine", // yLine, xLine, point
                y: 8200,
                y2: null,
                text: 'Support',
                style: {
                    fillColor: '#c2c2c2',
                    borderColor: '#00E396',
                    opacity: 0.3,   // 0 - 1
                    dash: 5,        // 0 - 100
                    label: {
                        color: "#fff",
                        background: '#00E396',
                        borderColor: '#00a46c',
                        borderWidth: 1,            // 0 - 10
                        align: 'right',            // right, left
                        offsetY: -3,
                        offsetX: 0,
                    },
                },
                events: {
                    mouseEnter: function (annotation) { console.log('mouseEnter') },
                    mouseLeave: function (annotation) { console.log('mouseLeave') },
                    click:      function (annotation) { console.log('click') },
                }
            },
            {
                type: "yLine", // yLine, xLine, point
                y: 8600,
                y2: 9000,
                text: 'Y-axis range',
                style: {
                    fillColor: '#ffcf72',
                    borderColor: '#000',
                    opacity: 0.25,
                    label: {
                        color: "#333",
                        background: '#ffcf72',
                        borderColor: '#333',
                        borderWidth: 1,
                        align: 'right', // right, left
                        offsetY: 0,
                        offsetX: 0,
                    },
                }
            },
            {
                type: "xLine",      // yLine, xLine, point
                x: new Date('23 Nov 2017').getTime(),
                text: 'Anno Test',
                style: {
                    borderColor: '#775DD0',
                    dash: 0,
                    label: {
                        color: '#fff',
                        borderColor: '#775DD0',
                        background: '#775DD0',
                        orientation: 'horizontal', // horizontal, vertical
                        offsetY: 0,
                        offsetX: 0,
                    }
                }
            },
            {
                type: "xLine",           // yLine, xLine, point
                x:  new Date('26 Nov 2017').getTime(),
                x2: new Date('28 Nov 2017').getTime(),
                text: 'X-axis range',
                style: {
                    fillColor: '#B3F7CA',
                    borderColor: '#11a43e',
                    label: {
                        color: '#fff',
                        borderColor: '#B3F7CA',
                        background: '#00E396',
                        offsetY: -10,
                    }
                }
            },
            {
                type: "point",           // yLine, xLine, point
                x: new Date('01 Dec 2017').getTime(),
                y: 8607.55,
                text: 'Point Annotation',
                style: {
                    size: 8,
                    fillColor: '#fff',
                    borderColor: '#f00',
                    borderWidth: 2,
                    label: {
                        color: '#fff',
                        borderColor: '#FF4560',
                        background: '#FF4560',
                        offsetY: 0,
                        offsetX: 0,
                    }
                }
            },
            {
                type: "point",           // yLine, xLine, point
                x: new Date('08 Dec 2017').getTime(),
                y: 9340.85,
                style: {
                    imagePath: '../data/img/ico-instagram.png'
                }
            }
        ],
        options: {
            width: '100%',
            height: 400,

            axis: {
                xaxis: {
                    type: 'datetime',
                },
            }
        }
    };

    let chartAnnotations = CoreUI.chart.create(annotationsOptions);
    chartAnnotations.render('chart-annotations');

    $('#btn-add-annotation').click(function () {
        let annotations = chartAnnotations.getAnnotations();
        if (annotations.length > 8) {
            return;
        }

        let day = 15 + (annotations.length - 6);

        chartAnnotations.addAnnotation({
            id: "event_" + day,
            type: "xLine",
            x: new Date(day + ' Nov 2017').getTime(),
            text: 'Event',
            style: {
                borderColor: '#d0b55d',
                dash: 0,
                label: {
                    color: '#fff',
                    borderColor: '#d0b55d',
                    background: '#d0b55d'
                }
            }
        });

    });

    $('#btn-remove-annotation').click(function () {
        let annotations = chartAnnotations.getAnnotations();
        if (annotations.length <= 6) {
            return;
        }

        let day = 15 + (annotations.length - 7);

        chartAnnotations.removeAnnotation("event_" + day);
    });


    // Load data
    let loadDataOptions = {
        options: {
            width: '100%',
            height: 300,
            dataUrl: 'data/chart-data.json',

            enabled: {
                preloader: true
            },

            axis: {
                xaxis: {
                    type: 'datetime',
                }
            }
        }
    };

    let chartLoadData = CoreUI.chart.create(loadDataOptions);
    chartLoadData.render('chart-load-data');

    $('#btn-load-data').click(function () {
        chartLoadData.loadData('data/chart-data.json');
    });

    // Toolbar
    let toolbarOptions = {

        datasets: [
            {
                type: "line",
                name: "Line",
                data: [
                    [1327359600000,30.95], [1327446000000,31.34], [1327532400000,31.18], [1327618800000,31.05],
                    [1327878000000,31.00], [1327964400000,30.95], [1328050800000,31.24], [1328137200000,31.29],
                    [1328223600000,31.85], [1328482800000,31.86], [1328569200000,32.28], [1328655600000,32.10],
                    [1328742000000,32.65], [1328828400000,32.21], [1329087600000,32.35], [1329174000000,32.44],
                    [1329260400000,32.46], [1329346800000,32.86], [1329433200000,32.75], [1329778800000,32.54],
                    [1329865200000,32.33], [1329951600000,32.97], [1330038000000,33.41], [1330297200000,33.27],
                    [1330383600000,33.27], [1330470000000,32.89], [1330556400000,33.10], [1330642800000,33.73],
                    [1330902000000,33.22], [1330988400000,31.99], [1331074800000,32.41], [1331161200000,33.05],
                    [1331247600000,33.64], [1331506800000,33.56], [1331593200000,34.22], [1331679600000,33.77],
                    [1331766000000,34.17], [1331852400000,33.82], [1332111600000,34.51], [1332198000000,33.16],
                    [1332284400000,33.56], [1332370800000,33.71], [1332457200000,33.81], [1332712800000,34.40],
                    [1332799200000,34.63], [1332885600000,34.46], [1332972000000,34.48], [1333058400000,34.31],
                    [1333317600000,34.70], [1333404000000,34.31], [1333490400000,33.46], [1333576800000,33.59],
                    [1333922400000,33.22], [1334008800000,32.61], [1334095200000,33.01], [1334181600000,33.55],
                    [1334268000000,33.18], [1334527200000,32.84], [1334613600000,33.84], [1334700000000,33.39],
                    [1334786400000,32.91], [1334872800000,33.06], [1335132000000,32.62], [1335218400000,32.40],
                    [1335304800000,33.13], [1335391200000,33.26], [1335477600000,33.58], [1335736800000,33.55],
                    [1335823200000,33.77], [1335909600000,33.76], [1335996000000,33.32], [1336082400000,32.61],
                    [1336341600000,32.52], [1336428000000,32.67], [1336514400000,32.52], [1336600800000,31.92],
                    [1336687200000,32.20], [1336946400000,32.23], [1337032800000,32.33], [1337119200000,32.36],
                    [1337205600000,32.01], [1337292000000,31.31], [1337551200000,32.01], [1337637600000,32.01],
                    [1337724000000,32.18], [1337810400000,31.54], [1337896800000,31.60], [1338242400000,32.05],
                    [1338328800000,31.29], [1338415200000,31.05], [1338501600000,29.82], [1338760800000,30.31],
                    [1338847200000,30.70], [1338933600000,31.69], [1339020000000,31.32], [1339106400000,31.65],
                    [1339365600000,31.13], [1339452000000,31.77], [1339538400000,31.79], [1339624800000,31.67],
                    [1339711200000,32.39], [1339970400000,32.63], [1340056800000,32.89], [1340143200000,31.99],
                    [1340229600000,31.23], [1340316000000,31.57], [1340575200000,30.84], [1340661600000,31.07],
                    [1340748000000,31.41], [1340834400000,31.17], [1340920800000,32.37], [1341180000000,32.19],
                    [1341266400000,32.51], [1341439200000,32.53], [1341525600000,31.37], [1341784800000,30.43],
                    [1341871200000,30.44], [1341957600000,30.20], [1342044000000,30.14], [1342130400000,30.65],
                    [1342389600000,30.40], [1342476000000,30.65], [1342562400000,31.43], [1342648800000,31.89],
                    [1342735200000,31.38], [1342994400000,30.64], [1343080800000,30.02], [1343167200000,30.33],
                    [1343253600000,30.95], [1343340000000,31.89], [1343599200000,31.01], [1343685600000,30.88],
                    [1343772000000,30.69], [1343858400000,30.58], [1343944800000,32.02], [1344204000000,32.14],
                    [1344290400000,32.37], [1344463200000,32.65], [1344549600000,32.64], [1344808800000,32.27],
                    [1344981600000,32.91], [1345068000000,33.65], [1345154400000,33.80], [1345413600000,33.92],
                    [1345500000000,33.75], [1345586400000,33.84], [1345672800000,33.50], [1346018400000,32.32],
                    [1346104800000,32.06], [1346191200000,31.96], [1346277600000,31.46], [1346364000000,31.27],
                    [1346709600000,31.43], [1346796000000,32.26], [1346882400000,32.79], [1346968800000,32.46],
                    [1347228000000,32.13], [1347314400000,32.43], [1347400800000,32.42], [1347487200000,32.81],
                    [1347573600000,33.34], [1347832800000,33.41], [1347919200000,32.57], [1348005600000,33.12],
                    [1348092000000,34.53], [1348178400000,33.83], [1348437600000,33.41], [1348524000000,32.90],
                    [1348610400000,32.53], [1348696800000,32.80], [1348783200000,32.44], [1349042400000,32.62],
                    [1349128800000,32.57], [1349215200000,32.60], [1349301600000,32.68], [1349388000000,32.47],
                    [1349647200000,32.23], [1349733600000,31.68], [1349820000000,31.51], [1349906400000,31.78],
                    [1349992800000,31.94], [1350252000000,32.33], [1350338400000,33.24], [1350424800000,33.44],
                    [1350511200000,33.48], [1350597600000,33.24], [1350856800000,33.49], [1350943200000,33.31],
                    [1351029600000,33.36], [1351116000000,33.40], [1351202400000,34.01], [1351638000000,34.02],
                    [1351724400000,34.36], [1351810800000,34.39], [1352070000000,34.24], [1352156400000,34.39],
                    [1352242800000,33.47], [1352329200000,32.98], [1352415600000,32.90], [1352674800000,32.70],
                    [1352761200000,32.54], [1352847600000,32.23], [1352934000000,32.64], [1353020400000,32.65],
                    [1353279600000,32.92], [1353366000000,32.64], [1353452400000,32.84], [1353625200000,33.40],
                    [1353884400000,33.30], [1353970800000,33.18], [1354057200000,33.88], [1354143600000,34.09],
                    [1354230000000,34.61], [1354489200000,34.70], [1354575600000,35.30], [1354662000000,35.40],
                    [1354748400000,35.14], [1354834800000,35.48], [1355094000000,35.75], [1355180400000,35.54],
                    [1355266800000,35.96], [1355353200000,35.53], [1355439600000,37.56], [1355698800000,37.42],
                    [1355785200000,37.49], [1355871600000,38.09], [1355958000000,37.87], [1356044400000,37.71],
                    [1356303600000,37.53], [1356476400000,37.55], [1356562800000,37.30], [1356649200000,36.90],
                    [1356908400000,37.68], [1357081200000,38.34], [1357167600000,37.75], [1357254000000,38.13],
                    [1357513200000,37.94], [1357599600000,38.14], [1357686000000,38.66], [1357772400000,38.62],
                    [1357858800000,38.09], [1358118000000,38.16], [1358204400000,38.15], [1358290800000,37.88],
                    [1358377200000,37.73], [1358463600000,37.98], [1358809200000,37.95], [1358895600000,38.25],
                    [1358982000000,38.10], [1359068400000,38.32], [1359327600000,38.24], [1359414000000,38.52],
                    [1359500400000,37.94], [1359586800000,37.83], [1359673200000,38.34], [1359932400000,38.10],
                    [1360018800000,38.51], [1360105200000,38.40], [1360191600000,38.07], [1360278000000,39.12],
                    [1360537200000,38.64], [1360623600000,38.89], [1360710000000,38.81], [1360796400000,38.61],
                    [1360882800000,38.63], [1361228400000,38.99], [1361314800000,38.77], [1361401200000,38.34],
                    [1361487600000,38.55], [1361746800000,38.11], [1361833200000,38.59], [1361919600000,39.60],
                ],
            },
        ],
        options: {
            lang: 'ru',
            width: '100%',
            height: 300,

            axis: {
                xaxis: {
                    type: 'datetime',
                }
            },

            enabled: {
                zoom: true,
                toolbar: true,
            }
        }
    };

    let chartToolbar = CoreUI.chart.create(toolbarOptions);
    chartToolbar.render('chart-toolbar');


    // Update chart
    let updateOptions = {
        options: {
            width: '100%',
            height: 300,

            axis: {
                xaxis: {
                    type: 'numeric',
                },
            },

            enabled: {
                animations: true
            },

            style: {
                stacked: true,   // false, true, '100%'
                theme: 'smooth', // straight, smooth, stepline
            }
        }
    };

    let chartUpdate = CoreUI.chart.create(updateOptions);
    chartUpdate.render('chart-update');

    $('#btn-add-dataset').click(function () {
        let datasets = chartUpdate.getDatasets();

        if (datasets.length === 0) {
            chartUpdate.addDatasets([{
                type: "line",
                name: "Line",
                data: [ 21, 11, 14, 11, 16, 22, 29, 22, 15, 16, 15, 30, 27, 19, 13, 23, 16, 23, 22, 26 ],
                style: {
                    width: 1,        // 0 - 10
                    fill: 60,        // 0 - 100
                    theme: 'smooth', // straight, smooth, stepline
                    gradient: true,
                }
            }])
        }

        if (datasets.length === 1) {
            chartUpdate.addDatasets([{
                type: "line",
                name: "Line 2",
                data: [ 15, 20, 13, 18, 19, 18, 16, 19, 15, 13, 13, 13, 14, 16, 17, 10, 15, 15, 10, 17 ],
                style: {
                    dash: 4,       // 0 - 100
                    markerSize: 3, // 0 - 10
                }
            }])
        }

        if (datasets.length === 2) {
            chartUpdate.addDatasets([{
                type: "line",
                name: "Line 3",
                data: [ 12, 12, 15, 10, 12, 11, 12, 11, 12, 14, 15, 10, 12, 14, 13, 10, 12, 10, 14, 12 ]
            }])
        }
    });

    $('#btn-remove-dataset').click(function () {
        let datasets = chartUpdate.getDatasets();

        if (datasets.length === 3) {
            chartUpdate.removeDataset("Line 3");
        }

        if (datasets.length === 2) {
            chartUpdate.removeDataset("Line 2");
        }

        if (datasets.length === 1) {
            chartUpdate.removeDataset("Line");
        }
    });


    // Events
    let eventsOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                type: "bar",
                name: "Bar",
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                type: "line",
                name: "Line",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                style: {
                    fill: 0
                }
            },
        ],
        options: {
            width: '100%',
            height: 300,

            enabled: {
                zoom: true,
                toolbar: true,
            },

            title: {
                text: 'MarkerClick, LegendClick, Zoomed',
            },

            events: {
                markerClick: function(event, chartContext, marker) {
                    alert('markerClick: pointIndex - ' + marker.dataPointIndex + ' seriesIndex - ' + marker.seriesIndex);
                },
                legendClick: function(chartContext, seriesIndex) {
                    alert('legendClick: seriesIndex - ' + seriesIndex);
                },
                zoomed: function(chartContext, axis) {
                    alert('zoomed: ' + JSON.stringify(axis));
                },
            }
        }
    };

    let chartEvents = CoreUI.chart.create(eventsOptions);
    chartEvents.render('chart-events');



    // Grid
    let gridOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                type: "line",
                name: "Line",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                style: {
                    fill: 0
                }
            },
        ],
        options: {
            width: '100%',
            height: 300,

            axis: {
                xaxis: {
                    show: true,
                    title: 'Bytes Received',
                    type: 'category',   // category, datetime, numeric
                    position: 'bottom', // top
                    border: true,
                    color: '#30be90',
                },
                yaxis: {
                    show: true,
                    title: 'Bytes Received',
                    position: 'left', // right
                    border: true,
                    color: '#6a36b7',
                    min: 70,
                    max: 130
                },
                grid: {
                    show: true,
                    xLines: true,
                    yLines: true,
                    color: '#ebf1ff',
                    dash: 15,
                }
            },
        }
    };

    let chartGrid = CoreUI.chart.create(gridOptions);
    chartGrid.render('chart-grid');


    // Missing
    let missingOptions = {
        datasets: [
            {
                type: "line",
                name: "Line",
                data: [
                    null, 44, 31, 38, null, 32, 55, 51, 67, 22, 34, null,
                    null, 11, 4, 15, null, 9, 34, null, null, 13, null
                ]
            },
        ],
        options: {
            width: '100%',
            height: 300,

            tooltip: {
                mode: 'single'
            },

            style: {
                markerSize: 4, // 0 - 10
            }
        }
    };

    let chartMissing = CoreUI.chart.create(missingOptions);
    chartMissing.render('chart-missing');



    // Theme
    let themeOptions = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                type: "line",
                name: "Line",
                data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
                type: "line",
                name: "Line 2",
                data: [11, 32, 45, 32, 34, 52, 41]
            },
        ],
        options: {
            width: '100%',
            height: 300,

            enabled: {
                animations: true,
            },

            theme: {
                mode: 'dark',                  // light, dark
                colorScheme: 'monochrome',     // mpn65, classic, monochrome // http://google.github.io/palette.js/
                monochromeColor: '#278aee',
                background: null,              // #fff
            },

            style: {
                theme: 'smooth',
            }
        }
    };

    let chartTheme = CoreUI.chart.create(themeOptions);
    chartTheme.render('chart-theme');



    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});