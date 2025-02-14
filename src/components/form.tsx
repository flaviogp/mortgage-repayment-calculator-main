import { useState } from "react";
import { BsCurrencyPound } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa";
import { formFieldsType } from "../App";

interface FormProps {
  setFormFields: (data: formFieldsType | null) => void;
}

type ErrorType = {
  type: string;
  message: string;
};

const Form = ({ setFormFields }: FormProps) => {
  const [checkedField, setCheckedField] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const inputStyles = "bg-lime/20 border-2 border-lime";
  const errorStyles = "[&>div]:bg-red [&>div]:text-white border border-red";
  const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = e.currentTarget.value;
    const maxLength = e.currentTarget.maxLength;

    if (rate.length > maxLength) {
      return (e.currentTarget.value = rate.slice(0, maxLength));
    }
    setRate(rate);
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
    setTerm(rate);
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
    return <p className="text-red text-sm">{message}</p>;
  };

  const handleSetFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (getErrors()) throw new Error("An Error occurred");

    const fields: formFieldsType = {
      amount,
      rate: Number(rate),
      term: Number(term),
      type: checkedField as "repayment" | "interest-only",
    };
    console.log("send", fields);
    setFormFields(fields);
  };

  const handleClearForm = () => {
    setCheckedField("");
    setAmount("");
    setRate("");
    setTerm("");
    setFormFields(null);
    setErrors([]);
  };

  return (
    <div className="p-5 flex flex-col gap-4 w-full h-full max-w-[500px] md:p-7">
      <div className="">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Mortgage Calculator
        </h2>
        <span
          className="text-slate-500 underline cursor-pointer hover:text-slate-900"
          onClick={handleClearForm}
        >
          Clear All
        </span>
      </div>
      <form className="flex flex-col gap-4  md:h-full md:justify-around">
        {/* AMOUNT */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="amount">Mortgage Amount</label>
          <div
            className={`${
              errors.find((err) => err.type === "amount")
                ? errorStyles
                : " border  border-slate-700 hover:border-slate-900"
            }  flex rounded-md overflow-hidden cursor-pointer `}
          >
            <div className="px-3 flex items-center bg-slate-100">
              <BsCurrencyPound />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              className=" w-full h-10 font-bold text-slate-900 px-5 cursor-pointer"
              onChange={(e) => handleChangeAmount(e)}
            />
          </div>
          {showErrorMessage("amount")}
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center  ">
          {/* TERM */}
          <div className="w-full space-y-3">
            <label htmlFor="term">Motgage Term</label>
            <div
              className={`${
                errors.find((err) => err.type === "term")
                  ? errorStyles
                  : " border  border-slate-700 hover:border-slate-900"
              }  flex rounded-md overflow-hidden cursor-pointer `}
            >
              <input
                type="number"
                name="term"
                id="term"
                maxLength={2}
                value={term}
                className="w-full h-10 font-bold text-slate-900 cursor-pointer px-5"
                onChange={(e) => handleChangeTerm(e)}
              />
              <div className="px-3 flex items-center bg-slate-100">
                <span className="font-semibold">years</span>
              </div>
            </div>
            {showErrorMessage("term")}
          </div>
          {/* RATE */}
          <div className="w-full space-y-3 ">
            <label htmlFor="rate">Mortgage Rate</label>
            <div
              className={`${
                errors.find((err) => err.type === "rate")
                  ? errorStyles
                  : " border  border-slate-700 hover:border-slate-900"
              }  flex rounded-md overflow-hidden cursor-pointer `}
            >
              <input
                type="number"
                name="rate"
                id="rate"
                maxLength={3}
                value={rate}
                className="w-full h-10 font-bold text-slate-900 px-5 cursor-pointer"
                onChange={(e) => handleChangeRate(e)}
              />
              <div className="px-3 flex items-center bg-slate-100">
                <span className="font-semibold">%</span>
              </div>
            </div>
            {showErrorMessage("rate")}
          </div>
        </div>
        {/* TYPE */}
        <div className="w-full flex flex-col gap-3 cursor-pointer">
          <p>Mortgage Type</p>
          <label
            htmlFor="repayment"
            className={`${
              checkedField === "repayment" ? inputStyles : "border-slate-700"
            } px-5 py-3 flex gap-4 border   text-slate-800 font-bold rounded-lg  hover:border-lime cursor-pointer`}
          >
            <input
              onChange={(e) => setCheckedField(e.currentTarget.id)}
              type="radio"
              name="type"
              id="repayment"
              checked={checkedField === "repayment"}
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
            } px-5 py-3 flex items-center gap-3 border rounded-lg  font-bold hover:border-lime cursor-pointer`}
          >
            <input
              type="radio"
              name="type"
              id="interest-only"
              checked={checkedField === "interest-only"}
              className="radio-styles focus:ring-offset-0  focus:ring-0"
              onChange={(e) => setCheckedField(e.currentTarget.id)}
            />
            Interest Only
          </label>
          {showErrorMessage("type")}
        </div>
        <button
          className="flex gap-2 font-bold text-slate-900 bg-lime hover:bg-lime/70 p-3 items-center justify-center w-full rounded-full"
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
