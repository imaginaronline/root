import { ReactNode } from 'react';
import closeButton from '../assets/close_btn.png';

interface ModalProps {
    children: ReactNode; // The type ReactNode allows any valid React content as children
    show: boolean;
    handleClose: () => void;
    
}

function ModalPopupComponent({ children, show, handleClose }: ModalProps) {
    return (
        <div id="share" className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex={-1} role="dialog">
            <div className="modal-content share terms">
                <div className="close" onClick={handleClose}>
                    <img src={closeButton} alt="close_btn" />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalPopupComponent;