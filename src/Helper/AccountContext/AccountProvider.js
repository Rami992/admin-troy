import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import AccountContext from '.'
import request from '../../Utils/AxiosUtils';
import { selfData } from '../../Utils/AxiosUtils/API';
import { useRouter } from 'next/navigation';

const AccountProvider = (props) => {
    const router = useRouter();
    const [cookies] = useCookies(["uat"]);
    const [role, setRole] = useState('')
    const { data, refetch, isLoading } = useQuery([selfData, cookies.uat], () => request({ url: selfData },router), {
        enabled: false, select: (res) => { return res?.data }
    });
    const [accountData, setAccountData] = useState()
    const [accountContextData, setAccountContextData] = useState({
        name: "",
        image: {}
    })

    useEffect(() => {
        cookies.uat && refetch()
    }, [cookies.uat])

    useEffect(() => {
        if (data) {
            localStorage.setItem("role", JSON.stringify(data?.role))
            setRole(data?.role?.name)
        }
        setAccountData(data)
    }, [isLoading, cookies.uat])

    return (
        <AccountContext.Provider value={{ ...props, accountData, setAccountData, accountContextData, setAccountContextData, role, setRole }}>
            {props.children}
        </AccountContext.Provider>
    )
}
export default AccountProvider