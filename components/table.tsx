import { faDeleteLeft, faEllipsisH, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

type TableProps = {
    tableTitle: string;
    searchPlaceholder: string;
    createFunc?: () => void;
    data: {
        titles: string[];
        body: any[];
    }
}

type Opts = {
    actions: any[];
}


export const Options = (props: Opts) => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className="relative inline-block text-left">
            <div>
            <button onClick={() => setOpenMenu(!openMenu)}><FontAwesomeIcon icon={faEllipsisH}/></button>
            </div>
        
            <div className={`origin-top-right absolute ${openMenu ? 'visible' : 'hidden'} right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            {props.actions.map((a) => {
                return(
                    <div className="py-1" role="none">
                <button onClick={() => a.actionFunc()} className="text-gray-700 group flex items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                <div className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                {a.icon}
                </div>
                {a.action}
                </button>
            </div>
                )
            })}
            </div>
        </div>
    )
}

const Table = (props: TableProps) => {
    return (
        <div className="flex flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
                <div className="p-6 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <h5>{props.tableTitle}</h5>
                      {
                        props.createFunc && (
                            <button onClick={() => props.createFunc()} className="bg-pink-500 text-white active:bg-pink-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            Create <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )
                      }
                    </div>
                    {/* <form className="basis-1/4">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder={props.searchPlaceholder} required/>
    </div>
</form> */}
                </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {props.data.titles.map((title) => {
                        return (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {title}
                          </th>
                        )
                    })}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {props.data.body.map((b) => {
                        const keys = Object.keys(b);
                        return (
                            <tr className="bg-white">
                                {
                                    keys.map((k) => {
                                        if (k != 'actions' && k !== 'id') {
                                            return (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {b[k]}
                                              </td>
                                            )
                                        }
            
                                        if (k === 'actions') {
                                            const actions = b[k];
                                            return (<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><Options actions={actions}/></td>)
                                        }
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Table;