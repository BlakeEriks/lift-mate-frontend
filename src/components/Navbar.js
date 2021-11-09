const Navbar = () => {
    return (
        <nav>
            <div className="nav-content">
                <span className="nav-logo">
                    <a href="/home">
                        <i className="fas fa-dumbbell"></i>
                        LiftMate
                    </a>
                </span>
                <span className="nav-right">
                    <span className="nav-greeting">
                        Hi
                        <span className="nav-user">
                            Username!
                        </span>
                    </span>
                    <button className='pink-on-white'><a href="/logout">Log Out</a></button>
                </span>
            </div>
        </nav>
    )
}

export default Navbar