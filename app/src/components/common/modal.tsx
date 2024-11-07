import { useEffect, useRef } from "react";

type Props = {
    title: string
    className?: string
    children: string | JSX.Element | React.ReactNode
    openModal?: boolean
    closeModal: () => void
}
const Modal = ({ children, className, title, openModal, closeModal }: Props) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
        const dialogElement = ref.current

        const handleClickOutside = (event: MouseEvent) => {
            if (event.target === dialogElement) {
                dialogElement?.close()
            }
        }

        dialogElement?.addEventListener('click', handleClickOutside)

        return () => {
            dialogElement?.removeEventListener('click', handleClickOutside)
        }
    }, [openModal]);
    return (<dialog
        ref={ref}
        onCancel={closeModal}
        className="modal modal-bottom sm:modal-middle"
        onClose={closeModal}
    >
        <div className={`modal-box ${className}`}>
            <h3 className="font-bold text-lg">{title}</h3>
            {children}
            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>)
}
export default Modal