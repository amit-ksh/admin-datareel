import { DistributionCard, DistributionItem } from "./shared-components";

export function DistributionCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Project Performance */}
      <DistributionCard title="Top Project">
        {[
          { label: 'Project D', count: 210, width: 65, color: 'bg-purple-500', countColor: 'text-purple-500' },
          { label: 'Project B', count: 156, width: 50, color: 'bg-purple-500', countColor: 'text-purple-500' },
          { label: 'Project C', count: 132, width: 48, color: 'bg-purple-500', countColor: 'text-purple-500' },
          { label: 'Project A', count: 98, width: 40, color: 'bg-purple-500', countColor: 'text-purple-500' },
        ].map((item) => (
          <DistributionItem
            key={item.label}
            label={item.label}
            count={item.count}
            width={item.width}
            barColor={item.color}
            countColor={item.countColor}
          />
        ))}
      </DistributionCard>

      {/* Top Layout Distribution */}
      <DistributionCard title="Top Layout">
        {[
          { label: 'Q2 Layout', count: 124, width: 55, color: 'bg-blue-500', countColor: 'text-blue-500' },
          { label: 'Q4 Layout', count: 89, width: 60, color: 'bg-blue-500', countColor: 'text-blue-500' },
          { label: 'Q3 Layout', count: 65, width: 45, color: 'bg-blue-500', countColor: 'text-blue-500' },
          { label: 'Q1 Layout', count: 42, width: 35, color: 'bg-blue-500', countColor: 'text-blue-500' },
        ].map((item) => (
          <DistributionItem
            key={item.label}
            label={item.label}
            count={item.count}
            width={item.width}
            barColor={item.color}
            countColor={item.countColor}
          />
        ))}
      </DistributionCard>
    </div>
  );
}
