import { LoadingButton as MuiLoadingButton, LoadingButtonProps as MuiLoadingButtonProps } from "@mui/lab";

interface LoadingButtonProps extends MuiLoadingButtonProps {
    children: React.ReactNode
}

export default function LoadingButton({ children, ...others }: LoadingButtonProps) {
    return (
        <MuiLoadingButton
            variant="contained"
            {...others}
        >
            {children}
        </MuiLoadingButton>
    )
}