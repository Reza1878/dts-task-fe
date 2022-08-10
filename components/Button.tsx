import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger";
}

function Button(props: Partial<ButtonProps>) {
  const { children, variant, onClick, className, disabled } = props;
  const bgClassName = [];

  switch (variant) {
    case "primary":
      bgClassName.push("bg-primary");
      break;
    case "secondary":
      bgClassName.push("bg-secondary");
      break;
    case "danger":
      bgClassName.push("bg-danger");
      break;
    default:
      bgClassName.push("bg-primary");
      break;
  }
  return (
    <button
      className={clsx(
        "inline-block text-center px-8 py-2 text-white font-medium transition-all cursor-pointer hover:bg-opacity-90 text-base leading-normal",
        bgClassName,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
