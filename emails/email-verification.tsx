import { FC } from "react";

interface EmailVerificationProps {
  name: string;
  token: string;
}

export const EmailVerification: FC<Readonly<EmailVerificationProps>> = ({
  name,
  token,
}) => (
  <div>
    {name} {token}
  </div>
);
