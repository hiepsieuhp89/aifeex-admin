'use client';

import { ArrowLeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FormProps } from 'rc-field-form';
import { setCookies } from '@/helper';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useAdminLogin } from '@/hooks/admin-auth';
import { IAdminLoginRequest } from '@/interface/request/admin-auth';
import MessageClientContext from '@/providers/MessageProvider';
import { useUser } from '@/context/useUserContext';

type FieldType = {
    username: string;
    password: string;
    otp?: string;
};

interface AdminLoginResponse {
    admin: {
        id: number;
        username: string;
        email: string;
        full_name: string;
        role: string;
        is_active: boolean;
        last_login: string;
        created_at: string;
        updated_at: string;
    };
    session_token: string;
    jwt_token: string;
    expires_at: string;
}

const SignInForm = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useAdminLogin()
    const { loginUser } = useUser()
    const { handleErrorMessage, handleSuccessMessage } = useContext(MessageClientContext);
    const [requireOtp, setRequireOtp] = useState(false);
    const [credentials, setCredentials] = useState<{ username: string; password: string }>({ username: '', password: '' });

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        try {
            const payload: IAdminLoginRequest = {
                username: values.username,
                password: values.password,
            }

            setCredentials({ username: values.username, password: values.password });

            const response = await mutateAsync(payload);
            const responseData = response as any;
            
            if (responseData?.jwt_token) {
                setCookies(responseData.jwt_token);
                loginUser(responseData.admin, responseData.jwt_token);
                handleSuccessMessage('Đăng nhập thành công!');
                // Đảm bảo điều hướng được thực hiện sau khi set cookie và login user
                setTimeout(() => {
                    router.push('/');
                    router.refresh(); // Refresh để đảm bảo state mới được cập nhật
                }, 100);
            } else {
                handleErrorMessage('Đăng nhập thất bại!');
            }
        } catch (error: any) {
            handleErrorMessage(error?.response?.data?.message);
        }
    };

    // Remove onOtpFinish and related logic as OTP is not part of the new admin auth flow

    const handleBack = () => {
        setRequireOtp(false);
    };

    return (
        <>
            <div className="mb-2 w-full">
                <div className='flex justify-center pt-2'>
                    <Image src={'/images/logos/logo.png'} width={100} height={100} alt='logo' />
                </div>
            </div>
            
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button bg-[#17A2B8] w-full uppercase font-bold h-[40px]"
                        loading={isPending}
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignInForm;