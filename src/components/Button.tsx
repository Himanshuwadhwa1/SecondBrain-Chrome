import type { ReactNode,ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger"
export type ButtonSize = "small" | "medium" | "large"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};


const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  "primary": "bg-violet-500 hover:bg-violet-600 text-amber-100",
  "secondary": "bg-gray-500 hover:bg-gray-600 text-white",
  "danger": "bg-red-500 hover:bg-red-600 text-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  "small": "px-3 py-1 text-sm",
  "medium": "px-4 py-2 text-base",
  "large": "px-6 py-3 text-lg",
};




const Button = ({
    children,
    variant = "primary",
    size = "medium",
    ...props
}:ButtonProps)=>{
    return (
        <button type="button" 
        className={`cursor-pointer rounded-2xl focus:outline-2 focus:outline-offset-2
         ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`}
        {...props} >
            {children}
        </button>
    )
}
export default Button;