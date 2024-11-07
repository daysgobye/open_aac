export const TabGroup = ({ children, className }: { children: string | JSX.Element | React.ReactNode, className?: string }) => {
    return (
        <div role="tablist" className={`tabs tabs-lifted ${className}`}>
            {children}
        </div>
    )
}
type Props = {
    name: string;
    className?: string
    tabClassName?: string
    defaultChecked?: boolean;
    children: string | JSX.Element | React.ReactNode
}
export const Tab = ({ name, defaultChecked, children, className, tabClassName }: Props) => {
    return <>
        <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className={`tab ${tabClassName}`}
            aria-label={name}
            defaultChecked={defaultChecked}
        />
        <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${className}`}>
            {children}
        </div>
    </>
}