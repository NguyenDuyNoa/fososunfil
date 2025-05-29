'use client'
import { useStatePageReveicedGift } from '@/app/(client)/reveiced-gift/_state/useStatePageReveicedGift';
import ButtonAnimation from '@/components/button/ButtonAnimation';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import { usePostGetOtpGiftCode } from '@/managers/api-management/gifts/usePostGetOtpGiftCode';
import { usePostReveicedGiftCode } from '@/managers/api-management/gifts/usePostReveicedGiftCode';

import { variantButtonPressZoom } from '@/utils/variants-animation/VariantsAnimation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const initialFormValuePostOtp: any = {
    otp: '',
}

const ReveicedGiftCodeOtp = (props: any) => {
    const code = useSearchParams()?.get('code') ?? ""
    const { isStatePageReveicedGift, queryKeyIsStatePageReveicedGift } = useStatePageReveicedGift()

    const { form, isLoading: isLoadingReveicedGiftCode, onSubmit: onSubmitReveicedGiftCode } = usePostReveicedGiftCode({ initialFormValue: initialFormValuePostOtp }) // sử dụng api để get otp

    const { form: formGetOtp, isLoading: isLoadingGetOtp, onSubmit: onSubmitGetOtp } = usePostGetOtpGiftCode({ initialFormValue: isStatePageReveicedGift?.form }) // sử dụng api để lấy lại otp


    const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
    const [formattedTime, setFormattedTime] = useState<string>("");

    useEffect(() => {
        if (isStatePageReveicedGift.otp_time < 0) return;
        const timer = setInterval(() => {
            queryKeyIsStatePageReveicedGift({ otp_time: isStatePageReveicedGift.otp_time - 1 });

            // Convert seconds to MM:SS format
            const minutes = Math.floor(isStatePageReveicedGift.otp_time / 60);
            const seconds = isStatePageReveicedGift.otp_time % 60;
            setFormattedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, [isStatePageReveicedGift.otp_time, queryKeyIsStatePageReveicedGift]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Chặn các phím không phải số
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }

        // nhấn enter khi vừa nhập xong OTP
        if (e.key == 'Enter') {
            e.preventDefault();
            form.handleSubmit((data) => onSubmitReveicedGiftCode({ ...isStatePageReveicedGift?.form, ...data }, code, formGetOtp))()
        }
    };

    const handleOtpInput = (value: string) => {
        const numericValue = value.replace(/\D/g, ''); // Loại bỏ các ký tự không phải số
        form.setValue('otp', numericValue);
        setIsOtpValid(numericValue.length === 4); // Kiểm tra nếu đủ 4 số
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => onSubmitReveicedGiftCode({ ...isStatePageReveicedGift?.form, ...data }, code, formGetOtp))}
                className='space-y-4'
            >
                <FormField
                    control={form.control}
                    name="otp"
                    rules={{
                        required: "Please enter the OTP code!",
                        minLength: {
                            value: 4,
                            message: "The OTP code must contain 4 digits!",
                        },
                        maxLength: {
                            value: 4,
                            message: "The OTP code can only contain 4 digits!",
                        },
                    }}
                    render={({ field, fieldState }) => {
                        const num = isStatePageReveicedGift.form?.phone ?? ''
                        return (
                            <FormItem>
                                <FormControl className="">
                                    <InputOTP
                                        maxLength={4}
                                        className="w-full"
                                        onInput={(e) => handleOtpInput(e.currentTarget.value)}
                                        onKeyDown={handleKeyDown} // Chặn nhập chữ
                                        {...field}
                                    >
                                        <InputOTPGroup className="mx-auto gap-2 w-fit">
                                            <InputOTPSlot className="size-16 3xl:text-lg text-base first:rounded-2xl rounded-2xl border ring-[#07A6FF]" index={0} />
                                            <InputOTPSlot className="size-16 3xl:text-lg text-base rounded-2xl border ring-[#07A6FF]" index={1} />
                                            <InputOTPSlot className="size-16 3xl:text-lg text-base rounded-2xl border ring-[#07A6FF]" index={2} />
                                            <InputOTPSlot className="size-16 3xl:text-lg text-base last:rounded-2xl rounded-2xl border ring-[#07A6FF]" index={3} />
                                        </InputOTPGroup>

                                    </InputOTP>
                                </FormControl>

                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />

                <div className='flex flex-col justify-center items-center '>
                    <div className="text-[#FC0000] text-center">{formattedTime}</div>
                    <ButtonAnimation
                        isStateloading={isLoadingGetOtp}
                        disabled={isLoadingGetOtp}
                        onClick={() => { onSubmitGetOtp(isStatePageReveicedGift.form, code) }}
                        type="button"
                        className="flex items-center gap-2 text-small-default bg-transparent text-red-500 hover:bg-transparent w-fit py-1 px-2 rounded-base disabled:text-[#333538]/20 disabled:bg-transparent"
                        title_button="Resend OTP code"
                    />
                </div>

                <ButtonAnimation
                    isStateloading={isLoadingReveicedGiftCode || isLoadingGetOtp}
                    disabled={!isOtpValid || isLoadingReveicedGiftCode || isLoadingGetOtp}
                    type='submit'
                    title_button='Send'
                    variant={variantButtonPressZoom}
                    className='space-x-2 bg-[#333538] text-white rounded-full 3xl:text-lg text-base font-normal w-full md:py-3 py-2.5 h-auto hover:opacity-80 transition-all duration-150 ease-linear disabled:hover:opacity-100 disabled:bg-[#333538]/40 disabled:text-white disabled:cursor-not-allowed disabled:pointer-events-auto'
                />
            </form>
        </Form>
    )
}

export default ReveicedGiftCodeOtp