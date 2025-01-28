import { BsCurrencyEuro, BsCurrencyPound } from "react-icons/bs";

const Result = () => {
  return (
    <div className="text-slate-300 p-5 bg-slate-900 space-y-4">
      <h2 className="text-xl font-bold text-white">Your results</h2>
      <p>
        Your results are shown below based on the information you provided. to
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>

      <div className="p-5 w-full bg-slate-1000 border-t-4 border-t-lime  rounded-lg">
        <div className="space-y-2 pb-3 border-b  border-slate-500">
          <p className="text-sm">Your monthly respayments</p>
          <span className=" text-lime font-bold flex items-center text-3xl">
            <BsCurrencyPound />
            1,797.74
          </span>
        </div>
        <div className="space-y-2 pt-3">
          <p className="text-sm">Total you'll repay over the term</p>
          <span className=" text-white font-bold flex items-center text-xl">
            <BsCurrencyPound />
            1,797.74
          </span>
        </div>
      </div>
    </div>
  );
};

export default Result;
