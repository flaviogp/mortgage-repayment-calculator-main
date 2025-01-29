import { useState } from "react";
import { BsCurrencyPound } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa";
import { formFieldsType } from "../App";

interface FormProps {
  setFormFields: (data: formFieldsType) => void;
}

type ErrorType = {
  type: string;
  message: string;
};

const Form = ({ setFormFields }: FormProps) => {
  const [checkedField, setCheckedField] = useState<
    "repayment" | "interest-only" | null
  >(null);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [term, setTerm] = useState(0);
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = e.currentTarget.value;
    const maxLength = e.currentTarget.maxLength;

    if (rate.length > maxLength) {
      return (e.currentTarget.value = rate.slice(0, maxLength));
    }
    setRate(Number(rate));
  };
  const handleChangeTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = e.currentTarget.value;
    const maxLength = e.currentTarget.maxLength;

    if (rate.length > maxLength) {
      return (e.currentTarget.value = rate.slice(0, maxLength));
    }
    if (Number(rate) > 100) {
      return setErrors((prev) => [
        ...prev,
        { type: "term", message: "O campo term não pode passar de 100%" },
      ]);
    }
    setTerm(Number(rate));
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setAmount(value);
  };

  const getErrors = () => {
    setErrors([]);
    let error = false;
    if (!amount) {
      setErrors((prev) => [
        ...prev,
        { type: "amount", message: "O campo amount não pode estar vazio!" },
      ]);
      error = true;
    }

    if (!rate) {
      setErrors((prev) => [
        ...prev,
        { type: "rate", message: "O campo rate não pode estar vazio!" },
      ]);
      error = true;
    }

    if (!term) {
      setErrors((prev) => [
        ...prev,
        { type: "term", message: "O campo term não pode estar vazio!" },
      ]);
      error = true;
    }
    if (!checkedField) {
      setErrors((prev) => [
        ...prev,
        { type: "type", message: "Selecione um tipo" },
      ]);
      error = true;
    }

    return error;
  };

  const showErrorMessage = (field: string) => {
    if (errors.length <= 0) return;
    const error = errors.find((err) => err.type === field);

    if (!error) return;

    const message = error.message;
    return <p className="text-red">{message}</p>;
  };

  const handleSetFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (getErrors()) throw new Error("An Error occurred");

    const fields: formFieldsType = {
      amount,
      rate,
      term,
      type: checkedField as "repayment" | "interest-only",
    };
    console.log("send", fields);
    setFormFields(fields);
  };

  const inputStyles = "bg-lime/20 border-2 border-lime";

  return (
    <div className="p-5 space-y-4">
      <div className="">
        <h2 className="mb-2 text-xl font-bold text-slate-900">
          Mortgage Calculator
        </h2>
        <span className="text-slate-500 underline">Clear All</span>
      </div>
      <form className="space-y-4">
        {/* AMOUNT */}
        <div className="w-full space-y-3">
          <label htmlFor="amount">Mortgage Amount</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <div className="px-3 flex items-center bg-slate-100">
              <BsCurrencyPound />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className=" w-full h-10 font-bold text-slate-900 px-5"
              onChange={(e) => handleChangeAmount(e)}
            />
          </div>
          {showErrorMessage("amount")}
        </div>
        {/* RATE */}
        <div className="w-full space-y-3">
          <label htmlFor="rate">Motgage Rate</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <input
              type="number"
              name="rate"
              id="rate"
              maxLength={2}
              className="w-full h-10 font-bold text-slate-900 px-5"
              onChange={(e) => handleChangeRate(e)}
            />
            <div className="px-3 flex items-center bg-slate-100">
              <span className="font-semibold">years</span>
            </div>
          </div>
          {showErrorMessage("rate")}
        </div>
        {/* TERM */}
        <div className="w-full space-y-3">
          <label htmlFor="term">Mortgage Term</label>
          <div className=" border border-slate-700 flex rounded-md overflow-hidden">
            <input
              type="number"
              name="term"
              id="term"
              maxLength={3}
              className="w-full h-10 font-bold text-slate-900 px-5"
              onChange={(e) => handleChangeTerm(e)}
            />
            <div className="px-3 flex items-center bg-slate-100">
              <span className="font-semibold">%</span>
            </div>
          </div>
        </div>
        {showErrorMessage("term")}
        {/* TYPE */}
        <div className="w-full flex flex-col space-y-3">
          <p>Mortgage Type</p>
          <label
            htmlFor="repayment"
            className={`${
              checkedField === "repayment" ? inputStyles : "border-slate-700"
            } px-5 py-3 flex gap-4 border   text-slate-800 font-bold rounded-lg`}
          >
            <input
              onChange={(e) => setCheckedField(e.currentTarget.id)}
              type="radio"
              name="type"
              id="repayment"
              className="radio-styles focus:ring-offset-0  focus:ring-0"
            />
            Repayment
          </label>

          <label
            htmlFor="interest-only"
            className={` ${
              checkedField === "interest-only"
                ? inputStyles
                : "border-slate-700"
            } px-5 py-3 flex items-center gap-4 border rounded-lg  font-bold`}
          >
            <input
              type="radio"
              name="type"
              id="interest-only"
              className="radio-styles focus:ring-offset-0  focus:ring-0"
              onChange={(e) => setCheckedField(e.currentTarget.id)}
            />
            Interest Only
          </label>
        </div>
        {showErrorMessage("type")}
        <button
          className="flex gap-2 font-bold text-slate-900 bg-lime p-3 items-center justify-center w-full rounded-full"
          onClick={(e) => handleSetFields(e)}
        >
          <FaCalculator />
          Calculate Repayments
        </button>
      </form>
    </div>
  );
};

export default Form;
