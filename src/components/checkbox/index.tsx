import { FC, InputHTMLAttributes } from "react";

import { Container } from "./styles";

type CheckBoxProps = {
  title: string;
  onChange: (e: InputHTMLAttributes<HTMLInputElement>) => void;
};

export const CheckBox: FC<CheckBoxProps> = ({ title, onChange }) => (
  <Container>
    <div className="checkbox-wrapper-13">
      <input id="c1-13" type="checkbox" onChange={onChange} />
      <label htmlFor="c1-13">{title}</label>
    </div>
  </Container>
)
