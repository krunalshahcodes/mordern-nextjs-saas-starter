import { FC } from "react";

interface ForgotPasswordProps {
  name: string;
  token: string;
}

export const ForgotPassword: FC<Readonly<ForgotPasswordProps>> = ({
  name,
  token,
}) => (
  <div>
    {name} {token}
  </div>
);
