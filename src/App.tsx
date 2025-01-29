import { useState } from "react";
import Container from "./components/container";
import Form from "./components/form";
import Result from "./components/result";

export type formFieldsType = {
  amount: number;
  rate: number;
  term: number;
  type: "repayment" | "interest-only";
};

function App() {
  const [formFields, setFormFields] = useState<formFieldsType | null>(null);

  return (
    <>
      <Container>
        <Form setFormFields={setFormFields} />
        <Result formFields={formFields} />
      </Container>
    </>
  );
}

export default App;
