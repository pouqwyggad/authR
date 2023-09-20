import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";
import AuthService from "../services/AuthService";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "../api";
import {AuthResponse} from "../models/AuthResponse";

export default class Store {
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }


    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            // сохраняем accessToken в localStorage
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            console.log(response)

        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            console.log(response)


        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem("token")
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
}