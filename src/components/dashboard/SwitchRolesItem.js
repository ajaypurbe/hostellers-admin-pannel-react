import React from 'react';
import { Menu } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
const SwitchRolesItem = (props) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    key={props.itemkey}
                    onClick={props.onClick}
                    className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                    )}
                >
                    {props.role}
                </button>
            )}
        </Menu.Item>
    )
}

export default SwitchRolesItem