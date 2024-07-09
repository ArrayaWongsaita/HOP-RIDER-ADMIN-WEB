import PriceCard from "../components/PriceCard";
import Section from "../components/Section";

const pricePackage = [
  { id: 1, month: 1, price: "3,000", avg: 100 },
  { id: 2, month: 3, price: "8,900", avg: 99 },
  { id: 3, month: 6, price: "17,600", avg: 97 },
  { id: 4, month: 9, price: "26,000", avg: 96 },
  { id: 5, month: 12, price: "35,000", avg: 95 },
];

export default function PricePlanPage() {
  return (
    <div className="flex flex-col ">
      <Section>Choose your plan</Section>
      <div className="flex flex-col w-full items-center gap-6">
        {pricePackage.map((plan) => (
          <PriceCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
