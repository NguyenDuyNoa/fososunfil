'use client'

import moment from 'moment'
import React, { FormEvent, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import ButtonAnimation from '@/components/button/ButtonAnimation'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { DatePickerShowYear } from '@/components/calendar/DatePickerShowYear'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { FORMAT_DATE } from '@/constants/FormatDate'
import { NumericFormatCore } from '@/lib/numericFormat'

import { regexPatterns } from '@/utils/regex/regex'
import { variantButtonPressZoom } from '@/utils/variants-animation/VariantsAnimation'

import { Call, Sms, UserEdit } from 'iconsax-react'
import { CalendarIcon } from 'lucide-react'

import { useStateProfile } from './_state/useStateProfile'
import { IStringMap } from '@/types/common/IStringMap'

import { usePostChangeProfile } from '@/managers/api-management/auth/account/usePostChangeProfile'
import { useAuthStore } from '@/stores/useAuthStores'

type Props = {}

const initialFormValue = {
    fullname: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    gender: '',
}

const Profile = (props: Props) => {
    const { isStateProfile, queryKeyIsStateProfile } = useStateProfile()

    const today = new Date();

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 100 }, (_, index) => currentYear - index); // Tạo mảng năm từ 100 năm trước đến năm hiện tại

    const { informationUser } = useAuthStore()

    const { form, setFormValues, isLoading, onSubmit } = usePostChangeProfile(initialFormValue)


    const titleLogin: IStringMap<string> = {
        "phone": "You are logged in with a phone number!",
        "google": "You are logged in with Google!",
        "facebook": "You are logged in with Facebook!",
    }

    const dataGender = [
        {
            id: "1",
            name: "Male",
            id_label: "male"
        },
        {
            id: "2",
            name: "Female",
            id_label: "female"
        },
    ]

    useEffect(() => {
        if (!informationUser) return
        setFormValues(informationUser)
    }, [informationUser])

    const handleEditStatusButton = () => {
        form.clearErrors();
        queryKeyIsStateProfile({
            flagEditInfo: !isStateProfile?.flagEditInfo
        })
        if (!informationUser) return;
        setFormValues(informationUser);
    };

    return (
        <div className='3xl:p-8 p-6 flex flex-col gap-6 w h-full'>
            <div className="flex md:flex-row flex-col justify-between">
                <div className='flex flex-col gap-2'>
                    <h1 className='text-title text-[#3E424E] font-bold'>
                        Account Information
                    </h1>

                    {
                        informationUser &&
                        <div className='lg:text-base text-sm rounded-3xl text-white  py-2 px-6 font-semibold cursor-default bg-[#07A6FF] hover:bg-[#07A6FF]/90 custom-transition'>
                            {titleLogin[informationUser?.is_register]}
                        </div>
                    }
                </div>

                <div className='flex items-center gap-5 md:my-0 my-5'>
                    <ButtonAnimation
                        type="submit"
                        disabled={isLoading}
                        isStateloading={isLoading}
                        title_button={isStateProfile?.flagEditInfo ? "Cancel" : "Edit"}
                        onClick={() => handleEditStatusButton()}
                        variant={variantButtonPressZoom}
                        className={`${isStateProfile?.flagEditInfo ? "bg-[#07A6FF]/80 text-white hover:bg-[#07A6FF]/80" : "bg-transparent text-[#07A6FF] hover:bg-[#07A6FF]/80 hover:text-white"} border border-[#07A6FF] disabled:border-transparent md:w-fit w-full
                    flex items-center gap-2 3xl:text-base text-sm px-6 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden`}
                    // classNameWithIcon=''
                    />
                </div>
            </div>

            <Form {...form}>
                <form
                    className={`grid grid-cols-2 3xl:gap-6 gap-4`}
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        form.handleSubmit((data) => onSubmit(data))()
                    }}
                >
                    <FormField
                        control={form.control}
                        name="fullname"
                        rules={{
                            required: "Please enter your name!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='xl:col-span-1 col-span-2 flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="fullname"
                                    className="3xl:text-base text-sm font-semibold text-[#505458] w-fit"
                                >
                                    Your Name {isStateProfile?.flagEditInfo && <span className="text-red-500">*</span>}
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="fullname"
                                            type="text"
                                            disabled={!isStateProfile?.flagEditInfo}
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE] focus:border-[#07A6FF]"} 
                                        text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 shadow-none placeholder:text-[#B2BABD] placeholder:font-light focus-visible:ring-0 focus-visible:outline-none`}
                                            placeholder={"Enter your your name..."}
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

                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        rules={{
                            required: "Please select your date of birth!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='xl:col-span-1 col-span-2 flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="dateOfBirth"
                                    className="3xl:text-base text-sm font-semibold text-[#505458] w-fit"
                                >
                                    Date of Birth {isStateProfile?.flagEditInfo && <span className="text-red-500">*</span>}
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id='dateOfBirth'
                                                type="button"
                                                className={` relative flex justify-start font-normal text-[#272727] border border-input bg-transparent text-sm-default text-start w-full shadow-none rounded-[40px] 3xl:h-14 h-12 pl-12 placeholder:text-neutral-500 placeholder:font-light focus:ring-none hover:bg-transparent focus-visible:outline-[#07A6FF] transition-all duration-300`}
                                                disabled={!isStateProfile?.flagEditInfo}
                                            >
                                                {field.value ? moment(field.value).format(FORMAT_DATE.DATE_SLASH_LONG) : <React.Fragment>Select Date...</React.Fragment>}
                                                <CalendarIcon className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <DatePickerShowYear
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                onChangeMonth={(newMonth) => {
                                                    const newDate = new Date(field.value);
                                                    newDate.setMonth(newMonth.getMonth());
                                                    field.onChange(newDate);
                                                }}
                                                onChangeYear={(newYear) => {
                                                    const newDate = new Date(field.value);
                                                    newDate.setFullYear(newYear);
                                                    field.onChange(newDate);
                                                }}
                                                captionLayout="dropdown-buttons"
                                                fromYear={1960}
                                                toYear={2030}
                                                disabled={[{ after: today }]}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>

                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        rules={{ required: "Please select your gender!" }} // Thêm validation yêu cầu
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className='col-span-2'>
                                    <FormLabel className="3xl:text-base text-sm font-semibold text-[#505458] w-fit">
                                        Gender {isStateProfile?.flagEditInfo && <span className="text-red-500">*</span>}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(e) => {
                                                // if (!isStateProfile?.flagEditInfo) {
                                                //     toastCore.error('Vui lòng chọn chỉnh sửa')
                                                //     return
                                                // }
                                                field.onChange(e)
                                            }}
                                            value={field.value}
                                            className='flex items-center gap-8 md:gap-8 sm:gap-4 py-2'
                                        >
                                            {
                                                dataGender && dataGender.map((item) => (
                                                    <div
                                                        key={`gender-${item.id}`}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <RadioGroupItem
                                                            disabled={!isStateProfile?.flagEditInfo}
                                                            id={item.id_label}
                                                            value={item.id}
                                                            className={`border-2 border-[#07A6FF] size-5 relative bg-transparent rounded-full data-[state=checked]:text-[#07A6FF]`}
                                                        />
                                                        <Label
                                                            className={`${!isStateProfile?.flagEditInfo ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer text-[#272727]"} text-sm-default`}
                                                            htmlFor={item.id_label}
                                                        >
                                                            {item.name}
                                                        </Label>
                                                    </div>
                                                ))
                                            }
                                        </RadioGroup>
                                    </FormControl>

                                    {
                                        fieldState?.invalid && fieldState?.error &&
                                        (<FormMessage>{fieldState?.error?.message}</FormMessage>)
                                    }
                                </FormItem>
                            );
                        }}
                    />

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
                                <FormItem className='xl:col-span-1 col-span-2 flex flex-col w-full'>
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
                                                disabled={!isStateProfile?.flagEditInfo || informationUser?.is_register == "phone"}
                                                name="phone"
                                                getInputRef={ref}
                                                placeholder={"Enter phone number..."}
                                                thousandSeparator={' '}
                                                value={value}
                                                maxLength={12}
                                                onValueChange={(values: any) => {
                                                    const { value } = values;
                                                    onChange(`${value}`); // Combine country code with phone number
                                                }}
                                                allowLeadingZeros={true}
                                                onBlur={onBlur} // Ensure onBlur is called for validation
                                                className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE] focus:border-[#07A6FF]"}
                                        text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 placeholder:text-[#B2BABD] placeholder:font-light focus-visible:ring-0 focus-visible:outline-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50`}
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

                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: "Please enter your email!",
                            pattern: {
                                value: regexPatterns.email,
                                message: "Invalid email!",
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='xl:col-span-1 col-span-2 flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="email"
                                    className="3xl:text-base text-sm font-semibold text-[#505458] w-fit"
                                >
                                    Email {isStateProfile?.flagEditInfo && <span className="text-red-500">*</span>}
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            disabled={!isStateProfile?.flagEditInfo}
                                            // disabled={!isStateProfile?.flagEditInfo || informationUser?.is_login == 2}
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE] focus:border-[#07A6FF]"} 
                                        text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 shadow-none placeholder:text-[#B2BABD] placeholder:font-light focus-visible:ring-0 focus-visible:outline-none`}
                                            placeholder={"Enter email..."}
                                            type="text"
                                            {...field}
                                        />
                                        <Sms className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                    </div>
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <div className='col-span-2 flex items-center justify-end 3xl:space-y-6 space-y-4'>
                        <ButtonAnimation
                            disabled={!isStateProfile.flagEditInfo || isLoading}
                            isStateloading={isLoading}
                            type='submit'
                            title_button={"Update"}
                            variant={variantButtonPressZoom}
                            className='space-x-2 bg-transparent text-[#272727] border-2 border-[#272727]   rounded-full 3xl:text-lg text-base font-medium w-fit px-6 py-2 h-auto hover:opacity-60  transition-all duration-150 ease-linear disabled:hover:opacity-100 disabled:bg-[#333538]/40 disabled:border-transparent disabled:text-white disabled:cursor-not-allowed disabled:pointer-events-auto'
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Profile