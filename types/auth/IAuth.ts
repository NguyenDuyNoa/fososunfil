interface IPostAuth {
    phone?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    promoCode?: string;
    policy?: boolean;
    otp?: string;
}
interface IAuthStore {
    informationUser?: IInformationUser;
    setInformationUser: (key: IInformationUser) => void;
}

interface IChangeProfileFormSetup {
    fullname: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    gender: string;
}

interface IChangePassWordFormSetup {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    // otp?: string;
}

// interface state password
interface IChangePasswordState {
    showOldPassword: boolean;
    showNewPassword: boolean;
    showConfirmPassword: boolean;
}

interface IInformationUser {
    zcode: string,
    email_client: string,
    phonenumber: string,
    datecreated: string,
    company: string,
    client_image: string | null
    birtday: string | null,
    gender: string,
    is_register: string,
    status_sunfil: string,
    debt_sunfil: string,
    shipping: {
        address: string,
        city_shipping: string,
        district_shipping: string,
        email: string,
        id: string,
        name: string,
        phone: string,
        ward_shipping: string,
    }
}
// interface IInformationUser {
//     fullname: string;
//     phonenumber: string;
//     count_quotes: number;
//     count_orders: number;
//     default_language: string;
//     userid: string;
//     staff_id: string | null;
//     client_image: string;
//     email_client: string | null;
//     id_google: string | null;
//     id_facebook: string | null;
//     datecreated: string;
//     is_login: number;
//     code_gt: string | null;
//     birtday: string;
//     gender: string;
//     shipping_client: {
//         id: string,
//         client: string,
//         name: string,
//         phone: string,
//         address: string,
//         code_zip: string | null,
//         address_primary: string,
//         date_create: string,
//         create_by: string,
//         address_v2: string,
//         name_v2: string,
//         delivery_area: string,
//         city_shipping: string,
//         district_shipping: string,
//         quotes: string | null,
//         type: string
//     };
// }

export type {
    IPostAuth,
    IAuthStore,
    IChangePasswordState,
    IChangeProfileFormSetup,
    IChangePassWordFormSetup,
    IInformationUser
}