import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {Layout} from './components/pages/Layout';
import Store from "./store/store";
import './css/global.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

interface StateStore {
    store: Store
}

const store = new Store()

export const Context = createContext<StateStore>({
    store,
})

root.render(
    <Context.Provider value={{store}}>
        <Layout/>
    </Context.Provider>
)