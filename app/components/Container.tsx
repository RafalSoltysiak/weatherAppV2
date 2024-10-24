import { ReactNode } from "react";
import { cn } from "../utils/cn";

type ContainerProps = {
  className: string;
  children: ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
