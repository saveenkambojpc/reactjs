import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useChart } from '.';
import Chart from './chart';
import { Typography } from '@mui/material';


// ----------------------------------------------------------------------
type DrawChartProps = {
  title: string,
  subheader: string,
  chart: any,
  height?: number
}

export default function DrawChart({ title, subheader, height = 200, chart, ...other }: DrawChartProps) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i: any[]) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      {title && <CardHeader title={title} />}

      <Box sx={{ p: 1, pb: 1 }}>
        <Typography variant='subtitle2'>{subheader}</Typography>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={height}
        />
      </Box>
    </Card>
  );
}

