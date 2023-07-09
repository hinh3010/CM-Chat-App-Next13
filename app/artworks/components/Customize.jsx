'use client'

import ButtonGroup from "./ButtonGroup";
import { Icons } from "~/app/components/icon";

const horizontals = [
    {
        element: <Icons.Arrow />,
        value: 'horizontal_left',
        tooltip: 'Align left'
    },
    {
        element: <Icons.Arrow />,
        value: 'horizontal_center',
        tooltip: 'Align center (horizontal)'
    },
    {
        element: <Icons.Arrow rotate={'180'} />,
        value: 'horizontal_right',
        tooltip: 'Align right',
    }
]

const verticals = [
    {
        element: <Icons.Arrow rotate={'90'} />,
        value: 'vertical_top',
        tooltip: 'Align top'
    },
    {
        element: <Icons.Arrow />,
        value: 'vertical_center',
        tooltip: 'Align center (vertical)'
    },
    {
        element: <Icons.Arrow rotate={'270'} />,
        value: 'vertical_bottom',
        tooltip: 'Align bottom'
    }
]

const textTransforms = [
    {
        element: <b>__</b>,
        value: 'none',
        tooltip: 'None',
        active: true
    },
    {
        element: 'AA',
        value: 'capitalize',
        tooltip: 'Capitalize'
    },
    {
        element: 'aa',
        value: 'lowercase',
        tooltip: 'Lowercase'
    },
    {
        element: <b>B</b>,
        value: 'bold',
        tooltip: 'Bold'
    },
    {
        element: <i>I</i>,
        value: 'italic',
        tooltip: 'Italic'
    },
    {
        element: <u>U</u>,
        value: 'underline',
        tooltip: 'Underline'
    }
]

const textAlignments = [
    {
        element: <Icons.TextAlign />,
        value: 'text_left',
        tooltip: 'Text left'
    },
    {
        element: <Icons.TextAlign position='center' />,
        value: 'text_center',
        tooltip: 'Text center'
    },
    {
        element: <Icons.TextAlign position='right' />,
        value: 'text_right',
        tooltip: 'Text right'
    },
    {
        element: <Icons.TextColor />,
        value: 'text_color',
        tooltip: 'Text color'
    },
    {
        element: <div className="w-10 h-10 shadow-md rounded-[100%] border border-gray-200" />,
        value: 'background-color',
        tooltip: 'Background color'
    },
    {
        element: <Icons.EmoticonLove />,
        value: 'emoji',
        tooltip: 'Emoji'
    }
]

const Customize = () => {

    function handleClick(item) {
        item.active = true
    }

    return (
        <div className="w-full h-full border rounded-2xl p-4 flex flex-col bg-white overflow-hidden">
            <section className="flex items-end justify-between py-4">
                <span
                    className="text-3xl font-medium cursor-pointer"
                >
                    Customize
                </span>
                <span
                    className="text-2xl font-medium cursor-pointer"
                    style={{ color: '#007BFF' }}
                >
                    Close
                </span>
            </section>
            <section className="flex flex-col mt-2">
                <span
                    className="text-2xl  font-medium cursor-pointer"
                >
                    Layer Name
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        // backgroundColor: '#EAF2FE',
                        // color: '#709CE6',
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Layer Name
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Text alignment
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Location
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Layer size
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Position
                </span>
                <div className="flex items-center w-full mt-2">
                    <ButtonGroup buttons={horizontals} className={'flex-1 mx-2'} />
                    <ButtonGroup buttons={verticals} className={'flex-1 mx-2'} />
                </div>
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Text editor
                </span>
                <div className="flex items-center w-full mt-2">
                    <ButtonGroup buttons={textTransforms} className={'flex-1 mx-2'} onClick={handleClick} />
                </div>
                <div className="flex items-center w-full mt-4">
                    <ButtonGroup buttons={textAlignments} className={'flex-1 mx-2'} onClick={handleClick} />
                </div>
            </section>
        </div>
    );
}

export default Customize;