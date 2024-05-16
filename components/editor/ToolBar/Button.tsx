import { MouseEventHandler, ReactNode, useCallback } from "react";
import classnames from 'classnames';

interface Props {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onMouseDown?: MouseEventHandler<HTMLButtonElement>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
    children,
    active,
    disabled,
    onMouseDown,
    onClick,
}: Props) {

    const getActiveStyle = useCallback((): string => {
        if (active) {
            return "dark:bg-primary dark:text-primary-dark bg-primary-dark text-primary";
        } else {
            return "text-secondary-light bg-secondary-dark";
        }
    }, [active]);

    return (
        <button
            type="button"
            onMouseDown={onMouseDown}
            onClick={onClick}
            className={classnames(
                "p-2 rounded text-lg hover:scale-110 hover:shadow-md transition",
                getActiveStyle()
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
