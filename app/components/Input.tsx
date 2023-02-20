import type { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...props} className="p-2 m-2 border w-full" />;
};
