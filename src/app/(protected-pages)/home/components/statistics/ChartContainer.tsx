const ChartContainer = ({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);

export default ChartContainer