import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

export const Layout = observer(() => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth()
        }
    }, [])

    return (
        <div className="flex w-full justify-center h-full bg-primary">
            <div className={"flex flex-col h-full justify-center"}>
                <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : `Авторизуйтесь`}</h1>
                <input
                    className={"bg-amber-200"}
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={"bg-amber-400"}
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}

                />
                {store.isAuth ? (
                    <button onClick={() => store.logout()}>logout</button>
                ) : (
                    <button onClick={() => store.login(email, password)}>Login</button>
                )}
                <button onClick={() => store.registration(email, password)}>REg</button>
            </div>
        </div>
    )
})