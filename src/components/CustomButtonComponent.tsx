
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; // The type ReactNode allows any valid React content as children
  handleButtonClick: () => void;
}


function ButtonComponent({ children, handleButtonClick }: ButtonProps){
    return (
            <button className="btn btn-primary buttonclass" onClick={handleButtonClick}>{children}</button>
    )
}

export default ButtonComponent