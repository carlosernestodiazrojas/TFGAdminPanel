import {
    PieChart,
    Pie, Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CustomPieChart = ({
    data,
    colors,
    labelFormat = 'percentage',
    innerRadius = 0
}: {
    data: any[];
    colors: string[];
    labelFormat?: 'percentage' | 'value';
    innerRadius?: number;
}) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage, value }) =>
                    labelFormat === 'percentage'
                        ? `${name}: ${percentage}%`
                        : `${name}: ${value}`
                }
                outerRadius={80}
                innerRadius={innerRadius}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip
                formatter={(value) => [
                    value,
                    labelFormat === 'percentage' ? 'Propiedades' : 'Unidades'
                ]}
            />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

export default CustomPieChart