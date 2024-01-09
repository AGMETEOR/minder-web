import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

type ModalProps = {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactElement;
    primaryFunc: () => void;
    secondaryFunc: () => void;
}

const Modal = (props: ModalProps) => {
    const {title, open, onClose, children, primaryFunc, secondaryFunc} = props;
    useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden';
        }
        return () => {
          document.body.style.overflow = 'scroll';
        };
      }, [open]);
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors z-50 h-full max-h-full ${open ? 'visible bg-black/20' : 'invisible'}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 transition-all w-auto ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>
            <div className='flex justify-between items-center py-4 px-3 sticky top-0'>
                <h2>{title}</h2>
            <div onClick={onClose} className='rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer'>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            </div>
            <div className='overflow-x-hidden overflow-y-scroll max-h-[calc(50vh-50px)] min-w-[500px] pb-[32px] px-3'>
            {children}
            </div>
            <div className='flex justify-end py-4 mt-6'>
                <button onClick={secondaryFunc} className="bg-red-500 text-white active:bg-pink-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Cancel</button>
                <button onClick={primaryFunc} className="bg-pink-500 text-white active:bg-pink-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Action</button>
            </div>
            </div>
        </div>
    )
}

export default Modal;