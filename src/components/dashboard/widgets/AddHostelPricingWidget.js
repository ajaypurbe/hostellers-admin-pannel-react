import React from 'react';
import SectionSeperator from './../../shared/SectionSeperator';
import Chips from './Chips';
import { v4 as generateUUID } from 'uuid';

import {
    addHostelPricing,
    getCurrency,
    getDescription,
    getDuration,
    getFeatures,
    getHostelPricings,
    getRate,
    getTitle,
    setCurrency,
    setDescription,
    setDuration,
    setFeatures,
    setPricing,
    setRate,
    setTitle
} from "../../../features/hostels/hostelPricingSlice";

import {getUserDetails} from "../../../features/authentication/UserSlice";


import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function AddHostelPricingWidget(props) {
    const dispatch = useDispatch();

    const hostelPricings = useSelector(getHostelPricings);
    const features = useSelector(getFeatures);
    const title = useSelector(getTitle);
    const description = useSelector(getDescription);
    const rate = useSelector(getRate);
    const duration = useSelector(getDuration);
    const currency = useSelector(getCurrency);
    const activeUser = useSelector(getUserDetails);
    // console.log("Active user", activeUser);

    const onChangeFeatureHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        const singleItem = value.split(',');
        dispatch(setFeatures(singleItem));
    }

    const onFeatureChipsDeleteHandler = (index, item) => {
        dispatch(setFeatures(features.filter(i => i !== item)));
    }

    const onChangeTitleHandler = (e) => {
        dispatch(setTitle(e.target.value));

    }
    const onChangeDescriptionHander = (e) => {
        dispatch(setDescription(e.target.value));

    }
    const onChangeRateHandler = (e) => {
        dispatch(setRate(e.target.value));

    }
    const onChangeCurrencyHandler = (e) => {
        dispatch(setCurrency(e.target.value));

    }
    const onChangeDurationHandler = (e) => {
        dispatch(setDuration(e.target.value));

    }
    const onClickAddPricingHandler = async (e) => {
        //    props.handleAdd = "";
        if (title !== "" && description !== "" && rate !== "" && duration !== "" && currency !== "" && features.length > 0) {
            dispatch(setPricing({
                "oldPricingData": hostelPricings, "pricingData": {
                    _id: generateUUID(),
                    title: title,
                    description: description,
                    rate: rate,
                    duration: duration,
                    currency: currency,
                    features: features
                }
            }));

            const payload = {
                uid: activeUser._id,
                title: title,
                description: description,
                rate: rate,
                duration:duration,
                currency: currency,
                features:features
            }
            const result = await dispatch(addHostelPricing(payload));
            console.log(result, "Result");

        } else {
            toast.error("Please fill all fields");
        }

    }


    return (
        <div className='my-6'>
            <SectionSeperator title="Hostel Pricings" description="Guests can know about the foods timing and menu that you provides"></SectionSeperator>
            <div className='grid grid-cols-6 gap-6'>

                <div className='col-span-2' >
                    <div className='my-2'>
                        <label htmlFor="pricing-title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            onChange={onChangeTitleHandler}
                            type="text"
                            name="pricing-title"
                            id="pricing-title"
                            autoComplete="pricing-title"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="pricing-description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            onChange={onChangeDescriptionHander}
                            type="text"
                            name="pricing-description"
                            id="pricing-description"
                            autoComplete="pricing-description"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />

                    </div>
                    <div className='my-2'>
                        <label htmlFor="pricing-rate" className="block text-sm font-medium text-gray-700">
                            Rate
                        </label>
                        <input
                            onChange={onChangeRateHandler}
                            type="number"
                            name="pricing-rate"
                            id="pricing-rate"
                            autoComplete="pricing-rate"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div className='my-2'>
                        <label htmlFor="pricing-currency" className="block text-sm font-medium text-gray-700">
                            Currency
                        </label>
                        <select
                            onChange={onChangeCurrencyHandler}
                            id="pricing-currency"
                            name="pricing-currency"
                            autoComplete="pricing-currency"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>NPR</option>

                        </select>
                    </div>
                    <div className='my-2'>
                        <label htmlFor="pricing-duration" className="block text-sm font-medium text-gray-700">
                            Duration
                        </label>
                        <select
                            onChange={onChangeDurationHandler}
                            id="pricing-duration"
                            name="pricing-duration"
                            autoComplete="pricing-duration"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Month</option>
                            <option>Day</option>
                            <option>Week</option>
                            <option>Year</option>

                        </select>
                    </div>



                    <div className='my-2' >
                        <label htmlFor="pricing-features" className="block text-sm font-medium text-gray-700">
                            Features
                        </label>
                        <p className=" text-xs italic">You can add multiple features by seperating with comma</p>

                        <input
                            onChange={onChangeFeatureHandler}
                            value={features}
                            type="text"
                            name="pricing-features"
                            id="pricing-features"
                            autoComplete="pricing-features"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='flex flex-wrap space-x-3 my-5 w-10/12 '> {features.map((item, index) => {
                        return index >= 0 && item !== "" ? <Chips key={index} title={item} onClick={(e) => {
                            e.preventDefault();
                            onFeatureChipsDeleteHandler(index, item);
                        }}></Chips> : ""
                    })}</div>
                    {/* images */}

                    <div className='my-4'>
                        <button type='button'
                            onClick={() => {
                                onClickAddPricingHandler()
                            }}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add
                        </button>
                    </div>

                </div>

                <div className='col-span-4'>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-y-auto h-[46rem] sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    {/* Table */}
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr key="key">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Rate
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Duration
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Features
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {hostelPricings.length > 0 ? hostelPricings.map((pricing) => (
                                                <tr key={pricing._id}>
                                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                        <p>{pricing.title}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                        <p>{pricing.rate}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                        <p>{pricing.duration}</p>
                                                    </td>
                                                    <td className=" text-gray-500">{pricing.features.map((feature, index) => <p key={index}>{feature}</p>)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button type='button' className='text-indigo-600 hover:text-indigo-900 text-sm font-medium' onClick={(e) => {
                                                        e.preventDefault();
                                                        // onClickHandlerEditFoodMenuTableData(menu._id);
                                                    }}>Edit</button>
                                                    </td>

                                                </tr>
                                            )) : ""}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default AddHostelPricingWidget;