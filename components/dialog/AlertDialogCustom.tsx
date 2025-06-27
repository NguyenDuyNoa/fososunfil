import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay
} from "@/components/ui/alert-dialog";
import LogoutComponent from "@/features/auth/components/logout-card";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { X } from "lucide-react";

type Props = {}

const AlertDialogCustom = (props: Props) => {
    // const { onSubmitLogout, isLoading } = usePostLogout()

    const { openAlertDialog, setOpenAlertDialog, type } = useAlertDialogStore()

    return (
        <AlertDialog open={openAlertDialog}>
            <AlertDialogOverlay onClick={() => setOpenAlertDialog(false, '')} className='bg-[#161515]/50' />

            <AlertDialogContent className='max-w-[380px] dark-mode p-0 !rounded-2xl'>
                <div
                    onClick={() => setOpenAlertDialog(false, "", undefined)}
                    className="cursor-pointer size-5 z-20 flex items-center justify-center absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-full text-[#505458]" />
                    <span className="sr-only">Close</span>
                </div>
                {type === 'logout' && <LogoutComponent />}
                {/* {type === 'changeStatusProgress' && <ChangeStatusProgress />} */}
            </AlertDialogContent>

        </AlertDialog >
    )
}

export default AlertDialogCustom