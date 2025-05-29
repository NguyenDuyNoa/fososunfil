'use client'

import { useResizeStore } from '@/stores/useResizeStore'

import { useStatePageReveicedGift } from './_state/useStatePageReveicedGift'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetCheckGiftCode } from '@/managers/api-management/gifts/useGetCheckGiftCode'
import { useToastStore } from '@/stores/useToastStore'
import LoadingComponent from '@/components/loading/LoadingComponent'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { usePostGetOtpGiftCode } from '@/managers/api-management/gifts/usePostGetOtpGiftCode'
import React, { FormEvent, useEffect, useState } from 'react'
import { regexPatterns } from '@/utils/regex/regex'
import { NumericFormatCore } from '@/lib/numericFormat'
import { Call, Gift, UserEdit } from 'iconsax-react'
import ButtonAnimation from '@/components/button/ButtonAnimation'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/useAuthStores'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePostReveicedGiftCode } from '@/managers/api-management/gifts/usePostReveicedGiftCode'
import moment from 'moment'
import { FORMAT_DATE } from '@/constants/FormatDate'

const initialFormValue = {
    phone: '',
    fullname: ''
}

const ReveicedGift = () => {
    const router = useRouter()
    const code = useSearchParams()?.get('code') ?? ""
    const { informationUser } = useAuthStore()

    // Trạng thái hiển thị và disabled
    const { isStatePageReveicedGift, queryKeyIsStatePageReveicedGift } = useStatePageReveicedGift()

    const { data: checkGiftCode, isLoading: isLoadingCheckGiftCode } = useGetCheckGiftCode({ code: code }) // kiểm tra xem code có hoạt động hay kh

    const { form, setFormValues, isLoading: isLoadingOtpGiftCode, onSubmit: onSubmitGetOtpGiftCode } = usePostGetOtpGiftCode({ initialFormValue: initialFormValue })

    useEffect(() => {
        if (!informationUser) return
        setFormValues(informationUser)
    }, [informationUser])

    const handleChangeRouter = () => {
        if (informationUser) {
            router.push("/auth/information/gift-history")
        } else {
            router.push("/")
        }
    }

    console.log("checkGiftCode ", checkGiftCode);
    console.log("isStatePageReveicedGift ", isStatePageReveicedGift);

    return (
        <div className='w-full relative h-full'>
            <div className='pt-[112px] lg:min-h-screen min-h-dvh flex flex-col justify-center items-center md:gap-0 gap-16 3xl:pb-16 2xl:pb-10 pb-6'>
                {
                    isStatePageReveicedGift?.dataGiftDone ?
                        // khi nhận được quà sẽ hiển thị
                        (
                            <Card className="w-full max-w-md mx-auto">
                                <CardHeader>
                                    <div className="mx-auto xl:size:16 size-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Gift className="xl:size-8 size-6 text-green-600" />
                                    </div>
                                    <CardTitle className="text-2xl text-center text-green-600 mb-2">
                                        Congratulations <span className='font-bold uppercase'>{isStatePageReveicedGift?.dataGiftDone?.name_clients}</span>!
                                    </CardTitle>
                                    <p className="text-center text-gray-600">{isStatePageReveicedGift?.dataGiftDone?.message}</p>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                                        <Image
                                            src={isStatePageReveicedGift?.dataGiftDone?.gift?.avatar || "/placeholder.svg"}
                                            alt={isStatePageReveicedGift?.dataGiftDone?.gift?.name}
                                            width={800}
                                            height={800}
                                            className="size-full object-contain rounded-lg"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-center">{isStatePageReveicedGift?.dataGiftDone?.gift?.name_gift}</h3>
                                            <div className="mt-2 text-center" dangerouslySetInnerHTML={{ __html: isStatePageReveicedGift?.dataGiftDone?.gift?.content }} />
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-2 text-center">Your gift code</p>
                                            <p className="text-xl font-mono font-bold text-primary text-center">{isStatePageReveicedGift?.dataGiftDone?.gift?.code}</p>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-2 text-start">Vui lòng đến địa chỉ <span className='font-bold'>{isStatePageReveicedGift?.dataGiftDone?.address}</span> để nhận quà trước ngày <span className='font-bold'>{moment(isStatePageReveicedGift?.dataGiftDone?.gift?.date_active_end)?.format(FORMAT_DATE?.DD_MM_YYYY)}</span>!</p>
                                        </div>
                                    </div>

                                    <ButtonAnimation
                                        title_button="Done"
                                        onClick={handleChangeRouter}
                                        className="w-full bg-black text-white rounded-md py-2 font-semibold"
                                    />
                                </CardContent>
                            </Card>
                        )
                        :
                        (
                            isLoadingCheckGiftCode ?
                                // loading
                                (
                                    <LoadingComponent />
                                )
                                :
                                (
                                    <React.Fragment>
                                        {
                                            checkGiftCode?.result ?
                                                // form nhập để nhận quà
                                                (
                                                    <div className=' flex flex-col items-center 3xl:gap-6 gap-4 max-w-[532px] w-full border bg-white shadow-xl rounded-xl p-4'>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            <div className='3xl:size-7 3xl:max-w-7 size-6 max-w-6'>
                                                                <Gift variant='Bold' className="size-full text-orange-600" />
                                                            </div>
                                                            <div className='text-title text-[#333538] font-bold capitalize w-full text-center'>
                                                                Received your gift
                                                            </div>
                                                        </div>

                                                        <Form {...form}>
                                                            <form
                                                                className={`3xl:space-y-4 space-y-2 w-full`}
                                                                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                                                    e.preventDefault()
                                                                    form.handleSubmit((data) => onSubmitGetOtpGiftCode(data, code))()
                                                                }}
                                                            >
                                                                <FormField
                                                                    control={form.control}
                                                                    name="phone"
                                                                    rules={{
                                                                        required: "Please enter your phone number!",
                                                                        pattern: {
                                                                            value: regexPatterns.lengthPhone,
                                                                            message: "Phone number must be 10 digits!",
                                                                        },
                                                                        validate: {
                                                                            isValidPhone: (value) =>
                                                                                regexPatterns.phone.test(value) || ("Invalid phone number!"),
                                                                        },
                                                                    }}
                                                                    render={({ field: { onChange, onBlur, ref, value }, fieldState }) => {
                                                                        return (
                                                                            <FormItem className='flex flex-col w-full'>
                                                                                <FormLabel
                                                                                    htmlFor="number_phone"
                                                                                    className="3xl:text-base text-sm font-semibold text-[#505458] w-fit"
                                                                                >
                                                                                    Phone Number
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                    <div className="relative">
                                                                                        <NumericFormatCore
                                                                                            id="number_phone"
                                                                                            name="phone"
                                                                                            getInputRef={ref}
                                                                                            placeholder={"Enter phone number..."}
                                                                                            thousandSeparator={' '}
                                                                                            value={value}
                                                                                            maxLength={12}
                                                                                            onValueChange={(values: any) => {
                                                                                                const { value } = values;
                                                                                                onChange(`${value}`); // Combine country code with phone number
                                                                                                queryKeyIsStatePageReveicedGift({
                                                                                                    disablePhoneInput: false,  // Mở khóa số điện thoại
                                                                                                    showFullNameField: false,  // Ẩn ô nhập tên khi thay đổi số điện thoại
                                                                                                })
                                                                                            }}
                                                                                            allowLeadingZeros={true}
                                                                                            onBlur={onBlur} // Ensure onBlur is called for validation
                                                                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border-2 border-[#EBEDEE] focus:border-[#07A6FF]"}
                                                        text-[#272727] bg-transparent text-sm-default w-full rounded-xl h-12 pl-12 placeholder:text-[#B2BABD] placeholder:font-light focus-visible:ring-0 focus-visible:outline-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50`}
                                                                                        />
                                                                                        <Call className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                                                                    </div>
                                                                                </FormControl>

                                                                                {fieldState?.invalid && fieldState?.error && (
                                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                                )}
                                                                            </FormItem>
                                                                        );
                                                                    }}
                                                                />

                                                                {
                                                                    (isStatePageReveicedGift?.showFullNameField) &&
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="fullname"
                                                                        rules={{
                                                                            required: "Vui lòng nhập tên của bạn!",
                                                                        }}
                                                                        render={({ field, fieldState }) => (
                                                                            <FormItem className='xl:col-span-1 col-span-2 flex flex-col w-full'>
                                                                                <FormLabel
                                                                                    htmlFor="fullname"
                                                                                    className="3xl:text-base text-sm font-semibold text-[#505458] w-fit"
                                                                                >
                                                                                    Tên của bạn <span className="text-red-500">*</span>
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                    <div className="relative">
                                                                                        <Input
                                                                                            id="fullname"
                                                                                            type="text"
                                                                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border-2 border-[#EBEDEE] focus:border-[#07A6FF]"} 
                text-[#272727] bg-transparent text-sm-default w-full rounded-xl h-12 pl-12 shadow-none placeholder:text-[#B2BABD] placeholder:font-light focus-visible:ring-0 focus-visible:outline-none`}
                                                                                            placeholder="Enter your fullname..."
                                                                                            {...field}
                                                                                        />
                                                                                        <UserEdit className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                                                                    </div>
                                                                                </FormControl>
                                                                                {
                                                                                    fieldState?.invalid && fieldState?.error &&
                                                                                    (<FormMessage>{fieldState?.error?.message}</FormMessage>)
                                                                                }
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                }

                                                                <ButtonAnimation
                                                                    disabled={isLoadingOtpGiftCode}
                                                                    isStateloading={isLoadingOtpGiftCode}
                                                                    type="submit"
                                                                    title_button="Get your gift now"
                                                                    className='flex items-center justify-center gap-2 py-2 px-4 w-full bg-[#07A6FF] hover:bg-[#07A6FF]/80 text-white text-sm-default font-semibold rounded-lg duration-300'
                                                                />
                                                            </form>
                                                        </Form>
                                                    </div>
                                                )
                                                :
                                                // giao diện khi lỗi code
                                                (
                                                    <Card className="w-full max-w-md mx-auto">
                                                        <CardHeader>
                                                            <div className="text-title font-bold text-red-500 flex items-center justify-center">
                                                                Error
                                                            </div>
                                                            <CardTitle className="text-default text-center text-gray-600 mb-1">
                                                                {checkGiftCode?.message}
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                            <ButtonAnimation
                                                                title_button="Done"
                                                                onClick={handleChangeRouter}
                                                                className="w-full bg-black text-white rounded-md py-2 font-semibold"
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                )
                                        }
                                    </React.Fragment>
                                )
                        )
                }
            </div>
        </div>
    )
}

export default ReveicedGift