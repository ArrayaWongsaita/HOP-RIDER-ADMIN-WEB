const bankPayment = {
  kbank: "KASIKORN COMMERCIAL BANK PUBLIC COMPANY LIMITED",
  scb: "THE SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED",
  ktb: "KRUNG THAI BANK PUBLIC COMPANY LIMITED",
};

const textColor = {
  kbank: "text-pigmentGreen",
  scb: "text-windsor",
  ktb: "text-summerSky",
};

export default function PaymentDetail({ bank = "kbank", text = "kbank" }) {
  return (
    <div
      className={`${textColor[text]} flex flex-col w-[90%] h-[90%] justify-around items-center`}
    >
      <div className="flex flex-col gap-2">
        <div>NAME: HOP DRAG COMPANY</div>
        <div>{bankPayment[bank]}</div>
        <div>0017 WANNASORN BUILDING</div>
        <div>ACCOUNT NO: 012-345678-9</div>
      </div>
      <div>SAVING ACCOUNT</div>
    </div>
  );
}
