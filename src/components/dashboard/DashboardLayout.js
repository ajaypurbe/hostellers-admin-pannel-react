import React from 'react'
import LoadingBar from 'react-top-loading-bar';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';

const DashboardLayout = (props) => {
    return (
        <div className='container m-auto pt-20'>
            <LoadingBar height={3} color='#461DFF' />
            <Sidebar>
            {props.children}
            </Sidebar>
        </div>
    )
}

export default DashboardLayout;
