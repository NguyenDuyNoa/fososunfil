'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toastCore } from '@/lib/toast'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdClear } from "react-icons/md"
import { useStateCategories } from '../../_state/useStateCategories'

import { motion } from 'framer-motion'
import ButtonAnimation from '@/components/button/ButtonAnimation'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetCodeProductAbsolute } from '@/managers/api-management/categories/useGetCodeProductAbsolute'
import ProductDetailCodeSkeleton from '@/components/skeleton/categories/ProductDetailCodeSkeleton'
import SectionInfoProduct from '../product/SectionInfoProduct'
import { usePostCodeProductRelative } from '@/managers/api-management/categories/usePostCodeProductRelative'
import { useAuthStore } from '@/stores/useAuthStores'
import { useToastStore } from '@/stores/useToastStore'
import { useDialogStore } from '@/stores/useDialogStore'

const SectionCategoriesFilterProduct = () => {
    const form = useForm({
        defaultValues: {
            search: '',
            is_key: ""
        }
    })

    const router = useRouter()

    const codeParam = useSearchParams()?.get('code') ?? ""
    const type = useSearchParams()?.get('type') ?? ""
    const isKey = useSearchParams()?.get('isKey') ?? ""

    const { setToast } = useToastStore()
    const { setOpenDialogCustom, setStatusDialog } = useDialogStore()
    const { informationUser } = useAuthStore()

    const { queryKeyIsStateCategories } = useStateCategories()

    const {
        data: dataCodeProduct,
        isFetching: isFetchingDataCodeProduct
    } = usePostCodeProductRelative(codeParam ?? "", type ?? "", isKey ?? "")

    const {
        data: dataDetailCodeProduct,
        isFetching: isFetchingDataDetailCodeProduct
    } = useGetCodeProductAbsolute(codeParam ?? "", type ?? "")

    useEffect(() => {
        if (codeParam) {
            form.setValue("search", codeParam)
        }

        if (isKey) {
            form.setValue("is_key", isKey)
        }
    }, [codeParam, isKey])


    const onSubmit = (data: any) => {
        if (data?.search) {
            queryKeyIsStateCategories({
                filterProduct: {
                    value: data?.search
                }
            })
            router.push(`/categories?code=${data?.search}&type=list&isKey=1`)
        } else {
            setToast(true, "error", "Please enter the product code!")
        }
    }

    const handleClearTextSearch = () => {
        queryKeyIsStateCategories({
            filterProduct: {
                value: ''
            }
        })
        form.reset()
        router.push(`/categories`)
    }

    return (
        <div className='3xl:space-y-12 space-y-10'>
            <div className='bg-white xxl:p-9 p-6'>
                <Form {...form}>
                    <form
                        className="flex md:flex-row flex-col gap-4"
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault()
                            if (informationUser) {
                                form.handleSubmit((data) => onSubmit(data))()
                            } else {
                                setToast(true, "warning", "Please log in use this feature!")
                                setOpenDialogCustom(true)
                                setStatusDialog("login")
                            }
                        }}
                    >
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative md:min-w-[250px] min-w-full">
                                                <Input
                                                    type="text"
                                                    className={`${fieldState?.invalid && fieldState?.error ? "border rounded-md border-[#F15A5A]" : "border-b rounded-md border-[#1F1F1F33]"} 
                                                    bg-white text-base focus:border-[#57A4FE] placeholder:text-[#0000004D] rounded-none placeholder:text-base focus-visible:ring-0 text-black focus-visible:ring-offset-0 py-3 h-auto`}
                                                    placeholder="OEM no or Sunfil-filter no"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Backspace' && field.value.length === 1) {
                                                            // Thực hiện hành động khi ký tự cuối bị xoá
                                                            handleClearTextSearch()
                                                        }
                                                    }}
                                                    {...field}
                                                />
                                                {
                                                    field.value && (
                                                        <MdClear
                                                            onClick={() => handleClearTextSearch()}
                                                            className="absolute top-[25%] right-4 bg-gray-200 p-1 rounded-full size-6 cursor-pointer"
                                                        />
                                                    )
                                                }
                                            </div>
                                        </FormControl>
                                        {fieldState?.invalid && fieldState?.error && <FormMessage>{fieldState?.error?.message}</FormMessage>}
                                    </FormItem>
                                );
                            }}
                        />

                        <ButtonAnimation
                            title_button="Search"
                            className="text-white capitalize rounded-none h-fit font-medium text-base caret-transparent border border-[#57A4FE] bg-[#57A4FE] hover:bg-[#57A4FE]/80 px-8 py-3"
                        />
                    </form>
                </Form>
            </div>

            {
                isFetchingDataCodeProduct || isFetchingDataDetailCodeProduct ?
                    (
                        <ProductDetailCodeSkeleton />
                    )
                    :
                    (
                        dataCodeProduct || dataDetailCodeProduct ?
                            (
                                <SectionInfoProduct />
                            )
                            :
                            (
                                codeParam &&
                                <div className='bg-white md:p-6 p-4 w-full'>
                                    <div className='text-content-common text-[#000000]/[66%] font-normal'>
                                        No Product found for seach term <span className='font-bold'>{codeParam}</span>
                                    </div>
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default SectionCategoriesFilterProduct