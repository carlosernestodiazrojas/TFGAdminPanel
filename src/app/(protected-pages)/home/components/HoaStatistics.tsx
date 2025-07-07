import { HoaSummary } from '@/@types/hoa';

import StatCard from './statistics/StatCard';
import RadialProgressChart from './statistics/RadialProgressChart';
import ChartContainer from './statistics/ChartContainer';
import ServicesBarChart from './statistics/ServicesBarChart';
import CustomPieChart from './statistics/CustomPieChart';

export const HoaStatistics = ({ data }: { data: HoaSummary }) => {

  const servicesData = [
    {
      name: 'Trasteros',
      count: data.storage_room.count,
      percentage: data.storage_room.percentage
    },
    {
      name: 'Plazas de Garaje',
      count: data.parking_space.count,
      percentage: data.parking_space.percentage
    },
    {
      name: 'Al Corriente de Pagos',
      count: data.current_on_payments.count,
      percentage: data.current_on_payments.percentage
    }
  ];

  const propertyTypesData = [
    {
      name: 'Interior',
      value: data.property_types.interior.count,
      percentage: data.property_types.interior.percentage
    },
    {
      name: 'Ático',
      value: data.property_types.atico.count,
      percentage: data.property_types.atico.percentage
    },
    {
      name: 'Bajo',
      value: data.property_types.bajo.count,
      percentage: data.property_types.bajo.percentage
    },
    {
      name: 'Exterior',
      value: data.property_types.exterior.count,
      percentage: data.property_types.exterior.percentage
    },
    {
      name: 'Local',
      value: data.property_types.local.count,
      percentage: data.property_types.local.percentage
    }
  ].filter(item => item.value > 0);

  const servicesOnlyData = [
    {
      name: 'Trasteros',
      value: data.storage_room.count
    },
    {
      name: 'Plazas de Garaje',
      value: data.parking_space.count
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const SERVICE_COLORS = ['#3B82F6', '#10B981'];

  return (
    <div className="w-full space-y-8 mt-8">

      <div className="bg-white rounded-lg shadow-lg p-6 border border-primary/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de propiedades</h2>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">{data.total_properties}</div>
          <div className="text-gray-600">Total de Propiedades</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer title="Servicios y pagos">
          <ServicesBarChart data={servicesData} />
        </ChartContainer>

        <ChartContainer title="Tipos de propiedades">
          <CustomPieChart
            data={propertyTypesData}
            colors={COLORS}
            labelFormat="percentage"
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer title="Distribución de Servicios">
          <CustomPieChart
            data={servicesOnlyData}
            colors={SERVICE_COLORS}
            labelFormat="value"
            innerRadius={40}
          />
        </ChartContainer>

        <ChartContainer title="Estado de Pagos">
          <div className="flex justify-center items-center h-[300px]">
            <RadialProgressChart
              percentage={data.current_on_payments.percentage}
              label="Al Corriente"
            />
          </div>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Con trastero"
          count={data.storage_room.count}
          percentage={data.storage_room.percentage}
          colorClass="text-blue-600"
        />

        <StatCard
          title="Con plaza de garaje"
          count={data.parking_space.count}
          percentage={data.parking_space.percentage}
          colorClass="text-green-600"
        />

        <StatCard
          title="Al corriente de pago"
          count={data.current_on_payments.count}
          percentage={data.current_on_payments.percentage}
          colorClass="text-emerald-600"
        />
      </div>
    </div>
  );
};