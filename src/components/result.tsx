import { BsCurrencyPound } from "react-icons/bs";
import { formFieldsType } from "../App";
import CalculatorIcon from "../../public/images/illustration-empty.svg";

interface ResultProps {
  formFields?: formFieldsType | null;
}

const Result = ({ formFields }: ResultProps) => {
  const handleGetMonthlyRepayment = () => {
    if (!formFields) return;
    const { amount, rate, term } = formFields;
    const MonthRate = rate / 100 / 12;
    const paymentsCount = term * 12;

    const paymentMounth =
      (Number(amount) * MonthRate * Math.pow(1 + MonthRate, paymentsCount)) /
      (Math.pow(1 + MonthRate, paymentsCount) - 1);

    return paymentMounth.toFixed(2);
  };
  const handleGetTotalRepayment = () => {
    if (!formFields) return;
    const paymentsCount = formFields.term * 12;
    const paymentMounth = Number(handleGetMonthlyRepayment());
    if (!paymentMounth) return;
    const total = paymentMounth * paymentsCount;
    return total.toFixed(2);
  };
  return (
    <div className=" flex items-center justify-center text-slate-300 p-5 bg-slate-900 h-full  md:min-h-[540px]  md:p-7 md:rounded-bl-[100px]">
      {!formFields ? (
        <div className="max-w-[420px] flex flex-col gap-3">
          <div className="w-full h-[250px]">
            <img
              src={CalculatorIcon}
              alt="Calculator image"
              className="w-full h-full"
            />
          </div>

          <h2 className="font-bold text-2xl text-center text-slate-50">
            Results shown here
          </h2>
          <p className="text-center">
            Complete the form and clock "calculate repayment" to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="max-w-[420px] flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-white">Your results</h2>
          <p>
            Your results are shown below based on the information you provided.
            to adjust the results, edit the form and click "calculate
            repayments" again.
          </p>

          <div className="p-7 w-full bg-slate-1000 border-t-4 mt-7 max-w-[420px] border-t-lime  rounded-lg">
            <div className="space-y-2 pb-10 border-b  border-slate-500">
              <p className="text-sm">Your monthly respayments</p>
              <span className=" text-lime font-bold flex items-center text-3xl md:text-5xl">
                <BsCurrencyPound />
                {handleGetMonthlyRepayment()}
              </span>
            </div>
            <div className="space-y-2 pt-7">
              <p className="text-sm">Total you'll repay over the term</p>
              <span className=" text-white font-bold flex items-center text-xl md:text-2xl">
                <BsCurrencyPound />
                {handleGetTotalRepayment()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
