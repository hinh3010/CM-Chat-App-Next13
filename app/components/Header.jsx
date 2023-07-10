'use client'
import Avatar from "./ui/Avatar";

const Header = () => {
    return (
        <div className="h-28 w-full flex items-center justify-between px-10 shadow-2xl">
            <section className="flex items-center">
                <Avatar src={"https://source.unsplash.com/256x256"} />
                <div
                    className="flex flex-col ml-4"
                    style={{
                        color: '#686768'
                    }}
                >
                    <span
                        style={{
                            fontWeight: '800',
                            fontSize: '1.6rem',
                            lineHeight: '22px'
                        }}
                    >
                        Adu Adu
                    </span>
                    <span
                        style={{
                            fontWeight: '600',
                            fontSize: '1.4rem',
                            lineHeight: '20px'
                        }}
                    >
                        Online
                    </span>
                </div>
            </section>
            <section className="flex items-center">
                <Avatar className="mx-2" src={"https://source.unsplash.com/256x256"} />
                <Avatar className="mx-2" src={"https://source.unsplash.com/256x256"} />
                <Avatar className="mx-2" src={"https://source.unsplash.com/256x256"} />
                <span className="mx-2 h-20" style={{ width: '2px', backgroundColor: '#B4B4B4' }}></span>
                <Avatar className="mx-2" src={"https://source.unsplash.com/256x256"} />
            </section>
        </div>
    );
}

export default Header;