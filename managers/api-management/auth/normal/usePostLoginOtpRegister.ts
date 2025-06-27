"use client";

import { KEY_COOKIES } from "@/constants/Cookie";
import { toastCore } from "@/lib/toast";
import { useStateAuth } from "@/managers/state-management/auth/useStateAuth";
import apiAuth from "@/services/auth/auth.services";
import { useCartStore } from "@/stores/useCartStore";
import useCookieStore from "@/stores/useCookieStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { useToastStore } from "@/stores/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

declare global {
    interface Window {
        gapi: any;
    }
}
export const usePostLoginOtpRegister = () => {
    // const { dataLang } = useTranslate();
    const formData = new FormData();
    const queryClient = useQueryClient();

    const { setCookie, getCookie } = useCookieStore();

    const { isStateAuth, queryKeyIsStateAuth } = useStateAuth();

    const { setToast } = useToastStore();
    const { setOpenDialogCustom, setStatusDialog } = useDialogStore();

    const { fetchCart } = useCartStore();

    // const { redirectFacebook } = usePostLoginFacebook();

    // const { attachSigninGoogle } = usePostLoginGoogle();

    let session_id = getCookie("session_id") ?? "";

    // đăng nhập thường
    const postLoginDefaultMutation = useMutation({
        mutationFn: async (payLoad: FormData) => {
            const { data } = await apiAuth.postLoginDefault(payLoad);
            return data;
        },
        mutationKey: ["postLoginDefault"],
        gcTime: 3000,
        retryDelay: 3000,
    });

    /// đăng ký thường (trước khi gửi otp thì type_request === "send_otp" -> sau khi gửi otp type_request === "register") (OTP)
    const postRegisterMutation = useMutation({
        mutationFn: async (payLoad: FormData) => {
            const { data } = await apiAuth.postRegister(payLoad);
            return data;
        },
        mutationKey: ["postRegisterDefault"],
        gcTime: 3000,
        retryDelay: 3000,
    });

    // Quên mật khẩu
    const postForgotPassword = useMutation({
        mutationFn: async (payLoad: FormData) => {
            const { data } = await apiAuth.postForgotPassword(payLoad);
            return data;
        },
        retry: 3,
        gcTime: 3000,
        retryDelay: 3000,
    });

    // đổi mật khẩu (có OTP)
    const postUpdatePassword = useMutation({
        mutationFn: async (payLoad: FormData) => {
            const { data } = await apiAuth.postChangePassword(payLoad);
            return data;
        },
        mutationKey: ["postChangePassword"],
        gcTime: 3000,
        retryDelay: 3000,
    });

    const onSubmit = async (data: any, type: string, type_action?: string) => {
        if (type == "login") {
            // setLoading(true);
            formData.append("username", data?.phone ?? "");
            formData.append("password", data?.password ?? "");
            try {
                postLoginDefaultMutation.mutate(formData, {
                    onSuccess: (res) => {
                        // setLoading(false);
                        if (res?.result) {
                            setCookie(KEY_COOKIES.WEBSITE, res?.data?.token);
                            setOpenDialogCustom(false);
                            fetchCart();
                            // Kích hoạt query updateLastTime
                            queryClient.invalidateQueries({ queryKey: ['updateLastTime'] });
                            setToast(true, "success", res?.message, 2500);
                            return;
                        }
                        setToast(true, "error", res?.message, 2500);
                    },
                    onError: (error: any) => {
                        // setLoading(false);
                        throw new Error(error);
                    },
                });
            } catch (e) { }
        }

        if (type == "register") {
            if (data?.email) {
                formData.append("email", data?.email ?? "");
            }
            
            formData.append("name", data?.fullname ?? "");
            formData.append("phonenumber", data?.phone ?? "");
            formData.append("password", data?.password ?? "");
            formData.append("type_request", "send_otp");

            try {
                postRegisterMutation.mutate(formData, {
                    onSuccess: async (res) => {
                        if (res?.result) {
                            queryKeyIsStateAuth({
                                otp_time: res?.data?.time,
                                form: data,
                            });
                            setStatusDialog("otp_register");
                            return;
                        }
                        setToast(true, "error", res?.message, 2500);
                    },
                    onError: (error: any) => {
                        throw new Error(error);
                    },
                });
            } catch (e) {
                throw e
            }
        }

        if (type == "otp_register") {
            formData.append("name", data?.fullname ?? "");
            formData.append("email", data?.email ?? "");
            formData.append("phonenumber", data?.phone ?? "");
            formData.append("password", data?.password ?? "");
            formData.append("type_request", "register");
            formData.append("code_otp", data?.otp ?? "");

            if (isStateAuth?.otp_time > 0 && type_action === "forgot_otp") {
                return toastCore.error(`Please wait ${isStateAuth?.otp_time} seconds to resend OTP`);
            }

            postRegisterMutation.mutate(formData, {
                onSuccess: (res) => {
                    if (res?.result) {
                        setCookie(KEY_COOKIES.WEBSITE, res?.data?.token);
                        setOpenDialogCustom(false);

                        setTimeout(() => {
                            setStatusDialog("");
                        }, 200);
                        queryKeyIsStateAuth({ form: data });
                        fetchCart();
                        // Kích hoạt query updateLastTime
                        queryClient.invalidateQueries({ queryKey: ['updateLastTime'] });
                        setToast(true, "success", res?.message, 2500);
                        return;
                    }
                    setToast(true, "error", res?.message, 2500);
                },
                onError: (error: any) => {
                    throw new Error(error);
                },
            });
        }

        if (type == "forgotOtp") {
            if (isStateAuth?.otp > 0) {
                return toastCore.error(
                    `Please wait ${isStateAuth?.otp} seconds to resend OTP`
                );
            }

            formData.append("name", data?.fullname ?? "");
            formData.append("email", data?.email ?? "");
            formData.append("phonenumber", data?.phone ?? "");
            formData.append("password", data?.password ?? "");
            formData.append("type_request", "send_otp");

            try {
                postRegisterMutation.mutate(formData, {
                    onSuccess: async (res) => {
                        if (res?.result) {
                            queryKeyIsStateAuth({
                                otp_time: res?.data?.time,
                                form: data,
                            });
                            setStatusDialog("otp_register");
                            return;
                        }
                        setToast(true, "error", res?.message, 2500);
                    },
                    onError: (error: any) => {
                        throw new Error(error);
                    },
                });
            } catch (e) {
                throw e
            }
        }

        if (type == "otp_update_password") {
            formData.append("type_request", "change_password");
            formData.append("password", data?.password ?? "");
            formData.append("otp", data?.otp ?? "");
            postUpdatePassword.mutate(formData, {
                onSuccess: (res) => {
                    if (res?.result) {
                        setToast(true, "success", res?.message, 2500);
                        setOpenDialogCustom(false);
                        setStatusDialog("");
                        isStateAuth?.formFile?.reset();
                        queryKeyIsStateAuth({ otp_time: 0 });
                        return;
                    }
                    setToast(true, "error", res?.message, 2500);
                },
            });
        }

        // if (type == "loginGoogle") {
        //     if (typeof window == "undefined" || !window.gapi) return;
        //     const { gapi } = await import("gapi-script");
        //     const auth2 = gapi.auth2.getAuthInstance();

        //     if (auth2) {
        //         const signInHandler = attachSigninGoogle(auth2);
        //         signInHandler();
        //     } else {
        //         console.error("Google Auth2 chưa được khởi tạo.");
        //     }
        // }

        // if (type == "loginFacebook") {
        //     redirectFacebook();
        // }

        // if (type == "forgotPassword") {
        //     formData.append("email", data?.email ?? "");

        //     postForgotPassword.mutate(formData, {
        //         onSuccess: (res) => {
        //             if (res && res?.isSuccess) {
        //                 setOpenDialogCustom(true);
        //                 setStatusDialog("login_temporary");
        //                 queryKeyIsStateAuth({ form: data });
        //                 setToast(true, "success", res?.message, 2500);
        //                 formData.append("session_id", session_id ?? "");
        //                 return res;
        //             }
        //             data?.form?.setError("email", { message: res?.message });
        //         },
        //         onError: (error: any) => {
        //             throw new Error(error);
        //         },
        //     });
        // }
    };

    return {
        onSubmit,
        isLoading:
            postLoginDefaultMutation.isPending ||
            postRegisterMutation.isPending ||
            // postVerifyPhoneMutation.isPending ||
            postForgotPassword.isPending ||
            postUpdatePassword.isPending,
    };
};
