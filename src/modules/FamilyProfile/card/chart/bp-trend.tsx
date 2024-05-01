import { DrawChart } from "../../../../components/chart"

export default function BPTrendChart() {
    return (
        <DrawChart
            title=""
            subheader="BP Trend"
            height={120}
            chart={{
                labels: [
                    '02/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',

                ],
                series: [
                    {
                        name: 'Systolic',
                        type: 'area',
                        fill: 'gradient',
                        data: [30, 29, 31, 28, 23],
                    },
                    {
                        name: 'Diastolic',
                        type: 'area',
                        fill: 'gradient',
                        data: [12, 13, 12, 14, 12],
                    },
                ],
            }}
        />
    )
}