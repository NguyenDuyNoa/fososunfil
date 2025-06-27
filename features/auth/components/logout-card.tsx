import ButtonAnimation from '@/components/button/ButtonAnimation'
import { AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { KEY_COOKIES } from '@/constants/Cookie'
import { useAlertDialogStore } from '@/stores/useAlertDialogStore'
import { useAuthStore } from '@/stores/useAuthStores'
import { useCartStore } from '@/stores/useCartStore'
import useCookieStore from '@/stores/useCookieStore'
import { variantButtonPressZoom } from '@/utils/variants-animation/VariantsAnimation'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

type Props = {}

const LogoutComponent = (props: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const { setOpenAlertDialog } = useAlertDialogStore()
    const { removeCookie } = useCookieStore()
    const { setInformationUser } = useAuthStore()
    const { fetchCart } = useCartStore()

    const handleLogout = async () => {
        if (pathname?.startsWith("/order-public-admin") || pathname?.startsWith("/auth")) {
            router.push("/")
        }
        router.refresh()
        removeCookie(KEY_COOKIES.WEBSITE)
        setOpenAlertDialog(false, "")
        setInformationUser(undefined)
        queryClient.removeQueries({ queryKey: ['updateLastTime'] })
        await fetchCart()
    }

    return (
        <div className="bg-normal p-6 space-y-4 rounded-2xl">
            <AlertDialogHeader className='text-start'>
                <AlertDialogTitle>Do you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                    Confirm Logout
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className='flex flex-row justify-end'>
                <ButtonAnimation
                    onClick={() => setOpenAlertDialog(false, "")}
                    // isStateloading={isLoading}
                    className='3xl:text-base text-sm w-fit py-2.5 px-5 rounded-xl cursor-pointer bg-transparent border border-transparent text-[#272727]/90 hover:text-[#272727]/80 font-semibold transition-all duration-300 h-auto'
                    type='button'
                    variant={variantButtonPressZoom}
                    title_button={"Cancel"}
                />
                <ButtonAnimation
                    onClick={() => handleLogout()}
                    // isStateloading={isLoading}
                    className='3xl:text-base text-sm w-fit py-2.5 px-5 rounded-xl cursor-pointer bg-transparent border border-[#07A6FF] text-[#07A6FF] hover:text-white hover:bg-[#07A6FF] font-semibold duration-300 h-auto'
                    type='button'
                    variant={variantButtonPressZoom}
                    title_button={"Logout"}
                />
            </AlertDialogFooter>
        </div>
    )
}

export default LogoutComponent