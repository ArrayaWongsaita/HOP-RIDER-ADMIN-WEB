import PriceCard, { pricePagkage } from "../components/PriceCard";
import Section from "../components/Section";

export default function PricePlanPage() {
  return (
    <div className="flex flex-col ">
      <Section>Choose your plan</Section>
      <div className="flex flex-col w-full items-center gap-6">
        {pricePagkage.map((plan) => (
          <PriceCard
            key={plan.id}
            month={plan.month}
            price={plan.price}
            avg={plan.avg}
          />
        ))}
      </div>
    </div>
  );
}
