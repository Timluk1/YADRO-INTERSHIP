import { PropsWithChildren } from "react"

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
            {children}
        </div>
    )
}
