import { useState } from "react"
import { Link } from "react-router-dom"
import { CalendarIcon, ChartLineIcon, HomeIcon } from "../styles/Icon"

const TabNav = () => {

    const tabs = [  {label: 'Home', path: '/home', icon: <HomeIcon />},
                    {label: 'Logbook', path: '/logbook', icon: <CalendarIcon />},
                    {label: 'Trends', path: '/trends', icon: <ChartLineIcon />}
                ]

    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <div className='tab-nav-container'>
            <div className='tab-nav'>
                {tabs.map( (tab, index) => 
                    <Link to={tab.path} key={index} onClick={() => setSelectedTab(index)}>
                        <div className={'tab-nav-item ' + (selectedTab === index && 'selected')}>
                            {tab.icon}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default TabNav