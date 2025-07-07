const StatCard = ({
    title,
    count,
    percentage,
    colorClass = 'text-blue-600'
}: {
    title: string;
    count: number;
    percentage?: number;
    colorClass?: string;
}) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
            {percentage && (
                <div className={`text-sm font-semibold ${colorClass}`}>
                    {percentage}%
                </div>
            )}
        </div>
    </div>
);

export default StatCard