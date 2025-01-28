import { BsCurrencyPound } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa";

const Form = () => {
  return (
    <div className="p-5 space-y-4">
      <div className="">
        <h2 className="mb-2 text-xl font-bold text-slate-900">
          Mortgage Calculator
        </h2>
        <span className="text-slate-500 underline">Clear All</span>
      </div>
      <form className="space-y-4">
        <div className="w-full space-y-3">
          <label htmlFor="ammount">Mortgage Ammount</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <div className="p-3 bg-slate-100">
              <BsCurrencyPound />
            </div>
            <input
              type="number"
              name="ammount"
              id="ammount"
              className="w-full h-10 font-bold text-slate-900 px-5"
            />
          </div>
        </div>
        <div className="w-full space-y-3">
          <label htmlFor="rate">Motgage Rate</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <input
              type="number"
              name="rate"
              id="rate"
              className="w-full h-10 font-bold text-slate-900 px-5"
            />
            <div className="p-3 bg-slate-100">
              <span className="font-semibold">years</span>
            </div>
          </div>
        </div>
        <div className="w-full space-y-3">
          <label htmlFor="term">Mortgage Term</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <input
              type="number"
              name="term"
              id="term"
              className="w-full h-10 font-bold text-slate-900 px-5"
            />
            <div className="p-3 bg-slate-100">
              <span className="font-semibold">%</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <p>Mortgage Type</p>
          <label
            htmlFor="repayment"
            className="px-5 py-3 flex gap-4 border border-slate-700"
          >
            <input type="radio" name="type" id="repayment" />
            Repayment
          </label>
          <label
            htmlFor="interest-only"
            className="px-5 py-3 flex gap-4 border border-slate-700"
          >
            <input type="radio" name="type" id="interest-only" />
            Interest Only
          </label>
        </div>
        <button className="flex gap-2 font-bold text-slate-900 bg-lime p-3 items-center justify-center w-full rounded-full">
          <FaCalculator />
          Calculate Repayments
        </button>
      </form>
    </div>
  );
};

export default Form;
