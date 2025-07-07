
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const ServicesBarChart = ({ data }: { data: any[] }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                formatter={(value: any, name: string) => {
                    if (name === 'count') return [value, 'Cantidad'];
                    if (name === 'percentage') return [`${value}%`, 'Porcentaje'];
                    return [value, name];
                }}
            />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" name="Cantidad" />
            <Bar dataKey="percentage" fill="#10B981" name="Porcentaje %" />
        </BarChart>
    </ResponsiveContainer>
);

export default ServicesBarChart