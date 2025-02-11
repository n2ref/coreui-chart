
import Chart from "./js/chart";

import TypePie from './js/types/pie';
import TypeLine from './js/types/line';
import TypeBox from './js/types/box';
import TypeHBar from './js/types/hBar';
import TypeRadar from './js/types/radar';
import TypeCandlestick from './js/types/candlestick';
import TypePolarArea from './js/types/polarArea';
import TypeRangeArea from './js/types/rangeArea';
import TypeRangeBar from './js/types/rangeBar';

import langEn from './js/lang/en.js';
import langRu from './js/lang/ru.js';


Chart.type.pie = TypePie;
Chart.type.line = TypeLine;
Chart.type.box = TypeBox;
Chart.type.hBar = TypeHBar;
Chart.type.radar = TypeRadar;
Chart.type.candlestick = TypeCandlestick;
Chart.type.polarArea = TypePolarArea;
Chart.type.rangeArea = TypeRangeArea;
Chart.type.rangeBar = TypeRangeBar;

Chart.type.en = langEn;
Chart.type.ru = langRu;

export default Chart;